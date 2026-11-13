import React, { useEffect, useRef } from 'react';
import { BgVariant } from '../../types';

interface BloodstreamBackgroundProps {
  variant?: BgVariant;
  cellCount?: number;
}

export const BloodstreamBackground: React.FC<BloodstreamBackgroundProps> = ({
  variant = 'bloodstream',
  cellCount,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heartRef = useRef<HTMLDivElement | null>(null);
  const ecgPathRef = useRef<SVGPathElement | null>(null);
  const ecgMarkerRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let activeCellCount = cellCount || (width < 768 ? 18 : 38);
    const speed = 0.6;
    const pulseInterval = 4000;
    const cellSizeRange: [number, number] = [15, 45];
    const parallaxStrength = 12;

    let mouse = { x: width / 2, y: height / 2 };
    let targetMouse = { x: width / 2, y: height / 2 };
    let lastPulseTime = Date.now();
    let isRunning = false;
    let animationFrameId: number | null = null;
    let ecgFrameId: number | null = null;

    // SECTION 2.5 FIX: Pre-render 4 blurred cell sprites to offscreen canvases to avoid ctx.filter blur in render loop
    const spriteCanvases: HTMLCanvasElement[] = [];
    const spriteBlurLevels = [0, 1.5, 2.5, 4];

    function createCellSprites() {
      spriteCanvases.length = 0;
      const baseSize = 45; // max radius

      for (let i = 0; i < spriteBlurLevels.length; i++) {
        const offCanvas = document.createElement('canvas');
        const padding = 16;
        const dim = (baseSize + padding) * 2;
        offCanvas.width = dim;
        offCanvas.height = dim;
        const offCtx = offCanvas.getContext('2d');
        if (!offCtx) continue;

        const blurPx = spriteBlurLevels[i];
        if (blurPx > 0 && offCtx.filter) {
          offCtx.filter = `blur(${blurPx}px)`;
        }

        const cx = dim / 2;
        const cy = dim / 2;
        const s = baseSize;

        // Gradient outer body
        const grad = offCtx.createRadialGradient(cx, cy, s * 0.1, cx, cy, s);
        grad.addColorStop(0, '#5A0A18');
        grad.addColorStop(0.7, '#C8102E');
        grad.addColorStop(1, '#120709');

        offCtx.beginPath();
        offCtx.ellipse(cx, cy, s, s * 0.8, 0, 0, Math.PI * 2);
        offCtx.fillStyle = grad;
        offCtx.fill();

        // Rim highlight in coral
        offCtx.beginPath();
        offCtx.ellipse(cx, cy, s, s * 0.8, 0, 0, Math.PI * 2);
        offCtx.strokeStyle = 'rgba(255, 107, 107, 0.25)';
        offCtx.lineWidth = 2;
        offCtx.stroke();

        // Dimple center
        offCtx.beginPath();
        offCtx.ellipse(cx, cy, s * 0.4, s * 0.3, 0, 0, Math.PI * 2);
        offCtx.fillStyle = 'rgba(18, 7, 9, 0.45)';
        offCtx.fill();

        spriteCanvases.push(offCanvas);
      }
    }

    createCellSprites();

    class Cell {
      x: number = 0;
      y: number = 0;
      z: number = 0;
      size: number = 0;
      vx: number = 0;
      vy: number = 0;
      rotation: number = 0;
      vRot: number = 0;
      opacity: number = 0;
      pulseEffect: number = 0;
      spriteIndex: number = 0;

      constructor(initRandomX = false) {
        this.reset();
        if (initRandomX) {
          this.x = Math.random() * width;
        }
      }

      reset() {
        this.z = Math.random();
        this.size = cellSizeRange[0] + this.z * (cellSizeRange[1] - cellSizeRange[0]);
        this.x = -this.size * 2;
        this.y = Math.random() * height;
        this.vx = (0.5 + Math.random() * 1.5) * speed * (0.5 + this.z);
        this.vy = (Math.random() - 0.5) * 0.2;
        this.rotation = Math.random() * Math.PI * 2;
        this.vRot = (Math.random() - 0.5) * 0.01;
        this.opacity = 0.12 + this.z * 0.6;
        this.pulseEffect = 0;

        // Choose sprite based on depth (nearer = sharper, farther = blurrier)
        if (this.z > 0.75) this.spriteIndex = 0;
        else if (this.z > 0.5) this.spriteIndex = 1;
        else if (this.z > 0.25) this.spriteIndex = 2;
        else this.spriteIndex = 3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy + Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.2;
        this.rotation += this.vRot;

        // Mouse repulsion
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - dist) * 0.02;
          this.x += Math.cos(angle) * force;
          this.y += Math.sin(angle) * force;
        }

        if (this.pulseEffect > 0) {
          this.pulseEffect *= 0.95;
        }

        if (this.x > width + this.size * 2) {
          this.reset();
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        c.globalAlpha = Math.min(1, this.opacity + this.pulseEffect);

        const sprite = spriteCanvases[this.spriteIndex] || spriteCanvases[0];
        if (sprite) {
          const scale = this.size / 45;
          const w = sprite.width * scale;
          const h = sprite.height * scale;
          c.drawImage(sprite, -w / 2, -h / 2, w, h);
        }

        c.restore();
      }
    }

    let cells: Cell[] = [];
    function initCells() {
      cells = [];
      for (let i = 0; i < activeCellCount; i++) {
        cells.push(new Cell(true));
      }
    }
    initCells();

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.resetTransform?.();
      ctx!.scale(dpr, dpr);

      const targetCount = cellCount || (width < 768 ? 18 : 38);
      if (activeCellCount !== targetCount) {
        activeCellCount = targetCount;
        initCells();
      }
    }
    resize();

    // Debounced resize
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    // SECTION 2.5 FIX: viewBox-based ECG coordinate system & cancellation of previous run
    function animateECG() {
      if (ecgFrameId) {
        cancelAnimationFrame(ecgFrameId);
        ecgFrameId = null;
      }

      const ecgLine = ecgPathRef.current;
      const marker = ecgMarkerRef.current;
      if (!ecgLine) return;

      const baseline = 50;
      const duration = 1200;
      const startTime = Date.now();

      function step() {
        const now = Date.now();
        const p = (now - startTime) / duration;
        if (p > 1) {
          // Reset to flat line
          ecgLine?.setAttribute('d', `M 0,${baseline} L 1000,${baseline}`);
          marker?.setAttribute('cx', '-50');
          return;
        }

        // ViewBox is fixed to 1000 x 100
        const currentX = p * 1000;
        let pathD = `M 0,${baseline} `;

        for (let i = 1; i <= 100; i++) {
          const x = i * 10;
          const dist = Math.abs(x - currentX);
          let y = baseline;

          if (dist < 40) {
            if (dist < 10) y -= 40; // R peak
            else if (dist < 20) y += 15; // S dip
            else y -= 5; // P/T bump
          }
          pathD += `L ${x},${y} `;
        }

        ecgLine?.setAttribute('d', pathD);
        marker?.setAttribute('cx', currentX.toFixed(1));
        marker?.setAttribute('cy', baseline.toString());

        ecgFrameId = requestAnimationFrame(step);
      }

      ecgFrameId = requestAnimationFrame(step);
    }

    function triggerPulse() {
      lastPulseTime = Date.now();
      cells.forEach((c) => {
        const dx = c.x - width / 2;
        const dy = c.y - height / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 450) {
          c.pulseEffect = 0.45 * (1 - dist / 450);
        }
      });

      animateECG();

      // Pulsing heart
      if (heartRef.current) {
        heartRef.current.classList.add('heart-pulse');
        setTimeout(() => {
          heartRef.current?.classList.remove('heart-pulse');
        }, 1200);
      }
    }

    // SECTION 2.5 FIX: Clean single loop with isRunning flag & rAF cancellation
    function animate() {
      if (!isRunning) return;

      ctx!.clearRect(0, 0, width, height);

      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      // Aurora parallax
      if (width >= 768) {
        const px = (mouse.x / width - 0.5) * parallaxStrength;
        const py = (mouse.y / height - 0.5) * parallaxStrength;
        const blooms = document.querySelectorAll<HTMLElement>('.aurora-bloom');
        blooms.forEach((el) => {
          el.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px)`;
        });
      }

      cells.forEach((cell) => {
        cell.update();
        cell.draw(ctx!);
      });

      if (Date.now() - lastPulseTime > pulseInterval) {
        triggerPulse();
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    function startLoop() {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(animate);
      }
    }

    function stopLoop() {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    // SECTION 2.5 FIX: Drop full-screen IntersectionObserver and rely cleanly on document visibility
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        startLoop();
      } else {
        stopLoop();
      }
    };

    const handleCustomPulse = () => {
      triggerPulse();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('bloodlink:pulse', handleCustomPulse);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    startLoop();
    const initialPulseTimer = setTimeout(triggerPulse, 500);

    return () => {
      stopLoop();
      if (ecgFrameId) cancelAnimationFrame(ecgFrameId);
      clearTimeout(resizeTimer);
      clearTimeout(initialPulseTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('bloodlink:pulse', handleCustomPulse);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [cellCount]);

  return (
    <div id="bloodlink-background" data-variant={variant} className="transition-opacity duration-700">
      {/* LAYER 1: Base Gradient & Aurora Blooms */}
      <div className="aurora-bloom aurora-1" />
      <div className="aurora-bloom aurora-2" />

      {/* LAYER 2: Vein Ribbons */}
      <div className="vein-container">
        <div className="vein-ribbon" style={{ top: '18%', animationDelay: '-5s', opacity: 0.6 }} />
        <div className="vein-ribbon" style={{ top: '48%', animationDelay: '-15s', opacity: 0.4 }} />
        <div className="vein-ribbon" style={{ top: '78%', animationDelay: '-2s', opacity: 0.5 }} />
      </div>

      {/* LAYER 3: Pulsing Heart Backdrop */}
      <div className="heart-container" id="background-heart" ref={heartRef}>
        <svg viewBox="0 0 32 32" className="heart-svg w-full h-full">
          <path d="M16 28.5L14.1 26.8C7.35 20.65 3 16.7 3 11.85C3 7.85 6.15 4.7 10.15 4.7C12.4 4.7 14.55 5.75 16 7.45C17.45 5.75 19.6 4.7 21.85 4.7C25.85 4.7 29 7.85 29 11.85C29 16.7 24.65 20.65 17.9 26.8L16 28.5Z" />
        </svg>
      </div>

      {/* LAYER 4: Blood Cell Canvas */}
      <canvas ref={canvasRef} id="blood-cells-canvas" className="absolute inset-0 w-full h-full" />

      {/* LAYER 5: ECG Pulse Line (viewBox 0 0 1000 100 for responsive scaling) */}
      <div className="ecg-container">
        <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path ref={ecgPathRef} id="ecg-line" d="M 0,50 L 1000,50" />
          <circle ref={ecgMarkerRef} id="ecg-marker" className="pulse-marker" r="4.5" cx="-50" cy="50" />
        </svg>
      </div>

      {/* LAYER 6: Vignette & Grain */}
      <div className="vignette" />
      <div className="grain" />
    </div>
  );
};
