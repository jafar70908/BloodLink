import React, { useState, useEffect } from 'react';
import { useBloodlink } from '../../context/BloodlinkContext';
import { Search, Heart, ChevronDown, Activity, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, Building2, HelpCircle } from 'lucide-react';
import { BLOOD_GROUPS, CITIES } from '../../data/mockData';
import { BloodGroup } from '../../types';

export const HeroSection: React.FC = () => {
  const {
    selectedBloodGroup,
    setSelectedBloodGroup,
    selectedCity,
    setSelectedCity,
    openSosModal,
  } = useBloodlink();

  const [activeTickerIndex, setActiveTickerIndex] = useState(0);

  const tickerMessages = [
    '● 3 new urgent requests posted in the last hour across Karnataka hospitals',
    '● Lifeline Central Blood Bank verified 4 units of O- ready for trauma care',
    '● Voluntary donor Ananya R. pledged for emergency surgery in Bengaluru',
    '● 8 blood banks updated live inventories in the last 15 minutes'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTickerIndex((prev) => (prev + 1) % tickerMessages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const el = document.getElementById('find-donor');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      data-bg="bloodstream"
      className="min-h-screen relative flex flex-col items-center justify-center pt-28 pb-20 px-4 sm:px-6 text-center z-10"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Verified Status Pill */}
        <div className="mb-6 inline-flex items-center gap-2.5 glass-pill px-4 py-2 rounded-full border-teal-500/30 bg-[#120709]/80 backdrop-blur-md">
          <span className="flex h-2.5 w-2.5 rounded-full bg-[#0E9F8E] animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.22em] font-extrabold text-[#0E9F8E]">
            Karnataka Official Voluntary Registry • 126 Authorised Blood Banks
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] mb-6 font-sora">
          When every minute matters,{' '}
          <span className="bg-gradient-to-r from-[#C8102E] via-[#E5243B] to-[#FF6B6B] bg-clip-text text-transparent">
            find a lifeline.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-xl text-[rgba(255,249,247,0.85)] max-w-2xl mb-10 leading-relaxed font-normal">
          BloodLink connects verified voluntary donors, hospitals, and authorised blood banks in real time, so life-saving help reaches patients faster.
        </p>

        {/* ========================================================= */}
        {/* DUAL-PATH ROLE CARDS: "What are you looking to do?"       */}
        {/* Gives first-time visitors instant clarity in 3 seconds    */}
        {/* ========================================================= */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 text-left">
          {/* Card 1: For Patients & Families in Need */}
          <div className="p-6 rounded-3xl bg-[#180a0d]/90 border border-red-500/30 hover:border-red-500/60 shadow-xl backdrop-blur-xl transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full bg-red-950/60 text-[#FF6B6B] border border-red-500/40">
                  I Need Blood
                </span>
                <span className="text-xs text-white/50">Emergency & Planned</span>
              </div>
              <h3 className="text-xl font-bold text-white font-sora mb-2 group-hover:text-[#FF6B6B] transition-colors">
                Find Donors & Blood Banks
              </h3>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Search 12,000+ voluntary donors, check live hospital blood stocks, or post a high-urgency SOS request to all matching donors nearby.
              </p>
            </div>

            <div className="flex items-center gap-2.5 pt-4 border-t border-white/10">
              <button
                onClick={() => scrollToSection('find-donor')}
                className="flex-1 btn-primary text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Donors</span>
              </button>
              <button
                onClick={openSosModal}
                className="btn-glass text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border-red-500/40 hover:bg-red-950/40"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-[#E5243B]" />
                <span>Post SOS</span>
              </button>
            </div>
          </div>

          {/* Card 2: For Lifesaver Donors */}
          <div className="p-6 rounded-3xl bg-[#14080b]/90 border border-teal-500/30 hover:border-teal-500/60 shadow-xl backdrop-blur-xl transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full bg-teal-950/60 text-[#0E9F8E] border border-teal-500/40">
                  I Want to Donate
                </span>
                <span className="text-xs text-white/50">Voluntary Lifesavers</span>
              </div>
              <h3 className="text-xl font-bold text-white font-sora mb-2 group-hover:text-[#0E9F8E] transition-colors">
                Join the Karnataka Lifeline
              </h3>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Take a 30-second eligibility quiz, register in 2 minutes to receive a digital donor card, or pledge directly to critical surgical cases right now.
              </p>
            </div>

            <div className="flex items-center gap-2.5 pt-4 border-t border-white/10">
              <button
                onClick={() => scrollToSection('become-donor')}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#0E9F8E] hover:bg-[#0c8577] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Register as Donor</span>
              </button>
              <button
                onClick={() => scrollToSection('urgent')}
                className="btn-glass text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5 text-[#FF6B6B]" />
                <span>View Urgent (8)</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* QUICK FEATURE NAVIGATOR PILLS                             */}
        {/* Direct access to all core platform features               */}
        {/* ========================================================= */}
        <div className="w-full max-w-4xl glass-pill p-2 rounded-2xl mb-12 flex flex-wrap items-center justify-center gap-2 border-white/10 bg-[#120709]/80 backdrop-blur-xl">
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-white/40 px-2">Quick Jump:</span>
          <button
            onClick={() => scrollToSection('find-donor')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-white/90 flex items-center gap-1.5 transition-colors"
          >
            <Search className="w-3 h-3 text-[#FF6B6B]" />
            <span>Find Donors</span>
          </button>
          <button
            onClick={() => scrollToSection('urgent')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-white/90 flex items-center gap-1.5 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5243B] animate-ping" />
            <span>Urgent Hospital Requests (8)</span>
          </button>
          <button
            onClick={() => scrollToSection('blood-banks')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-white/90 flex items-center gap-1.5 transition-colors"
          >
            <Building2 className="w-3 h-3 text-amber-400" />
            <span>12 Blood Banks & Stock</span>
          </button>
          <button
            onClick={() => scrollToSection('learn')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-white/90 flex items-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-3 h-3 text-[#0E9F8E]" />
            <span>Am I Eligible? Quiz</span>
          </button>
          <button
            onClick={() => scrollToSection('impact')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-white/90 flex items-center gap-1.5 transition-colors"
          >
            <Activity className="w-3 h-3 text-blue-400" />
            <span>Karnataka Impact</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* QUICK FINDER GLASS CARD                                   */}
        {/* ========================================================= */}
        <div className="w-full max-w-3xl p-6 sm:p-8 rounded-3xl mb-14 text-left bg-[#16090c]/90 border border-white/15 shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#FF6B6B] font-extrabold block">
                Instant Donor Search
              </span>
              <h4 className="text-base font-bold text-white font-sora mt-0.5">
                Search Matching Voluntary Donors in Your District
              </h4>
            </div>
            <span className="text-[11px] text-[#0E9F8E] font-medium flex items-center gap-1 bg-[#0E9F8E]/15 px-2.5 py-1 rounded-full border border-[#0E9F8E]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E9F8E] animate-ping" />
              Live Network
            </span>
          </div>

          <form onSubmit={handleQuickSearch} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-white/80 font-semibold">1. Select Blood Group Needed:</label>
                <span className="text-[11px] text-white/40">Select one to filter</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {BLOOD_GROUPS.map((bg) => (
                  <button
                    type="button"
                    key={bg}
                    onClick={() => setSelectedBloodGroup(selectedBloodGroup === bg ? 'ALL' : bg)}
                    className={`py-2.5 px-1 text-center rounded-xl text-xs sm:text-sm font-black font-sora transition-all duration-200 ${
                      selectedBloodGroup === bg
                        ? 'bg-[#C8102E] text-white border-2 border-[#E5243B] shadow-lg shadow-red-900/60 scale-105'
                        : 'bg-white/5 border border-white/10 text-white/80 hover:border-red-500/40 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <div className="w-full sm:flex-1">
                <label className="block text-xs text-white/80 mb-1.5 font-semibold">2. Choose Location in Karnataka:</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-[#120709] border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors font-medium"
                >
                  <option value="All Cities">All Karnataka Districts (40 Donors)</option>
                  {CITIES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full sm:w-auto pt-4 sm:pt-6">
                <button
                  type="submit"
                  className="w-full sm:w-auto btn-primary px-8 py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 text-sm shadow-xl"
                >
                  <Search className="w-4 h-4" />
                  <span>Show Matching Donors</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Live Metrics Row */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mb-12">
          <div className="p-5 rounded-2xl bg-[#14080b]/80 border border-white/10 backdrop-blur-md flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#FFF9F7] font-sora">12,480</span>
            <span className="text-xs uppercase tracking-widest text-[#FFD9DE]/70 mt-1 font-semibold">
              Verified Donors
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#14080b]/80 border border-white/10 backdrop-blur-md flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#0E9F8E] font-sora">126</span>
            <span className="text-xs uppercase tracking-widest text-[#FFD9DE]/70 mt-1 font-semibold">
              Licensed Blood Banks
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#14080b]/80 border border-white/10 backdrop-blur-md flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#FF6B6B] font-sora">8,912</span>
            <span className="text-xs uppercase tracking-widest text-[#FFD9DE]/70 mt-1 font-semibold">
              Requests Fulfilled
            </span>
          </div>
        </div>

        {/* Live Ticker Line & Subtle Scroll Cue */}
        <div className="w-full flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 text-xs text-white/80 bg-black/60 px-5 py-2.5 rounded-full border border-white/10 shadow-lg backdrop-blur-md transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-[#E5243B] animate-pulse" />
            <span className="font-medium text-white/90">{tickerMessages[activeTickerIndex]}</span>
          </div>

          <button
            onClick={() => scrollToSection('find-donor')}
            className="text-white/40 hover:text-white transition-colors pt-2 flex flex-col items-center gap-1 group"
            aria-label="Scroll down to explore features"
          >
            <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to Explore Features</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
