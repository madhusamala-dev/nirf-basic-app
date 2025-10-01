import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface TLRData {
  studentStrength: number;
  facultyStudent: number;
  facultyPhD: number;
  facultyExperience: number;
  financialResources: number;
  physicalInfrastructure: number;
}

export interface ResearchData {
  publications: number;
  citations: number;
  patents: number;
  phDGraduates: number;
  researchProjects: number;
  consultancy: number;
}

export interface GraduationData {
  graduationRate: number;
  placementRate: number;
  medianSalary: number;
  higherStudies: number;
}

export interface OutreachData {
  womenStudents: number;
  economicallyBackward: number;
  sociallyBackward: number;
  physicallyDisabled: number;
  regionDiversity: number;
}

export interface PerceptionData {
  academicPeerScore: number;
  employerScore: number;
  publicationImpact: number;
}

export interface Scores {
  tlr: {
    ss: number;
    fsr: number;
    fqe: number;
    fru: number;
    total: number;
  };
  research: {
    pu: number;
    qp: number;
    ipr: number;
    fppp: number;
    total: number;
  };
  graduation: {
    go: number;
    total: number;
  };
  outreach: {
    oi: number;
    total: number;
  };
  perception: {
    pr: number;
    total: number;
  };
  finalScore: number;
}

export interface SubmissionData {
  id: string;
  coordinatorId: string;
  coordinatorName: string;
  collegeName: string;
  tlrData: TLRData;
  researchData: ResearchData;
  graduationData: GraduationData;
  outreachData: OutreachData;
  perceptionData: PerceptionData;
  scores: Scores;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submittedAt?: Date;
  approvedAt?: Date;
  approvedBy?: string;
  lastModifiedAt: Date;
  lastModifiedBy: string;
}

interface DataContextType {
  // Coordinator data
  tlrData: TLRData;
  researchData: ResearchData;
  graduationData: GraduationData;
  outreachData: OutreachData;
  perceptionData: PerceptionData;
  scores: Scores;
  
  // Admin data
  allSubmissions: SubmissionData[];
  
  // Actions
  updateTLRData: (data: Partial<TLRData>) => void;
  updateResearchData: (data: Partial<ResearchData>) => void;
  updateGraduationData: (data: Partial<GraduationData>) => void;
  updateOutreachData: (data: Partial<OutreachData>) => void;
  updatePerceptionData: (data: Partial<PerceptionData>) => void;
  
  // Admin actions
  approveSubmission: (submissionId: string) => void;
  rejectSubmission: (submissionId: string) => void;
  editSubmissionData: (submissionId: string, section: string, data: any) => void;
  
