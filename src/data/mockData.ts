import { BloodGroup, BloodBank, Donor, UrgentRequest, Myth } from '../types';

export const CITIES = [
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { name: 'Hubballi', lat: 15.3647, lng: 75.1240 },
  { name: 'Dharwad', lat: 15.4589, lng: 75.0078 },
  { name: 'Mysuru', lat: 12.2958, lng: 76.6394 },
  { name: 'Mangaluru', lat: 12.9141, lng: 74.8560 },
  { name: 'Belagavi', lat: 15.8497, lng: 74.4977 },
  { name: 'Kalaburagi', lat: 17.3297, lng: 76.8343 },
  { name: 'Davanagere', lat: 14.4644, lng: 75.9218 },
];

export const BLOOD_GROUPS: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

// Red cells compatibility matrix
export const COMPATIBILITY_MAP: Record<BloodGroup, { canDonateTo: BloodGroup[]; canReceiveFrom: BloodGroup[] }> = {
  'O-': {
    canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    canReceiveFrom: ['O-']
  },
  'O+': {
    canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
    canReceiveFrom: ['O-', 'O+']
  },
  'A-': {
    canDonateTo: ['A-', 'A+', 'AB-', 'AB+'],
    canReceiveFrom: ['O-', 'A-']
  },
  'A+': {
    canDonateTo: ['A+', 'AB+'],
    canReceiveFrom: ['O-', 'O+', 'A-', 'A+']
  },
  'B-': {
    canDonateTo: ['B-', 'B+', 'AB-', 'AB+'],
    canReceiveFrom: ['O-', 'B-']
  },
  'B+': {
    canDonateTo: ['B+', 'AB+'],
    canReceiveFrom: ['O-', 'O+', 'B-', 'B+']
  },
  'AB-': {
    canDonateTo: ['AB-', 'AB+'],
    canReceiveFrom: ['O-', 'A-', 'B-', 'AB-']
  },
  'AB+': {
    canDonateTo: ['AB+'],
    canReceiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']
  }
};

