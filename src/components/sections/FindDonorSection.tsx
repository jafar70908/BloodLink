import React, { useState, useMemo } from 'react';
import { useBloodlink } from '../../context/BloodlinkContext';
import { Donor, BloodGroup } from '../../types';
import { BLOOD_GROUPS, CITIES, COMPATIBILITY_MAP } from '../../data/mockData';
import { calculateHaversineDistance } from '../../utils';
import { Search, MapPin, Phone, ShieldCheck, Heart, SlidersHorizontal, Map as MapIcon, List, AlertCircle, Info, X } from 'lucide-react';

export const FindDonorSection: React.FC = () => {
  const {
    donors,
    selectedBloodGroup,
    setSelectedBloodGroup,
    selectedCity,
    setSelectedCity,
    openContactModal,
    openSosModal,
    showToast,
  } = useBloodlink();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [maxDistance, setMaxDistance] = useState(50);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isShimmering, setIsShimmering] = useState(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Compatibility Explorer active blood group selection
  const [compatGroup, setCompatGroup] = useState<BloodGroup>('O-');

  // Trigger 450ms shimmer effect when filters change
  const triggerShimmer = () => {
    setIsShimmering(true);
    setTimeout(() => setIsShimmering(false), 400);
  };

  const handleGroupSelect = (bg: BloodGroup | 'ALL') => {
    setSelectedBloodGroup(bg);
    triggerShimmer();
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    triggerShimmer();
  };

  const handleResetFilters = () => {
    setSelectedBloodGroup('ALL');
    setSelectedCity('All Cities');
    setSearchKeyword('');
    setAvailableOnly(false);
    setUserCoords(null);
    triggerShimmer();
  };

  const handleUseLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          showToast({
            type: 'info',
            title: 'GPS Location Active',
            message: 'Calculating live driving distance to nearby verified donors.'
          });
        },
        () => {
          showToast({
            type: 'info',
            title: 'Location Defaulted',
            message: 'Using selected Karnataka district coordinates.'
          });
        }
      );
    }
  };

  // Filtered donors
  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      // Keyword search (name or area)
      if (searchKeyword.trim()) {
        const query = searchKeyword.toLowerCase();
        const matchesName = `${donor.firstName} ${donor.lastInitial}`.toLowerCase().includes(query);
        const matchesArea = donor.area.toLowerCase().includes(query);
        const matchesCity = donor.city.toLowerCase().includes(query);
        if (!matchesName && !matchesArea && !matchesCity) return false;
      }
      // Blood Group filter
      if (selectedBloodGroup !== 'ALL' && donor.bloodGroup !== selectedBloodGroup) {
        return false;
      }
      // City filter
      if (selectedCity !== 'All Cities' && donor.city !== selectedCity) {
        return false;
      }
      // Availability filter
      if (availableOnly && !donor.available) {
        return false;
      }
      // Distance filter if userCoords present
      if (userCoords) {
        const dist = calculateHaversineDistance(userCoords.lat, userCoords.lng, donor.lat, donor.lng);
        if (dist > maxDistance) return false;
      }
      return true;
    });
  }, [donors, searchKeyword, selectedBloodGroup, selectedCity, availableOnly, maxDistance, userCoords]);

  return (
    <section
      id="find-donor"
      data-bg="aurora"
      className="py-24 px-4 sm:px-6 relative z-10 max-w-7xl mx-auto"
    >
      {/* Section Header Pattern */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-[#FF6B6B] font-extrabold">
          Karnataka Voluntary Registry
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-1.5 font-sora">
          Find a Lifesaving Donor
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto mt-2 text-sm sm:text-base leading-relaxed">
          Search over 12,000 verified voluntary blood donors across Karnataka. Request direct coordination within minutes.
        </p>
      </div>

      {/* User-friendly quick instruction banner */}
      <div className="glass-card p-4 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-teal-500/25 bg-[#14080b]/90">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#0E9F8E]/20 text-[#0E9F8E] flex items-center justify-center shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <p className="text-xs text-white/80 leading-relaxed">
            <strong className="text-white">How it works:</strong> Filter by blood group or district. Click <em>"Request Contact"</em> on any donor to notify them with your patient's emergency details. Phone numbers are protected.
          </p>
        </div>
        <button
          onClick={openSosModal}
          className="text-xs font-bold text-[#FF6B6B] hover:text-white flex items-center gap-1 shrink-0 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/30"
        >
          <span>Need blood in &lt; 4 hours? Post SOS →</span>
        </button>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        {/* Left Filter Sidebar (lg:col-span-4) */}
        <div className="lg:col-span-4 p-6 rounded-3xl space-y-6 bg-[#16090c]/95 border border-white/15 shadow-2xl backdrop-blur-2xl sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-sora">
              <SlidersHorizontal className="w-4 h-4 text-[#E5243B]" />
              <span>Filter Donors</span>
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#FF6B6B] hover:text-white font-semibold flex items-center gap-1"
            >
              <span>Reset All</span>
            </button>
          </div>

          {/* Quick Search Input */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/60 font-bold mb-2">
              Keyword Search
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, area, or city..."
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  triggerShimmer();
                }}
                className="w-full bg-[#120709] border border-white/20 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:border-red-500 font-medium"
              />
              <Search className="w-4 h-4 text-white/40 absolute left-3 top-3" />
              {searchKeyword && (
                <button
                  onClick={() => {
                    setSearchKeyword('');
                    triggerShimmer();
                  }}
                  className="absolute right-3 top-3 text-white/40 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Blood Group Chips */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs uppercase tracking-wider text-white/60 font-bold">
                Blood Group
              </label>
              <span className="text-[10px] text-white/40 font-mono">
                {selectedBloodGroup === 'ALL' ? 'Showing all' : selectedBloodGroup}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => handleGroupSelect('ALL')}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  selectedBloodGroup === 'ALL'
                    ? 'bg-[#C8102E] text-white border-2 border-[#E5243B] shadow-md shadow-red-900/60'
                    : 'bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                All
              </button>
              {BLOOD_GROUPS.map((bg) => (
                <button
                  key={bg}
                  onClick={() => handleGroupSelect(bg)}
                  className={`py-2 text-xs font-extrabold rounded-xl transition-all ${
                    selectedBloodGroup === bg
                      ? 'bg-[#C8102E] text-white border-2 border-[#E5243B] shadow-md shadow-red-900/60 scale-105'
                      : 'bg-white/5 border border-white/10 text-white/80 hover:border-red-500/40 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* City Select */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/60 font-bold mb-2">
              District / City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => handleCitySelect(e.target.value)}
              className="w-full bg-[#120709] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-medium"
            >
              <option value="All Cities">All Karnataka Districts</option>
              {CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Available Now Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#120709] border border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0E9F8E] animate-pulse" />
              <span className="text-xs font-semibold text-white">Available Immediately</span>
            </div>
            <button
              onClick={() => {
                setAvailableOnly(!availableOnly);
                triggerShimmer();
              }}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                availableOnly ? 'bg-[#0E9F8E]' : 'bg-white/20'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  availableOnly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Distance Slider & Geolocation */}
          <div className="space-y-3 pt-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-white/70 font-semibold">Max Distance</span>
              <span className="text-white font-bold font-mono">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-[#E5243B] bg-white/10 rounded-lg cursor-pointer"
            />
            <button
              onClick={handleUseLocation}
              className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#FF6B6B]" />
              <span>{userCoords ? 'GPS Live Location Active' : 'Use My GPS Location'}</span>
            </button>
          </div>
        </div>

        {/* Right Results Grid (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Top Bar with Count & View Toggle */}
          <div className="flex items-center justify-between px-2">
            <div className="text-xs sm:text-sm text-white/80">
              Showing <span className="font-extrabold text-white">{filteredDonors.length}</span> verified donors in Karnataka
            </div>

            <div className="glass-pill p-1 rounded-xl flex items-center gap-1 text-xs bg-[#120709]/80 border-white/15">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-colors ${
                  viewMode === 'list' ? 'bg-[#C8102E] text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Cards</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-colors ${
                  viewMode === 'map' ? 'bg-[#C8102E] text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Map</span>
              </button>
            </div>
          </div>

          {/* Skeleton Shimmer State */}
          {isShimmering ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-48 rounded-3xl skeleton-shimmer border border-white/10" />
              ))}
            </div>
          ) : viewMode === 'list' ? (
            /* Results Cards */
            filteredDonors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredDonors.map((donor) => {
                  const initials = `${donor.firstName[0]}${donor.lastInitial[0]}`;
                  return (
                    <div
                      key={donor.id}
                      className="p-5 rounded-3xl flex flex-col justify-between bg-[#16090c]/90 border border-white/15 hover:border-red-500/40 shadow-xl backdrop-blur-xl relative overflow-hidden group transition-all duration-300"
                    >
                      {/* You Badge if user registered */}
                      {donor.isYou && (
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-[#0E9F8E] to-teal-800 text-white px-3.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-bl-xl shadow-md">
                          You (Your Profile)
                        </div>
                      )}

                      <div>
                        {/* Header with Avatar & Blood Group Badge */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5A0A18] to-[#C8102E] border border-red-500/40 flex items-center justify-center font-black text-white text-base font-sora shadow-md">
                              {initials}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-bold text-white text-base font-sora">
                                  {donor.firstName} {donor.lastInitial}
                                </h4>
                                {donor.available && (
                                  <span
                                    title="Available Immediately"
                                    className="w-2.5 h-2.5 rounded-full bg-[#0E9F8E] animate-pulse"
                                  />
                                )}
                              </div>
                              <span className="text-xs text-white/60 flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-[#FF6B6B]" />
                                {donor.area}, {donor.city}
                              </span>
                            </div>
                          </div>

                          <span className="px-3 py-1.5 rounded-xl bg-[#C8102E]/40 border-2 border-[#E5243B] text-white font-black text-base shadow-md font-sora">
                            {donor.bloodGroup}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-2 text-xs text-white/70 pt-2 pb-3 border-t border-white/10">
                          <div>
                            <span className="text-white/40 block text-[10px] uppercase font-semibold">Last Donated</span>
                            <span className="font-semibold text-white/90">{donor.lastDonated}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block text-[10px] uppercase font-semibold">Life Donations</span>
                            <span className="font-bold text-[#0E9F8E]">{donor.donations} times</span>
                          </div>
                          <div className="col-span-2 pt-1 flex items-center gap-1.5 text-xs text-white/60">
                            <Phone className="w-3.5 h-3.5 text-white/40" />
                            <span className="font-mono">{donor.maskedPhone}</span>
                            <span className="text-[10px] text-white/40">(Privacy protected)</span>
                          </div>
                        </div>
                      </div>

                      {/* Request Contact Button */}
                      <button
                        onClick={() => openContactModal(donor)}
                        className="w-full mt-3 py-2.5 rounded-xl bg-[#C8102E]/80 hover:bg-[#C8102E] text-white font-bold text-xs transition-all duration-200 border border-red-500/40 flex items-center justify-center gap-2 shadow-md hover:scale-[1.02]"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span>Request Contact</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="p-12 rounded-3xl text-center flex flex-col items-center bg-[#16090c]/90 border-dashed border-2 border-white/15">
                <div className="w-16 h-16 rounded-full bg-red-950/60 text-[#E5243B] flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white font-sora mb-2">No Matching Donors Found</h4>
                <p className="text-sm text-white/70 max-w-md mb-6 leading-relaxed">
                  No voluntary donors currently match all criteria in {selectedCity}. Try resetting your filters or post an urgent emergency SOS request to notify donors in nearby districts.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={openSosModal}
                    className="btn-primary text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
                  >
                    <span>Post SOS Alert Now</span>
                  </button>
                </div>
              </div>
            )
          ) : (
            /* Dark Interactive Map View */
            <div className="p-6 rounded-3xl bg-[#16090c]/90 border border-white/15 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-white/70 font-bold">
                  Karnataka Live Donor Geo-Distribution Map
                </span>
                <span className="text-xs text-[#0E9F8E] flex items-center gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#0E9F8E] animate-ping" />
                  CARTO Dark Network
                </span>
              </div>

              {/* Map Canvas Visualizer */}
              <div className="relative w-full h-96 bg-[#0a0507] rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 800 500" className="w-full h-full opacity-80">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  <path
                    d="M 320,50 L 460,70 L 520,150 L 500,240 L 440,320 L 410,430 L 320,450 L 260,370 L 240,250 L 290,140 Z"
                    fill="rgba(90, 10, 24, 0.2)"
                    stroke="rgba(200, 16, 46, 0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  {filteredDonors.slice(0, 24).map((d, idx) => {
                    const cx = 250 + (d.lng - 74.0) * 120 + (idx % 5) * 8;
                    const cy = 460 - (d.lat - 12.0) * 75 - (idx % 4) * 6;
                    return (
                      <g key={d.id} className="cursor-pointer group">
                        <circle cx={cx} cy={cy} r="6" fill="#C8102E" opacity="0.9" />
                        <circle cx={cx} cy={cy} r="14" fill="#E5243B" opacity="0.2" className="animate-ping" />
                        <text
                          x={cx + 9}
                          y={cy + 4}
                          fill="#FFF9F7"
                          fontSize="10"
                          fontFamily="Sora"
                          fontWeight="bold"
                        >
                          {d.bloodGroup}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div className="absolute bottom-4 left-4 glass-pill px-4 py-2 rounded-xl text-xs text-white/90 bg-[#120709]/80 border-white/20">
                  Showing active donor clusters across Karnataka districts
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================== */}
      {/* COMPATIBILITY EXPLORER                     */}
      {/* ========================================== */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#16090c]/90 border border-white/15 shadow-2xl backdrop-blur-2xl">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-widest text-[#0E9F8E] font-extrabold">
            Interactive Medical Matrix
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-sora mt-1">
            Red Cell Compatibility Explorer
          </h3>
          <p className="text-xs sm:text-sm text-white/70 mt-1">
            Select any blood group to examine who you can safely donate to and who can donate to you.
          </p>
        </div>

        {/* Group Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {BLOOD_GROUPS.map((bg) => (
            <button
              key={bg}
              onClick={() => setCompatGroup(bg)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-extrabold transition-all duration-200 ${
                compatGroup === bg
                  ? 'bg-[#C8102E] text-white border-2 border-[#E5243B] shadow-lg shadow-red-900/60 scale-105'
                  : 'bg-white/5 border border-white/15 text-white/80 hover:text-white hover:border-red-500/40 hover:bg-white/10'
              }`}
            >
              {bg}
            </button>
          ))}
        </div>

        {/* Matrix Visualization: Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Can Donate To */}
          <div className="p-6 rounded-2xl bg-[#120709] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                <span className="text-xs uppercase tracking-wider text-white/60 font-bold">
                  {compatGroup} Can Donate To
                </span>
                <span className="text-xs font-bold text-[#0E9F8E] bg-[#0E9F8E]/15 px-2.5 py-0.5 rounded-full border border-[#0E9F8E]/30">
                  {COMPATIBILITY_MAP[compatGroup].canDonateTo.length} Recipient Groups
                </span>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {BLOOD_GROUPS.map((bg) => {
                  const isCompatible = COMPATIBILITY_MAP[compatGroup].canDonateTo.includes(bg);
                  return (
                    <div
                      key={bg}
                      className={`p-3 rounded-xl text-center font-extrabold text-sm transition-all duration-300 ${
                        isCompatible
                          ? 'bg-[#0E9F8E]/30 text-white border-2 border-[#0E9F8E] shadow-[0_0_15px_rgba(14,159,142,0.35)]'
                          : 'bg-white/[0.03] text-white/20 border border-white/5'
                      }`}
                    >
                      {bg}
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-white/60 mt-6 pt-3 border-t border-white/10 italic">
              {compatGroup === 'O-'
                ? '⭐ Universal Red Cell Donor: O- erythrocytes can be safely transfused to any patient in an acute emergency.'
                : `${compatGroup} blood cells are safely compatible with ${COMPATIBILITY_MAP[compatGroup].canDonateTo.join(', ')} recipients.`}
            </p>
          </div>

          {/* Can Receive From */}
          <div className="p-6 rounded-2xl bg-[#120709] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                <span className="text-xs uppercase tracking-wider text-white/60 font-bold">
                  {compatGroup} Can Receive From
                </span>
                <span className="text-xs font-bold text-[#FF6B6B] bg-red-950/60 px-2.5 py-0.5 rounded-full border border-red-500/30">
                  {COMPATIBILITY_MAP[compatGroup].canReceiveFrom.length} Donor Groups
                </span>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {BLOOD_GROUPS.map((bg) => {
                  const isCompatible = COMPATIBILITY_MAP[compatGroup].canReceiveFrom.includes(bg);
                  return (
                    <div
                      key={bg}
                      className={`p-3 rounded-xl text-center font-extrabold text-sm transition-all duration-300 ${
                        isCompatible
                          ? 'bg-[#E5243B]/30 text-white border-2 border-[#E5243B] shadow-[0_0_15px_rgba(229,36,59,0.35)]'
                          : 'bg-white/[0.03] text-white/20 border border-white/5'
                      }`}
                    >
                      {bg}
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-white/60 mt-6 pt-3 border-t border-white/10 italic">
              {compatGroup === 'AB+'
                ? '⭐ Universal Recipient: AB+ individuals can safely receive red blood cells from any blood group.'
                : `${compatGroup} patients can safely receive red blood cells from ${COMPATIBILITY_MAP[compatGroup].canReceiveFrom.join(', ')} donors.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
