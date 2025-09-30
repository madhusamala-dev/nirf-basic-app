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
  
  // Faculty Quality & Experience (FQE) - Updated with NIRF formula fields
  totalFacultyRequired: number; // Total faculty required
  facultyWithPhD: number; // Faculty with Ph.D. or equivalent
  facultyExperience0to8: number; // Faculty with 0-8 years experience
  facultyExperience8to15: number; // Faculty with 8-15 years experience
  facultyExperienceAbove15: number; // Faculty with >15 years experience
  experiencedFaculty: number; // Keep for backward compatibility
  
  // Financial Resources Utilization (FRU) - Updated with NIRF formula fields
  // Capital Expenditure for previous 3 years (excluding new building construction)
  capitalExpenditureYear1: number; // Most recent year
  capitalExpenditureYear2: number; // Second year
  capitalExpenditureYear3: number; // Third year
  
  // Operational/Recurring Expenditure for previous 3 years (excluding hostel maintenance)
  operationalExpenditureYear1: number; // Most recent year
  operationalExpenditureYear2: number; // Second year
  operationalExpenditureYear3: number; // Third year
  
  // Engineering students for previous 3 years
  engineeringStudentsYear1: number; // Most recent year
  engineeringStudentsYear2: number; // Second year
  engineeringStudentsYear3: number; // Third year
  
  // Legacy fields for backward compatibility
  financialResources: number;
  resourceUtilization: number;
}

export interface ResearchData {
  // Publications (PU) - 35 marks
  totalWeightedPublications: number; // P - weighted publications from third-party sources
  retractedPublications: number; // Pret - number of retracted publications
  
  // Quality of Publications (QP) - 40 marks
  totalCitationCount: number; // CC - Total citation count over previous 3 years
  top25PercentileCitations: number; // TOP25P - Citations in top 25 percentile over previous 3 years
  retractedCitations: number; // Cret - Total retracted citations over previous 3 years
  
  // IPR and Patents (IPR) - 15 marks
  patentsGranted: number; // PG - Patents granted over previous 3 years
  patentsPublished: number; // PP - Patents published over previous 3 years
  
  // Footprint of Projects and Professional Practice (FPPP) - 10 marks
  averageResearchFundingPerFaculty: number; // RF - Average annual research funding per faculty (₹) over previous 3 years
  averageConsultancyPerFaculty: number; // CF - Average annual consultancy amount per faculty (₹) over previous 3 years
  
  // Legacy fields for backward compatibility
  qualityPublications: number;
  projectsFootprint: number;
  professionalPractice: number;
  publications: number;
  citations: number;
  patents: number;
  projects: number;
}

export interface GraduationData {
  // Placement and Higher Studies (GPH) - 40 marks
  placementPercentage: number; // Np - Percentage of graduating students placed (3 years)
  higherStudiesPercentage: number; // Nhs - Percentage of graduating students in higher studies (3 years)
  
  // University Examinations (GUE) - 15 marks
  passPercentageInStipulatedTime: number; // Ng - Pass rate in stipulated time (3-year average)
  
  // Median Salary (GMS) - 25 marks
  medianSalaryGraduates: number; // MS - Median salary of graduates (3 years)
  
  // Ph.D Graduates (GPHD) - 20 marks
  averagePhdGraduates: number; // Nphd - Average Ph.D graduates (3 years)
  
  // Legacy fields for backward compatibility
  graduationRate: number;
  employmentRate: number;
  higherStudiesRate: number;
  medianSalary: number;
}

export interface OutreachData {
  // Region Diversity (RD) - 30 marks
  studentsFromOtherStates: number; // Students from other states
  totalStudentsEnrolled: number; // Total students for calculating fractions
  studentsFromOtherCountries: number; // Students from other countries
  
  // Women Diversity (WD) - 30 marks
  womenStudentsPercentage: number; // NWS - Percentage of women students
  womenFacultyPercentage: number; // NWF - Percentage of women faculty
  
  // Economically and Socially Challenged Students (ESCS) - 20 marks
  ugStudentsWithFullFeeReimbursement: number; // UG students with full tuition fee reimbursement
  totalUgStudents: number; // Total UG students for percentage calculation
  
  // Facilities for Physically Challenged Students (PCS) - 20 marks
  physicallyCharallengedFacilitiesScore: number; // Score based on facilities provided (0-20)
  
  // Legacy fields for backward compatibility
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
    fqeBreakdown: {
      fq: number;
      fe: number;
      fra: number;
      experienceDistribution: {
        f1: number;
        f2: number;
        f3: number;
      };
      total: number;
    };
    fru: number;
    fruBreakdown: {
      bc: number; // Average capital expenditure per student
      bo: number; // Average operational expenditure per student
      fBc: number; // Scaling function result for BC
      fBo: number; // Scaling function result for BO
      total: number;
    };
    total: number;
  };
  research: {
    pu: number;
    puBreakdown: {
      p: number; // Weighted publications
      pret: number; // Retracted publications
      frq: number; // Faculty requirement quotient
      publicationRatio: number; // P/FRQ
      fPublicationRatio: number; // f(P/FRQ)
      fRetracted: number; // f(Pret)
      total: number;
    };
    qp: number;
    qpBreakdown: {
      cc: number; // Total citation count
      top25p: number; // Top 25% citations
      cret: number; // Retracted citations
      citationRatio: number; // CC/FRQ
      top25Ratio: number; // TOP25P/P
      fCitationRatio: number; // f(CC/FRQ)
      fTop25Ratio: number; // f(TOP25P/P)
      fRetractedCitations: number; // f(Cret)
      total: number;
    };
    ipr: number;
    iprBreakdown: {
      pg: number; // Patents granted
      pp: number; // Patents published
      ipg: number; // IPG = 10 × f(PG)
      ipp: number; // IPP = 5 × f(PP)
      total: number;
    };
    fppp: number;
    fpppBreakdown: {
      rf: number; // Average research funding per faculty
      cf: number; // Average consultancy per faculty
      fpr: number; // FPR = 7.5 × f(RF)
      fpc: number; // FPC = 2.5 × f(CF)
      total: number;
    };
    total: number;
  };
  graduation: {
    gph: number;
    gphBreakdown: {
      np: number; // Placement percentage
      nhs: number; // Higher studies percentage
      total: number;
    };
    gue: number;
    gueBreakdown: {
      ng: number; // Pass percentage in stipulated time
      total: number;
    };
    gms: number;
    gmsBreakdown: {
      ms: number; // Median salary
      fMs: number; // f(MS)
      total: number;
    };
    gphd: number;
    gphdBreakdown: {
      nphd: number; // Average Ph.D graduates
      fNphd: number; // f(Nphd)
      total: number;
    };
    total: number;
  };
  outreach: {
    rd: number;
    rdBreakdown: {
      otherStatesFraction: number;
      otherCountriesFraction: number;
      total: number;
    };
    wd: number;
    wdBreakdown: {
      nws: number; // Women students percentage
      nwf: number; // Women faculty percentage
      studentsComponent: number; // 15 × (NWS/50)
      facultyComponent: number; // 15 × (NWF/20)
      total: number;
    };
    escs: number;
    escsBreakdown: {
      nesc: number; // Percentage with fee reimbursement
      fNesc: number; // f(Nesc)
      total: number;
    };
    pcs: number;
    pcsBreakdown: {
      facilitiesScore: number;
      total: number;
    };
    total: number;
  };
  perception: number;
  finalScore: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  college: College | null;
}