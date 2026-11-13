export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type BgVariant = 'bloodstream' | 'aurora' | 'minimal';

export interface Donor {
  id: string;
  firstName: string;
  lastInitial: string;
  age: number;
  bloodGroup: BloodGroup;
  city: string;
  area: string;
  lat: number;
  lng: number;
  lastDonated: string; // e.g., "95 days ago"
  available: boolean;
  donations: number;
  maskedPhone: string;
  isYou?: boolean;
}

export interface BloodBank {
  id: string;
  name: string;
  type: 'Government' | 'Private' | 'Hospital-based' | 'NGO';
  city: string;
  address: string;
  phone: string;
  licenseNo: string;
  lat: number;
  lng: number;
  hours: string;
  open24x7: boolean;
  stock: Record<BloodGroup, number>;
}

export interface UrgentRequest {
  id: string;
  patientInitials: string;
  age: number;
  bloodGroup: BloodGroup;
  unitsNeeded: number;
  unitsPledged: number;
  hospital: string;
  city: string;
  urgency: 'Critical' | 'High' | 'Moderate';
  neededBy: string; // ISO string or relative time label
  neededByTargetMs: number; // timestamp for live countdown calculation
  verifiedBy: string;
  status: 'Verified' | 'Pending';
  reason: string;
  contactMasked: string;
}

export interface Myth {
  id: number;
  myth: string;
  fact: string;
}

export interface CompatibilityInfo {
  canDonateTo: BloodGroup[];
  canReceiveFrom: BloodGroup[];
}
