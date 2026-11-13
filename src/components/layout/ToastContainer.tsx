import React from 'react';
import { useBloodlink } from '../../context/BloodlinkContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useBloodlink();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto glass-card-elevated p-4 rounded-2xl flex items-start gap-3 border-l-4 border-l-[#E5243B] animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#0E9F8E] shrink-0 mt-0.5" />}
          {toast.type === 'urgent' && <AlertTriangle className="w-5 h-5 text-[#E5243B] shrink-0 mt-0.5 animate-pulse" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />}

          <div className="flex-1">
            <h5 className="text-sm font-bold text-white font-sora">{toast.title}</h5>
            <p className="text-xs text-white/80 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>

          <button
            onClick={() => dismissToast(toast.id)}
            className="text-white/40 hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
