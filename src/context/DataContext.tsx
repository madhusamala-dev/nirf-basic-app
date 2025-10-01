import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface TLRData {
  ss: number;
  fsr: number;
  fqe: number;
  fru: number;
  total: number;
}

export interface ResearchData {
  pu: number;
  qp: number;
  ipr: number;
  fppp: number;
  total: number;
}

export interface GraduationData {
  go: number;
  gph: number;
  gue: number;
  gms: number;
  grd: number;
  total: number;
}

export interface OutreachData {
  oi: number;
  total: number;
}

export interface PerceptionData {
  pr: number;
  total: number;
}

export interface NIRFScores {
  tlr: TLRData;
  research: ResearchData;
  graduation: GraduationData;
  outreach: OutreachData;
  perception: PerceptionData;
  finalScore: number;
}

export interface SubmissionData {
  id: string;
  coordinatorId: string;
  coordinatorName: string;
  collegeName: string;
  scores: NIRFScores;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submittedAt?: Date;
  approvedAt?: Date;
  approvedBy?: string;
  lastModified: Date;
  modifiedBy: string;
}

interface DataContextType {
  scores: NIRFScores;
  submissions: SubmissionData[];
  currentSubmission: SubmissionData | null;
  updateTLRData: (data: Partial<TLRData>) => void;
  updateResearchData: (data: Partial<ResearchData>) => void;
  updateGraduationData: (data: Partial<GraduationData>) => void;
  updateOutreachData: (data: Partial<OutreachData>) => void;
  updatePerceptionData: (data: Partial<PerceptionData>) => void;
  submitForApproval: () => void;
  approveSubmission: (submissionId: string) => void;
  rejectSubmission: (submissionId: string) => void;
  getAllSubmissions: () => SubmissionData[];
  getSubmissionById: (id: string) => SubmissionData | null;
  editSubmission: (submissionId: string) => void;
  saveSubmissionChanges: () => void;
  cancelEdit: () => void;
  isEditing: boolean;
  getCompletionStatus: () => {
    tlr: boolean;
    research: boolean;
    graduation: boolean;
    outreach: boolean;
    perception: boolean;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock submissions data
const mockSubmissions: SubmissionData[] = [
  {
    id: '1',
    coordinatorId: '1',
    coordinatorName: 'Dr. Rajesh Kumar',
    collegeName: 'Indian Institute of Technology Delhi',
    status: 'submitted',
    submittedAt: new Date('2024-01-15'),
    lastModified: new Date('2024-01-15'),
    modifiedBy: 'Dr. Rajesh Kumar',
    scores: {
      tlr: { ss: 85, fsr: 78, fqe: 92, fru: 88, total: 85.75 },
      research: { pu: 90, qp: 85, ipr: 75, fppp: 80, total: 82.5 },
      graduation: { go: 88, gph: 85, gue: 90, gms: 82, grd: 87, total: 86.4 },
      outreach: { oi: 75, total: 75 },
      perception: { pr: 80, total: 80 },
      finalScore: 83.2
    }
  },
  {
    id: '2',
    coordinatorId: '3',
    coordinatorName: 'Prof. Meera Singh',
    collegeName: 'University of Delhi',
    status: 'draft',
    lastModified: new Date('2024-01-10'),
    modifiedBy: 'Prof. Meera Singh',
    scores: {
      tlr: { ss: 70, fsr: 65, fqe: 75, fru: 72, total: 70.5 },
      research: { pu: 65, qp: 70, ipr: 60, fppp: 68, total: 65.75 },
      graduation: { go: 75, gph: 70, gue: 78, gms: 72, grd: 74, total: 73.8 },
      outreach: { oi: 68, total: 68 },
      perception: { pr: 72, total: 72 },
      finalScore: 70.1
    }
  }
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<SubmissionData[]>(mockSubmissions);
  const [currentSubmission, setCurrentSubmission] = useState<SubmissionData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSubmissionId, setEditingSubmissionId] = useState<string | null>(null);

  // Get current user's submission or create new one
  const getUserSubmission = (): SubmissionData => {
    if (currentSubmission && isEditing) {
      return currentSubmission;
    }

    const existing = submissions.find(s => s.coordinatorId === user?.id);
    if (existing) {
      return existing;
    }

    // Create new submission for coordinator
    const newSubmission: SubmissionData = {
      id: Date.now().toString(),
      coordinatorId: user?.id || '',
      coordinatorName: user?.name || '',
      collegeName: user?.college.name || '',
      status: 'draft',
      lastModified: new Date(),
      modifiedBy: user?.name || '',
      scores: {
        tlr: { ss: 0, fsr: 0, fqe: 0, fru: 0, total: 0 },
        research: { pu: 0, qp: 0, ipr: 0, fppp: 0, total: 0 },
        graduation: { go: 0, gph: 0, gue: 0, gms: 0, grd: 0, total: 0 },
        outreach: { oi: 0, total: 0 },
        perception: { pr: 0, total: 0 },
        finalScore: 0
      }
    };

    setSubmissions(prev => [...prev, newSubmission]);
    return newSubmission;
  };

  const currentData = getUserSubmission();
  const scores = currentData.scores;

  const calculateTLRTotal = (data: Partial<TLRData>): number => {
    const ss = data.ss || scores.tlr.ss;
    const fsr = data.fsr || scores.tlr.fsr;
    const fqe = data.fqe || scores.tlr.fqe;
    const fru = data.fru || scores.tlr.fru;
    return (ss * 0.2 + fsr * 0.3 + fqe * 0.2 + fru * 0.3);
  };

  const calculateResearchTotal = (data: Partial<ResearchData>): number => {
    const pu = data.pu || scores.research.pu;
    const qp = data.qp || scores.research.qp;
    const ipr = data.ipr || scores.research.ipr;
    const fppp = data.fppp || scores.research.fppp;
    return (pu * 0.35 + qp * 0.25 + ipr * 0.15 + fppp * 0.25);
  };

  const calculateGraduationTotal = (data: Partial<GraduationData>): number => {
    const go = data.go || scores.graduation.go;
    const gph = data.gph || scores.graduation.gph;
    const gue = data.gue || scores.graduation.gue;
    const gms = data.gms || scores.graduation.gms;
    const grd = data.grd || scores.graduation.grd;
    return (go * 0.3 + gph * 0.2 + gue * 0.2 + gms * 0.15 + grd * 0.15);
  };

  const updateSubmission = (updatedScores: NIRFScores) => {
    const finalScore = (
      updatedScores.tlr.total * 0.3 +
      updatedScores.research.total * 0.3 +
      updatedScores.graduation.total * 0.2 +
      updatedScores.outreach.total * 0.1 +
      updatedScores.perception.total * 0.1
    );

    const updatedSubmission: SubmissionData = {
      ...currentData,
      scores: { ...updatedScores, finalScore },
      lastModified: new Date(),
      modifiedBy: user?.name || ''
    };

    setSubmissions(prev => 
      prev.map(s => s.id === updatedSubmission.id ? updatedSubmission : s)
    );

    if (isEditing && currentSubmission) {
      setCurrentSubmission(updatedSubmission);
    }
  };

  const updateTLRData = (data: Partial<TLRData>) => {
    const total = calculateTLRTotal(data);
    const updatedTLR = { ...scores.tlr, ...data, total };
    const updatedScores = { ...scores, tlr: updatedTLR };
    updateSubmission(updatedScores);
  };

  const updateResearchData = (data: Partial<ResearchData>) => {
    const total = calculateResearchTotal(data);
    const updatedResearch = { ...scores.research, ...data, total };
    const updatedScores = { ...scores, research: updatedResearch };
    updateSubmission(updatedScores);
  };

  const updateGraduationData = (data: Partial<GraduationData>) => {
    const total = calculateGraduationTotal(data);
    const updatedGraduation = { ...scores.graduation, ...data, total };
    const updatedScores = { ...scores, graduation: updatedGraduation };
    updateSubmission(updatedScores);
  };

  const updateOutreachData = (data: Partial<OutreachData>) => {
    const total = data.oi || scores.outreach.oi;
    const updatedOutreach = { ...scores.outreach, ...data, total };
    const updatedScores = { ...scores, outreach: updatedOutreach };
    updateSubmission(updatedScores);
  };

  const updatePerceptionData = (data: Partial<PerceptionData>) => {
    const total = data.pr || scores.perception.pr;
    const updatedPerception = { ...scores.perception, ...data, total };
    const updatedScores = { ...scores, perception: updatedPerception };
    updateSubmission(updatedScores);
  };

  const submitForApproval = () => {
    setSubmissions(prev =>
      prev.map(s =>
        s.id === currentData.id
          ? { ...s, status: 'submitted', submittedAt: new Date() }
          : s
      )
    );
  };

  const approveSubmission = (submissionId: string) => {
    setSubmissions(prev =>
      prev.map(s =>
        s.id === submissionId
          ? {
              ...s,
              status: 'approved',
              approvedAt: new Date(),
              approvedBy: user?.name || ''
            }
          : s
      )
    );
  };

  const rejectSubmission = (submissionId: string) => {
    setSubmissions(prev =>
      prev.map(s =>
        s.id === submissionId
          ? { ...s, status: 'rejected' }
          : s
      )
    );
  };

  const getAllSubmissions = () => {
    if (user?.role === 'admin') {
      return submissions;
    }
    return submissions.filter(s => s.coordinatorId === user?.id);
  };

  const getSubmissionById = (id: string) => {
    return submissions.find(s => s.id === id) || null;
  };

  const editSubmission = (submissionId: string) => {
    const submission = getSubmissionById(submissionId);
    if (submission && user?.role === 'admin') {
      setCurrentSubmission(submission);
      setIsEditing(true);
      setEditingSubmissionId(submissionId);
    }
  };

  const saveSubmissionChanges = () => {
    if (currentSubmission && editingSubmissionId) {
      setSubmissions(prev =>
        prev.map(s =>
          s.id === editingSubmissionId
            ? {
                ...currentSubmission,
                lastModified: new Date(),
                modifiedBy: user?.name || ''
              }
            : s
        )
      );
      setIsEditing(false);
      setCurrentSubmission(null);
      setEditingSubmissionId(null);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentSubmission(null);
    setEditingSubmissionId(null);
  };

  const getCompletionStatus = () => {
    return {
      tlr: scores.tlr.total > 0,
      research: scores.research.total > 0,
      graduation: scores.graduation.total > 0,
      outreach: scores.outreach.total > 0,
      perception: scores.perception.total > 0
    };
  };

  const value = {
    scores,
    submissions,
    currentSubmission,
    updateTLRData,
    updateResearchData,
    updateGraduationData,
    updateOutreachData,
    updatePerceptionData,
    submitForApproval,
    approveSubmission,
    rejectSubmission,
    getAllSubmissions,
    getSubmissionById,
    editSubmission,
    saveSubmissionChanges,
    cancelEdit,
    isEditing,
    getCompletionStatus
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