export const INITIAL_DONORS: Donor[] = [
  { id: 'd-1', firstName: 'Ananya', lastInitial: 'R.', age: 26, bloodGroup: 'O-', city: 'Bengaluru', area: 'Indiranagar', lat: 12.9784, lng: 77.6408, lastDonated: '110 days ago', available: true, donations: 4, maskedPhone: '+91 98*** **210' },
  { id: 'd-2', firstName: 'Rohan', lastInitial: 'K.', age: 31, bloodGroup: 'B+', city: 'Bengaluru', area: 'Koramangala', lat: 12.9352, lng: 77.6245, lastDonated: '95 days ago', available: true, donations: 6, maskedPhone: '+91 97*** **842' },
  { id: 'd-3', firstName: 'Fatima', lastInitial: 'S.', age: 24, bloodGroup: 'A+', city: 'Hubballi', area: 'Vidyanagar', lat: 15.3685, lng: 75.1320, lastDonated: '140 days ago', available: true, donations: 3, maskedPhone: '+91 94*** **119' },
  { id: 'd-4', firstName: 'Manjunath', lastInitial: 'P.', age: 38, bloodGroup: 'AB-', city: 'Dharwad', area: 'Saptapur', lat: 15.4610, lng: 75.0120, lastDonated: '210 days ago', available: true, donations: 8, maskedPhone: '+91 99*** **356' },
  { id: 'd-5', firstName: 'Sneha', lastInitial: 'D.', age: 27, bloodGroup: 'O+', city: 'Mysuru', area: 'Gokulam', lat: 12.3300, lng: 76.6200, lastDonated: '105 days ago', available: true, donations: 5, maskedPhone: '+91 96*** **701' },
  { id: 'd-6', firstName: 'Imran', lastInitial: 'A.', age: 29, bloodGroup: 'A-', city: 'Mangaluru', area: 'Kadri', lat: 12.8900, lng: 74.8600, lastDonated: '180 days ago', available: true, donations: 4, maskedPhone: '+91 98*** **443' },
  { id: 'd-7', firstName: 'Priya', lastInitial: 'N.', age: 23, bloodGroup: 'B-', city: 'Belagavi', area: 'Tilakwadi', lat: 15.8350, lng: 74.5020, lastDonated: '320 days ago', available: false, donations: 2, maskedPhone: '+91 91*** **902' },
  { id: 'd-8', firstName: 'Karthik', lastInitial: 'B.', age: 34, bloodGroup: 'AB+', city: 'Bengaluru', area: 'Whitefield', lat: 12.9698, lng: 77.7500, lastDonated: '100 days ago', available: true, donations: 7, maskedPhone: '+91 90*** **567' },
  { id: 'd-9', firstName: 'Lakshmi', lastInitial: 'G.', age: 28, bloodGroup: 'O-', city: 'Kalaburagi', area: 'Sedam Road', lat: 17.3340, lng: 76.8400, lastDonated: '130 days ago', available: true, donations: 3, maskedPhone: '+91 95*** **812' },
  { id: 'd-10', firstName: 'Arjun', lastInitial: 'H.', age: 32, bloodGroup: 'O+', city: 'Davanagere', area: 'MCC B Block', lat: 14.4700, lng: 75.9180, lastDonated: '150 days ago', available: true, donations: 5, maskedPhone: '+91 93*** **234' },
  { id: 'd-11', firstName: 'Meera', lastInitial: 'V.', age: 25, bloodGroup: 'A+', city: 'Bengaluru', area: 'Jayanagar', lat: 12.9308, lng: 77.5838, lastDonated: '200 days ago', available: true, donations: 4, maskedPhone: '+91 98*** **198' },
  { id: 'd-12', firstName: 'Siddharth', lastInitial: 'M.', age: 35, bloodGroup: 'B+', city: 'Mysuru', area: 'Kuvempunagar', lat: 12.2850, lng: 76.6250, lastDonated: '115 days ago', available: true, donations: 9, maskedPhone: '+91 97*** **678' },
  { id: 'd-13', firstName: 'Zoya', lastInitial: 'K.', age: 22, bloodGroup: 'AB-', city: 'Mangaluru', area: 'Bejai', lat: 12.8850, lng: 74.8500, lastDonated: '98 days ago', available: true, donations: 2, maskedPhone: '+91 94*** **321' },
  { id: 'd-14', firstName: 'Naveen', lastInitial: 'C.', age: 41, bloodGroup: 'O+', city: 'Hubballi', area: 'Keshwapur', lat: 15.3720, lng: 75.1400, lastDonated: '160 days ago', available: false, donations: 12, maskedPhone: '+91 99*** **888' },
  { id: 'd-15', firstName: 'Divya', lastInitial: 'T.', age: 30, bloodGroup: 'A-', city: 'Bengaluru', area: 'Malleshwaram', lat: 13.0031, lng: 77.5643, lastDonated: '102 days ago', available: true, donations: 5, maskedPhone: '+91 96*** **554' },
  { id: 'd-16', firstName: 'Raghav', lastInitial: 'E.', age: 27, bloodGroup: 'B-', city: 'Belagavi', area: 'Camp', lat: 15.8550, lng: 74.5100, lastDonated: '185 days ago', available: true, donations: 3, maskedPhone: '+91 98*** **733' },
  { id: 'd-17', firstName: 'Pooja', lastInitial: 'S.', age: 29, bloodGroup: 'AB+', city: 'Dharwad', area: 'Navanagar', lat: 15.4200, lng: 75.0500, lastDonated: '110 days ago', available: true, donations: 4, maskedPhone: '+91 95*** **411' },
  { id: 'd-18', firstName: 'Darshan', lastInitial: 'J.', age: 33, bloodGroup: 'O-', city: 'Mysuru', area: 'Vijayanagar', lat: 12.3350, lng: 76.6050, lastDonated: '240 days ago', available: true, donations: 7, maskedPhone: '+91 91*** **876' },
  { id: 'd-19', firstName: 'Kavita', lastInitial: 'L.', age: 26, bloodGroup: 'A+', city: 'Kalaburagi', area: 'Aiwan-E-Shahi', lat: 17.3380, lng: 76.8320, lastDonated: '96 days ago', available: true, donations: 3, maskedPhone: '+91 93*** **654' },
  { id: 'd-20', firstName: 'Farhan', lastInitial: 'Q.', age: 30, bloodGroup: 'B+', city: 'Bengaluru', area: 'HSR Layout', lat: 12.9121, lng: 77.6446, lastDonated: '145 days ago', available: true, donations: 6, maskedPhone: '+91 98*** **920' },
  { id: 'd-21', firstName: 'Bhavana', lastInitial: 'M.', age: 24, bloodGroup: 'O+', city: 'Davanagere', area: 'KB Extension', lat: 14.4600, lng: 75.9250, lastDonated: '112 days ago', available: true, donations: 2, maskedPhone: '+91 97*** **145' },
  { id: 'd-22', firstName: 'Vikram', lastInitial: 'R.', age: 36, bloodGroup: 'O-', city: 'Bengaluru', area: 'Hebbal', lat: 13.0358, lng: 77.5970, lastDonated: '100 days ago', available: true, donations: 11, maskedPhone: '+91 94*** **999' },
  { id: 'd-23', firstName: 'Ayesha', lastInitial: 'M.', age: 28, bloodGroup: 'A-', city: 'Mangaluru', area: 'Lalbagh', lat: 12.8750, lng: 74.8450, lastDonated: '300 days ago', available: false, donations: 4, maskedPhone: '+91 99*** **217' },
  { id: 'd-24', firstName: 'Sunil', lastInitial: 'B.', age: 39, bloodGroup: 'AB+', city: 'Belagavi', area: 'Khanapur Road', lat: 15.8300, lng: 74.4900, lastDonated: '118 days ago', available: true, donations: 8, maskedPhone: '+91 96*** **345' },
  { id: 'd-25', firstName: 'Swathi', lastInitial: 'P.', age: 27, bloodGroup: 'B-', city: 'Hubballi', area: 'Gokul Road', lat: 15.3550, lng: 75.1100, lastDonated: '105 days ago', available: true, donations: 3, maskedPhone: '+91 98*** **823' },
  { id: 'd-26', firstName: 'Chetan', lastInitial: 'K.', age: 31, bloodGroup: 'O+', city: 'Bengaluru', area: 'Electronic City', lat: 12.8399, lng: 77.6770, lastDonated: '125 days ago', available: true, donations: 5, maskedPhone: '+91 90*** **456' },
  { id: 'd-27', firstName: 'Tanvi', lastInitial: 'N.', age: 23, bloodGroup: 'A+', city: 'Dharwad', area: 'Kelgerit', lat: 15.4700, lng: 74.9900, lastDonated: '190 days ago', available: true, donations: 2, maskedPhone: '+91 95*** **123' },
  { id: 'd-28', firstName: 'Mahesh', lastInitial: 'D.', age: 44, bloodGroup: 'B+', city: 'Mysuru', area: 'Saraswathipuram', lat: 12.3020, lng: 76.6310, lastDonated: '97 days ago', available: true, donations: 14, maskedPhone: '+91 91*** **987' },
  { id: 'd-29', firstName: 'Rekha', lastInitial: 'V.', age: 33, bloodGroup: 'O-', city: 'Bengaluru', area: 'Rajajinagar', lat: 12.9982, lng: 77.5530, lastDonated: '140 days ago', available: true, donations: 6, maskedPhone: '+91 93*** **345' },
  { id: 'd-30', firstName: 'Prashant', lastInitial: 'S.', age: 29, bloodGroup: 'AB-', city: 'Kalaburagi', area: 'Station Road', lat: 17.3250, lng: 76.8280, lastDonated: '220 days ago', available: false, donations: 3, maskedPhone: '+91 98*** **567' },
  { id: 'd-31', firstName: 'Deepa', lastInitial: 'G.', age: 30, bloodGroup: 'B+', city: 'Davanagere', area: 'Nittuvalli', lat: 14.4550, lng: 75.9300, lastDonated: '108 days ago', available: true, donations: 4, maskedPhone: '+91 97*** **890' },
  { id: 'd-32', firstName: 'Guru', lastInitial: 'N.', age: 37, bloodGroup: 'A+', city: 'Bengaluru', area: 'Banashankari', lat: 12.9255, lng: 77.5468, lastDonated: '99 days ago', available: true, donations: 8, maskedPhone: '+91 94*** **234' },
  { id: 'd-33', firstName: 'Nandini', lastInitial: 'B.', age: 25, bloodGroup: 'O+', city: 'Mangaluru', area: 'Surathkal', lat: 13.0080, lng: 74.7950, lastDonated: '135 days ago', available: true, donations: 3, maskedPhone: '+91 99*** **678' },
  { id: 'd-34', firstName: 'Shiva', lastInitial: 'R.', age: 28, bloodGroup: 'A-', city: 'Belagavi', area: 'Vadgaon', lat: 15.8200, lng: 74.5200, lastDonated: '160 days ago', available: true, donations: 5, maskedPhone: '+91 96*** **901' },
  { id: 'd-35', firstName: 'Pallavi', lastInitial: 'K.', age: 26, bloodGroup: 'O-', city: 'Hubballi', area: 'Unkal', lat: 15.3800, lng: 75.1200, lastDonated: '101 days ago', available: true, donations: 4, maskedPhone: '+91 98*** **112' },
  { id: 'd-36', firstName: 'Vinay', lastInitial: 'T.', age: 32, bloodGroup: 'B-', city: 'Bengaluru', area: 'Marathahalli', lat: 12.9591, lng: 77.6974, lastDonated: '310 days ago', available: false, donations: 5, maskedPhone: '+91 91*** **445' },
  { id: 'd-37', firstName: 'Harini', lastInitial: 'M.', age: 27, bloodGroup: 'AB+', city: 'Mysuru', area: 'Jayalakshmipuram', lat: 12.3250, lng: 76.6280, lastDonated: '115 days ago', available: true, donations: 3, maskedPhone: '+91 93*** **789' },
  { id: 'd-38', firstName: 'Sanjay', lastInitial: 'L.', age: 40, bloodGroup: 'O+', city: 'Dharwad', area: 'Toll Naka', lat: 15.4300, lng: 75.0300, lastDonated: '104 days ago', available: true, donations: 10, maskedPhone: '+91 98*** **334' },
  { id: 'd-39', firstName: 'Kiran', lastInitial: 'P.', age: 24, bloodGroup: 'B+', city: 'Kalaburagi', area: 'Brahampur', lat: 17.3400, lng: 76.8450, lastDonated: '120 days ago', available: true, donations: 2, maskedPhone: '+91 97*** **556' },
  { id: 'd-40', firstName: 'Vidya', lastInitial: 'A.', age: 29, bloodGroup: 'A+', city: 'Bengaluru', area: 'Yelahanka', lat: 13.1007, lng: 77.5963, lastDonated: '98 days ago', available: true, donations: 5, maskedPhone: '+91 95*** **778' },
];

