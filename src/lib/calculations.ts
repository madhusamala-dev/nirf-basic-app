import { TLRData, NIRFData, CalculatedScores } from './types';

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

export const calculateTLRScores = (data: TLRData): CalculatedScores['tlr'] => {
  // Student Strength (SS) - 20 marks
  // SS = f(NT, NE) × 15 + f(NP) × 5
  const fNtNe = calculateFNtNe(data.totalSanctionedIntake, data.totalEnrolledStudents);
  const fNp = calculateFNp(data.doctoralStudents);
  const ssScore = (fNtNe * 15) + (fNp * 5);

  // Faculty-Student Ratio (FSR) - 30 marks
  const fsrResult = calculateFSR(data.fullTimeRegularFaculty, data.totalSanctionedIntake, data.doctoralStudents);

  // Faculty Quality & Experience (FQE) - 20 marks
  const phdPercentage = data.totalFaculty > 0 ? (data.facultyWithPhD / data.totalFaculty) * 100 : 0;
  const experiencePercentage = data.totalFaculty > 0 ? (data.experiencedFaculty / data.totalFaculty) * 100 : 0;
  const fqeScore = Math.min(20, (phdPercentage * 0.6 + experiencePercentage * 0.4) / 5);

  // Financial Resources Utilization (FRU) - 30 marks
  const utilizationRate = data.financialResources > 0 ? (data.resourceUtilization / data.financialResources) * 100 : 0;
  const fruScore = Math.min(30, utilizationRate / 3.33);

  const total = ssScore + fsrResult.score + fqeScore + fruScore;

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
    fqe: Math.round(fqeScore * 100) / 100,
    fru: Math.round(fruScore * 100) / 100,
    total: Math.round(total * 100) / 100
  };
};

export const calculateFinalScore = (data: NIRFData): CalculatedScores => {
  const tlrScores = calculateTLRScores(data.tlr);
  
  // Simplified calculations for other sections (would need actual formulas)
  const researchScore = Math.min(100, (data.research.publications * 0.4 + data.research.citations * 0.3 + data.research.patents * 0.2 + data.research.projects * 0.1));
  const graduationScore = Math.min(100, (data.graduation.graduationRate * 0.3 + data.graduation.employmentRate * 0.4 + data.graduation.higherStudiesRate * 0.2 + (data.graduation.medianSalary / 1000000) * 0.1 * 100));
  const outreachScore = Math.min(100, (data.outreach.diversityIndex * 0.25 + data.outreach.womenEnrollment * 0.25 + data.outreach.economicallyBackward * 0.25 + data.outreach.sociallyBackward * 0.25));
  const perceptionScore = Math.min(100, (data.perception.academicPeerScore * 0.4 + data.perception.employerScore * 0.4 + data.perception.publicationImpact * 0.2));

  // Apply weightages
  const finalScore = (tlrScores.total * 0.30) + (researchScore * 0.30) + (graduationScore * 0.20) + (outreachScore * 0.10) + (perceptionScore * 0.10);

  return {
    tlr: tlrScores,
    research: Math.round(researchScore * 100) / 100,
    graduation: Math.round(graduationScore * 100) / 100,
    outreach: Math.round(outreachScore * 100) / 100,
    perception: Math.round(perceptionScore * 100) / 100,
    finalScore: Math.round(finalScore * 100) / 100
  };
};