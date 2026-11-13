import React, { useState, useRef } from 'react';
import { MONTHLY_DONATIONS_DATA, BLOOD_GROUP_FULFILLMENT, DISTRICT_INTENSITY } from '../../data/mockData';
import { Heart, Users, Activity, Building, Download, Share2, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { pulseBackground } from '../../utils';
import { useBloodlink } from '../../context/BloodlinkContext';
import { toPng } from 'html-to-image';

export const ImpactSection: React.FC = () => {
  const { showToast } = useBloodlink();

  // Share Card Generator State
  const [shareName, setShareName] = useState('Mohammed K.');
  const [shareBloodGroup, setShareBloodGroup] = useState('O+');
  const [alertEmail, setAlertEmail] = useState('');
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  const shareGraphicRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadShareGraphic = async () => {
    if (!shareGraphicRef.current) return;
    try {
      const dataUrl = await toPng(shareGraphicRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `BloodLink-Awareness-${shareBloodGroup}.png`;
      link.href = dataUrl;
      link.click();
      pulseBackground();
      showToast({
        type: 'success',
        title: 'Graphic Downloaded',
        message: 'Share your awareness card on Instagram or WhatsApp status to inspire donors!'
      });
    } catch (e) {
      showToast({
        type: 'info',
        title: 'Card Export',
        message: 'Right-click or take a screenshot to share your badge.'
      });
    }
  };

  const handleEmailSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail) return;
    setEmailSubscribed(true);
    pulseBackground();
    showToast({
      type: 'success',
      title: 'Alerts Activated',
      message: `Emergency SOS updates for Karnataka will be dispatched to ${alertEmail}.`
    });
  };

  return (
    <>
      {/* ========================================== */}
      {/* SECTION 5.9: OUR IMPACT (#impact)          */}
      {/* ========================================== */}
      <section
        id="impact"
        data-bg="bloodstream"
        className="py-24 px-4 sm:px-6 relative z-10 max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#FF6B6B] font-bold">
            Measurable Societal Outcome
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 font-sora">
            The Living Impact
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-3 text-base">
            Every drop recorded in BloodLink travels through an accountable Karnataka healthcare ecosystem.
          </p>
        </div>

        {/* Four Count-up Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="glass-card-elevated p-6 rounded-3xl border-white/10 text-center">
            <Users className="w-6 h-6 text-[#E5243B] mx-auto mb-2" />
            <span className="text-3xl sm:text-4xl font-extrabold text-white font-sora block">12,480</span>
            <span className="text-xs uppercase tracking-wider text-white/50 mt-1 block">Registered Donors</span>
          </div>

          <div className="glass-card-elevated p-6 rounded-3xl border-white/10 text-center">
            <Heart className="w-6 h-6 text-[#FF6B6B] mx-auto mb-2 fill-current" />
            <span className="text-3xl sm:text-4xl font-extrabold text-[#FF6B6B] font-sora block">37,440</span>
            <span className="text-xs uppercase tracking-wider text-white/50 mt-1 block">Lives Supported</span>
          </div>

          <div className="glass-card-elevated p-6 rounded-3xl border-white/10 text-center">
            <Activity className="w-6 h-6 text-[#0E9F8E] mx-auto mb-2" />
            <span className="text-3xl sm:text-4xl font-extrabold text-[#0E9F8E] font-sora block">8,912</span>
            <span className="text-xs uppercase tracking-wider text-white/50 mt-1 block">Requests Fulfilled</span>
          </div>

          <div className="glass-card-elevated p-6 rounded-3xl border-white/10 text-center">
            <Building className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-sora block">126</span>
            <span className="text-xs uppercase tracking-wider text-white/50 mt-1 block">Partner Blood Banks</span>
          </div>
        </div>

        {/* "1 DONATION = UP TO 3 LIVES" VISUALIZATION */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border-white/10 mb-16 text-center max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#FF6B6B] font-bold">
            The Multiplier Effect
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-sora mt-1 mb-8">
            1 Whole Blood Donation = Up to 3 Saved Lives
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {/* 1 Droplet */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#5A0A18] to-[#E5243B] flex items-center justify-center text-white shadow-xl shadow-red-950/80 animate-pulse">
                <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-white mt-3 font-sora">1 Unit Whole Blood</span>
              <span className="text-xs text-white/50">(Packed Red Cells, Platelets, Plasma)</span>
            </div>

            {/* Arrow */}
            <div className="text-3xl font-extrabold text-[#E5243B] rotate-90 md:rotate-0">
              ➔
            </div>

            {/* 3 Person Icons */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-[#0E9F8E]/20 text-[#0E9F8E] flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-white mt-2">Trauma Care</span>
                <span className="text-[10px] text-white/50">Red Cells</span>
              </div>

              <div className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-white mt-2">Cancer Support</span>
                <span className="text-[10px] text-white/50">Platelets</span>
              </div>

              <div className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-[#FF6B6B]/20 text-[#FF6B6B] flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-white mt-2">Burn Recovery</span>
                <span className="text-[10px] text-white/50">Plasma</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid: Monthly Growth & Blood Group Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Monthly Trend */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-white/40 font-bold block">
                Annual Trajectory
              </span>
              <h4 className="text-lg font-bold text-white font-sora mt-1 mb-4">
                Monthly Donations Rising (Jan - Dec)
              </h4>
            </div>

            {/* Stylized CSS Area Chart */}
            <div className="h-48 flex items-end justify-between gap-1.5 pt-6 pb-2 border-b border-white/10">
              {MONTHLY_DONATIONS_DATA.map((item) => {
                const heightPercent = Math.round((item.donations / 1400) * 100);
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-1.5 group">
                    <div className="relative w-full flex items-end justify-center">
                      <div
                        className="w-full bg-gradient-to-t from-[#5A0A18] to-[#E5243B] rounded-t-md transition-all duration-300 group-hover:bg-[#FF6B6B]"
                        style={{ height: `${heightPercent}%` }}
                      />
                      {/* Tooltip */}
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow pointer-events-none">
                        {item.donations}
                      </div>
                    </div>
                    <span className="text-[10px] text-white/40 group-hover:text-white transition-colors">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group Fulfillment */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-white/40 font-bold block">
                Fulfillment by Blood Group
              </span>
              <h4 className="text-lg font-bold text-white font-sora mt-1 mb-4">
                Requests vs Fulfilled Units
              </h4>
            </div>

            <div className="space-y-2.5">
              {BLOOD_GROUP_FULFILLMENT.map((item) => {
                const pct = Math.round((item.fulfilled / item.requests) * 100);
                return (
                  <div key={item.group} className="text-xs">
                    <div className="flex justify-between text-white/80 mb-1">
                      <span className="font-extrabold text-white">{item.group}</span>
                      <span className="text-white/50">{item.fulfilled} / {item.requests} units ({pct}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#C8102E] to-[#0E9F8E]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Community Pulse: 12 Districts */}
        <div className="glass-card p-8 rounded-3xl border-white/10 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#0E9F8E] font-bold">
                Statewide Presence
              </span>
              <h4 className="text-xl font-bold text-white font-sora mt-0.5">
                Karnataka District Community Pulse
              </h4>
            </div>
            <span className="text-xs text-white/50">12 High-Activity Emergency Clusters</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {DISTRICT_INTENSITY.map((d) => (
              <div
                key={d.name}
                className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between"
              >
                <span className="text-xs font-bold text-white truncate">{d.name}</span>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#FF6B6B]">{d.donations}u</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase ${
                      d.level === 'High'
                        ? 'bg-[#E5243B]/20 text-[#FF6B6B]'
                        : d.level === 'Moderate'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {d.level}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 2 Short Story Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-white/70 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                Illustrative Story • Trauma Response
              </span>
              <p className="leading-relaxed">
                "When a sudden collision on the Hubballi bypass required 3 units of rare B- negative blood, BloodLink matched donor Manjunath P. within 11 minutes."
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-white/70 space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#0E9F8E] block tracking-wider">
                Illustrative Story • Pediatric Care
              </span>
              <p className="leading-relaxed">
                "For 12-year-old Ananya with Thalassemia in Mysuru, regular scheduled voluntary donations keep blood bank reserves safely stocked every month."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 5.10: TAKE ACTION (#take-action)   */}
      {/* ========================================== */}
      <section
        id="take-action"
        data-bg="bloodstream"
        className="py-24 px-4 sm:px-6 relative z-10 max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#E5243B] font-bold">
            Stand in the Lifeline
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 font-sora">
            Take Action Today
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-3 text-base">
            Whether donating, spreading awareness, or receiving emergency alerts, every single engagement saves lives.
          </p>
        </div>

        {/* Three Large Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Action 1: Register as Donor */}
          <div className="glass-card-elevated p-8 rounded-3xl border-white/10 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#C8102E] text-white flex items-center justify-center mb-4 shadow-lg shadow-red-950/80 group-hover:scale-105 transition-transform">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-xl font-bold text-white font-sora mb-2">Register as Voluntary Donor</h3>
              <p className="text-xs text-white/60 leading-relaxed mb-6">
                Take the 2-minute pledge. Join Karnataka's active voluntary donor registry and be ready when emergency calls.
              </p>
            </div>
            <a
              href="#become-donor"
              onClick={() => pulseBackground()}
              className="w-full btn-primary text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>Join Registry</span>
            </a>
          </div>

          {/* Action 2: Donate Today */}
          <div className="glass-card-elevated p-8 rounded-3xl border-white/10 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0E9F8E] text-white flex items-center justify-center mb-4 shadow-lg shadow-teal-950/80 group-hover:scale-105 transition-transform">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-sora mb-2">Walk In & Donate Today</h3>
              <p className="text-xs text-white/60 leading-relaxed mb-6">
                Find licensed blood banks near your district with low inventory. Direct walk-ins are welcomed 24 hours a day.
              </p>
            </div>
            <a
              href="#blood-banks"
              onClick={() => pulseBackground()}
              className="w-full btn-glass text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>Explore Blood Banks</span>
            </a>
          </div>

          {/* Action 3: Spread Awareness & Generate Graphic */}
          <div className="glass-card-elevated p-8 rounded-3xl border-white/10 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-lg shadow-amber-950/80 group-hover:scale-105 transition-transform">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-sora mb-2">Spread the Word</h3>
              <p className="text-xs text-white/60 leading-relaxed mb-6">
                Generate an official branded social media share badge with your blood group to inspire family and friends.
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('share-generator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Create Share Graphic</span>
            </button>
          </div>
        </div>

        {/* SHARE-CARD GENERATOR & MOCK GET URGENT ALERTS */}
        <div id="share-generator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Share Graphic Preview (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div
              ref={shareGraphicRef}
              className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-br from-[#26080e] via-[#120709] to-[#1a070a] border-2 border-[#E5243B] text-center shadow-2xl relative overflow-hidden"
            >
              {/* Droplet Background */}
              <div className="w-14 h-14 rounded-2xl bg-[#C8102E] flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-red-950/80">
                <Heart className="w-8 h-8 fill-current" />
              </div>

              <span className="text-[11px] uppercase tracking-[0.25em] text-[#FF6B6B] font-extrabold block mb-1">
                Official BloodLink Advocate
              </span>

              <h4 className="text-2xl font-black text-white font-sora mb-3">
                "I'm a BloodLink Donor, <span className="text-[#E5243B]">{shareBloodGroup}</span>. Are You?"
              </h4>

              <p className="text-xs text-white/70 max-w-xs mx-auto mb-6">
                Pledged to preserve human lifelines across Karnataka. Join me on the real-time emergency network.
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                <span className="font-bold text-white font-sora">{shareName}</span>
                <span className="text-[10px] text-[#0E9F8E] font-bold">Verified Karnataka Citizen</span>
              </div>
            </div>

            {/* Controls */}
            <div className="w-full max-w-md mt-4 flex items-center gap-3">
              <input
                type="text"
                value={shareName}
                onChange={(e) => setShareName(e.target.value)}
                placeholder="Your Name"
                className="flex-1 bg-[#120709] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:border-red-500"
              />
              <select
                value={shareBloodGroup}
                onChange={(e) => setShareBloodGroup(e.target.value)}
                className="bg-[#120709] border border-white/20 rounded-xl px-3 py-2 text-xs text-white font-bold font-sora focus:border-red-500"
              >
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <button
                onClick={handleDownloadShareGraphic}
                className="btn-primary text-white p-2.5 rounded-xl"
                title="Download PNG Graphic"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mock "Get Urgent Alerts" Email Form (lg:col-span-6) */}
          <div className="lg:col-span-6 glass-card p-8 rounded-3xl border-white/10">
            <span className="text-xs uppercase tracking-widest text-[#0E9F8E] font-bold block mb-1">
              Stay Connected
            </span>
            <h3 className="text-2xl font-bold text-white font-sora mb-2">
              Receive Urgent SOS Alerts
            </h3>
            <p className="text-xs text-white/60 leading-relaxed mb-6">
              Subscribe to critical blood bank shortages and high-urgency pediatric/trauma notifications for your district.
            </p>

            {emailSubscribed ? (
              <div className="p-4 rounded-2xl bg-[#0E9F8E]/20 border border-[#0E9F8E]/40 text-[#0E9F8E] text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Alert subscription confirmed for {alertEmail}! You will receive real-time notifications.</span>
              </div>
            ) : (
              <form onSubmit={handleEmailSubscribe} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    className="flex-1 bg-[#120709] border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:border-red-500"
                    required
                  />
                  <button
                    type="submit"
                    className="btn-primary text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-lg"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Subscribe</span>
                  </button>
                </div>
                <span className="text-[10px] text-white/40 block">
                  Zero spam. Strictly validated healthcare emergency requests only.
                </span>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