export const BLOOD_BANKS: BloodBank[] = [
  {
    id: 'bb-1',
    name: 'Lifeline Central Blood Bank',
    type: 'Government',
    city: 'Bengaluru',
    address: 'Victoria Hospital Campus, Fort Road, Bengaluru',
    phone: '+91 80 2670 1150',
    licenseNo: 'KA/BB/2021/0457',
    lat: 12.9620,
    lng: 77.5750,
    hours: '24 Hours / 7 Days',
    open24x7: true,
    stock: { 'O-': 4, 'O+': 28, 'A-': 3, 'A+': 22, 'B-': 6, 'B+': 32, 'AB-': 2, 'AB+': 18 }
  },
  {
    id: 'bb-2',
    name: 'Sanjeevini Voluntary Blood Centre',
    type: 'NGO',
    city: 'Hubballi',
    address: 'Club Road, Deshpande Nagar, Hubballi',
    phone: '+91 836 235 4890',
    licenseNo: 'KA/BB/2020/0312',
    lat: 15.3580,
    lng: 75.1380,
    hours: '8:00 AM - 10:00 PM',
    open24x7: false,
    stock: { 'O-': 1, 'O+': 16, 'A-': 2, 'A+': 14, 'B-': 3, 'B+': 19, 'AB-': 1, 'AB+': 9 }
  },
  {
    id: 'bb-3',
    name: 'Karnataka Regional Blood Centre',
    type: 'Government',
    city: 'Dharwad',
    address: 'Civil Hospital Road, Dharwad',
    phone: '+91 836 244 8722',
    licenseNo: 'KA/BB/2019/0198',
    lat: 15.4540,
    lng: 75.0110,
    hours: '24 Hours / 7 Days',
    open24x7: true,
    stock: { 'O-': 5, 'O+': 24, 'A-': 4, 'A+': 18, 'B-': 5, 'B+': 26, 'AB-': 2, 'AB+': 12 }
  },
  {
    id: 'bb-4',
    name: 'Mysuru Care Hospital Blood Bank',
    type: 'Hospital-based',
    city: 'Mysuru',
    address: 'Irwin Road, Lashkar Mohalla, Mysuru',
    phone: '+91 821 242 0520',
    licenseNo: 'KA/BB/2022/0589',
    lat: 12.3160,
    lng: 76.6530,
    hours: '24 Hours / 7 Days',
    open24x7: true,
    stock: { 'O-': 2, 'O+': 18, 'A-': 2, 'A+': 15, 'B-': 4, 'B+': 21, 'AB-': 0, 'AB+': 11 }
  },
  {
    id: 'bb-5',
    name: 'Coastal Red Cross Blood Bank',
    type: 'NGO',
    city: 'Mangaluru',
    address: 'Lady Goschen Hospital Compound, Mangaluru',
    phone: '+91 824 242 3790',
    licenseNo: 'KA/BB/2018/0091',
    lat: 12.8680,
    lng: 74.8430,
    hours: '24 Hours / 7 Days',
    open24x7: true,
    stock: { 'O-': 6, 'O+': 22, 'A-': 3, 'A+': 17, 'B-': 7, 'B+': 25, 'AB-': 3, 'AB+': 14 }
  },
  {
    id: 'bb-6',
    name: 'Belagavi City Blood Bank',
    type: 'Private',
    city: 'Belagavi',
    address: 'Congress Road, Tilakwadi, Belagavi',
    phone: '+91 831 240 1928',
    licenseNo: 'KA/BB/2021/0411',
    lat: 15.8420,
    lng: 74.5060,
    hours: '8:30 AM - 9:00 PM',
    open24x7: false,
    stock: { 'O-': 2, 'O+': 14, 'A-': 1, 'A+': 12, 'B-': 3, 'B+': 16, 'AB-': 1, 'AB+': 8 }
  },
  {
    id: 'bb-7',
    name: 'Kalaburagi Red Cross Society',
    type: 'NGO',
    city: 'Kalaburagi',
    address: 'Near Old Bus Stand, Kalaburagi',
    phone: '+91 8472 221 445',
    licenseNo: 'KA/BB/2020/0345',
    lat: 17.3310,
    lng: 76.8360,
    hours: '24 Hours / 7 Days',
    open24x7: true,
    stock: { 'O-': 3, 'O+': 19, 'A-': 2, 'A+': 13, 'B-': 4, 'B+': 20, 'AB-': 1, 'AB+': 10 }
  },
  {
    id: 'bb-8',
    name: 'Davanagere District Blood Centre',
    type: 'Government',
    city: 'Davanagere',
    address: 'Chigateri General Hospital Road, Davanagere',
    phone: '+91 8192 230 119',
    licenseNo: 'KA/BB/2019/0278',
    lat: 14.4670,
    lng: 75.9230,
    hours: '24 Hours / 7 Days',
    open24x7: true,
    stock: { 'O-': 4, 'O+': 15, 'A-': 2, 'A+': 11, 'B-': 5, 'B+': 18, 'AB-': 2, 'AB+': 7 }
  },
  {
    id: 'bb-9',
    name: 'Narayana Health Blood Bank',
    type: 'Hospital-based',
    city: 'Bengaluru',
    address: 'Bommasandra Industrial Area, Anekal Taluk, Bengaluru',
    phone: '+91 80 7122 2222',
    licenseNo: 'KA/BB/2022/0612',
    lat: 12.8180,
    lng: 77.6980,
    hours: '24 Hours / 7 Days',
    open24x7: true,
    stock: { 'O-': 8, 'O+': 36, 'A-': 5, 'A+': 30, 'B-': 9, 'B+': 38, 'AB-': 4, 'AB+': 20 }
  },
  {
    id: 'bb-10',
    name: 'Rotary TTK Blood Bank',
    type: 'NGO',
    city: 'Bengaluru',
    address: 'New Thippasandra Main Road, HAL 3rd Stage, Bengaluru',
    phone: '+91 80 2528 7903',
    licenseNo: 'KA/BB/2017/0054',
    lat: 12.9720,
    lng: 77.6530,
    hours: '24 Hours / 7 Days',
    open24x7: true,
    stock: { 'O-': 3, 'O+': 29, 'A-': 4, 'A+': 24, 'B-': 6, 'B+': 31, 'AB-': 2, 'AB+': 16 }
  },
  {
    id: 'bb-11',
    name: 'Apollo BGS Hospital Blood Bank',
    type: 'Hospital-based',
    city: 'Mysuru',
    address: 'Adhichunchanagiri Road, Kuvempunagar, Mysuru',
    phone: '+91 821 256 8888',
    licenseNo: 'KA/BB/2021/0498',
    lat: 12.2900,
    lng: 76.6210,
    hours: '24 Hours / 7 Days',
    open24x7: true,
    stock: { 'O-': 1, 'O+': 20, 'A-': 3, 'A+': 16, 'B-': 4, 'B+': 22, 'AB-': 1, 'AB+': 12 }
  },
  {
    id: 'bb-12',
    name: 'KIMS Hospital Blood Centre',
    type: 'Hospital-based',
    city: 'Hubballi',
    address: 'Vidyanagar, Hubballi',
    phone: '+91 836 227 2044',
    licenseNo: 'KA/BB/2020/0388',
    lat: 15.3620,
    lng: 75.1290,
    hours: '24 Hours / 7 Days',
    open24x7: true,
    stock: { 'O-': 5, 'O+': 27, 'A-': 4, 'A+': 20, 'B-': 7, 'B+': 28, 'AB-': 3, 'AB+': 15 }
  }
];