  // Utility
  getCompletionStatus: () => any;
  submitForApproval: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialTLRData: TLRData = {
  studentStrength: 0,
  facultyStudent: 0,
  facultyPhD: 0,
  facultyExperience: 0,
  financialResources: 0,
  physicalInfrastructure: 0,
};

const initialResearchData: ResearchData = {
  publications: 0,
  citations: 0,
  patents: 0,
  phDGraduates: 0,
  researchProjects: 0,
  consultancy: 0,
};

const initialGraduationData: GraduationData = {
  graduationRate: 0,
  placementRate: 0,
  medianSalary: 0,
  higherStudies: 0,
};

const initialOutreachData: OutreachData = {
  womenStudents: 0,
  economicallyBackward: 0,
  sociallyBackward: 0,
  physicallyDisabled: 0,
  regionDiversity: 0,
};

const initialPerceptionData: PerceptionData = {
  academicPeerScore: 0,
  employerScore: 0,
  publicationImpact: 0,
};

const initialScores: Scores = {
  tlr: { ss: 0, fsr: 0, fqe: 0, fru: 0, total: 0 },
  research: { pu: 0, qp: 0, ipr: 0, fppp: 0, total: 0 },
  graduation: { go: 0, total: 0 },
  outreach: { oi: 0, total: 0 },
  perception: { pr: 0, total: 0 },
  finalScore: 0
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  // Coordinator's own data
  const [tlrData, setTLRData] = useState<TLRData>(initialTLRData);
  const [researchData, setResearchData] = useState<ResearchData>(initialResearchData);
  const [graduationData, setGraduationData] = useState<GraduationData>(initialGraduationData);
  const [outreachData, setOutreachData] = useState<OutreachData>(initialOutreachData);
  const [perceptionData, setPerceptionData] = useState<PerceptionData>(initialPerceptionData);
  
  // All submissions (for admin view)
  const [allSubmissions, setAllSubmissions] = useState<SubmissionData[]>([
    // Mock data for demonstration
    {
      id: '1',
      coordinatorId: '1',
      coordinatorName: 'Dr. Rajesh Kumar',
      collegeName: 'Indian Institute of Technology Delhi',
      tlrData: { studentStrength: 1500, facultyStudent: 12, facultyPhD: 85, facultyExperience: 15, financialResources: 50000000, physicalInfrastructure: 95 },
      researchData: { publications: 250, citations: 1200, patents: 15, phDGraduates: 45, researchProjects: 30, consultancy: 5000000 },
      graduationData: { graduationRate: 95, placementRate: 90, medianSalary: 1200000, higherStudies: 25 },
      outreachData: { womenStudents: 25, economicallyBackward: 15, sociallyBackward: 20, physicallyDisabled: 3, regionDiversity: 18 },
      perceptionData: { academicPeerScore: 85, employerScore: 88, publicationImpact: 82 },
      scores: {
        tlr: { ss: 18, fsr: 25, fqe: 17, fru: 28, total: 88 },
        research: { pu: 22, qp: 20, ipr: 12, fppp: 18, total: 72 },
        graduation: { go: 85, total: 85 },
        outreach: { oi: 75, total: 75 },
        perception: { pr: 85, total: 85 },
        finalScore: 82.1
      },
      status: 'submitted',
      submittedAt: new Date('2024-01-15'),
      lastModifiedAt: new Date('2024-01-15'),
      lastModifiedBy: 'Dr. Rajesh Kumar'
    }
  ]);

  // Simple calculation functions
  const calculateTLRScore = (data: TLRData) => {
    const ss = Math.min((data.studentStrength / 100) * 20, 20);
    const fsr = Math.min((15 / Math.max(data.facultyStudent, 1)) * 30, 30);
    const fqe = Math.min((data.facultyPhD / 100) * 20, 20);
    const fru = Math.min((data.financialResources / 100000000) * 30, 30);
    const total = ss + fsr + fqe + fru;
    return { ss, fsr, fqe, fru, total };
  };

  const calculateResearchScore = (data: ResearchData) => {
    const pu = Math.min((data.publications / 10) * 25, 25);
    const qp = Math.min((data.citations / 100) * 25, 25);
    const ipr = Math.min((data.patents / 5) * 15, 15);
    const fppp = Math.min((data.phDGraduates / 10) * 35, 35);
    const total = pu + qp + ipr + fppp;
    return { pu, qp, ipr, fppp, total };
  };

  const calculateGraduationScore = (data: GraduationData) => {
    const go = Math.min(data.graduationRate, 100);
    return { go, total: go };
  };

  const calculateOutreachScore = (data: OutreachData) => {
    const oi = Math.min((data.womenStudents + data.economicallyBackward + data.sociallyBackward) / 3, 100);
    return { oi, total: oi };
  };

  const calculatePerceptionScore = (data: PerceptionData) => {
    const pr = Math.min((data.academicPeerScore + data.employerScore) / 2, 100);
    return { pr, total: pr };
  };

  // Calculate scores
  const calculateScores = (
    tlr: TLRData,
    research: ResearchData,
    graduation: GraduationData,
    outreach: OutreachData,
    perception: PerceptionData
  ): Scores => {
    const tlrScore = calculateTLRScore(tlr);
    const researchScore = calculateResearchScore(research);
    const graduationScore = calculateGraduationScore(graduation);
    const outreachScore = calculateOutreachScore(outreach);
    const perceptionScore = calculatePerceptionScore(perception);

    const finalScore = (
      tlrScore.total * 0.30 +
      researchScore.total * 0.30 +
      graduationScore.total * 0.20 +
      outreachScore.total * 0.10 +
      perceptionScore.total * 0.10
    );

    return {
      tlr: tlrScore,
      research: researchScore,
      graduation: graduationScore,
      outreach: outreachScore,
      perception: perceptionScore,
      finalScore
    };
  };

  const scores = calculateScores(tlrData, researchData, graduationData, outreachData, perceptionData);

  const updateTLRData = (data: Partial<TLRData>) => {
    setTLRData(prev => ({ ...prev, ...data }));
  };

  const updateResearchData = (data: Partial<ResearchData>) => {
    setResearchData(prev => ({ ...prev, ...data }));
  };

  const updateGraduationData = (data: Partial<GraduationData>) => {
    setGraduationData(prev => ({ ...prev, ...data }));
  };

  const updateOutreachData = (data: Partial<OutreachData>) => {
    setOutreachData(prev => ({ ...prev, ...data }));
  };

  const updatePerceptionData = (data: Partial<PerceptionData>) => {
    setPerceptionData(prev => ({ ...prev, ...data }));
  };

  const approveSubmission = (submissionId: string) => {
    setAllSubmissions(prev => prev.map(submission => 
      submission.id === submissionId 
        ? { 
            ...submission, 
            status: 'approved', 
            approvedAt: new Date(),
            approvedBy: user?.name || 'Admin'
          }
        : submission
    ));
  };

  const rejectSubmission = (submissionId: string) => {
    setAllSubmissions(prev => prev.map(submission => 
      submission.id === submissionId 
        ? { ...submission, status: 'rejected' }
        : submission
    ));
  };

  const editSubmissionData = (submissionId: string, section: string, data: any) => {
    setAllSubmissions(prev => prev.map(submission => {
      if (submission.id === submissionId) {
        const updatedSubmission = {
          ...submission,
          [section]: { ...submission[section as keyof SubmissionData], ...data },
          lastModifiedAt: new Date(),
          lastModifiedBy: user?.name || 'Admin'
        };
        
        // Recalculate scores
        updatedSubmission.scores = calculateScores(
          updatedSubmission.tlrData,
          updatedSubmission.researchData,
          updatedSubmission.graduationData,
          updatedSubmission.outreachData,
          updatedSubmission.perceptionData
        );
        
        return updatedSubmission;
      }
      return submission;
    }));
  };

  const submitForApproval = () => {
    if (user?.role === 'coordinator') {
      const newSubmission: SubmissionData = {
        id: Date.now().toString(),
        coordinatorId: user.id,
        coordinatorName: user.name,
        collegeName: user.college.name,
        tlrData,
        researchData,
        graduationData,
        outreachData,
        perceptionData,
        scores,
        status: 'submitted',
        submittedAt: new Date(),
        lastModifiedAt: new Date(),
        lastModifiedBy: user.name
      };
      
      setAllSubmissions(prev => [...prev, newSubmission]);
    }
  };

  const getCompletionStatus = () => {
    const tlrCompleted = Object.values(tlrData).some(val => val > 0);
    const researchCompleted = Object.values(researchData).some(val => val > 0);
    const graduationCompleted = Object.values(graduationData).some(val => val > 0);
    const outreachCompleted = Object.values(outreachData).some(val => val > 0);
    const perceptionCompleted = Object.values(perceptionData).some(val => val > 0);

    return {
      tlr: tlrCompleted,
      research: researchCompleted,
      graduation: graduationCompleted,
      outreach: outreachCompleted,
      perception: perceptionCompleted,
    };
  };

  const value = {
    tlrData,
    researchData,
    graduationData,
    outreachData,
    perceptionData,
    scores,
    allSubmissions,
    updateTLRData,
    updateResearchData,
    updateGraduationData,
    updateOutreachData,
    updatePerceptionData,
    approveSubmission,
    rejectSubmission,
    editSubmissionData,
    getCompletionStatus,
    submitForApproval,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};