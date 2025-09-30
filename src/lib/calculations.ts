import { TLRData, NIRFData, CalculatedScores } from './types';

export const calculateTLRScores = (data: TLRData): CalculatedScores['tlr'] => {
  // Student Strength (SS) - 20 marks
  const totalStudents = data.studentStrength + data.doctoralStudents;
  const ssScore = Math.min(20, (totalStudents / 1000) * 10); // Example calculation

  // Faculty-Student Ratio (FSR) - 30 marks
  const facultyStudentRatio = data.permanentFaculty / data.studentStrength;
  const fsrScore = Math.min(30, facultyStudentRatio * 100); // Example calculation

  // Faculty Quality & Experience (FQE) - 20 marks
  const phdPercentage = (data.facultyWithPhD / data.totalFaculty) * 100;
  const experiencePercentage = (data.experiencedFaculty / data.totalFaculty) * 100;
  const fqeScore = Math.min(20, (phdPercentage * 0.6 + experiencePercentage * 0.4) / 5);

  // Financial Resources Utilization (FRU) - 30 marks
  const utilizationRate = (data.resourceUtilization / data.financialResources) * 100;
  const fruScore = Math.min(30, utilizationRate / 3.33);

  const total = ssScore + fsrScore + fqeScore + fruScore;

  return {
    ss: Math.round(ssScore * 100) / 100,
    fsr: Math.round(fsrScore * 100) / 100,
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