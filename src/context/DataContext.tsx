import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface TLRScores {
  ss: number;
  fsr: number;
  fqe: number;
  fru: number;
  total: number;
}

export interface ResearchScores {
  pu: number;
  qp: number;
  iprf: number;
  fppp: number;
  total: number;
}

export interface GraduationScores {
  gph: number;
  gue: number;
  gms: number;
  grd: number;
  total: number;
}

export interface OutreachScores {
  rd: number;
  wd: number;
  escs: number;
  pcs: number;
  total: number;
}

export interface FormSection {
  data: any;
  coordinatorEmail: string;
  lastModified: Date;
  modifiedBy: 'coordinator' | 'admin';
  adminNotes?: string;
}

export interface Scores {
  tlr: TLRScores;
  research: ResearchScores;
  graduation: GraduationScores;
  outreach: OutreachScores;
  overall: number;
}

export interface Submission {
  id: string;
  collegeName: string;
  coordinatorName: string;
  coordinatorEmail: string;
  scores: Scores;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submittedAt?: Date;
  reviewedAt?: Date;
  comments?: string;
  sections: {
    tlr: FormSection;
    research: FormSection;
    graduation: FormSection;
    outreach: OutreachScores;
  };
}

interface DataContextType {
  scores: Scores;
  submissions: Submission[];
  currentSubmission: Submission | null;
  isEditing: boolean;
  updateTLRData: (data: Partial<TLRScores>) => Promise<boolean>;
  updateResearchData: (data: Partial<ResearchScores>) => Promise<boolean>;
  updateGraduationData: (data: Partial<GraduationScores>) => Promise<boolean>;
  updateOutreachData: (data: Partial<OutreachScores>) => Promise<boolean>;
  submitForApproval: () => void;
  approveSubmission: (id: string, comments: string) => void;
  rejectSubmission: (id: string, comments: string) => void;
  editSubmission: (id: string) => void;
  saveSubmissionChanges: () => void;
  cancelEdit: () => void;
  adminUpdateSection: (sectionName: keyof Submission['sections'], data: any, adminEmail: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scores, setScores] = useState<Scores>({
    tlr: { ss: 0, fsr: 0, fqe: 0, fru: 0, total: 0 },
    research: { pu: 0, qp: 0, iprf: 0, fppp: 0, total: 0 },
    graduation: { gph: 0, gue: 0, gms: 0, grd: 0, total: 0 },
    outreach: { rd: 0, wd: 0, escs: 0, pcs: 0, total: 0 },
    overall: 0
  });

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [currentSubmission, setCurrentSubmission] = useState<Submission | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Calculate overall score whenever individual scores change
  useEffect(() => {
    const overall = (
      scores.tlr.total * 0.30 +
      scores.research.total * 0.30 +
      scores.graduation.total * 0.20 +
      scores.outreach.total * 0.10
    );
    
    setScores(prev => ({ ...prev, overall }));
  }, [scores.tlr.total, scores.research.total, scores.graduation.total, scores.outreach.total]);

  const updateTLRData = async (data: Partial<TLRScores>): Promise<boolean> => {
    try {
      setScores(prev => {
        const newTLR = { ...prev.tlr, ...data };
        // Calculate total if individual scores are provided
        if ('ss' in data || 'fsr' in data || 'fqe' in data || 'fru' in data) {
          newTLR.total = newTLR.ss + newTLR.fsr + newTLR.fqe + newTLR.fru;
        }
        return { ...prev, tlr: newTLR };
      });
      return true;
    } catch (error) {
      console.error('Error updating TLR data:', error);
      return false;
    }
  };

  const updateResearchData = async (data: Partial<ResearchScores>): Promise<boolean> => {
    try {
      setScores(prev => {
        const newResearch = { ...prev.research, ...data };
        // Calculate total if individual scores are provided
        if ('pu' in data || 'qp' in data || 'iprf' in data || 'fppp' in data) {
          newResearch.total = newResearch.pu + newResearch.qp + newResearch.iprf + newResearch.fppp;
        }
        return { ...prev, research: newResearch };
      });
      return true;
    } catch (error) {
      console.error('Error updating Research data:', error);
      return false;
    }
  };

  const updateGraduationData = async (data: Partial<GraduationScores>): Promise<boolean> => {
    try {
      setScores(prev => {
        const newGraduation = { ...prev.graduation, ...data };
        // Calculate total if individual scores are provided
        if ('gph' in data || 'gue' in data || 'gms' in data || 'grd' in data) {
          newGraduation.total = newGraduation.gph + newGraduation.gue + newGraduation.gms + newGraduation.grd;
        }
        return { ...prev, graduation: newGraduation };
      });
      return true;
    } catch (error) {
      console.error('Error updating Graduation data:', error);
      return false;
    }
  };

