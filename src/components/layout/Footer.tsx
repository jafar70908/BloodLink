import React from 'react';
import { PhoneCall, Heart, Shield, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full relative z-10 pt-16 pb-24 md:pb-12 px-6 md:px-12 border-t border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 pb-12">
        {/* Brand & Helpline */}
        <div className="md:col-span-2 flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C8102E] flex items-center justify-center text-white">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <span className="font-extrabold text-xl text-white font-sora">
              Blood<span className="text-[#E5243B]">Link</span>
            </span>
          </div>

          <p className="text-sm text-white/60 leading-relaxed max-w-sm">
            Treating the internet as a living bloodstream. Every donor, hospital, and blood bank is a cell moving through one connected emergency response network.
          </p>

          <div className="glass-card p-4 rounded-2xl flex items-center gap-3 max-w-xs border-red-500/20">
            <div className="w-10 h-10 rounded-xl bg-[#C8102E]/20 text-[#FF6B6B] flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-white/50 font-bold">24/7 Mock Emergency Helpline</span>
              <span className="text-base font-bold text-white tracking-wide font-sora">1800-000-BLOOD</span>
            </div>
          </div>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-4">Platform</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li><a href="#find-donor" className="hover:text-white transition-colors">Find a Donor</a></li>
            <li><a href="#urgent" className="hover:text-white transition-colors">Urgent Requests</a></li>
            <li><a href="#blood-banks" className="hover:text-white transition-colors">Blood Bank Network</a></li>
            <li><a href="#become-donor" className="hover:text-white transition-colors">Donor Registration</a></li>
          </ul>
        </div>

        {/* Education & Awareness */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-4">Learn</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li><a href="#learn" className="hover:text-white transition-colors">Eligibility Checker</a></li>
            <li><a href="#learn" className="hover:text-white transition-colors">Donation Procedure</a></li>
            <li><a href="#learn" className="hover:text-white transition-colors">Myths vs Facts</a></li>
            <li><a href="#impact" className="hover:text-white transition-colors">Community Pulse</a></li>
          </ul>
        </div>

        {/* For Hospitals & Verification */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-4">For Hospitals</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#0E9F8E]" /> Authorized Banks</li>
            <li><a href="#urgent" className="hover:text-white transition-colors">Post SOS Requirement</a></li>
            <li><span className="text-white/40">API & Verification Portal</span></li>
            <li><span className="text-white/40">Karnataka Healthcare Node</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar & Disclaimer */}
      <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/50 gap-4">
        <div>
          © 2026 BloodLink Technologies. Built with Antigravity for Karnataka State.
        </div>
        <div className="text-center md:text-right text-[#FFD9DE]/60 text-[11px] font-medium">
          ⚠️ BloodLink is a prototype for hackathon demonstration. All donor, bank, and patient data shown is fictional.
        </div>
      </div>
    </footer>
  );
};
