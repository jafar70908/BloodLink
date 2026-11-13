import React from 'react';
import { useBloodlink } from '../../context/BloodlinkContext';
import { Search, AlertCircle } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { openSosModal } = useBloodlink();

  const scrollToFindDonor = () => {
    const el = document.getElementById('find-donor');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#120709]/90 backdrop-blur-xl border-t border-white/10 flex items-center gap-3">
      <button
        onClick={scrollToFindDonor}
        className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/15 text-white font-semibold text-xs flex items-center justify-center gap-2"
      >
        <Search className="w-4 h-4 text-[#FF6B6B]" />
        <span>Find Donor</span>
      </button>

      <button
        onClick={openSosModal}
        className="flex-1 py-3 px-4 rounded-xl bg-[#C8102E] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-950/80"
      >
        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
        <span>SOS Request</span>
      </button>
    </div>
  );
};
