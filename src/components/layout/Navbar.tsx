import React, { useState, useEffect } from 'react';
import { useBloodlink } from '../../context/BloodlinkContext';
import { Activity, Menu, X, Heart, Search, HelpCircle, AlertTriangle } from 'lucide-react';
import { pulseBackground } from '../../utils';

export const Navbar: React.FC = () => {
  const { openSosModal, urgentRequests } = useBloodlink();
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'find-donor', 'urgent', 'become-donor', 'blood-banks', 'learn', 'impact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: 'Find Donors', href: '#find-donor', id: 'find-donor' },
    { label: 'Urgent Requests', href: '#urgent', id: 'urgent', badge: urgentRequests.length.toString() },
    { label: 'Blood Banks', href: '#blood-banks', id: 'blood-banks' },
    { label: 'Am I Eligible?', href: '#learn', id: 'learn' },
    { label: 'Our Impact', href: '#impact', id: 'impact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 w-full z-50 pt-3 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo with Droplet & Heartbeat Hover */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="BloodLink Home"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#E5243B] to-[#5A0A18] flex items-center justify-center shadow-lg shadow-red-950/70 group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current group-hover:animate-pulse">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                <circle cx="12" cy="14" r="2.5" fill="#120709" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-xl tracking-tight text-white font-sora">
                Blood<span className="text-[#E5243B]">Link</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#FFD9DE]/70 -mt-1 font-bold">
                Emergency Network
              </span>
            </div>
          </a>

          {/* Desktop Nav: Centered Glass Pill */}
          <nav className="hidden lg:flex items-center">
            <div className="glass-pill px-5 py-2 rounded-full flex items-center space-x-6 text-xs sm:text-sm font-semibold tracking-wide bg-[#120709]/85 border-white/15 backdrop-blur-xl shadow-xl">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.href)}
                  className={`transition-colors duration-200 relative py-1 flex items-center gap-1.5 ${
                    activeSection === link.id ? 'text-white font-bold' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-[#E5243B] text-white">
                      {link.badge}
                    </span>
                  )}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E5243B] rounded-full shadow-[0_0_8px_#E5243B]" />
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Quick Pulse Trigger */}
            <button
              onClick={() => pulseBackground()}
              title="Test Living Heartbeat Animation"
              className="glass-pill px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 text-[#FFD9DE] hover:border-red-500/50 hover:text-white transition-all bg-[#120709]/80"
            >
              <Activity className="w-4 h-4 text-[#E5243B] animate-pulse" />
              <span className="hidden xl:inline">Pulse</span>
            </button>

            {/* Become a Donor Glass Button */}
            <button
              onClick={() => handleNavClick('#become-donor')}
              className="btn-glass px-4 py-2 text-xs sm:text-sm font-bold text-white hidden sm:flex items-center gap-1.5 bg-[#120709]/80 border-white/20"
            >
              <Heart className="w-3.5 h-3.5 text-[#FF6B6B]" />
              <span>Become a Donor</span>
            </button>

            {/* Red Pulsing SOS Button */}
            <button
              onClick={openSosModal}
              className="relative group bg-[#C8102E] hover:bg-[#E5243B] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-red-950/80 transition-all duration-300 hover:scale-105"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>SOS Alert</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden glass-pill p-2 rounded-xl text-white/80 hover:text-white bg-[#120709]/80"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Thin Scroll Progress "Vein" Line */}
        <div className="w-full h-0.5 bg-white/5 mt-3 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#5A0A18] via-[#C8102E] to-[#E5243B] transition-all duration-150 shadow-[0_0_8px_#E5243B]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#120709]/95 backdrop-blur-2xl lg:hidden pt-24 px-6 flex flex-col justify-between pb-24">
          <div className="flex flex-col space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-white/40 font-bold px-2 mb-1">
              Platform Sections
            </span>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.href)}
                className={`text-left text-base font-sora font-semibold py-3 px-4 rounded-xl border flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-[#C8102E]/30 text-white border-red-500/40'
                    : 'bg-white/5 text-white/80 border-white/5'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-[#E5243B] text-white">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#become-donor')}
              className="text-left text-base font-sora font-semibold py-3 px-4 rounded-xl bg-teal-950/40 border border-teal-500/30 text-white flex items-center justify-between"
            >
              <span>Become a Voluntary Donor</span>
              <Heart className="w-4 h-4 text-[#0E9F8E]" />
            </button>
          </div>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              openSosModal();
            }}
            className="w-full py-4 rounded-xl bg-[#C8102E] text-white font-bold text-center flex items-center justify-center gap-2 shadow-xl shadow-red-950/80"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span>Broadcast Emergency SOS Request</span>
          </button>
        </div>
      )}
    </>
  );
};