// Helper to create live relative countdown target timestamps
const now = Date.now();
const hourMs = 60 * 60 * 1000;

export const INITIAL_URGENT_REQUESTS: UrgentRequest[] = [
  {
    id: 'req-1',
    patientInitials: 'S.M.',
    age: 48,
    bloodGroup: 'O-',
    unitsNeeded: 3,
    unitsPledged: 1,
    hospital: 'Sunrise Multispeciality Hospital',
    city: 'Bengaluru',
    urgency: 'Critical',
    neededBy: 'Needed in 2h',
    neededByTargetMs: now + 2 * hourMs,
    verifiedBy: 'Lifeline Central Blood Bank',
    status: 'Verified',
    reason: 'Cardiac surgery',
    contactMasked: '+91 98*** **419'
  },
  {
    id: 'req-2',
    patientInitials: 'R.P.',
    age: 29,
    bloodGroup: 'B+',
    unitsNeeded: 2,
    unitsPledged: 1,
    hospital: 'Apex Trauma & Emergency Care',
    city: 'Hubballi',
    urgency: 'High',
    neededBy: 'Needed in 6h',
    neededByTargetMs: now + 6 * hourMs,
    verifiedBy: 'Sanjeevini Blood Centre',
    status: 'Verified',
    reason: 'Accident trauma',
    contactMasked: '+91 94*** **820'
  },
  {
    id: 'req-3',
    patientInitials: 'A.K.',
    age: 12,
    bloodGroup: 'A+',
    unitsNeeded: 1,
    unitsPledged: 0,
    hospital: 'Childrens Memorial Hospital',
    city: 'Mysuru',
    urgency: 'Moderate',
    neededBy: 'Needed in 24h',
    neededByTargetMs: now + 24 * hourMs,
    verifiedBy: 'Mysuru Care Blood Bank',
    status: 'Verified',
    reason: 'Thalassemia transfusion',
    contactMasked: '+91 97*** **331'
  },
  {
    id: 'req-4',
    patientInitials: 'N.V.',
    age: 54,
    bloodGroup: 'AB-',
    unitsNeeded: 2,
    unitsPledged: 0,
    hospital: 'Coastal City Hospital',
    city: 'Mangaluru',
    urgency: 'Critical',
    neededBy: 'Needed in 4h',
    neededByTargetMs: now + 4 * hourMs,
    verifiedBy: 'Coastal Red Cross Blood Bank',
    status: 'Verified',
    reason: 'Rare group, emergency surgery',
    contactMasked: '+91 99*** **154'
  },
  {
    id: 'req-5',
    patientInitials: 'P.S.',
    age: 31,
    bloodGroup: 'O+',
    unitsNeeded: 4,
    unitsPledged: 2,
    hospital: 'Mother & Child Care Institute',
    city: 'Bengaluru',
    urgency: 'High',
    neededBy: 'Needed in 8h',
    neededByTargetMs: now + 8 * hourMs,
    verifiedBy: 'Lifeline Central Blood Bank',
    status: 'Verified',
    reason: 'Maternity complication',
    contactMasked: '+91 96*** **772'
  },
  {
    id: 'req-6',
    patientInitials: 'K.D.',
    age: 62,
    bloodGroup: 'A-',
    unitsNeeded: 2,
    unitsPledged: 1,
    hospital: 'Regional Surgical Hospital',
    city: 'Belagavi',
    urgency: 'Moderate',
    neededBy: 'Needed in 30h',
    neededByTargetMs: now + 30 * hourMs,
    verifiedBy: 'Belagavi City Blood Bank',
    status: 'Verified',
    reason: 'Planned surgery',
    contactMasked: '+91 91*** **844'
  },
  {
    id: 'req-7',
    patientInitials: 'M.J.',
    age: 44,
    bloodGroup: 'B-',
    unitsNeeded: 1,
    unitsPledged: 0,
    hospital: 'Oncology Research & Care Centre',
    city: 'Dharwad',
    urgency: 'High',
    neededBy: 'Needed in 12h',
    neededByTargetMs: now + 12 * hourMs,
    verifiedBy: 'Karnataka Regional Blood Centre',
    status: 'Verified',
    reason: 'Cancer treatment',
    contactMasked: '+91 98*** **902'
  },
  {
    id: 'req-8',
    patientInitials: 'T.H.',
    age: 26,
    bloodGroup: 'AB+',
    unitsNeeded: 2,
    unitsPledged: 1,
    hospital: 'District Civil Hospital',
    city: 'Kalaburagi',
    urgency: 'Moderate',
    neededBy: 'Needed in 36h',
    neededByTargetMs: now + 36 * hourMs,
    verifiedBy: 'Kalaburagi Red Cross',
    status: 'Verified',
    reason: 'Dengue platelet support',
    contactMasked: '+91 93*** **661'
  }
];

