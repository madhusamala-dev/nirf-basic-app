export interface College {
  id: string;
  name: string;
  category: CollegeCategory;
}

export type CollegeCategory = 'overall' | 'engineering' | 'management' | 'pharmacy' | 'medical' | 'law';

export interface TLRData {
  // Student Strength (SS) - Updated with NIRF formula fields
  totalSanctionedIntake: number; // NT
  totalEnrolledStudents: number; // NE
  doctoralStudents: number; // NP
  
  // Faculty-Student Ratio (FSR) - Updated with NIRF formula fields
  fullTimeRegularFaculty: number; // F - Full-time regular faculty (previous year)
  totalFaculty: number; // Keep for backward compatibility
  permanentFaculty: number; // Keep for backward compatibility
  
  // Faculty Quality & Experience (FQE)
  facultyWithPhD: number;
  experiencedFaculty: number;
  
  // Financial Resources Utilization (FRU)
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
    ssBreakdown: {
      fNtNe: number;
      fNp: number;
      total: number;
    };
    fsr: number;
    fsrBreakdown: {
      facultyStudentRatio: number;
      totalStudents: number;
      isValidRatio: boolean;
    };
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