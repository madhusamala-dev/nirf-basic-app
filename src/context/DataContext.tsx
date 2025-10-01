import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types for NIRF data structure
interface TLRData {
  ss: number;
  fsr: number;
  fqe: number;
  fru: number;
  total: number;
}

interface ResearchData {
  pu: number;
  qp: number;
  ipr: number;
  fppp: number;
  total: number;
}

interface GraduationData {
  go: number;
  gph: number;
  gue: number;
  gms: number;
  grd: number;
  total: number;
}

interface OutreachData {
  oi: number;
  total: number;
}

interface PerceptionData {
  pr: number;
  total: number;
}

interface Scores {
  tlr: TLRData;
  research: ResearchData;
  graduation: GraduationData;
  outreach: OutreachData;
  perception: PerceptionData;
  overall: number;
}

interface User {
  id: string;
  username: string;
  role: 'admin' | 'coordinator';
  college: string;
}

interface Submission {
  id: string;
  collegeId: string;
  collegeName: string;
  coordinatorId: string;
  coordinatorName: string;
  scores: Scores;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  comments?: string;
}

interface DataContextType {
  user: User | null;
  scores: Scores;
  submissions: Submission[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateTLRData: (data: Partial<TLRData>) => void;
  updateResearchData: (data: Partial<ResearchData>) => void;
  updateGraduationData: (data: Partial<GraduationData>) => void;
  updateOutreachData: (data: Partial<OutreachData>) => void;
  updatePerceptionData: (data: Partial<PerceptionData>) => void;
  submitForReview: () => void;
  getAllSubmissions: () => Submission[];
  approveSubmission: (submissionId: string, comments?: string) => void;
  rejectSubmission: (submissionId: string, comments: string) => void;
}

const defaultScores: Scores = {
  tlr: { ss: 0, fsr: 0, fqe: 0, fru: 0, total: 0 },
  research: { pu: 0, qp: 0, ipr: 0, fppp: 0, total: 0 },
  graduation: { go: 0, gph: 0, gue: 0, gms: 0, grd: 0, total: 0 },
  outreach: { oi: 0, total: 0 },
  perception: { pr: 0, total: 0 },
  overall: 0
};

// Demo users for testing
const demoUsers: User[] = [
  { id: '1', username: 'admin1', role: 'admin', college: 'IIT Delhi' },
  { id: '2', username: 'coord1', role: 'coordinator', college: 'IIT Delhi' },
  { id: '3', username: 'admin2', role: 'admin', college: 'IIT Bombay' },
  { id: '4', username: 'coord2', role: 'coordinator', college: 'IIT Bombay' },
  { id: '5', username: 'admin3', role: 'admin', college: 'IIT Madras' },
  { id: '6', username: 'coord3', role: 'coordinator', college: 'IIT Madras' }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [scores, setScores] = useState<Scores>(defaultScores);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('nirf-user');
    const savedScores = localStorage.getItem('nirf-scores');
    const savedSubmissions = localStorage.getItem('nirf-submissions');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('nirf-user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nirf-scores', JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    localStorage.setItem('nirf-submissions', JSON.stringify(submissions));
  }, [submissions]);

  const login = (username: string, password: string): boolean => {
    // Simple demo authentication - in real app, this would be secure
    const foundUser = demoUsers.find(u => u.username === username && password === 'demo123');
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nirf-user');
  };

  const calculateTotalScore = (newScores: Scores) => {
    return (
      newScores.tlr.total * 0.3 +
      newScores.research.total * 0.3 +
      newScores.graduation.total * 0.2 +
      newScores.outreach.total * 0.1 +
      newScores.perception.total * 0.1
    );
  };

  const updateTLRData = (data: Partial<TLRData>) => {
    setScores(prev => {
      const newTLR = { ...prev.tlr, ...data };
      newTLR.total = newTLR.ss + newTLR.fsr + newTLR.fqe + newTLR.fru;
      const newScores = { ...prev, tlr: newTLR };
      newScores.overall = calculateTotalScore(newScores);
      return newScores;
    });
  };

  const updateResearchData = (data: Partial<ResearchData>) => {
    setScores(prev => {
      const newResearch = { ...prev.research, ...data };
      newResearch.total = newResearch.pu + newResearch.qp + newResearch.ipr + newResearch.fppp;
      const newScores = { ...prev, research: newResearch };
      newScores.overall = calculateTotalScore(newScores);
      return newScores;
    });
  };

  const updateGraduationData = (data: Partial<GraduationData>) => {
    setScores(prev => {
      const newGraduation = { ...prev.graduation, ...data };
      newGraduation.total = newGraduation.go + newGraduation.gph + newGraduation.gue + newGraduation.gms + newGraduation.grd;
      const newScores = { ...prev, graduation: newGraduation };
      newScores.overall = calculateTotalScore(newScores);
      return newScores;
    });
  };

  const updateOutreachData = (data: Partial<OutreachData>) => {
    setScores(prev => {
      const newOutreach = { ...prev.outreach, ...data };
      newOutreach.total = newOutreach.oi;
      const newScores = { ...prev, outreach: newOutreach };
      newScores.overall = calculateTotalScore(newScores);
      return newScores;
    });
  };

  const updatePerceptionData = (data: Partial<PerceptionData>) => {
    setScores(prev => {
      const newPerception = { ...prev.perception, ...data };
      newPerception.total = newPerception.pr;
      const newScores = { ...prev, perception: newPerception };
      newScores.overall = calculateTotalScore(newScores);
      return newScores;
    });
  };

  const submitForReview = () => {
    if (!user) return;

    const newSubmission: Submission = {
      id: Date.now().toString(),
      collegeId: user.id,
      collegeName: user.college,
      coordinatorId: user.id,
      coordinatorName: user.username,
      scores: { ...scores },
      status: 'submitted',
      submittedAt: new Date().toISOString()
    };

    setSubmissions(prev => [...prev, newSubmission]);
  };

  const getAllSubmissions = (): Submission[] => {
    return submissions;
  };

  const approveSubmission = (submissionId: string, comments?: string) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId 
        ? { 
            ...sub, 
            status: 'approved' as const, 
            reviewedAt: new Date().toISOString(),
            reviewedBy: user?.username,
            comments 
          }
        : sub
    ));
  };

  const rejectSubmission = (submissionId: string, comments: string) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId 
        ? { 
            ...sub, 
            status: 'rejected' as const, 
            reviewedAt: new Date().toISOString(),
            reviewedBy: user?.username,
            comments 
          }
        : sub
    ));
  };

  const value: DataContextType = {
    user,
    scores,
    submissions,
    login,
    logout,
    updateTLRData,
    updateResearchData,
    updateGraduationData,
    updateOutreachData,
    updatePerceptionData,
    submitForReview,
    getAllSubmissions,
    approveSubmission,
    rejectSubmission
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};