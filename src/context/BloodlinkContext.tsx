import React, { createContext, useContext, useState, useEffect } from 'react';
import { Donor, UrgentRequest, BloodGroup, BgVariant } from '../types';
import { INITIAL_DONORS, INITIAL_URGENT_REQUESTS } from '../data/mockData';
import { pulseBackground } from '../utils';
import confetti from 'canvas-confetti';

interface ToastMessage {
  id: string;
  type: 'success' | 'urgent' | 'info';
  title: string;
  message: string;
}

interface BloodlinkContextType {
  donors: Donor[];
  urgentRequests: UrgentRequest[];
  selectedBloodGroup: BloodGroup | 'ALL';
  setSelectedBloodGroup: (bg: BloodGroup | 'ALL') => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  bgVariant: BgVariant;
  setBgVariant: (variant: BgVariant) => void;
  
  // Modals
  isSosModalOpen: boolean;
  openSosModal: () => void;
  closeSosModal: () => void;
  
  selectedDonorForContact: Donor | null;
  openContactModal: (donor: Donor) => void;
  closeContactModal: () => void;

  // Actions
  pledgeToRequest: (requestId: string) => void;
  addUrgentRequest: (newRequest: Omit<UrgentRequest, 'id' | 'unitsPledged' | 'status' | 'neededByTargetMs'>) => void;
  registerDonor: (donorData: Omit<Donor, 'id' | 'isYou'>) => Donor;
  
  // Custom Toast System
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const BloodlinkContext = createContext<BloodlinkContextType | undefined>(undefined);

const DONORS_STORAGE_KEY = 'bloodlink_donors_v1';
const REQUESTS_STORAGE_KEY = 'bloodlink_requests_v1';

export const BloodlinkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persisted donors
  const [donors, setDonors] = useState<Donor[]>(() => {
    try {
      const saved = localStorage.getItem(DONORS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading donors from localStorage', e);
    }
    return INITIAL_DONORS;
  });

  // Load persisted requests
  const [urgentRequests, setUrgentRequests] = useState<UrgentRequest[]>(() => {
    try {
      const saved = localStorage.getItem(REQUESTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading requests from localStorage', e);
    }
    return INITIAL_URGENT_REQUESTS;
  });

  const [selectedBloodGroup, setSelectedBloodGroup] = useState<BloodGroup | 'ALL'>('ALL');
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [bgVariant, setBgVariant] = useState<BgVariant>('bloodstream');

  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [selectedDonorForContact, setSelectedDonorForContact] = useState<Donor | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist donors to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(DONORS_STORAGE_KEY, JSON.stringify(donors));
    } catch (e) {
      console.warn('Failed saving donors to localStorage', e);
    }
  }, [donors]);

  // Persist requests to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(urgentRequests));
    } catch (e) {
      console.warn('Failed saving requests to localStorage', e);
    }
  }, [urgentRequests]);

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openSosModal = () => setIsSosModalOpen(true);
  const closeSosModal = () => setIsSosModalOpen(false);

  const openContactModal = (donor: Donor) => setSelectedDonorForContact(donor);
  const closeContactModal = () => setSelectedDonorForContact(null);

  // Signature action: Pledge to donate for an urgent request
  const pledgeToRequest = (requestId: string) => {
    setUrgentRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          const nextPledged = Math.min(req.unitsNeeded, req.unitsPledged + 1);
          return { ...req, unitsPledged: nextPledged };
        }
        return req;
      })
    );

    // Trigger cardiac pulse + festive confetti
    pulseBackground();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E5243B', '#C8102E', '#FF6B6B', '#FFD9DE', '#0E9F8E']
    });

    showToast({
      type: 'success',
      title: 'Pledge Confirmed!',
      message: 'Thank you for standing by. Hospital coordination details have been sent.'
    });
  };

  // Signature action: Add new emergency SOS request
  const addUrgentRequest = (newRequest: Omit<UrgentRequest, 'id' | 'unitsPledged' | 'status' | 'neededByTargetMs'>) => {
    const created: UrgentRequest = {
      ...newRequest,
      id: `req-${Date.now()}`,
      unitsPledged: 0,
      status: 'Pending',
      neededByTargetMs: Date.now() + 4 * 60 * 60 * 1000 // 4 hours emergency target
    };

    setUrgentRequests((prev) => [created, ...prev]);
    pulseBackground();

    showToast({
      type: 'urgent',
      title: 'Emergency Request Posted',
      message: `SOS alert dispatched to all matching ${newRequest.bloodGroup} donors in ${newRequest.city}.`
    });
  };

  // Signature action: Register new voluntary donor
  const registerDonor = (donorData: Omit<Donor, 'id' | 'isYou'>): Donor => {
    const newDonor: Donor = {
      ...donorData,
      id: `d-user-${Date.now()}`,
      isYou: true
    };

    setDonors((prev) => [newDonor, ...prev]);
    pulseBackground();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#E5243B', '#C8102E', '#0E9F8E', '#FFFFFF']
    });

    showToast({
      type: 'success',
      title: 'Welcome to BloodLink Lifeline!',
      message: 'Your voluntary donor profile is active and verified in the registry.'
    });

    return newDonor;
  };

  return (
    <BloodlinkContext.Provider
      value={{
        donors,
        urgentRequests,
        selectedBloodGroup,
        setSelectedBloodGroup,
        selectedCity,
        setSelectedCity,
        bgVariant,
        setBgVariant,
        isSosModalOpen,
        openSosModal,
        closeSosModal,
        selectedDonorForContact,
        openContactModal,
        closeContactModal,
        pledgeToRequest,
        addUrgentRequest,
        registerDonor,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </BloodlinkContext.Provider>
  );
};

export const useBloodlink = () => {
  const context = useContext(BloodlinkContext);
  if (!context) {
    throw new Error('useBloodlink must be used within a BloodlinkProvider');
  }
  return context;
};
