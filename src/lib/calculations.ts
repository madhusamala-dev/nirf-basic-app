import { TLRData, ResearchData, NIRFData, CalculatedScores } from './types';

// Placeholder functions for NIRF-determined calculations
// These would be replaced with actual NIRF formulas when available
const calculateFNtNe = (nt: number, ne: number): number => {
  if (nt === 0) return 0;
  // Placeholder: Enrollment efficiency ratio normalized to 0-1 scale
  const enrollmentRatio = Math.min(ne / nt, 1.2); // Allow up to 120% enrollment
  return Math.min(enrollmentRatio, 1); // Cap at 1 for the function value
};

const calculateFNp = (np: number): number => {
  // Placeholder: Normalize doctoral students count
  // Assuming institutions with 100+ doctoral students get maximum score
  return Math.min(np / 100, 1);
};

// NIRF Faculty-Student Ratio calculation
const calculateFSR = (f: number, nt: number, np: number): { score: number; breakdown: CalculatedScores['tlr']['fsrBreakdown'] } => {
  // N = NT + NP (Total students = Total sanctioned intake + Doctoral students)
  const totalStudents = nt + np;
  
  if (totalStudents === 0 || f === 0) {
    return {
      score: 0,
      breakdown: {
        facultyStudentRatio: 0,
        totalStudents,
        isValidRatio: false
      }
    };
  }

  // Calculate F/N ratio
  const facultyStudentRatio = f / totalStudents;
  
  // If F/N < 1:50 (0.02), FSR will be set to zero
  if (facultyStudentRatio < (1/50)) {
    return {
      score: 0,
      breakdown: {
        facultyStudentRatio,
        totalStudents,
        isValidRatio: false
      }
    };
  }

  // FSR = 25 × [15 × (F/N)]
  // Expected optimal ratio is 1:15 (0.0667) for maximum marks
  const fsrScore = Math.min(25, 25 * 15 * facultyStudentRatio);

  return {
    score: fsrScore,
    breakdown: {
      facultyStudentRatio,
      totalStudents,
      isValidRatio: true
    }
  };
};

// NIRF Faculty Quality and Experience calculation
const calculateFQE = (
  totalFacultyRequired: number,
  actualFaculty: number,
  facultyWithPhD: number,
  faculty0to8: number,
  faculty8to15: number,
  facultyAbove15: number
): { score: number; breakdown: CalculatedScores['tlr']['fqeBreakdown'] } => {
  
  // Calculate FRA: Percentage of Faculty with Ph.D. with respect to total faculty required or actual faculty (whichever is higher)
  const higherFacultyCount = Math.max(totalFacultyRequired, actualFaculty);
  const fra = higherFacultyCount > 0 ? (facultyWithPhD / higherFacultyCount) * 100 : 0;
  
  // Calculate FQ
  let fq = 0;
  if (fra >= 95) {
    fq = 10;
  } else {
    fq = 10 * (fra / 95);
  }
  
  // Calculate experience fractions
  const totalExperienceFaculty = faculty0to8 + faculty8to15 + facultyAbove15;
  const f1 = totalExperienceFaculty > 0 ? faculty0to8 / totalExperienceFaculty : 0;
  const f2 = totalExperienceFaculty > 0 ? faculty8to15 / totalExperienceFaculty : 0;
  const f3 = totalExperienceFaculty > 0 ? facultyAbove15 / totalExperienceFaculty : 0;
  
  // Calculate FE: FE = 3min(3F1, 1) + 3 min(3F2, 1) + 4 min(3F3, 1)
  const fe = 3 * Math.min(3 * f1, 1) + 3 * Math.min(3 * f2, 1) + 4 * Math.min(3 * f3, 1);
  
  // FQE = FQ + FE
  const fqeScore = Math.min(20, fq + fe);
  
  return {
    score: fqeScore,
    breakdown: {
      fq: Math.round(fq * 100) / 100,
      fe: Math.round(fe * 100) / 100,
      fra: Math.round(fra * 100) / 100,
      experienceDistribution: {
        f1: Math.round(f1 * 1000) / 1000,
        f2: Math.round(f2 * 1000) / 1000,
        f3: Math.round(f3 * 1000) / 1000
      },
      total: Math.round(fqeScore * 100) / 100
    }
  };
};

