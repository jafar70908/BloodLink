/**
 * BLOODLINK LIVING STREAM & PULSE CONTROLLER
 * -----------------------------------------
 * Manages the interactive HTML5 canvas bloodstream, procedural ECG pulse generator,
 * synchronized anatomical heart pulse, parallax effects, and lifecycle visibility optimizations.
 */

class BloodlinkBackgroundController {
    constructor(options = {}) {
        this.config = Object.assign({
            cellCount: window.innerWidth < 768 ? 20 : 42,
            speed: 0.65,
            glowIntensity: 0.45,
            pulseInterval: 4200,
            cellSizeRange: [16, 46],
            parallaxStrength: 14,
            canvasId: 'blood-cells-canvas',
            bgId: 'bloodlink-background',
            heartId: 'background-heart',
            ecgLineId: 'ecg-line',
            ecgMarkerId: 'ecg-marker'
        }, options);

        this.canvas = document.getElementById(this.config.canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d', { alpha: true });
        this.bgContainer = document.getElementById(this.config.bgId);
        this.heartElement = document.getElementById(this.config.heartId);
        this.ecgPath = document.getElementById(this.config.ecgLineId);
        this.ecgMarker = document.getElementById(this.config.ecgMarkerId);

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);

        this.cells = [];
        this.mouse = { x: this.width / 2, y: this.height / 2 };
        this.targetMouse = { x: this.width / 2, y: this.height / 2 };
        this.lastPulseTime = 0;
        this.isVisible = true;
        this.animationFrameId = null;

        this.init();
    }

    init() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            console.info('[BloodLink] Reduced motion preference detected. Animations paused.');
            return;
        }

        this.handleResize();
        this.createCells();
        this.bindEvents();

        // Start render loop
        this.animate = this.animate.bind(this);
        this.animationFrameId = requestAnimationFrame(this.animate);

        // Initial heartbeat trigger
        setTimeout(() => this.triggerPulse(), 600);
    }

    createCells() {
        this.cells = [];
        for (let i = 0; i < this.config.cellCount; i++) {
            const cell = new BloodCell(this.width, this.height, this.config);
            // Distribute randomly across screen on initialization
            cell.x = Math.random() * (this.width + 100) - 50;
            this.cells.push(cell);
        }
    }

    handleResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);

        this.canvas.width = this.width * this.dpr;
        this.canvas.height = this.height * this.dpr;
        this.ctx.resetTransform?.();
        this.ctx.scale(this.dpr, this.dpr);
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.handleResize();
            this.cells.forEach(c => c.onResize(this.width, this.height));
        });

        window.addEventListener('mousemove', (e) => {
            this.targetMouse.x = e.clientX;
            this.targetMouse.y = e.clientY;
        });

        // Touch support for mobile interaction
        window.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches[0]) {
                this.targetMouse.x = e.touches[0].clientX;
                this.targetMouse.y = e.touches[0].clientY;
            }
        }, { passive: true });

        // Listen for global custom pulse event
        window.addEventListener('bloodlink:pulse', () => this.triggerPulse());

        // Visibility & performance observers
        if (this.bgContainer && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                this.isVisible = entries[0].isIntersecting;
                if (this.isVisible && !this.animationFrameId) {
                    this.animationFrameId = requestAnimationFrame(this.animate);
                }
            });
            observer.observe(this.bgContainer);
        }

        document.addEventListener('visibilitychange', () => {
            this.isVisible = document.visibilityState === 'visible';
            if (this.isVisible && !this.animationFrameId) {
                this.animationFrameId = requestAnimationFrame(this.animate);
            }
        });
    }

    triggerPulse() {
        this.lastPulseTime = Date.now();

        // 1. Ripple pulse wave through floating blood cells
        this.cells.forEach(cell => {
            const dx = cell.x - this.width / 2;
            const dy = cell.y - this.height / 2;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxRadius = Math.max(this.width, this.height) * 0.6;
            if (dist < maxRadius) {
                cell.pulseEffect = 0.45 * (1 - dist / maxRadius);
            }
        });

        // 2. Animate the anatomical heart SVG
        if (this.heartElement) {
            this.heartElement.classList.add('heart-pulse');
            setTimeout(() => {
                this.heartElement.classList.remove('heart-pulse');
            }, 1200);
        }

        // 3. Animate the ECG electrocardiogram line
        this.animateECG();
    }

    animateECG() {
        if (!this.ecgPath) return;

        const baseline = 50;
        const totalSteps = 100;
        const stepWidth = this.width / totalSteps;
        const duration = 1200;
        const startTime = Date.now();

        const step = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;

            if (progress > 1) {
                // Reset to flat baseline at finish
                let baselinePath = `M 0,${baseline} L ${this.width},${baseline}`;
                this.ecgPath.setAttribute('d', baselinePath);
                if (this.ecgMarker) this.ecgMarker.setAttribute('cx', -50);
                return;
            }

            const currentX = progress * this.width;
            let pathD = `M 0,${baseline} `;

            for (let i = 1; i <= totalSteps; i++) {
                const x = i * stepWidth;
                const dist = Math.abs(x - currentX);
                let y = baseline;

                if (dist < 45) {
                    // Precision cardiac P-Q-R-S-T spike pattern
                    if (dist < 8) {
                        y -= 42; // R spike (systolic peak)
                    } else if (dist < 18) {
                        y += 18; // S dip (repolarization begin)
                    } else if (dist < 28) {
                        y -= 8; // P / T smooth bump
                    }
                }
                pathD += `L ${x.toFixed(1)},${y.toFixed(1)} `;
            }

            this.ecgPath.setAttribute('d', pathD);

            if (this.ecgMarker) {
                this.ecgMarker.setAttribute('cx', currentX.toFixed(1));
                this.ecgMarker.setAttribute('cy', baseline.toString());
            }

            requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }

    setVariant(variant) {
        if (!this.bgContainer) return;
        this.bgContainer.setAttribute('data-variant', variant);
        console.info(`[BloodLink] Background variant set to: ${variant}`);
    }

    animate() {
        if (!this.isVisible) {
            this.animationFrameId = null;
            return;
        }

        this.ctx.clearRect(0, 0, this.width, this.height);

        // Smooth mouse position lerping
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        // Subtle Aurora Parallax drift
        if (this.width >= 768) {
            const px = (this.mouse.x / this.width - 0.5) * this.config.parallaxStrength;
            const py = (this.mouse.y / this.height - 0.5) * this.config.parallaxStrength;
            const blooms = document.querySelectorAll('.aurora-bloom');
            blooms.forEach(bloom => {
                bloom.style.transform = `translate(${px.toFixed(2)}px, ${py.toFixed(2)}px)`;
            });
        }

        // Update and draw blood cells
        for (let i = 0; i < this.cells.length; i++) {
            const cell = this.cells[i];
            cell.update(this.mouse);
            cell.draw(this.ctx);
        }

        // Auto trigger pulse on regular cardiac rhythm interval
        if (Date.now() - this.lastPulseTime > this.config.pulseInterval) {
            this.triggerPulse();
        }

        this.animationFrameId = requestAnimationFrame(this.animate);
    }
}

