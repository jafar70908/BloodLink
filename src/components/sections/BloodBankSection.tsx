import React, { useState } from 'react';
import { BLOOD_BANKS, CITIES, BLOOD_GROUPS } from '../../data/mockData';
import { BloodGroup } from '../../types';
import { getStockStatus } from '../../utils';
import { Building2, MapPin, Phone, ShieldCheck, Navigation, Clock, Search, Filter } from 'lucide-react';

export const BloodBankSection: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [requiredGroup, setRequiredGroup] = useState<BloodGroup | 'ANY'>('ANY');

  const filteredBanks = BLOOD_BANKS.filter((bank) => {
    if (selectedCity !== 'All Cities' && bank.city !== selectedCity) return false;
    if (selectedType !== 'All' && bank.type !== selectedType) return false;
    if (requiredGroup !== 'ANY') {
      const stockCount = bank.stock[requiredGroup] || 0;
      if (stockCount < 5) return false; // Must have adequate/moderate stock
    }
    return true;
  });

  return (
    <section
      id="blood-banks"
      data-bg="minimal"
      className="py-24 px-4 sm:px-6 relative z-10 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.2em] text-[#0E9F8E] font-bold">
          Licensed Infrastructure
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 font-sora">
          Authorized Blood Bank Network
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto mt-3 text-base">
          Direct real-time inventory levels from 12 certified government, hospital, and Red Cross blood centers across Karnataka.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="glass-card p-6 rounded-3xl mb-12 border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* City Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full sm:w-48 bg-[#120709] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-red-500"
            >
              <option value="All Cities">All Karnataka Districts</option>
              {CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full sm:w-44 bg-[#120709] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-red-500"
            >
              <option value="All">All Bank Types</option>
              <option value="Government">Government Center</option>
              <option value="Hospital-based">Hospital-based</option>
              <option value="NGO">NGO / Red Cross</option>
              <option value="Private">Private Facility</option>
            </select>
          </div>

          {/* Has Blood Group filter */}
          <div className="w-full sm:w-auto">
            <select
              value={requiredGroup}
              onChange={(e) => setRequiredGroup(e.target.value as any)}
              className="w-full sm:w-48 bg-[#120709] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-red-500"
            >
              <option value="ANY">Filter: Any Stock</option>
              {BLOOD_GROUPS.map((bg) => (
                <option key={bg} value={bg}>
                  Has Stock of {bg} (≥ 5u)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[11px] text-white/60">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0E9F8E]" /> ≥15u Adequate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> 5-14u Moderate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5243B]" /> &lt;5u Critical
          </span>
        </div>
      </div>

      {/* Grid of Blood Bank Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBanks.map((bank) => (
          <div
            key={bank.id}
            className="glass-card-elevated p-6 rounded-3xl flex flex-col justify-between border-white/10 group"
          >
            <div>
              {/* Header: Name, Type, Licensed Badge */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#FF6B6B] font-bold block">
                    {bank.type}
                  </span>
                  <h4 className="font-bold text-white text-base font-sora mt-0.5 leading-snug">
                    {bank.name}
                  </h4>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0E9F8E]/20 text-[#0E9F8E] border border-[#0E9F8E]/30 shrink-0 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Licensed
                </span>
              </div>

              {/* License Number & Address */}
              <div className="text-xs text-white/50 space-y-1 mb-4">
                <p className="font-mono text-[11px] text-white/40">Lic: {bank.licenseNo}</p>
                <p className="flex items-start gap-1 text-white/70">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B6B] shrink-0 mt-0.5" />
                  <span>{bank.address}</span>
                </p>
              </div>

              {/* Live Hours & Open Indicator */}
              <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-white/[0.03] border border-white/5 mb-5">
                <span className="text-white/60 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-white/40" />
                  <span>{bank.hours}</span>
                </span>
                <span className="text-[#0E9F8E] font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#0E9F8E] animate-pulse" />
                  Open Now
                </span>
              </div>

              {/* 8 MINI STOCK BARS (A+ to O-) */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">
                  Current Stock Levels (Units)
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {BLOOD_GROUPS.map((bg) => {
                    const units = bank.stock[bg] || 0;
                    const status = getStockStatus(units);
                    return (
                      <div
                        key={bg}
                        className="p-2 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center"
                      >
                        <span className="text-[11px] font-extrabold text-white/90">{bg}</span>
                        <div className="w-full h-1.5 rounded-full bg-white/10 my-1 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${status.bgClass}`}
                            style={{ width: `${Math.min(100, (units / 35) * 100)}%` }}
                          />
                        </div>
                        <span className={`text-[10px] font-mono font-bold ${status.colorClass}`}>
                          {units}u
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Links: Tap-to-call & Directions */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
              <a
                href={`tel:${bank.phone.replace(/\s+/g, '')}`}
                className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-[#0E9F8E]" />
                <span>Call Center</span>
              </a>

              <a
                href={`https://www.openstreetmap.org/?mlat=${bank.lat}&mlon=${bank.lng}#map=16/${bank.lat}/${bank.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl btn-primary text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