// NIRF Financial Resources Utilization calculation
const calculateFRU = (
  capitalExp1: number, capitalExp2: number, capitalExp3: number,
  operationalExp1: number, operationalExp2: number, operationalExp3: number,
  students1: number, students2: number, students3: number
): { score: number; breakdown: CalculatedScores['tlr']['fruBreakdown'] } => {
  
  // Calculate average capital expenditure per student (BC)
  const totalCapitalExp = capitalExp1 + capitalExp2 + capitalExp3;
  const totalStudents = students1 + students2 + students3;
  const bc = totalStudents > 0 ? totalCapitalExp / totalStudents : 0;
  
  // Calculate average operational expenditure per student (BO)
  const totalOperationalExp = operationalExp1 + operationalExp2 + operationalExp3;
  const bo = totalStudents > 0 ? totalOperationalExp / totalStudents : 0;
  
  // Apply scaling functions f(BC) and f(BO)
  // These are placeholder functions - actual NIRF scaling functions would be used
  // Assuming linear scaling with caps for now
  const fBc = Math.min(1, bc / 100000); // Assuming 1 lakh per student gives full marks for capital
  const fBo = Math.min(1, bo / 50000);  // Assuming 50k per student gives full marks for operational
  
  // FRU = 7.5×f(BC) + 22.5×f(BO)
  const fruScore = Math.min(30, 7.5 * fBc + 22.5 * fBo);
  
  return {
    score: fruScore,
    breakdown: {
      bc: Math.round(bc * 100) / 100,
      bo: Math.round(bo * 100) / 100,
      fBc: Math.round(fBc * 1000) / 1000,
      fBo: Math.round(fBo * 1000) / 1000,
      total: Math.round(fruScore * 100) / 100
    }
  };
};

// Calculate FRQ (Faculty Requirement Quotient) for Research calculations
const calculateFRQ = (tlrData: TLRData): number => {
  // FRQ = maximum of (nominal faculty based on 1:15 FSR OR available faculty)
  const totalStudents = tlrData.totalSanctionedIntake + tlrData.doctoralStudents;
  const nominalFacultyFor15Ratio = totalStudents / 15; // Required faculty for 1:15 ratio
  const availableFaculty = tlrData.totalFaculty;
  
  return Math.max(nominalFacultyFor15Ratio, availableFaculty);
};

// NIRF Publications (PU) calculation
const calculatePU = (
  totalWeightedPublications: number,
  retractedPublications: number,
  frq: number
): { score: number; breakdown: CalculatedScores['research']['puBreakdown'] } => {
  
  // Calculate P/FRQ ratio
  const publicationRatio = frq > 0 ? totalWeightedPublications / frq : 0;
  
  // Apply scaling functions f(P/FRQ) and f(Pret)
  // These are placeholder functions - actual NIRF scaling functions would be used
  const fPublicationRatio = Math.min(1, publicationRatio / 10); // Assuming 10 publications per faculty gives full marks
  const fRetracted = Math.min(1, retractedPublications / 5); // Penalty scaling for retractions
  
  // PU = 35 × f(P/FRQ) - 5 × f(Pret)
  const puScore = Math.max(0, 35 * fPublicationRatio - 5 * fRetracted);
  
  return {
    score: puScore,
    breakdown: {
      p: totalWeightedPublications,
      pret: retractedPublications,
      frq: Math.round(frq * 100) / 100,
      publicationRatio: Math.round(publicationRatio * 100) / 100,
      fPublicationRatio: Math.round(fPublicationRatio * 1000) / 1000,
      fRetracted: Math.round(fRetracted * 1000) / 1000,
      total: Math.round(puScore * 100) / 100
    }
  };
};

