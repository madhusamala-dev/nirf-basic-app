import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NIRFData, CalculatedScores } from '../lib/types';
import { calculateFinalScore } from '../lib/calculations';

interface DataContextType {
  data: NIRFData;
  scores: CalculatedScores;
  updateTLR: (tlrData: Partial<NIRFData['tlr']>) => void;
  updateResearch: (researchData: Partial<NIRFData['research']>) => void;
  updateGraduation: (graduationData: Partial<NIRFData['graduation']>) => void;
  updateOutreach: (outreachData: Partial<NIRFData['outreach']>) => void;
  updatePerception: (perceptionData: Partial<NIRFData['perception']>) => void;
  getCompletionStatus: () => { [key: string]: boolean };
}

const initialData: NIRFData = {
  tlr: {
    studentStrength: 0,
    doctoralStudents: 0,
    totalFaculty: 0,
    permanentFaculty: 0,
    facultyWithPhD: 0,
    experiencedFaculty: 0,
    financialResources: 0,
    resourceUtilization: 0
  },
  research: {
    publications: 0,
    citations: 0,
    patents: 0,
    projects: 0
  },
  graduation: {
    graduationRate: 0,
    employmentRate: 0,
    higherStudiesRate: 0,
    medianSalary: 0
  },
  outreach: {
    diversityIndex: 0,
    womenEnrollment: 0,
    economicallyBackward: 0,
    sociallyBackward: 0
  },
  perception: {
    academicPeerScore: 0,
    employerScore: 0,
    publicationImpact: 0
  }
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<NIRFData>(initialData);
  const [scores, setScores] = useState<CalculatedScores>(calculateFinalScore(initialData));

  const updateScores = (newData: NIRFData) => {
    const newScores = calculateFinalScore(newData);
    setScores(newScores);
  };

  const updateTLR = (tlrData: Partial<NIRFData['tlr']>) => {
    const newData = { ...data, tlr: { ...data.tlr, ...tlrData } };
    setData(newData);
    updateScores(newData);
  };

  const updateResearch = (researchData: Partial<NIRFData['research']>) => {
    const newData = { ...data, research: { ...data.research, ...researchData } };
    setData(newData);
    updateScores(newData);
  };

  const updateGraduation = (graduationData: Partial<NIRFData['graduation']>) => {
    const newData = { ...data, graduation: { ...data.graduation, ...graduationData } };
    setData(newData);
    updateScores(newData);
  };

  const updateOutreach = (outreachData: Partial<NIRFData['outreach']>) => {
    const newData = { ...data, outreach: { ...data.outreach, ...outreachData } };
    setData(newData);
    updateScores(newData);
  };

  const updatePerception = (perceptionData: Partial<NIRFData['perception']>) => {
    const newData = { ...data, perception: { ...data.perception, ...perceptionData } };
    setData(newData);
    updateScores(newData);
  };

  const getCompletionStatus = () => {
    return {
      tlr: Object.values(data.tlr).some(val => val > 0),
      research: Object.values(data.research).some(val => val > 0),
      graduation: Object.values(data.graduation).some(val => val > 0),
      outreach: Object.values(data.outreach).some(val => val > 0),
      perception: Object.values(data.perception).some(val => val > 0)
    };
  };

  return (
    <DataContext.Provider value={{
      data,
      scores,
      updateTLR,
      updateResearch,
      updateGraduation,
      updateOutreach,
      updatePerception,
      getCompletionStatus
    }}>
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