  const updateOutreachData = async (data: Partial<OutreachScores>): Promise<boolean> => {
    try {
      setScores(prev => {
        const newOutreach = { ...prev.outreach, ...data };
        // Calculate total if individual scores are provided
        if ('rd' in data || 'wd' in data || 'escs' in data || 'pcs' in data) {
          newOutreach.total = newOutreach.rd + newOutreach.wd + newOutreach.escs + newOutreach.pcs;
        }
        return { ...prev, outreach: newOutreach };
      });
      return true;
    } catch (error) {
      console.error('Error updating Outreach data:', error);
      return false;
    }
  };

  const submitForApproval = () => {
    const newSubmission: Submission = {
      id: Date.now().toString(),
      collegeName: 'IIT Delhi',
      coordinatorName: 'Dr. Rajesh Kumar',
      coordinatorEmail: 'coordinator@iitdelhi.ac.in',
      scores: { ...scores },
      status: 'submitted',
      submittedAt: new Date(),
      sections: {
        tlr: {
          data: scores.tlr,
          coordinatorEmail: 'coordinator@iitdelhi.ac.in',
          lastModified: new Date(),
          modifiedBy: 'coordinator'
        },
        research: {
          data: scores.research,
          coordinatorEmail: 'coordinator@iitdelhi.ac.in',
          lastModified: new Date(),
          modifiedBy: 'coordinator'
        },
        graduation: {
          data: scores.graduation,
          coordinatorEmail: 'coordinator@iitdelhi.ac.in',
          lastModified: new Date(),
          modifiedBy: 'coordinator'
        },
        outreach: scores.outreach
      }
    };

    setSubmissions(prev => [...prev, newSubmission]);
  };

  const approveSubmission = (id: string, comments: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id
          ? { ...sub, status: 'approved' as const, reviewedAt: new Date(), comments }
          : sub
      )
    );
  };

  const rejectSubmission = (id: string, comments: string) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id
          ? { ...sub, status: 'rejected' as const, reviewedAt: new Date(), comments }
          : sub
      )
    );
  };

  const editSubmission = (id: string) => {
    const submission = submissions.find(sub => sub.id === id);
    if (submission) {
      setCurrentSubmission(submission);
      setScores(submission.scores);
      setIsEditing(true);
    }
  };

  const saveSubmissionChanges = () => {
    if (currentSubmission) {
      setSubmissions(prev =>
        prev.map(sub =>
          sub.id === currentSubmission.id
            ? { ...sub, scores: { ...scores } }
            : sub
        )
      );
      setCurrentSubmission(null);
      setIsEditing(false);
    }
  };

  const cancelEdit = () => {
    setCurrentSubmission(null);
    setIsEditing(false);
    // Reset scores to original state
    setScores({
      tlr: { ss: 0, fsr: 0, fqe: 0, fru: 0, total: 0 },
      research: { pu: 0, qp: 0, iprf: 0, fppp: 0, total: 0 },
      graduation: { gph: 0, gue: 0, gms: 0, grd: 0, total: 0 },
      outreach: { rd: 0, wd: 0, escs: 0, pcs: 0, total: 0 },
      overall: 0
    });
  };

  const adminUpdateSection = (sectionName: keyof Submission['sections'], data: any, adminEmail: string) => {
    if (currentSubmission) {
      // Update the current submission being edited
      const updatedSubmission = {
        ...currentSubmission,
        sections: {
          ...currentSubmission.sections,
          [sectionName]: {
            ...currentSubmission.sections[sectionName],
            data,
            lastModified: new Date(),
            modifiedBy: 'admin' as const
          }
        }
      };
      
      setCurrentSubmission(updatedSubmission);
      
      // Update the submissions array
      setSubmissions(prev =>
        prev.map(sub =>
          sub.id === currentSubmission.id ? updatedSubmission : sub
        )
      );
      
      // Update current scores for real-time display
      setScores(prev => ({
        ...prev,
        [sectionName]: data
      }));
    }
  };

  const value = {
    scores,
    submissions,
    currentSubmission,
    isEditing,
    updateTLRData,
    updateResearchData,
    updateGraduationData,
    updateOutreachData,
    submitForApproval,
    approveSubmission,
    rejectSubmission,
    editSubmission,
    saveSubmissionChanges,
    cancelEdit,
    adminUpdateSection
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