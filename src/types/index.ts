export type UserRole = 'worker' | 'customer' | 'business' | 'admin';

export interface User {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  role: UserRole;
  profilePhotoUrl?: string;
  city: string;
  address?: string;
  verifiedEmail: boolean;
  verifiedPhone: boolean;
  cooperativeBranch?: string;
  createdAt: string;
}

export interface WorkerProfile {
  id: string;
  userId: string;
  fullName: string;
  trade: string;
  experienceLevel: '0-1yr' | '1-3yr' | '3-5yr' | '5+yr';
  skills: string[];
  certifications: string[];
  rating: number;
  totalJobsCompleted: number;
  verifiedStatus: 1 | 2 | 3;
  communityVouchesCount: number;
  minRate: number;
  avgHourlyRate: number;
  womenWorker: boolean;
  backgroundCheckStatus: 'verified' | 'pending' | 'in_review';
  insuranceEnrolled: boolean;
  profilePhotoUrl: string;
  bio: string;
  available: boolean;
  location: string;
  heritageSkills?: string[];
  safeTimeEnabled?: boolean;
  vulnerabilityScore?: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  basePrice: number;
  priceUnit: string;
  image: string;
  colorCode: 'coop-green' | 'card-purple' | 'card-blue' | 'soft-teal' | 'warning';
  badgeText?: string;
  popular?: boolean;
  includedFeatures: string[];
  certifiedWorkersCount: number;
}

export type BookingStatus = 'pending' | 'accepted' | 'en-route' | 'in-progress' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  workerId: string;
  workerName: string;
  workerPhoto: string;
  workerTrade: string;
  serviceTitle: string;
  serviceCategory: string;
  status: BookingStatus;
  scheduledDate: string;
  scheduledTime: string;
  durationHours: number;
  location: string;
  price: number;
  ratingGiven?: number;
  safetyRating?: number;
  reviewComment?: string;
  createdAt: string;
  isBatch?: boolean;
  isTeamJob?: boolean;
  teamSize?: number;
}

export interface WageLedgerEntry {
  id: string;
  bookingId: string;
  workerId: string;
  serviceTitle: string;
  customerName: string;
  date: string;
  grossAmount: number;
  workerNet: number;
  insuranceDeduction: number;
  coopOverhead: number;
  platformProfit: number;
  paymentStatus: 'completed' | 'processing' | 'pending';
}

export interface WorkerAppeal {
  id: string;
  workerId: string;
  workerName: string;
  workerTrade: string;
  workerPhoto: string;
  issueType: 'penalty_dispute' | 'rating_invalidation' | 'account_strike' | 'deactivation_review';
  title: string;
  description: string;
  filedDate: string;
  status: 'submitted' | 'under_jury_review' | 'resolved' | 'overturned';
  juryVotes: {
    approve: number;
    reject: number;
    total: number;
  };
  resolutionNote?: string;
}

export interface CollectiveBargaining {
  id: string;
  trade: string;
  currentMinRate: number;
  proposedMinRate: number;
  workersAgreed: number;
  totalEligibleWorkers: number;
  votingDaysRemaining: number;
  status: 'active' | 'passed' | 'review';
  rateHistory: { month: string; rate: number }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  trade?: string;
  avatar: string;
  quote: string;
  rating: number;
  coopChapter: string;
}

export interface DemandLocation {
  id: string;
  zone: string;
  city: string;
  demandLevel: 'high' | 'surge' | 'moderate' | 'stable';
  activeWorkers: number;
  openJobs: number;
  avgHourlySurge: string;
}

// --- NEW TYPES ---

export interface Agency {
  id: string;
  name: string;
  logoUrl: string;
  tagline: string;
  city: string;
  servicesOffered: string[];
  rating: number;
  totalReviews: number;
  workersCount: number;
  responseTime: string;
  qualityGuarantee: string;
  insuranceCoverage: string;
  verified: boolean;
  status: 'approved' | 'pending' | 'suspended';
  monthlyRevenue: number;
  satisfactionScore: number;
  slaCompliancePercent: number;
  createdAt: string;
}

export interface BatchBooking {
  id: string;
  createdBy: string;
  societyName: string;
  totalHouseholds: number;
  households: {
    address: string;
    serviceType: string;
    preferredTime: string;
    status: 'scheduled' | 'completed' | 'pending';
  }[];
  totalCost: number;
  individualCost: number;
  savingsPercent: number;
  assignedWorkerId?: string;
  scheduledDate: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed';
}

export interface Bundle {
  id: string;
  name: string;
  services: string[];
  discountPercent: number;
  totalPrice: number;
  originalPrice: number;
  popularityPercent: number;
  description: string;
}

export interface CustomService {
  id: string;
  customerId: string;
  customerName: string;
  rawDescription: string;
  aiSummary: {
    service_title: string;
    description: string;
    required_skills: string[];
    estimated_duration: string;
    team_size: string;
    complexity_level: string;
  };
  budgetMin: number;
  budgetMax: number;
  timeline: string;
  location: string;
  status: 'open' | 'bidding' | 'awarded' | 'completed';
  bids: CustomServiceBid[];
  createdAt: string;
}

export interface CustomServiceBid {
  id: string;
  workerId: string;
  workerName: string;
  workerPhoto: string;
  workerRating: number;
  bidAmount: number;
  timeline: string;
  description: string;
  createdAt: string;
}

export interface CrisisEvent {
  id: string;
  name: string;
  trigger: string;
  severity: 'low' | 'moderate' | 'high';
  status: 'active' | 'resolved';
  demandDropPercent: number;
  startDate: string;
  endDate?: string;
  workersProtected: number;
  allocationSplit: { rating: number; vulnerability: number };
}

export interface DemandForecast {
  day: string;
  cleaning: number;
  electrical: number;
  plumbing: number;
  pestControl: number;
  carpentry: number;
  total: number;
}

export interface SafetyIncident {
  id: string;
  workerId: string;
  workerName: string;
  customerId: string;
  customerName: string;
  incidentType: 'harassment' | 'physical_threat' | 'property_damage' | 'payment_dispute';
  severity: 'yellow' | 'red';
  description: string;
  status: 'open' | 'under_review' | 'resolved' | 'escalated';
  reportedAt: string;
  resolvedAt?: string;
  actionTaken?: string;
}

export interface TeamJob {
  id: string;
  bookingId: string;
  serviceTitle: string;
  customerName: string;
  location: string;
  scheduledDate: string;
  scheduledTime: string;
  teamSize: number;
  totalPay: number;
  perPersonPay: number;
  teamLeadId: string;
  members: { id: string; name: string; photo: string; role: 'lead' | 'member' }[];
  status: 'pending' | 'accepted' | 'in-progress' | 'completed';
  stops?: { address: string; order: number; status: 'pending' | 'completed' }[];
}

export interface InsuranceClaim {
  id: string;
  workerId: string;
  claimType: 'hospitalization' | 'accident' | 'maternity' | 'fracture';
  amount: number;
  status: 'filed' | 'under_review' | 'approved' | 'rejected' | 'paid';
  filedDate: string;
  resolvedDate?: string;
  documents: string[];
}

export interface ComplianceRecord {
  workerId: string;
  workerName: string;
  verificationStatus: 'verified' | 'pending' | 'expired';
  insuranceStatus: 'enrolled' | 'lapsed' | 'pending';
  backgroundCheck: 'clear' | 'pending' | 'flagged';
  certExpiry: string;
  daysUntilExpiry: number;
}
