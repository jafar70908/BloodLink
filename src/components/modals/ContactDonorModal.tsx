import React, { useState } from 'react';
import { useBloodlink } from '../../context/BloodlinkContext';
import { X, Heart, ShieldCheck, Send } from 'lucide-react';
import { pulseBackground } from '../../utils';

export const ContactDonorModal: React.FC = () => {
  const { selectedDonorForContact, closeContactModal, showToast } = useBloodlink();

  const [patientName, setPatientName] = useState('');
  const [units, setUnits] = useState(1);
  const [hospital, setHospital] = useState('');
  const [message, setMessage] = useState('');

  if (!selectedDonorForContact) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    pulseBackground();
    showToast({
      type: 'success',
      title: 'Contact Request Dispatched',
      message: `Request sent to ${selectedDonorForContact.firstName} ${selectedDonorForContact.lastInitial}. The donor will be notified securely.`
    });
    closeContactModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card-elevated p-6 sm:p-8 rounded-3xl max-w-md w-full border-white/20 animate-in fade-in zoom-in-95 duration-200 relative">
        <button
          onClick={closeContactModal}
          className="absolute top-5 right-5 text-white/50 hover:text-white p-1 rounded-xl"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5A0A18] to-[#C8102E] flex items-center justify-center font-bold text-white text-base font-sora">
            {selectedDonorForContact.firstName[0]}{selectedDonorForContact.lastInitial[0]}
          </div>
          <div>
            <h4 className="font-bold text-white text-base font-sora">
              Contact {selectedDonorForContact.firstName} {selectedDonorForContact.lastInitial}
            </h4>
            <span className="text-xs text-[#0E9F8E] flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Voluntary Donor ({selectedDonorForContact.bloodGroup})
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-white/60 font-medium mb-1">Patient Full Name:</label>
            <input
              type="text"
              placeholder="e.g. Ramesh Hegde"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full bg-[#120709] border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:border-red-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-white/60 font-medium mb-1">Units Needed:</label>
              <input
                type="number"
                min="1"
                max="5"
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="w-full bg-[#120709] border border-white/20 rounded-xl px-3 py-2 text-sm text-white font-bold focus:border-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 font-medium mb-1">Location:</label>
              <div className="py-2 text-xs text-white/70 font-medium">
                {selectedDonorForContact.city}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/60 font-medium mb-1">Hospital / Clinic:</label>
            <input
              type="text"
              placeholder="e.g. Apollo BGS Hospital, Kuvempunagar"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="w-full bg-[#120709] border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:border-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 font-medium mb-1">Direct Message / Urgency:</label>
            <textarea
              rows={3}
              placeholder="Provide clinical details or required time of transfusion..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#120709] border border-white/20 rounded-xl p-3 text-sm text-white placeholder-white/30 focus:border-red-500 resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl btn-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>Send Secure Notification</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