// NIRF Quality of Publications (QP) calculation
const calculateQP = (
  totalCitationCount: number,
  top25PercentileCitations: number,
  retractedCitations: number,
  totalWeightedPublications: number,
  frq: number
): { score: number; breakdown: CalculatedScores['research']['qpBreakdown'] } => {
  
  // Calculate CC/FRQ ratio
  const citationRatio = frq > 0 ? totalCitationCount / frq : 0;
  
  // Calculate TOP25P/P ratio
  const top25Ratio = totalWeightedPublications > 0 ? top25PercentileCitations / totalWeightedPublications : 0;
  
  // Apply scaling functions
  const fCitationRatio = Math.min(1, citationRatio / 100); // Assuming 100 citations per faculty gives full marks
  const fTop25Ratio = Math.min(1, top25Ratio); // Ratio is already 0-1, so cap at 1
  const fRetractedCitations = Math.min(1, retractedCitations / 10); // Penalty scaling for retracted citations
  
  // QP = {20 × f(CC/FRQ) + 20 × f(TOP25P/P)} - 5 × f(Cret)
  const qpScore = Math.max(0, 20 * fCitationRatio + 20 * fTop25Ratio - 5 * fRetractedCitations);
  
  return {
    score: qpScore,
    breakdown: {
      cc: totalCitationCount,
      top25p: top25PercentileCitations,
      cret: retractedCitations,
      citationRatio: Math.round(citationRatio * 100) / 100,
      top25Ratio: Math.round(top25Ratio * 1000) / 1000,
      fCitationRatio: Math.round(fCitationRatio * 1000) / 1000,
      fTop25Ratio: Math.round(fTop25Ratio * 1000) / 1000,
      fRetractedCitations: Math.round(fRetractedCitations * 1000) / 1000,
      total: Math.round(qpScore * 100) / 100
    }
  };
};

// NIRF IPR and Patents calculation
const calculateIPR = (
  patentsGranted: number,
  patentsPublished: number
): { score: number; breakdown: CalculatedScores['research']['iprBreakdown'] } => {
  
  // Apply scaling functions
  const fPatentsGranted = Math.min(1, patentsGranted / 20); // Assuming 20 granted patents gives full marks
  const fPatentsPublished = Math.min(1, patentsPublished / 30); // Assuming 30 published patents gives full marks
  
  // IPG = 10 × f(PG)
  const ipg = 10 * fPatentsGranted;
  
  // IPP = 5 × f(PP)
  const ipp = 5 * fPatentsPublished;
  
  // IPR = IPG + IPP
  const iprScore = ipg + ipp;
  
  return {
    score: iprScore,
    breakdown: {
      pg: patentsGranted,
      pp: patentsPublished,
      ipg: Math.round(ipg * 100) / 100,
      ipp: Math.round(ipp * 100) / 100,
      total: Math.round(iprScore * 100) / 100
    }
  };
};

// NIRF Footprint of Projects and Professional Practice calculation
const calculateFPPP = (
  averageResearchFundingPerFaculty: number,
  averageConsultancyPerFaculty: number
): { score: number; breakdown: CalculatedScores['research']['fpppBreakdown'] } => {
  
  // Apply scaling functions
  const fResearchFunding = Math.min(1, averageResearchFundingPerFaculty / 1000000); // Assuming 10 lakh per faculty gives full marks
  const fConsultancy = Math.min(1, averageConsultancyPerFaculty / 500000); // Assuming 5 lakh per faculty gives full marks
  
  // FPR = 7.5 × f(RF)
  const fpr = 7.5 * fResearchFunding;
  
  // FPC = 2.5 × f(CF)
  const fpc = 2.5 * fConsultancy;
  
  // FPPP = FPR + FPC
  const fpppScore = fpr + fpc;
  
  return {
    score: fpppScore,
    breakdown: {
      rf: averageResearchFundingPerFaculty,
      cf: averageConsultancyPerFaculty,
      fpr: Math.round(fpr * 100) / 100,
      fpc: Math.round(fpc * 100) / 100,
      total: Math.round(fpppScore * 100) / 100
    }
  };
};

