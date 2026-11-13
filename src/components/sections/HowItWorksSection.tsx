import React from 'react';
import { Search, HeartPulse, ShieldCheck, ArrowRight, Activity, Building2, HelpCircle, UserCheck } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      id: 'find-donor',
      icon: Search,
      color: 'text-[#FF6B6B]',
      bg: 'bg-[#C8102E]/20',
      title: 'Find a Donor',
      desc: 'Browse 40+ verified Karnataka voluntary donors with privacy protection and distance filtering.'
    },
    {
      id: 'urgent',
      icon: HeartPulse,
      color: 'text-[#E5243B]',
      bg: 'bg-red-950/60',
      title: 'Urgent SOS Feed',
      desc: 'Live countdown hospital requests. Pledge units with one click and see immediate updates.'
    },
    {
      id: 'blood-banks',
      icon: Building2,
      color: 'text-amber-400',
      bg: 'bg-amber-950/60',
      title: '12 Blood Banks & Stock',
      desc: 'Inspect live A+ to O- stock bars at licensed government and hospital blood centers.'
    },
    {
      id: 'become-donor',
      icon: UserCheck,
      color: 'text-[#0E9F8E]',
      bg: 'bg-teal-950/60',
      title: 'Become a Donor',
      desc: '3-step qualification wizard. Generate and download your official Digital Donor ID Card.'
    },
    {
      id: 'learn',
      icon: HelpCircle,
      color: 'text-blue-400',
      bg: 'bg-blue-950/60',
      title: 'Eligibility & Myths',
      desc: '30-second eligibility quiz, 4-step donation timeline, and 3D interactive myth-buster cards.'
    },
    {
      id: 'impact',
      icon: Activity,
      color: 'text-purple-400',
      bg: 'bg-purple-950/60',
      title: 'Karnataka Impact',
      desc: 'Statewide community pulse, monthly donation trends, and social awareness badge generator.'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 relative z-10 max-w-7xl mx-auto border-t border-b border-white/5 bg-[#120709]/60 backdrop-blur-md rounded-3xl my-8">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-[#0E9F8E] font-extrabold">
          Platform Overview
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1.5 font-sora">
          How BloodLink Works
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto mt-2 text-sm sm:text-base">
          A transparent, 3-step emergency matching ecosystem engineered for zero delay and maximum trust.
        </p>
      </div>

      {/* 3 Step Workflow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Step 1 */}
        <div className="p-6 rounded-3xl bg-[#180a0e]/90 border border-white/10 hover:border-red-500/30 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#C8102E] text-white flex items-center justify-center font-black text-sm font-sora mb-4 shadow-lg shadow-red-950/70">
              1
            </div>
            <h3 className="text-lg font-bold text-white font-sora mb-2">Search or Post</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Patients or families search 12,000+ registered donors by district, review live blood bank stock, or post an urgent emergency SOS request with hospital verification.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-white/5 text-[11px] text-[#FF6B6B] font-semibold flex items-center gap-1">
            <span>Instant filtering & verified stocks</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-6 rounded-3xl bg-[#180a0e]/90 border border-white/10 hover:border-red-500/30 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#E5243B] text-white flex items-center justify-center font-black text-sm font-sora mb-4 shadow-lg shadow-red-950/70 animate-pulse">
              2
            </div>
            <h3 className="text-lg font-bold text-white font-sora mb-2">Cardiac Pulse Alert</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              BloodLink immediately alerts matching verified donors in the patient's area. Voluntary donors receive the notification and pledge units directly.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-white/5 text-[11px] text-[#0E9F8E] font-semibold flex items-center gap-1">
            <span>Direct coordination, zero middlemen</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-6 rounded-3xl bg-[#180a0e]/90 border border-white/10 hover:border-red-500/30 transition-all flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#0E9F8E] text-white flex items-center justify-center font-black text-sm font-sora mb-4 shadow-lg shadow-teal-950/70">
              3
            </div>
            <h3 className="text-lg font-bold text-white font-sora mb-2">Rapid Transfusion</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Donors walk in to the authorized blood center or hospital. Every unit is tested, recorded, and delivered to the patient within an average of &lt; 8 minutes.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-white/5 text-[11px] text-amber-400 font-semibold flex items-center gap-1">
            <span>Transparent tracking & saved lives</span>
          </div>
        </div>
      </div>

      {/* Feature Navigation Grid: Clickable cards jumping to each section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white font-sora">
            Explore All Platform Features
          </h3>
          <span className="text-xs text-white/50">Click any card to jump directly</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <button
                key={feat.id}
                onClick={() => scrollTo(feat.id)}
                className="text-left p-5 rounded-2xl bg-[#14080b]/90 border border-white/10 hover:border-white/30 hover:bg-[#1a0a0e] transition-all duration-200 group flex items-start gap-4"
              >
                <div className={`w-11 h-11 rounded-xl ${feat.bg} ${feat.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white font-sora group-hover:text-[#FF6B6B] transition-colors">
                      {feat.title}
                    </h4>
                    <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