/**
 * BLOOD CELL (ERYTHROCYTE) PARTICLE
 */
class BloodCell {
    constructor(w, h, config) {
        this.screenWidth = w;
        this.screenHeight = h;
        this.config = config;
        this.reset();
        this.x = Math.random() * w;
    }

    reset() {
        this.z = Math.random(); // Depth perception (0 = far/small/blurry, 1 = near/large/sharp)
        const [minSize, maxSize] = this.config.cellSizeRange;
        this.size = minSize + this.z * (maxSize - minSize);
        this.x = -this.size * 2;
        this.y = Math.random() * this.screenHeight;
        this.vx = (0.5 + Math.random() * 1.5) * this.config.speed * (0.5 + this.z);
        this.vy = (Math.random() - 0.5) * 0.22;
        this.rotation = Math.random() * Math.PI * 2;
        this.vRot = (Math.random() - 0.5) * 0.012;
        this.opacity = 0.12 + (this.z * 0.58);
        this.blur = (1 - this.z) * 3.5;
        this.pulseEffect = 0;
    }

    onResize(w, h) {
        this.screenWidth = w;
        this.screenHeight = h;
    }

    update(mouse) {
        this.x += this.vx;
        this.y += this.vy + Math.sin(Date.now() * 0.001 + this.x * 0.012) * 0.25;
        this.rotation += this.vRot;

        // Fluid mouse dynamic deflection
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 160;

        if (dist < repelRadius && dist > 0) {
            const angle = Math.atan2(dy, dx);
            const force = (repelRadius - dist) * 0.024;
            this.x += Math.cos(angle) * force;
            this.y += Math.sin(angle) * force;
        }

        if (this.pulseEffect > 0) {
            this.pulseEffect *= 0.94;
        }

        if (this.x > this.screenWidth + this.size * 2.5) {
            this.reset();
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = Math.min(1, this.opacity + this.pulseEffect);

        if (this.blur > 1) {
            ctx.filter = `blur(${this.blur.toFixed(1)}px)`;
        }

        const s = this.size;

        // Biconcave Erythrocyte Gradient Outer Body
        const gradient = ctx.createRadialGradient(0, 0, s * 0.12, 0, 0, s);
        gradient.addColorStop(0, '#5A0A18');
        gradient.addColorStop(0.68, '#C8102E');
        gradient.addColorStop(1, '#120709');

        ctx.beginPath();
        ctx.ellipse(0, 0, s, s * 0.78, 0, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Luminescent Outer Rim
        ctx.beginPath();
        ctx.ellipse(0, 0, s, s * 0.78, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.25)';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Sunken Center Dimple
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.38, s * 0.28, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(18, 7, 9, 0.45)';
        ctx.fill();

        ctx.restore();
    }
}

// Auto initialize on DOM ready
if (typeof window !== 'undefined') {
    window.BloodlinkBackgroundController = BloodlinkBackgroundController;
    document.addEventListener('DOMContentLoaded', () => {
        window.bloodlinkBackground = new BloodlinkBackgroundController();
    });
}