export const calculateTLRScores = (data: TLRData): CalculatedScores['tlr'] => {
  // Student Strength (SS) - 20 marks
  // SS = f(NT, NE) × 15 + f(NP) × 5
  const fNtNe = calculateFNtNe(data.totalSanctionedIntake, data.totalEnrolledStudents);
  const fNp = calculateFNp(data.doctoralStudents);
  const ssScore = (fNtNe * 15) + (fNp * 5);

  // Faculty-Student Ratio (FSR) - 30 marks
  const fsrResult = calculateFSR(data.fullTimeRegularFaculty, data.totalSanctionedIntake, data.doctoralStudents);

  // Faculty Quality & Experience (FQE) - 20 marks
  const fqeResult = calculateFQE(
    data.totalFacultyRequired,
    data.totalFaculty,
    data.facultyWithPhD,
    data.facultyExperience0to8,
    data.facultyExperience8to15,
    data.facultyExperienceAbove15
  );

  // Financial Resources Utilization (FRU) - 30 marks
  const fruResult = calculateFRU(
    data.capitalExpenditureYear1, data.capitalExpenditureYear2, data.capitalExpenditureYear3,
    data.operationalExpenditureYear1, data.operationalExpenditureYear2, data.operationalExpenditureYear3,
    data.engineeringStudentsYear1, data.engineeringStudentsYear2, data.engineeringStudentsYear3
  );

  const total = ssScore + fsrResult.score + fqeResult.score + fruResult.score;

  return {
    ss: Math.round(ssScore * 100) / 100,
    ssBreakdown: {
      fNtNe: Math.round(fNtNe * 1000) / 1000,
      fNp: Math.round(fNp * 1000) / 1000,
      total: Math.round(ssScore * 100) / 100
    },
    fsr: Math.round(fsrResult.score * 100) / 100,
    fsrBreakdown: {
      facultyStudentRatio: Math.round(fsrResult.breakdown.facultyStudentRatio * 10000) / 10000,
      totalStudents: fsrResult.breakdown.totalStudents,
      isValidRatio: fsrResult.breakdown.isValidRatio
    },
    fqe: Math.round(fqeResult.score * 100) / 100,
    fqeBreakdown: fqeResult.breakdown,
    fru: Math.round(fruResult.score * 100) / 100,
    fruBreakdown: fruResult.breakdown,
    total: Math.round(total * 100) / 100
  };
};

export const calculateResearchScores = (researchData: ResearchData, tlrData: TLRData): CalculatedScores['research'] => {
  // Calculate FRQ using TLR data
  const frq = calculateFRQ(tlrData);
  
  // Publications (PU) - 35 marks
  const puResult = calculatePU(researchData.totalWeightedPublications, researchData.retractedPublications, frq);
  
  // Quality of Publications (QP) - 40 marks
  const qpResult = calculateQP(
    researchData.totalCitationCount,
    researchData.top25PercentileCitations,
    researchData.retractedCitations,
    researchData.totalWeightedPublications,
    frq
  );
  
  // IPR and Patents (IPR) - 15 marks
  const iprResult = calculateIPR(researchData.patentsGranted, researchData.patentsPublished);
  
  // Footprint of Projects and Professional Practice (FPPP) - 10 marks
  const fpppResult = calculateFPPP(
    researchData.averageResearchFundingPerFaculty,
    researchData.averageConsultancyPerFaculty
  );
  
  const total = puResult.score + qpResult.score + iprResult.score + fpppResult.score;
  
  return {
    pu: Math.round(puResult.score * 100) / 100,
    puBreakdown: puResult.breakdown,
    qp: Math.round(qpResult.score * 100) / 100,
    qpBreakdown: qpResult.breakdown,
    ipr: Math.round(iprResult.score * 100) / 100,
    iprBreakdown: iprResult.breakdown,
    fppp: Math.round(fpppResult.score * 100) / 100,
    fpppBreakdown: fpppResult.breakdown,
    total: Math.round(total * 100) / 100
  };
};

export const calculateFinalScore = (data: NIRFData): CalculatedScores => {
  const tlrScores = calculateTLRScores(data.tlr);
  const researchScores = calculateResearchScores(data.research, data.tlr);
  
  // Simplified calculations for other sections (would need actual formulas)
  const graduationScore = Math.min(100, (data.graduation.graduationRate * 0.3 + data.graduation.employmentRate * 0.4 + data.graduation.higherStudiesRate * 0.2 + (data.graduation.medianSalary / 1000000) * 0.1 * 100));
  const outreachScore = Math.min(100, (data.outreach.diversityIndex * 0.25 + data.outreach.womenEnrollment * 0.25 + data.outreach.economicallyBackward * 0.25 + data.outreach.sociallyBackward * 0.25));
  const perceptionScore = Math.min(100, (data.perception.academicPeerScore * 0.4 + data.perception.employerScore * 0.4 + data.perception.publicationImpact * 0.2));

  // Apply weightages: TLR(30%), Research(30%), Graduation(20%), Outreach(10%), Perception(10%)
  const finalScore = (tlrScores.total * 0.30) + (researchScores.total * 0.30) + (graduationScore * 0.20) + (outreachScore * 0.10) + (perceptionScore * 0.10);

  return {
    tlr: tlrScores,
    research: researchScores,
    graduation: Math.round(graduationScore * 100) / 100,
    outreach: Math.round(outreachScore * 100) / 100,
    perception: Math.round(perceptionScore * 100) / 100,
    finalScore: Math.round(finalScore * 100) / 100
  };
};