export const MYTHS_AND_FACTS: Myth[] = [
  {
    id: 1,
    myth: 'Donating blood is painful.',
    fact: 'Only a brief pinch; most donors feel little discomfort.'
  },
  {
    id: 2,
    myth: 'Donating makes you weak.',
    fact: 'The body replaces the fluid within 24 hours; rest and hydrate.'
  },
  {
    id: 3,
    myth: "Vegetarians can't donate.",
    fact: 'Healthy vegetarians can donate; iron-rich foods help replenish quickly.'
  },
  {
    id: 4,
    myth: 'It takes a lot of time.',
    fact: 'The donation itself takes about 8-10 minutes; the full visit is under an hour.'
  },
  {
    id: 5,
    myth: 'You can catch diseases by donating.',
    fact: 'Sterile, single-use, disposable equipment is used every single time.'
  },
  {
    id: 6,
    myth: 'Only O- helps in emergencies.',
    fact: 'Every group is vital; O- is the universal red-cell donor, but all blood groups save lives.'
  }
];

export const DISTRICT_INTENSITY = [
  { name: 'Bengaluru Urban', donations: 3420, level: 'High' },
  { name: 'Dharwad', donations: 1840, level: 'High' },
  { name: 'Mysuru', donations: 1650, level: 'High' },
  { name: 'Dakshina Kannada', donations: 1420, level: 'Moderate' },
  { name: 'Belagavi', donations: 1180, level: 'Moderate' },
  { name: 'Kalaburagi', donations: 940, level: 'Moderate' },
  { name: 'Davanagere', donations: 860, level: 'Moderate' },
  { name: 'Ballari', donations: 720, level: 'Emerging' },
  { name: 'Shivamogga', donations: 680, level: 'Emerging' },
  { name: 'Tumakuru', donations: 610, level: 'Emerging' },
  { name: 'Udupi', donations: 590, level: 'Emerging' },
  { name: 'Vijayapura', donations: 530, level: 'Emerging' },
];

export const MONTHLY_DONATIONS_DATA = [
  { month: 'Jan', donations: 620 },
  { month: 'Feb', donations: 690 },
  { month: 'Mar', donations: 780 },
  { month: 'Apr', donations: 850 },
  { month: 'May', donations: 910 },
  { month: 'Jun', donations: 960 },
  { month: 'Jul', donations: 1040 },
  { month: 'Aug', donations: 1120 },
  { month: 'Sep', donations: 1190 },
  { month: 'Oct', donations: 1250 },
  { month: 'Nov', donations: 1310 },
  { month: 'Dec', donations: 1340 },
];

export const BLOOD_GROUP_FULFILLMENT = [
  { group: 'O+', requests: 3120, fulfilled: 2980 },
  { group: 'B+', requests: 2840, fulfilled: 2710 },
  { group: 'A+', requests: 2410, fulfilled: 2320 },
  { group: 'O-', requests: 1240, fulfilled: 1180 },
  { group: 'B-', requests: 920, fulfilled: 860 },
  { group: 'A-', requests: 840, fulfilled: 790 },
  { group: 'AB+', requests: 780, fulfilled: 740 },
  { group: 'AB-', requests: 420, fulfilled: 390 },
];
