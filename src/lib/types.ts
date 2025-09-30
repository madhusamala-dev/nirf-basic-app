export interface College {
  id: string;
  name: string;
  category: CollegeCategory;
}

export type CollegeCategory = 'overall' | 'engineering' | 'management' | 'pharmacy' | 'medical' | 'law';

export interface TLRData {
  studentStrength: number;
  doctoralStudents: number;
  totalFaculty: number;
  permanentFaculty: number;
  facultyWithPhD: number;
  experiencedFaculty: number;
  financialResources: number;
  resourceUtilization: number;
}

export interface ResearchData {
  publications: number;
  citations: number;
  patents: number;
  projects: number;
}

export interface GraduationData {
  graduationRate: number;
  employmentRate: number;
  higherStudiesRate: number;
  medianSalary: number;
}

export interface OutreachData {
  diversityIndex: number;
  womenEnrollment: number;
  economicallyBackward: number;
  sociallyBackward: number;
}

export interface PerceptionData {
  academicPeerScore: number;
  employerScore: number;
  publicationImpact: number;
}

export interface NIRFData {
  tlr: TLRData;
  research: ResearchData;
  graduation: GraduationData;
  outreach: OutreachData;
  perception: PerceptionData;
}

export interface CalculatedScores {
  tlr: {
    ss: number;
    fsr: number;
    fqe: number;
    fru: number;
    total: number;
  };
  research: number;
  graduation: number;
  outreach: number;
  perception: number;
  finalScore: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  college: College | null;
}