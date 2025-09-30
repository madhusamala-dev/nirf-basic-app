import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Info } from 'lucide-react';
import { useData } from '../../context/DataContext';

const TLRForm: React.FC = () => {
  const { data, scores, updateTLR } = useData();
  const { tlr } = data;
  const tlrScores = scores.tlr;

  const handleInputChange = (field: keyof typeof tlr, value: string) => {
    const numValue = parseFloat(value) || 0;
    updateTLR({ [field]: numValue });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const sections = [
    {
      title: 'Student Strength (SS)',
      description: 'Student enrollment and intake metrics',
      maxMarks: 20,
      score: tlrScores.ss,
      fields: [
        { 
          key: 'totalSanctionedIntake' as const, 
          label: 'Total Sanctioned Approved Intake (NT)', 
          value: tlr.totalSanctionedIntake,
          description: 'Total sanctioned approved intake considering all UG and PG programs'
        },
        { 
          key: 'totalEnrolledStudents' as const, 
          label: 'Total Enrolled Students (NE)', 
          value: tlr.totalEnrolledStudents,
          description: 'Total number of students enrolled considering all UG and PG programs'
        },
        { 
          key: 'doctoralStudents' as const, 
          label: 'Doctoral Students (NP)', 
          value: tlr.doctoralStudents,
          description: 'Total number of students enrolled for doctoral program till previous academic year'
        }
      ]
    },
    {
      title: 'Faculty-Student Ratio (FSR)',
      description: 'Faculty strength and student ratio assessment',
      maxMarks: 30,
      score: tlrScores.fsr,
      fields: [
        { 
          key: 'fullTimeRegularFaculty' as const, 
          label: 'Full-time Regular Faculty (F)', 
          value: tlr.fullTimeRegularFaculty,
          description: 'Faculty with Ph.D./Master\'s degrees who taught in both semesters of AY 2023-24. Includes regular, contract, and ad-hoc faculty.'
        },
        { key: 'totalFaculty' as const, label: 'Total Faculty', value: tlr.totalFaculty, description: 'Total number of faculty members' },
        { key: 'permanentFaculty' as const, label: 'Permanent Faculty', value: tlr.permanentFaculty, description: 'Number of permanent faculty members' }
      ]
    },
    {
      title: 'Faculty Quality & Experience (FQE)',
      description: 'Faculty qualifications and experience distribution',
      maxMarks: 20,
      score: tlrScores.fqe,
      fields: [
        { 
          key: 'totalFacultyRequired' as const, 
          label: 'Total Faculty Required', 
          value: tlr.totalFacultyRequired, 
          description: 'Total number of faculty positions required by the institution'
        },
        { 
          key: 'facultyWithPhD' as const, 
          label: 'Faculty with Ph.D. (or equivalent)', 
          value: tlr.facultyWithPhD, 
          description: 'Number of faculty with Ph.D. or equivalent qualification'
        },
        { 
          key: 'facultyExperience0to8' as const, 
          label: 'Faculty with 0-8 Years Experience', 
          value: tlr.facultyExperience0to8, 
          description: 'Number of faculty with experience up to 8 years'
        },
        { 
          key: 'facultyExperience8to15' as const, 
          label: 'Faculty with 8-15 Years Experience', 
          value: tlr.facultyExperience8to15, 
          description: 'Number of faculty with experience between 8 to 15 years'
        },
        { 
          key: 'facultyExperienceAbove15' as const, 
          label: 'Faculty with 15+ Years Experience', 
          value: tlr.facultyExperienceAbove15, 
          description: 'Number of faculty with experience more than 15 years'
        },
        { key: 'experiencedFaculty' as const, label: 'Experienced Faculty (Legacy)', value: tlr.experiencedFaculty, description: 'Legacy field for backward compatibility' }
      ]
    },
    {
      title: 'Financial Resources Utilization (FRU)',
      description: 'Financial expenditure analysis for engineering discipline over previous 3 years',
      maxMarks: 30,
      score: tlrScores.fru,
      fields: [
        // Capital Expenditure fields
        { 
          key: 'capitalExpenditureYear1' as const, 
          label: 'Capital Expenditure - Year 1 (₹)', 
          value: tlr.capitalExpenditureYear1, 
          description: 'Capital expenditure for most recent year (excluding new building construction)'
        },
        { 
          key: 'capitalExpenditureYear2' as const, 
          label: 'Capital Expenditure - Year 2 (₹)', 
          value: tlr.capitalExpenditureYear2, 
          description: 'Capital expenditure for second year (excluding new building construction)'
        },
        { 
          key: 'capitalExpenditureYear3' as const, 
          label: 'Capital Expenditure - Year 3 (₹)', 
          value: tlr.capitalExpenditureYear3, 
          description: 'Capital expenditure for third year (excluding new building construction)'
        },
        // Operational Expenditure fields
        { 
          key: 'operationalExpenditureYear1' as const, 
          label: 'Operational Expenditure - Year 1 (₹)', 
          value: tlr.operationalExpenditureYear1, 
          description: 'Operational/recurring expenditure for most recent year (excluding hostel maintenance)'
        },
        { 
          key: 'operationalExpenditureYear2' as const, 
          label: 'Operational Expenditure - Year 2 (₹)', 
          value: tlr.operationalExpenditureYear2, 
          description: 'Operational/recurring expenditure for second year (excluding hostel maintenance)'
        },
        { 
          key: 'operationalExpenditureYear3' as const, 
          label: 'Operational Expenditure - Year 3 (₹)', 
          value: tlr.operationalExpenditureYear3, 
          description: 'Operational/recurring expenditure for third year (excluding hostel maintenance)'
        },
        // Engineering Students fields
        { 
          key: 'engineeringStudentsYear1' as const, 
          label: 'Engineering Students - Year 1', 
          value: tlr.engineeringStudentsYear1, 
          description: 'Total engineering discipline students for most recent year'
        },
        { 
          key: 'engineeringStudentsYear2' as const, 
          label: 'Engineering Students - Year 2', 
          value: tlr.engineeringStudentsYear2, 
          description: 'Total engineering discipline students for second year'
        },
        { 
          key: 'engineeringStudentsYear3' as const, 
          label: 'Engineering Students - Year 3', 
          value: tlr.engineeringStudentsYear3, 
          description: 'Total engineering discipline students for third year'
        },
        // Legacy fields
        { key: 'financialResources' as const, label: 'Total Financial Resources (Legacy)', value: tlr.financialResources, description: 'Legacy field for backward compatibility' },
        { key: 'resourceUtilization' as const, label: 'Resource Utilization (Legacy)', value: tlr.resourceUtilization, description: 'Legacy field for backward compatibility' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teaching, Learning & Resources</h1>
          <p className="text-gray-600 mt-1">Maximum Marks: 100 | Weight: 30%</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{tlrScores.total}/100</div>
          <div className="text-sm text-gray-500">Current Score</div>
        </div>
      </div>

      <div className="grid gap-6">
        {sections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
                <div className="text-right">
                  <Badge variant={section.score > section.maxMarks * 0.7 ? "default" : "secondary"}>
                    {section.score.toFixed(2)}/{section.maxMarks}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {section.fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={field.key}>{field.label}</Label>
                    <Input
                      id={field.key}
                      type="number"
                      min="0"
                      step={field.key.includes('Expenditure') ? "1000" : "1"}
                      value={field.value || ''}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      placeholder="Enter value"
                    />
                    <p className="text-xs text-gray-500">{field.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Show SS calculation breakdown */}
              {index === 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-sm mb-3">Student Strength Calculation Breakdown:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-medium">Component 1</div>
                      <div className="text-blue-600">{tlrScores.ssBreakdown.fNtNe.toFixed(3)} × 15 = {(tlrScores.ssBreakdown.fNtNe * 15).toFixed(2)}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="font-medium">Component 2</div>
                      <div className="text-green-600">{tlrScores.ssBreakdown.fNp.toFixed(3)} × 5 = {(tlrScores.ssBreakdown.fNp * 5).toFixed(2)}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="font-medium">Total SS Score</div>
                      <div className="text-gray-900 font-bold">{tlrScores.ssBreakdown.total.toFixed(2)}/20</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Note: Calculation uses NIRF-approved functions for optimal scoring.
                  </div>
                </div>
              )}

              {/* Show FSR status and breakdown */}
              {index === 1 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-sm mb-3">Faculty-Student Ratio Assessment:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-medium">Faculty-Student Ratio</div>
                      <div className="text-blue-600">
                        {tlrScores.fsrBreakdown.totalStudents > 0 
                          ? `1:${Math.round(tlrScores.fsrBreakdown.totalStudents / (tlr.fullTimeRegularFaculty || 1))}`
                          : 'N/A'
                        }
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Total Students: {tlrScores.fsrBreakdown.totalStudents}
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="font-medium">FSR Score</div>
                      <div className="text-green-600 font-bold">{tlrScores.fsr.toFixed(2)}/30</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {tlrScores.fsrBreakdown.isValidRatio ? 'Valid ratio' : 'Below minimum threshold'}
                      </div>
                    </div>
                  </div>
                  
                  {!tlrScores.fsrBreakdown.isValidRatio && tlr.fullTimeRegularFaculty > 0 && tlrScores.fsrBreakdown.totalStudents > 0 && (
                    <Alert className="mt-3">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Faculty-student ratio is below the minimum threshold (1:50). FSR score is set to zero.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Alert className="mt-3">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Faculty Criteria:</strong> Only faculty with Ph.D./Master's degrees who taught in both semesters of AY 2023-24 are counted. Optimal ratio is 1:15 for maximum marks.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Show FQE breakdown */}
              {index === 2 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-sm mb-3">Faculty Quality & Experience Assessment:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-medium">Faculty Quality (FQ)</div>
                      <div className="text-blue-600 font-bold">{tlrScores.fqeBreakdown.fq.toFixed(2)}/10</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Ph.D. Percentage: {tlrScores.fqeBreakdown.fra.toFixed(1)}%
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="font-medium">Faculty Experience (FE)</div>
                      <div className="text-green-600 font-bold">{tlrScores.fqeBreakdown.fe.toFixed(2)}/10</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Experience distribution considered
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded mb-3">
                    <div className="font-medium text-sm mb-2">Experience Distribution:</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="font-medium">0-8 years:</span> {(tlrScores.fqeBreakdown.experienceDistribution.f1 * 100).toFixed(1)}%
                      </div>
                      <div>
                        <span className="font-medium">8-15 years:</span> {(tlrScores.fqeBreakdown.experienceDistribution.f2 * 100).toFixed(1)}%
                      </div>
                      <div>
                        <span className="font-medium">15+ years:</span> {(tlrScores.fqeBreakdown.experienceDistribution.f3 * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  <Alert className="mt-3">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Optimal Distribution:</strong> Equal distribution (1:1:1) across experience ranges yields maximum experience score. Ph.D. percentage ≥95% yields maximum quality score.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Show FRU breakdown */}
              {index === 3 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-sm mb-3">Financial Resources Utilization Assessment:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-medium">Capital Expenditure per Student (BC)</div>
                      <div className="text-blue-600 font-bold">{formatCurrency(tlrScores.fruBreakdown.bc)}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        3-year average (excluding building construction)
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="font-medium">Operational Expenditure per Student (BO)</div>
                      <div className="text-green-600 font-bold">{formatCurrency(tlrScores.fruBreakdown.bo)}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        3-year average (excluding hostel maintenance)
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded mb-3">
                    <div className="font-medium text-sm mb-2">FRU Score Breakdown:</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-medium">Capital Component:</span> {(7.5 * tlrScores.fruBreakdown.fBc).toFixed(2)} marks
                      </div>
                      <div>
                        <span className="font-medium">Operational Component:</span> {(22.5 * tlrScores.fruBreakdown.fBo).toFixed(2)} marks
                      </div>
                    </div>
                  </div>
                  
                  <Alert className="mt-3">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Engineering Discipline Only:</strong> Include expenditure and student count for engineering programs only. Exclude new building construction and hostel maintenance costs.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">TLR Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{tlrScores.ss.toFixed(1)}</div>
              <div className="text-sm text-gray-600">SS Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{tlrScores.fsr.toFixed(1)}</div>
              <div className="text-sm text-gray-600">FSR Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{tlrScores.fqe.toFixed(1)}</div>
              <div className="text-sm text-gray-600">FQE Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{tlrScores.fru.toFixed(1)}</div>
              <div className="text-sm text-gray-600">FRU Score</div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-900">{tlrScores.total.toFixed(2)}/100</div>
            <div className="text-sm text-gray-600">Total TLR Score</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TLRForm;