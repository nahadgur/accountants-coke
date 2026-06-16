// Domain types shared across server + client. In production, generate the full
// Database type with `supabase gen types typescript`. These hand-written types
// mirror that output for the tables/views we touch.

export type CertificationType = 'CPA-K' | 'ACCA' | 'CIFA';
export type DesignTier = 'free' | 'premium';
export type EmploymentType =
  | 'Full-time'
  | 'Part-time'
  | 'Contract'
  | 'Internship'
  | 'Temporary';
export type Specialization =
  | 'Tax Audit'
  | 'Forensic Accounting'
  | 'Bookkeeping'
  | 'Corporate Finance'
  | 'Payroll'
  | 'Statutory Audit'
  | 'Management Consulting'
  | 'Company Secretarial';
export type LeadStatus = 'open' | 'routed' | 'claimed' | 'closed';

/** Row returned by the `public_directory_profiles` view (contact fields are
 *  NULL unless active-premium or the viewer is the owner). */
export interface DirectoryProfile {
  id: string;
  full_name: string;
  slug: string | null;
  bio: string | null;
  certification_type: CertificationType | null;
  registration_number: string | null;
  location: string;
  town: string | null;
  specializations: Specialization[];
  firm_id: string | null;
  avatar_url: string | null;
  header_image_url: string | null;
  is_verified: boolean;
  design_tier: DesignTier;
  monthly_subscription_active: boolean;
  created_at: string;
  // gated:
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  calendly_url: string | null;
}

export interface Firm {
  id: string;
  owner_id: string | null;
  name: string;
  slug: string | null;
  logo_url: string | null;
  description: string | null;
  location: string;
  town: string | null;
  website: string | null;
  premium_status: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobPosting {
  id: string;
  firm_id: string | null;
  posted_by: string | null;
  direct_employer: string | null;
  title: string;
  slug: string | null;
  description: string;
  employment_type: EmploymentType;
  location: string;
  town: string | null;
  specialization: Specialization | null;
  salary_range_min: number | null;
  salary_range_max: number | null;
  salary_currency: string;
  applications_count: number;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  expires_at: string;
  updated_at: string;
}

export interface JobWithFirm extends JobPosting {
  firm: Pick<Firm, 'id' | 'name' | 'logo_url' | 'website' | 'location'> | null;
}

export interface Lead {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  service_needed: Specialization;
  location: string;
  town: string | null;
  message: string | null;
  status: LeadStatus;
  assigned_to_profile_id: string | null;
  created_at: string;
}

// --- Filter option constants (single source of truth for the UI + validation)

export const KENYAN_CITIES = [
  'Nairobi',
  'Mombasa',
  'Kisumu',
  'Nakuru',
  'Eldoret',
  'Thika',
] as const;

export const NAIROBI_TOWNS = [
  'Westlands',
  'Upper Hill',
  'CBD',
  'Kilimani',
  'Karen',
  'Parklands',
] as const;

export const SPECIALIZATIONS: Specialization[] = [
  'Tax Audit',
  'Forensic Accounting',
  'Bookkeeping',
  'Corporate Finance',
  'Payroll',
  'Statutory Audit',
  'Management Consulting',
  'Company Secretarial',
];

export const CERTIFICATIONS: CertificationType[] = ['CPA-K', 'ACCA', 'CIFA'];

export const EMPLOYMENT_TYPES: EmploymentType[] = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Temporary',
];
