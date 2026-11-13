import React, { useState, useEffect } from 'react';
import { useBloodlink } from '../../context/BloodlinkContext';
import { UrgentRequest, BloodGroup } from '../../types';
import { BLOOD_GROUPS } from '../../data/mockData';
import { formatCountdown } from '../../utils';
import { AlertCircle, Clock, ShieldCheck, Heart, Share2, Plus, ExternalLink } from 'lucide-react';

export const UrgentRequestsSection: React.FC = () => {
  const { urgentRequests, pledgeToRequest, openSosModal, showToast } = useBloodlink();

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'Critical' | 'Within24h'>('ALL');
  const [activeBloodGroupFilter, setActiveBloodGroupFilter] = useState<BloodGroup | 'ALL'>('ALL');
  const [selectedRequestDetails, setSelectedRequestDetails] = useState<UrgentRequest | null>(null);

  // Live timer tick every 1000ms
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter requests
  const filteredRequests = urgentRequests.filter((req) => {
    if (activeFilter === 'Critical' && req.urgency !== 'Critical') return false;
    if (activeFilter === 'Within24h') {
      const remainingMs = req.neededByTargetMs - Date.now();
      if (remainingMs > 24 * 60 * 60 * 1000 || remainingMs <= 0) return false;
    }
    if (activeBloodGroupFilter !== 'ALL' && req.bloodGroup !== activeBloodGroupFilter) return false;
    return true;
  });

  const handleShare = async (req: UrgentRequest) => {
    const shareText = `EMERGENCY BLOOD ALERT: ${req.unitsNeeded} units of ${req.bloodGroup} needed at ${req.hospital}, ${req.city} for ${req.reason}. Can you help?`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `BloodLink Urgent Request: ${req.bloodGroup}`,
          text: shareText,
          url: window.location.href,
        });
      } catch (e) {
        // user aborted share
      }
    } else {
      navigator.clipboard.writeText(`${shareText} - Respond on BloodLink: ${window.location.href}#urgent`);
      showToast({
        type: 'info',
        title: 'Emergency Link Copied',
        message: 'Share this lifeline alert on WhatsApp or Twitter to help find a donor.'
      });
    }
  };

  return (
    <section
      id="urgent"
      data-bg="bloodstream"
      className="py-24 px-4 sm:px-6 relative z-10 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5243B] animate-ping" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#FF6B6B] font-bold">
              Real-Time Emergency Feed
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sora">
            Urgent Blood Requests
          </h2>
          <p className="text-white/70 max-w-xl mt-2 text-sm sm:text-base">
            Every second counts. Patients in hospitals across Karnataka are awaiting direct donor pledges right now.
          </p>
        </div>

        <button
          onClick={openSosModal}
          className="btn-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 self-start md:self-auto text-sm shadow-xl"
        >
          <Plus className="w-4 h-4" />
          <span>Post an Emergency SOS</span>
        </button>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-white/5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeFilter === 'ALL'
                ? 'bg-[#C8102E] text-white shadow-md shadow-red-900/50'
                : 'bg-white/5 text-white/70 hover:text-white'
            }`}
          >
            All Requests ({urgentRequests.length})
          </button>
          <button
            onClick={() => setActiveFilter('Critical')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              activeFilter === 'Critical'
                ? 'bg-[#E5243B] text-white shadow-md shadow-red-900/50'
                : 'bg-white/5 text-[#FF6B6B] hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#E5243B] animate-pulse" />
            Critical Only
          </button>
          <button
            onClick={() => setActiveFilter('Within24h')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeFilter === 'Within24h'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white/5 text-amber-300/80 hover:text-white'
            }`}
          >
            Needed Within 24h
          </button>
        </div>

        {/* Blood group mini filter */}
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          <button
            onClick={() => setActiveBloodGroupFilter('ALL')}
            className={`px-2.5 py-1 text-xs rounded-lg font-bold ${
              activeBloodGroupFilter === 'ALL' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'
            }`}
          >
            All Groups
          </button>
          {BLOOD_GROUPS.map((bg) => (
            <button
              key={bg}
              onClick={() => setActiveBloodGroupFilter(activeBloodGroupFilter === bg ? 'ALL' : bg)}
              className={`px-2.5 py-1 text-xs rounded-lg font-extrabold ${
                activeBloodGroupFilter === bg
                  ? 'bg-[#C8102E] text-white shadow-sm'
                  : 'bg-white/5 text-white/60 hover:text-white'
              }`}
            >
              {bg}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Request Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map((req) => {
          const isFulfilled = req.unitsPledged >= req.unitsNeeded;
          const progressPercent = Math.min(100, Math.round((req.unitsPledged / req.unitsNeeded) * 100));

          return (
            <div
              key={req.id}
              className="glass-card-elevated p-6 rounded-3xl flex flex-col justify-between border-white/10 relative overflow-hidden group"
            >
              <div>
                {/* Top Row: Blood Group + Urgency Tag + Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-[#5A0A18] border-2 border-[#E5243B] flex items-center justify-center font-black text-2xl text-white font-sora shadow-lg shadow-red-950/80">
                      {req.bloodGroup}
                    </div>
                    <div>
                      <span className="text-xs text-white/50 block">Patient</span>
                      <h4 className="font-bold text-white text-base font-sora">
                        {req.patientInitials}, {req.age} yrs
                      </h4>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                        req.urgency === 'Critical'
                          ? 'bg-[#E5243B]/25 text-[#FF6B6B] border border-[#E5243B]/60 shadow-[0_0_12px_rgba(229,36,59,0.3)] animate-pulse'
                          : req.urgency === 'High'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-white/10 text-white/70'
                      }`}
                    >
                      {req.urgency}
                    </span>

                    {req.status === 'Pending' ? (
                      <span className="text-[10px] text-amber-400 font-semibold bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-500/30">
                        Pending Verification
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#0E9F8E] font-medium flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Reason & Hospital */}
                <div className="mb-4">
                  <span className="text-xs text-[#FFD9DE]/70 font-semibold uppercase tracking-wider">
                    {req.reason}
                  </span>
                  <p className="text-sm text-white font-medium mt-0.5">{req.hospital}</p>
                  <p className="text-xs text-white/50">{req.city}</p>
                </div>

                {/* Live Countdown & Progress Bar */}
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 mb-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FF6B6B]" />
                      <span className="font-mono font-bold text-white">
                        {formatCountdown(req.neededByTargetMs)}
                      </span>
                    </span>
                    <span className="text-white/80 font-bold">
                      {req.unitsPledged} of {req.unitsNeeded} units
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isFulfilled
                          ? 'bg-[#0E9F8E]'
                          : 'bg-gradient-to-r from-[#C8102E] to-[#E5243B]'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => pledgeToRequest(req.id)}
                  disabled={isFulfilled}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isFulfilled
                      ? 'bg-[#0E9F8E]/20 text-[#0E9F8E] border border-[#0E9F8E]/30 cursor-default'
                      : 'bg-[#C8102E] hover:bg-[#E5243B] text-white shadow-md shadow-red-950/60'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFulfilled ? 'fill-current' : ''}`} />
                  <span>{isFulfilled ? 'Units Fulfilled' : 'I Can Donate'}</span>
                </button>

                <button
                  onClick={() => handleShare(req)}
                  title="Share Emergency Appeal"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setSelectedRequestDetails(req)}
                  title="View Full Case Details"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 text-xs font-semibold"
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Case Details Dialog */}
      {selectedRequestDetails && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card-elevated p-7 rounded-3xl max-w-lg w-full border-white/20 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#FF6B6B] font-bold">
                  Clinical Case File #{selectedRequestDetails.id}
                </span>
                <h3 className="text-xl font-bold text-white font-sora mt-1">
                  {selectedRequestDetails.reason}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-xl bg-[#C8102E] text-white font-extrabold text-base">
                {selectedRequestDetails.bloodGroup}
              </span>
            </div>

            <div className="space-y-3 text-sm text-white/80 mb-6">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-white/50">Patient:</span>
                <span className="font-semibold text-white">{selectedRequestDetails.patientInitials} ({selectedRequestDetails.age} years)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-white/50">Hospital:</span>
                <span className="font-semibold text-white">{selectedRequestDetails.hospital}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-white/50">District:</span>
                <span className="font-semibold text-white">{selectedRequestDetails.city}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-white/50">Verified Authority:</span>
                <span className="text-[#0E9F8E] font-medium">{selectedRequestDetails.verifiedBy}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-white/50">Emergency Contact (Masked):</span>
                <span className="font-mono text-white/90">{selectedRequestDetails.contactMasked}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  pledgeToRequest(selectedRequestDetails.id);
                  setSelectedRequestDetails(null);
                }}
                className="flex-1 btn-primary text-white py-3 rounded-xl font-bold text-sm"
              >
                Confirm Pledge to Donate
              </button>
              <button
                onClick={() => setSelectedRequestDetails(null)}
                className="px-5 py-3 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/15"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
