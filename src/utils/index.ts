import { BloodGroup } from '../types';

/**
 * Fires the coordinated cardiac pulse event across the site
 */
export const pulseBackground = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('bloodlink:pulse'));
  }
};

/**
 * Calculates haversine distance between two coordinates in kilometers
 */
export function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Safely masks telephone numbers: +91 98*** **210
 */
export function maskPhone(phone: string): string {
  if (!phone) return '+91 98*** **210';
  const clean = phone.replace(/[^\d+]/g, '');
  if (clean.length < 10) return '+91 98*** **210';
  const last3 = clean.slice(-3);
  const prefix = clean.startsWith('+91') ? '+91 ' + clean.slice(3, 5) : '+91 ' + clean.slice(0, 2);
  return `${prefix}*** **${last3}`;
}

/**
 * Computes next eligible donation date based on gender and interval (90 days male, 120 days female)
 */
export function getNextEligibleDate(gender: 'male' | 'female' | 'other' = 'male', daysAgo: number = 0): { eligible: boolean; daysRemaining: number; dateString: string } {
  const requiredGap = gender === 'female' ? 120 : 90;
  const daysRemaining = Math.max(0, requiredGap - daysAgo);
  const nextDate = new Date(Date.now() + daysRemaining * 24 * 60 * 60 * 1000);
  
  return {
    eligible: daysRemaining === 0,
    daysRemaining,
    dateString: nextDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  };
}

/**
 * Formats countdown milliseconds to dynamic countdown: "03h 42m 15s"
 */
export function formatCountdown(targetMs: number): string {
  const diff = targetMs - Date.now();
  if (diff <= 0) return 'Immediate Action Needed';
  
  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;
    return `${days}d ${remHours.toString().padStart(2, '0')}h`;
  }
  
  return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
}

/**
 * Stock bar color by unit count (15+ = green/teal, 5-14 = amber, <5 = red)
 */
export function getStockStatus(units: number): { label: 'Adequate' | 'Moderate' | 'Critical'; colorClass: string; bgClass: string } {
  if (units >= 15) {
    return { label: 'Adequate', colorClass: 'text-[#0E9F8E]', bgClass: 'bg-[#0E9F8E]' };
  } else if (units >= 5) {
    return { label: 'Moderate', colorClass: 'text-amber-400', bgClass: 'bg-amber-400' };
  } else {
    return { label: 'Critical', colorClass: 'text-[#E5243B]', bgClass: 'bg-[#E5243B]' };
  }
}
