import React, { useState, useRef } from 'react';
import { useBloodlink } from '../../context/BloodlinkContext';
import { BloodGroup } from '../../types';
import { BLOOD_GROUPS, CITIES } from '../../data/mockData';
import { getNextEligibleDate } from '../../utils';
import { Heart, ShieldCheck, Award, FileText, CheckCircle2, AlertCircle, Download, Share2, Sparkles, UserCheck } from 'lucide-react';
import { toPng } from 'html-to-image';

export const BecomeDonorWizard: React.FC = () => {
  const { registerDonor, showToast } = useBloodlink();
  const donorCardRef = useRef<HTMLDivElement | null>(null);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Basics
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O+');
  const [city, setCity] = useState(CITIES[0].name);
  const [phone, setPhone] = useState('');

  // Step 2: Health Checks
  const [weightConfirm, setWeightConfirm] = useState(true);
  const [noFever, setNoFever] = useState(true);
  const [noTattoo, setNoTattoo] = useState(true);
  const [noSurgery, setNoSurgery] = useState(true);
  const [notPregnant, setNotPregnant] = useState(true);
  const [noRecentDonation, setNoRecentDonation] = useState(true);

  // Step 3: Availability & Consent
  const [preferredDays, setPreferredDays] = useState<'Anytime' | 'Weekends' | 'Emergency Only'>('Anytime');
  const [notifyUrgent, setNotifyUrgent] = useState(true);
  const [consentAgreed, setConsentAgreed] = useState(false);

  // Completed registered donor card data
  const [registeredCard, setRegisteredCard] = useState<{
    id: string;
    name: string;
    bloodGroup: BloodGroup;
    city: string;
  } | null>(null);

  // Evaluate Health Eligibility
  const isHealthEligible = weightConfirm && noFever && noTattoo && noSurgery && notPregnant && noRecentDonation;

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || age < 18 || age > 65 || phone.length < 10) {
      showToast({
        type: 'urgent',
        title: 'Check Information',
        message: 'Please provide full name, valid age (18-65) and 10-digit phone number.'
      });
      return;
    }
    setStep(2);
  };

  const handleStep2Next = () => {
    if (!isHealthEligible) return;
    setStep(3);
  };

  const handleFinalSubmit = () => {
    if (!consentAgreed) {
      showToast({
        type: 'urgent',
        title: 'Consent Required',
        message: 'Please accept the voluntary blood donor terms.'
      });
      return;
    }

    const parts = fullName.trim().split(' ');
    const firstName = parts[0] || 'Anonymous';
    const lastInitial = parts.length > 1 ? `${parts[1][0]}.` : 'K.';

    const newDonor = registerDonor({
      firstName,
      lastInitial,
      age,
      bloodGroup,
      city,
      area: 'Central District',
      lat: 12.9716,
      lng: 77.5946,
      lastDonated: 'Available now',
      available: true,
      donations: 1,
      maskedPhone: `+91 ${phone.slice(0, 2)}*** **${phone.slice(-3)}`,
    });

    setRegisteredCard({
      id: `BL-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      name: fullName,
      bloodGroup,
      city,
    });

    setStep(4);
  };

  const handleDownloadCard = async () => {
    if (!donorCardRef.current) return;
    try {
      const dataUrl = await toPng(donorCardRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `BloodLink-Donor-Card-${bloodGroup}.png`;
      link.href = dataUrl;
      link.click();
      showToast({
        type: 'success',
        title: 'Card Downloaded',
        message: 'Your official BloodLink voluntary donor credential has been saved.'
      });
    } catch (err) {
      showToast({
        type: 'info',
        title: 'Card Export',
        message: 'Take a screenshot of your digital credential.'
      });
    }
  };

  return (
    <section
      id="become-donor"
      data-bg="aurora"
      className="py-24 px-4 sm:px-6 relative z-10 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Inspiring Pitch & Benefits (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#FF6B6B] font-bold">
                Become a Voluntary Lifesaver
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sora leading-tight">
              One Decision. <br />
              <span className="bg-gradient-to-r from-red-500 via-[#E5243B] to-[#FF6B6B] bg-clip-text text-transparent">
                Three Lives Saved.
              </span>
            </h2>
            <p className="text-white/70 mt-4 text-base leading-relaxed">
              Join over 12,000 verified citizens in Karnataka standing ready to answer emergency surgical and trauma requests in their neighborhood.
            </p>
          </div>

          {/* Benefit Rows */}
          <div className="space-y-4">
            <div className="glass-card p-4 rounded-2xl flex items-start gap-3.5 border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#0E9F8E]/20 text-[#0E9F8E] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-sora">Free Health Screening</h4>
                <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                  Regular hemoglobin, viral screening, and blood group verification at licensed blood banks.
                </p>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl flex items-start gap-3.5 border-white/10">
              <div className="w-10 h-10 rounded-xl bg-[#C8102E]/20 text-[#FF6B6B] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-sora">Community Recognition</h4>
                <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                  Badges of honor on your profile celebrating every lifesaving milestone and emergency response.
                </p>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl flex items-start gap-3.5 border-white/10">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-sora">Digital Lifeline Credential</h4>
                <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                  Downloadable official verified donor ID card complete with anti-fraud verification signature.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3-Step Wizard Glass Card (lg:col-span-7) */}
        <div className="lg:col-span-7">
          <div className="glass-card-elevated p-6 sm:p-9 rounded-3xl border-white/15 relative">
            {/* Step Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-bold text-white/60 mb-2">
                <span>{step === 4 ? 'Registration Completed' : `Step ${step} of 3`}</span>
                <span className="text-[#FF6B6B]">
                  {step === 1 && 'Basic Information'}
                  {step === 2 && 'Medical Eligibility'}
                  {step === 3 && 'Availability & Consent'}
                  {step === 4 && 'Digital Donor Card'}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#C8102E] via-[#E5243B] to-[#0E9F8E] transition-all duration-300 rounded-full"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* STEP 1: BASICS */}
            {step === 1 && (
              <form onSubmit={handleStep1Next} className="space-y-4">
                <h3 className="text-xl font-bold text-white font-sora">Personal & Contact Details</h3>

                <div>
                  <label className="block text-xs text-white/60 font-medium mb-1">Full Name:</label>
                  <input
                    type="text"
                    placeholder="e.g. Ananya Rao"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#120709] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white focus:border-red-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-white/60 font-medium mb-1">Age (18-65):</label>
                    <input
                      type="number"
                      min="18"
                      max="65"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full bg-[#120709] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white focus:border-red-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/60 font-medium mb-1">Gender:</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full bg-[#120709] border border-white/20 rounded-xl px-3 py-2.5 text-sm text-white focus:border-red-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Blood Group Pill Selector */}
                <div>
                  <label className="block text-xs text-white/60 font-medium mb-2">Blood Group:</label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {BLOOD_GROUPS.map((bg) => (
                      <button
                        type="button"
                        key={bg}
                        onClick={() => setBloodGroup(bg)}
                        className={`py-2 text-center rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                          bloodGroup === bg
                            ? 'bg-[#C8102E] text-white border-2 border-[#E5243B] shadow-md shadow-red-900/60 scale-105'
                            : 'bg-white/5 border border-white/10 text-white/80 hover:text-white'
                        }`}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-white/60 font-medium mb-1">District / City:</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#120709] border border-white/20 rounded-xl px-3 py-2.5 text-sm text-white focus:border-red-500"
                    >
                      {CITIES.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-white/60 font-medium mb-1">Mobile Number:</label>
                    <input
                      type="tel"
                      placeholder="10 digit number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#120709] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white focus:border-red-500"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="submit" className="btn-primary text-white px-8 py-3 rounded-xl font-bold text-sm">
                    Continue to Medical Check →
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: HEALTH ELIGIBILITY */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white font-sora">Health & Medical Screening</h3>
                <p className="text-xs text-white/60">
                  Karnataka state blood transfusion regulations require preliminary health safety compliance.
                </p>

                <div className="space-y-2.5">
                  {[
                    { label: 'Weight is at least 50 kg', state: weightConfirm, setter: setWeightConfirm },
                    { label: 'No current fever, cough, or active infection', state: noFever, setter: setNoFever },
                    { label: 'No tattoo or piercing done in the last 6 months', state: noTattoo, setter: setNoTattoo },
                    { label: 'No major surgery undergone in the past 6 months', state: noSurgery, setter: setNoSurgery },
                    { label: 'Not currently pregnant or breastfeeding', state: notPregnant, setter: setNotPregnant },
                    { label: 'No blood donation in the last 90 days', state: noRecentDonation, setter: setNoRecentDonation },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => item.setter(!item.state)}
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:border-red-500/30 transition-colors"
                    >
                      <span className="text-xs text-white/90 font-medium">{item.label}</span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                          item.state ? 'bg-[#0E9F8E] text-white' : 'bg-white/20 text-transparent'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Disqualification / Next Eligible Date Message */}
                {!isHealthEligible && (
                  <div className="p-4 rounded-2xl bg-[#5A0A18]/40 border border-[#C8102E]/60 text-xs text-white/90 space-y-2 animate-in fade-in">
                    <div className="flex items-center gap-2 text-[#FF6B6B] font-bold">
                      <AlertCircle className="w-4 h-4" />
                      <span>Temporary Donation Waiting Period</span>
                    </div>
                    <p className="text-white/70 leading-relaxed">
                      Thank you deeply for your willingness. Based on healthcare safety regulations, you are currently in an incubation or rest interval.
                    </p>
                    <div className="pt-1 text-[11px] text-[#FFD9DE]">
                      Estimated Next Eligible Date: <strong>{getNextEligibleDate(gender, 30).dateString}</strong>
                    </div>
                    <a href="#learn" className="text-red-400 underline block pt-1 font-semibold">
                      Read full medical criteria in Donation Awareness →
                    </a>
                  </div>
                )}

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 text-white/70 hover:text-white text-xs font-semibold"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleStep2Next}
                    disabled={!isHealthEligible}
                    className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
                      isHealthEligible
                        ? 'btn-primary text-white'
                        : 'bg-white/10 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    Proceed to Availability →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: AVAILABILITY & CONSENT */}
            {step === 3 && (
              <div className="space-y-5">
                <h3 className="text-xl font-bold text-white font-sora">Availability Preferences</h3>

                <div>
                  <label className="block text-xs text-white/60 font-medium mb-2">Preferred Response Window:</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Anytime', 'Weekends', 'Emergency Only'] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setPreferredDays(opt)}
                        className={`py-3 px-2 text-xs font-bold rounded-xl border transition-all ${
                          preferredDays === opt
                            ? 'bg-[#C8102E] border-[#E5243B] text-white shadow-md'
                            : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Notify for Critical Emergencies</span>
                    <span className="text-[11px] text-white/50">Receive alerts when matching patients need blood within 4 hours</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyUrgent}
                    onChange={(e) => setNotifyUrgent(e.target.checked)}
                    className="w-5 h-5 accent-[#C8102E] rounded cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consentAgreed}
                    onChange={(e) => setConsentAgreed(e.target.checked)}
                    className="w-5 h-5 accent-[#C8102E] rounded mt-0.5 cursor-pointer shrink-0"
                  />
                  <label htmlFor="consent" className="text-xs text-white/80 leading-relaxed cursor-pointer">
                    I confirm that the medical facts entered are accurate. I voluntarily register my details with BloodLink to be contacted for voluntary blood donation requests in Karnataka.
                  </label>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 text-white/70 hover:text-white text-xs font-semibold"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleFinalSubmit}
                    disabled={!consentAgreed}
                    className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
                      consentAgreed
                        ? 'btn-primary text-white shadow-xl shadow-red-950/80'
                        : 'bg-white/10 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    Complete Registration & Generate Card 🎉
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: SUCCESS & DOWNLOADABLE DONOR CARD */}
            {step === 4 && registeredCard && (
              <div className="space-y-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#0E9F8E]/20 text-[#0E9F8E] flex items-center justify-center mb-3">
                    <UserCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white font-sora">
                    Registration Confirmed!
                  </h3>
                  <p className="text-xs text-white/70 max-w-sm mt-1">
                    You are now registered as an active voluntary donor. Your profile is visible in the Karnataka registry with the "You" badge.
                  </p>
                </div>

                {/* DIGITAL DONOR CARD (for html-to-image download) */}
                <div
                  ref={donorCardRef}
                  className="p-6 rounded-3xl bg-gradient-to-br from-[#1c080d] via-[#120709] to-[#26080e] border-2 border-[#E5243B]/40 text-left shadow-2xl relative overflow-hidden"
                >
                  {/* Decorative Watermark Droplet */}
                  <div className="absolute -bottom-8 -right-8 w-40 h-40 opacity-10 pointer-events-none">
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#C8102E] flex items-center justify-center text-white">
                        <Heart className="w-4 h-4 fill-current" />
                      </div>
                      <span className="font-extrabold text-sm text-white font-sora tracking-tight">
                        Blood<span className="text-[#E5243B]">Link</span>
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#0E9F8E] bg-[#0E9F8E]/20 px-2 py-0.5 rounded-full border border-[#0E9F8E]/30">
                      Verified Donor
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 my-5 items-center">
                    <div className="col-span-2">
                      <span className="text-[10px] uppercase tracking-wider text-white/40 block">Donor Name</span>
                      <h4 className="text-lg font-bold text-white font-sora truncate">{registeredCard.name}</h4>
                      <span className="text-xs text-white/60 block mt-1">{registeredCard.city}, Karnataka</span>
                      <span className="text-[10px] font-mono text-[#FFD9DE]/70 block mt-0.5">{registeredCard.id}</span>
                    </div>

                    <div className="flex flex-col items-center justify-center bg-[#C8102E]/30 border border-[#E5243B] p-3 rounded-2xl shadow-inner">
                      <span className="text-[10px] uppercase tracking-wider text-white/60 font-bold">Group</span>
                      <span className="text-3xl font-black text-white font-sora">{registeredCard.bloodGroup}</span>
                    </div>
                  </div>

                  {/* Anti-Fraud Decorative QR Graphic */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[10px] text-white/40">
                    <div>
                      <span>Karnataka Lifeline Registry Node</span>
                      <span className="block font-mono text-white/30">HASH: 8F2A-94B1-KA26</span>
                    </div>

                    {/* Stylized inline QR */}
                    <div className="w-9 h-9 bg-white p-1 rounded-md flex items-center justify-center">
                      <div className="w-full h-full bg-[#120709] grid grid-cols-3 gap-0.5 p-0.5">
                        <div className="bg-white" />
                        <div className="bg-transparent" />
                        <div className="bg-white" />
                        <div className="bg-transparent" />
                        <div className="bg-white" />
                        <div className="bg-transparent" />
                        <div className="bg-white" />
                        <div className="bg-white" />
                        <div className="bg-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions: Download & Share */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDownloadCard}
                    className="flex-1 py-3 rounded-xl btn-primary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Donor Card (PNG)</span>
                  </button>

                  <button
                    onClick={() => {
                      const el = document.getElementById('find-donor');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="py-3 px-5 rounded-xl bg-white/10 text-white font-semibold text-xs hover:bg-white/15"
                  >
                    View in Registry →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
