import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
interface User {
  id: string;
  email: string;
  role: 'admin' | 'coordinator';
  college: string;
}

interface Scores {
  tlr: { ss: number; fsr: number; fqe: number; fru: number; total: number };
  research: { pu: number; qp: number; ipr: number; fppp: number; total: number };
  graduation: { go: number; gph: number; gue: number; gms: number; grd: number; total: number };
  outreach: { oi: number; total: number };
  perception: { pr: number; total: number };
  overall: number;
}

interface Submission {
  id: string;
  college: string;
  coordinator: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  scores: Scores;
  submittedAt?: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  comments?: string;
}

interface DataContextType {
  user: User | null;
  scores: Scores;
  submissions: Submission[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateTLRData: (data: Partial<Scores['tlr']>) => void;
  updateResearchData: (data: Partial<Scores['research']>) => void;
  updateGraduationData: (data: Partial<Scores['graduation']>) => void;
  updateOutreachData: (data: Partial<Scores['outreach']>) => void;
  updatePerceptionData: (data: Partial<Scores['perception']>) => void;
  submitForReview: () => void;
  getAllSubmissions: () => Submission[];
  approveSubmission: (id: string, comments?: string) => void;
  rejectSubmission: (id: string, comments: string) => void;
}

// Demo users
const demoUsers: User[] = [
  { id: '1', email: 'admin1@iit-delhi.ac.in', role: 'admin', college: 'IIT Delhi' },
  { id: '2', email: 'coord1@iit-delhi.ac.in', role: 'coordinator', college: 'IIT Delhi' },
  { id: '3', email: 'admin2@iit-bombay.ac.in', role: 'admin', college: 'IIT Bombay' },
  { id: '4', email: 'coord2@iit-bombay.ac.in', role: 'coordinator', college: 'IIT Bombay' },
  { id: '5', email: 'admin3@iit-madras.ac.in', role: 'admin', college: 'IIT Madras' },
  { id: '6', email: 'coord3@iit-madras.ac.in', role: 'coordinator', college: 'IIT Madras' },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialScores: Scores = {
  tlr: { ss: 0, fsr: 0, fqe: 0, fru: 0, total: 0 },
  research: { pu: 0, qp: 0, ipr: 0, fppp: 0, total: 0 },
  graduation: { go: 0, gph: 0, gue: 0, gms: 0, grd: 0, total: 0 },
  outreach: { oi: 0, total: 0 },
  perception: { pr: 0, total: 0 },
  overall: 0
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [scores, setScores] = useState<Scores>(initialScores);
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

  const login = (email: string, password: string): boolean => {
    // Simple demo authentication - password is always "password"
    if (password === 'password') {
      const foundUser = demoUsers.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        return true;
      }
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

  const updateTLRData = (data: Partial<Scores['tlr']>) => {
    setScores(prev => {
      const newTlr = { ...prev.tlr, ...data };
      // TLR total is now calculated as sum of components (SS:20 + FSR:30 + FQE:20 + FRU:30 = 100)
      newTlr.total = newTlr.ss + newTlr.fsr + newTlr.fqe + newTlr.fru;
      const newScores = { ...prev, tlr: newTlr };
      newScores.overall = calculateTotalScore(newScores);
      return newScores;
    });
  };

  const updateResearchData = (data: Partial<Scores['research']>) => {
    setScores(prev => {
      const newResearch = { ...prev.research, ...data };
      newResearch.total = newResearch.pu + newResearch.qp + newResearch.ipr + newResearch.fppp;
      const newScores = { ...prev, research: newResearch };
      newScores.overall = calculateTotalScore(newScores);
      return newScores;
    });
  };

  const updateGraduationData = (data: Partial<Scores['graduation']>) => {
    setScores(prev => {
      const newGraduation = { ...prev.graduation, ...data };
      newGraduation.total = newGraduation.go + newGraduation.gph + newGraduation.gue + newGraduation.gms + newGraduation.grd;
      const newScores = { ...prev, graduation: newGraduation };
      newScores.overall = calculateTotalScore(newScores);
      return newScores;
    });
  };

  const updateOutreachData = (data: Partial<Scores['outreach']>) => {
    setScores(prev => {
      const newOutreach = { ...prev.outreach, ...data };
      newOutreach.total = newOutreach.oi;
      const newScores = { ...prev, outreach: newOutreach };
      newScores.overall = calculateTotalScore(newScores);
      return newScores;
    });
  };

  const updatePerceptionData = (data: Partial<Scores['perception']>) => {
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
      college: user.college,
      coordinator: user.email,
      status: 'submitted',
      scores: { ...scores },
      submittedAt: new Date(),
    };
    
    setSubmissions(prev => [...prev, newSubmission]);
  };

  const getAllSubmissions = (): Submission[] => {
    return submissions;
  };

  const approveSubmission = (id: string, comments?: string) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === id 
        ? { 
            ...sub, 
            status: 'approved' as const, 
            reviewedAt: new Date(), 
            reviewedBy: user?.email,
            comments 
          }
        : sub
    ));
  };

  const rejectSubmission = (id: string, comments: string) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === id 
        ? { 
            ...sub, 
            status: 'rejected' as const, 
            reviewedAt: new Date(), 
            reviewedBy: user?.email,
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
    rejectSubmission,
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