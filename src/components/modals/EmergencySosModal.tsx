import React, { useState } from 'react';
import { useBloodlink } from '../../context/BloodlinkContext';
import { BloodGroup } from '../../types';
import { BLOOD_GROUPS, CITIES } from '../../data/mockData';
import { X, AlertTriangle, ShieldCheck, HeartPulse, CheckCircle2 } from 'lucide-react';
import { pulseBackground } from '../../utils';

export const EmergencySosModal: React.FC = () => {
  const { isSosModalOpen, closeSosModal, addUrgentRequest } = useBloodlink();

  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O-');
  const [units, setUnits] = useState(2);
  const [hospital, setHospital] = useState('');
  const [city, setCity] = useState(CITIES[0].name);
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('Emergency Surgery');
  const [urgency, setUrgency] = useState<'Critical' | 'High' | 'Moderate'>('Critical');

  // Multi-step submission animation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifiedCount, setNotifiedCount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isSosModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hospital || !contactName || !phone) return;

    setIsSubmitting(true);
    pulseBackground();

    // Climb counter to 12 over 2 seconds
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setNotifiedCount(count);
      if (count >= 12) {
        clearInterval(interval);
        setIsSubmitting(false);
        setIsSuccess(true);
        pulseBackground();

        // Create the urgent request
        addUrgentRequest({
          patientInitials: `${contactName.slice(0, 1).toUpperCase()}.${contactName.slice(1, 2).toUpperCase() || 'P.'}`,
          age: 32,
          bloodGroup,
          unitsNeeded: Number(units),
          hospital,
          city,
          urgency,
          neededBy: 'Immediate Emergency',
          verifiedBy: 'Karnataka Emergency Dispatch Node',
          reason,
          contactMasked: phone.length >= 10 ? `+91 ${phone.slice(0, 2)}*** **${phone.slice(-3)}` : '+91 98*** **410'
        });

        // Close after brief success presentation
        setTimeout(() => {
          setIsSuccess(false);
          closeSosModal();
          const el = document.getElementById('urgent');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 1600);
      }
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-card-elevated p-6 sm:p-8 rounded-3xl max-w-lg w-full border-red-500/30 my-8 animate-in fade-in zoom-in-95 duration-200 relative">
        {/* Close Button */}
        {!isSubmitting && (
          <button
            onClick={closeSosModal}
            className="absolute top-5 right-5 text-white/50 hover:text-white p-1 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {isSubmitting ? (
          /* SECTION 5.5 ANIMATION: 2-second "Notifying nearby verified donors..." counter climbing to 12 with ripple rings */
          <div className="py-12 flex flex-col items-center text-center space-y-6">
            <div className="relative flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-[#E5243B]/20 border border-[#E5243B] flex items-center justify-center animate-pulse">
                <HeartPulse className="w-12 h-12 text-[#E5243B]" />
              </div>
              <div className="absolute inset-0 rounded-full border border-red-500/40 animate-ping" />
              <div className="absolute -inset-4 rounded-full border border-[#E5243B]/20 animate-ping delay-150" />
            </div>

            <div>
              <span className="text-4xl font-extrabold text-white font-sora">{notifiedCount}</span>
              <p className="text-xs uppercase tracking-widest text-[#FFD9DE]/70 font-semibold mt-1">
                Verified Donors Alerted
              </p>
            </div>

            <p className="text-sm text-white/80 max-w-xs animate-pulse">
              Broadcasting encrypted cardiac pulse notification to matching {bloodGroup} donors in {city}...
            </p>
          </div>
        ) : isSuccess ? (
          <div className="py-10 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#0E9F8E]/20 text-[#0E9F8E] flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white font-sora">SOS Broadcast Confirmed</h3>
            <p className="text-sm text-white/70 max-w-sm">
              Your request is pinned to the live feed and nearby donors have received immediate notifications.
            </p>
          </div>
        ) : (
          /* Emergency Form */
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#E5243B] animate-ping" />
              <span className="text-xs uppercase tracking-widest text-[#FF6B6B] font-bold">
                Emergency SOS Broadcast
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-white font-sora mb-6">
              Request Emergency Blood
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Blood Group & Units */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/60 font-medium mb-1.5">Blood Group:</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                    className="w-full bg-[#120709] border border-white/20 rounded-xl px-3 py-2.5 text-sm text-white font-bold font-sora focus:border-red-500"
                  >
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-white/60 font-medium mb-1.5">Units Needed (1-10):</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={units}
                    onChange={(e) => setUnits(Number(e.target.value))}
                    className="w-full bg-[#120709] border border-white/20 rounded-xl px-3 py-2 text-sm text-white font-bold focus:border-red-500"
                    required
                  />
                </div>
              </div>

              {/* Hospital & City */}
              <div>
                <label className="block text-xs text-white/60 font-medium mb-1">Hospital Name & Branch:</label>
                <input
                  type="text"
                  placeholder="e.g. Victoria Hospital, Fort Road"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  className="w-full bg-[#120709] border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:border-red-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/60 font-medium mb-1">District:</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#120709] border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:border-red-500"
                  >
                    {CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-white/60 font-medium mb-1">Clinical Urgency:</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full bg-[#120709] border border-white/20 rounded-xl px-3 py-2 text-sm text-white font-semibold focus:border-red-500"
                  >
                    <option value="Critical">Critical (Immediate)</option>
                    <option value="High">High (&lt; 6 Hours)</option>
                    <option value="Moderate">Moderate (&lt; 24 Hours)</option>
                  </select>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-xs text-white/60 font-medium mb-1">Clinical Reason:</label>
                <input
                  type="text"
                  placeholder="e.g. Accident trauma, Thalassemia, Cardiac surgery"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-[#120709] border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:border-red-500"
                  required
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/60 font-medium mb-1">Attendant Name:</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-[#120709] border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/60 font-medium mb-1">Contact Phone:</label>
                  <input
                    type="tel"
                    placeholder="10 digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#120709] border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#C8102E] hover:bg-[#E5243B] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-red-950/80 transition-all hover:scale-[1.02]"
                >
                  <AlertTriangle className="w-4 h-4 text-white" />
                  <span>Broadcast Emergency SOS Alert</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
