import React, { useState } from 'react';
import { MYTHS_AND_FACTS } from '../../data/mockData';
import { CheckCircle2, HelpCircle, Activity, Coffee, FileCheck, Stethoscope, HeartPulse, RefreshCw } from 'lucide-react';

export const AwarenessSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'eligibility' | 'procedure' | 'myths'>('eligibility');

  // Mini Quiz state
  const [quizAge, setQuizAge] = useState(24);
  const [quizWeight, setQuizWeight] = useState(60);
  const [quizDonatedRecently, setQuizDonatedRecently] = useState(false);
  const [quizFever, setQuizFever] = useState(false);

  // Flip cards state
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (id: number) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isEligibleByQuiz = quizAge >= 18 && quizAge <= 65 && quizWeight >= 50 && !quizDonatedRecently && !quizFever;

  return (
    <section
      id="learn"
      data-bg="minimal"
      className="py-24 px-4 sm:px-6 relative z-10 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.2em] text-[#FF6B6B] font-bold">
          Knowledge & Guidelines
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 font-sora">
          Donation Awareness
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto mt-3 text-base">
          Understand the science, criteria, and simple 4-step journey of blood donation.
        </p>
      </div>

      {/* Glass Tabs */}
      <div className="flex justify-center mb-12">
        <div className="glass-pill p-1.5 rounded-2xl flex items-center space-x-2 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('eligibility')}
            className={`px-5 py-2.5 rounded-xl transition-all ${
              activeTab === 'eligibility'
                ? 'bg-[#C8102E] text-white shadow-lg shadow-red-950/70'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Eligibility & Checker
          </button>
          <button
            onClick={() => setActiveTab('procedure')}
            className={`px-5 py-2.5 rounded-xl transition-all ${
              activeTab === 'procedure'
                ? 'bg-[#C8102E] text-white shadow-lg shadow-red-950/70'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Donation Journey (4 Steps)
          </button>
          <button
            onClick={() => setActiveTab('myths')}
            className={`px-5 py-2.5 rounded-xl transition-all ${
              activeTab === 'myths'
                ? 'bg-[#C8102E] text-white shadow-lg shadow-red-950/70'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Myths vs Facts (3D Flip)
          </button>
        </div>
      </div>

      {/* TAB 1: ELIGIBILITY & INSTANT QUIZ */}
      {activeTab === 'eligibility' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Checklist Cards (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl font-bold text-white font-sora mb-4">
              Core Eligibility Checklist
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card p-5 rounded-2xl border-white/10">
                <span className="text-2xl font-black text-[#E5243B] font-sora block">18 - 65 yrs</span>
                <h4 className="font-bold text-white text-sm mt-1">Age Window</h4>
                <p className="text-xs text-white/60 mt-1">
                  Healthy adults between 18 and 65 years are qualified for voluntary whole-blood donation.
                </p>
              </div>

              <div className="glass-card p-5 rounded-2xl border-white/10">
                <span className="text-2xl font-black text-[#0E9F8E] font-sora block">≥ 50 kg</span>
                <h4 className="font-bold text-white text-sm mt-1">Minimum Weight</h4>
                <p className="text-xs text-white/60 mt-1">
                  Ensures safe collection of one 350ml or 450ml unit without impacting circulatory reserve.
                </p>
              </div>

              <div className="glass-card p-5 rounded-2xl border-white/10">
                <span className="text-2xl font-black text-amber-400 font-sora block">≥ 12.5 g/dL</span>
                <h4 className="font-bold text-white text-sm mt-1">Hemoglobin Level</h4>
                <p className="text-xs text-white/60 mt-1">
                  A painless rapid copper sulfate or prick test is performed on-site before every donation.
                </p>
              </div>

              <div className="glass-card p-5 rounded-2xl border-white/10">
                <span className="text-2xl font-black text-[#FF6B6B] font-sora block">90 / 120 Days</span>
                <h4 className="font-bold text-white text-sm mt-1">Donation Gap</h4>
                <p className="text-xs text-white/60 mt-1">
                  Minimum interval of 90 days for men and 120 days for women between successive donations.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive "Am I Eligible?" Mini-Quiz (lg:col-span-5) */}
          <div className="lg:col-span-5 glass-card-elevated p-6 sm:p-7 rounded-3xl border-white/15">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-[#E5243B]" />
              <h4 className="font-bold text-white text-base font-sora">
                Am I Eligible Right Now?
              </h4>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-white/70 block mb-1">Your Age: {quizAge} years</label>
                <input
                  type="range"
                  min="16"
                  max="70"
                  value={quizAge}
                  onChange={(e) => setQuizAge(Number(e.target.value))}
                  className="w-full accent-[#E5243B]"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">Your Weight: {quizWeight} kg</label>
                <input
                  type="range"
                  min="40"
                  max="120"
                  value={quizWeight}
                  onChange={(e) => setQuizWeight(Number(e.target.value))}
                  className="w-full accent-[#E5243B]"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <span className="text-white/80">Donated blood in last 3 months?</span>
                <button
                  onClick={() => setQuizDonatedRecently(!quizDonatedRecently)}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${
                    quizDonatedRecently ? 'bg-[#C8102E] text-white' : 'bg-white/10 text-white/60'
                  }`}
                >
                  {quizDonatedRecently ? 'Yes' : 'No'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <span className="text-white/80">Any fever / illness today?</span>
                <button
                  onClick={() => setQuizFever(!quizFever)}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${
                    quizFever ? 'bg-[#C8102E] text-white' : 'bg-white/10 text-white/60'
                  }`}
                >
                  {quizFever ? 'Yes' : 'No'}
                </button>
              </div>

              {/* Instant Result Box */}
              <div
                className={`p-4 rounded-2xl border text-center transition-all ${
                  isEligibleByQuiz
                    ? 'bg-[#0E9F8E]/20 border-[#0E9F8E]/40 text-[#0E9F8E]'
                    : 'bg-[#5A0A18]/40 border-red-500/40 text-red-200'
                }`}
              >
                <span className="text-sm font-extrabold font-sora block">
                  {isEligibleByQuiz ? '✓ You Are Clinically Eligible to Donate!' : '⚠️ Waiting Period Applies'}
                </span>
                <span className="text-[11px] text-white/70 mt-1 block">
                  {isEligibleByQuiz
                    ? 'Visit your nearest blood bank or register as an on-call voluntary donor today.'
                    : 'Wait until your resting gap concludes or recover fully before donating.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANIMATED 4-STEP VERTICAL TIMELINE */}
      {activeTab === 'procedure' && (
        <div className="max-w-3xl mx-auto glass-card p-8 sm:p-12 rounded-3xl border-white/10">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white font-sora">The 4-Step Donation Journey</h3>
            <p className="text-xs text-white/60 mt-1">Whole blood donation takes under 45 minutes in total.</p>
          </div>

          <div className="relative border-l-2 border-[#E5243B]/40 ml-4 sm:ml-8 space-y-10 pl-6 sm:pl-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-[#C8102E] border-2 border-[#120709] flex items-center justify-center text-white text-xs font-bold font-sora shadow-lg">
                1
              </div>
              <div className="flex items-center gap-2 text-white font-bold text-base font-sora">
                <FileCheck className="w-5 h-5 text-[#FF6B6B]" />
                <span>Registration & Health History (10 mins)</span>
              </div>
              <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
                Simple form to register your identity, medical history, and contact details with the authorized Karnataka blood center.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-[#5A0A18] border-2 border-[#E5243B] flex items-center justify-center text-white text-xs font-bold font-sora shadow-lg">
                2
              </div>
              <div className="flex items-center gap-2 text-white font-bold text-base font-sora">
                <Stethoscope className="w-5 h-5 text-[#0E9F8E]" />
                <span>Mini Health Screening (5 mins)</span>
              </div>
              <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
                A licensed medical officer checks your blood pressure, pulse, temperature, and a quick finger-prick hemoglobin test.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-[#E5243B] border-2 border-[#120709] flex items-center justify-center text-white text-xs font-bold font-sora shadow-lg animate-pulse">
                3
              </div>
              <div className="flex items-center gap-2 text-white font-bold text-base font-sora">
                <HeartPulse className="w-5 h-5 text-[#FF6B6B]" />
                <span>The Blood Donation (8 - 10 mins)</span>
              </div>
              <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
                You relax comfortably in a sanitized reclining donor chair while one standard sterile unit (350ml or 450ml) is collected.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-[#0E9F8E] border-2 border-[#120709] flex items-center justify-center text-white text-xs font-bold font-sora shadow-lg">
                4
              </div>
              <div className="flex items-center gap-2 text-white font-bold text-base font-sora">
                <Coffee className="w-5 h-5 text-amber-400" />
                <span>Refreshments & Rest (10 - 15 mins)</span>
              </div>
              <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
                Enjoy juice and light refreshments to replenish fluids, receive your donor certificate, and head out feeling proud.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 6 3D FLIP CARDS (MYTHS VS FACTS) */}
      {activeTab === 'myths' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MYTHS_AND_FACTS.map((item) => {
              const isFlipped = !!flippedCards[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCard(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleCard(item.id);
                    }
                  }}
                  tabIndex={0}
                  className="h-56 cursor-pointer perspective-1000 group focus:outline-none focus:ring-2 focus:ring-[#E5243B] rounded-3xl"
                  aria-label={`Myth: ${item.myth}. Press Enter to see the fact.`}
                >
                  <div
                    className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front: Myth */}
                    <div className="absolute inset-0 backface-hidden glass-card p-6 rounded-3xl flex flex-col justify-between border-white/10 group-hover:border-red-500/40">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF6B6B] block">
                          Myth #{item.id}
                        </span>
                        <h4 className="text-lg font-bold text-white font-sora mt-2 leading-snug">
                          "{item.myth}"
                        </h4>
                      </div>
                      <div className="flex items-center justify-between text-xs text-white/40 pt-4 border-t border-white/5">
                        <span>Click or press Enter to flip</span>
                        <RefreshCw className="w-3.5 h-3.5 text-[#FF6B6B]" />
                      </div>
                    </div>

                    {/* Back: Fact */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 p-6 rounded-3xl flex flex-col justify-between bg-gradient-to-br from-[#1c080d] to-[#0E9F8E]/20 border border-[#0E9F8E]/40 shadow-xl">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#0E9F8E] block">
                          Medical Fact
                        </span>
                        <p className="text-sm font-medium text-white/95 mt-2 leading-relaxed">
                          {item.fact}
                        </p>
                      </div>
                      <div className="text-xs text-[#0E9F8E] font-semibold flex items-center justify-between pt-4 border-t border-white/10">
                        <span>Verified Fact</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-white/40 italic">
            * General information only. Final donor eligibility is decided by qualified medical staff at the certified blood donation center.
          </p>
        </div>
      )}
    </section>
  );
};
