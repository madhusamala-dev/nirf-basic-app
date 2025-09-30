import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Globe, Users, Heart, Accessibility } from 'lucide-react';
import { useData } from '../../context/DataContext';

const OutreachForm: React.FC = () => {
  const { data, scores, updateOutreach } = useData();
  const { outreach } = data;
  const outreachScores = scores.outreach;

  const handleInputChange = (field: keyof typeof outreach, value: string) => {
    const numValue = parseFloat(value) || 0;
    updateOutreach({ [field]: numValue });
  };

  const sections = [
    {
      title: 'Region Diversity (RD)',
      description: 'Percentage of students from other states and countries',
      maxMarks: 30,
      score: outreachScores.rd,
      icon: Globe,
      fields: [
        { 
          key: 'studentsFromOtherStates' as const, 
          label: 'Students from Other States', 
          value: outreach.studentsFromOtherStates,
          description: 'Number of students enrolled from other states'
        },
        { 
          key: 'studentsFromOtherCountries' as const, 
          label: 'Students from Other Countries', 
          value: outreach.studentsFromOtherCountries,
          description: 'Number of students enrolled from other countries'
        },
        { 
          key: 'totalStudentsEnrolled' as const, 
          label: 'Total Students Enrolled', 
          value: outreach.totalStudentsEnrolled,
          description: 'Total number of students enrolled for calculating diversity fractions'
        }
      ]
    },
    {
      title: 'Women Diversity (WD)',
      description: 'Percentage of women students and faculty',
      maxMarks: 30,
      score: outreachScores.wd,
      icon: Users,
      fields: [
        { 
          key: 'womenStudentsPercentage' as const, 
          label: 'Women Students Percentage (NWS)', 
          value: outreach.womenStudentsPercentage,
          description: 'Percentage of women students (expectation: 50%)',
          suffix: '%'
        },
        { 
          key: 'womenFacultyPercentage' as const, 
          label: 'Women Faculty Percentage (NWF)', 
          value: outreach.womenFacultyPercentage,
          description: 'Percentage of women faculty including senior administrative positions (expectation: 20%)',
          suffix: '%'
        }
      ]
    },
    {
      title: 'Economically and Socially Challenged Students (ESCS)',
      description: 'Support for economically disadvantaged students',
      maxMarks: 20,
      score: outreachScores.escs,
      icon: Heart,
      fields: [
        { 
          key: 'ugStudentsWithFullFeeReimbursement' as const, 
          label: 'UG Students with Full Fee Reimbursement', 
          value: outreach.ugStudentsWithFullFeeReimbursement,
          description: 'Number of UG students provided full tuition fee reimbursement by the institution'
        },
        { 
          key: 'totalUgStudents' as const, 
          label: 'Total UG Students', 
          value: outreach.totalUgStudents,
          description: 'Total number of UG students for calculating reimbursement percentage'
        }
      ]
    },
    {
      title: 'Facilities for Physically Challenged Students (PCS)',
      description: 'Accessibility and support facilities',
      maxMarks: 20,
      score: outreachScores.pcs,
      icon: Accessibility,
      fields: [
        { 
          key: 'physicallyCharallengedFacilitiesScore' as const, 
          label: 'Facilities Score (0-20)', 
          value: outreach.physicallyCharallengedFacilitiesScore,
          description: '20 marks for full facilities, proportional scoring for partial facilities'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Outreach & Inclusivity</h1>
          <p className="text-gray-600 mt-1">Maximum Marks: 100 | Weight: 10%</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-pink-600">{outreachScores.total}/100</div>
          <div className="text-sm text-gray-500">Current Score</div>
        </div>
      </div>

      <div className="grid gap-6">
        {sections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <section.icon className="h-6 w-6 text-gray-600" />
                  <div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
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
                    <div className="relative">
                      <Input
                        id={field.key}
                        type="number"
                        min="0"
                        max={field.suffix === '%' ? "100" : field.key === 'physicallyCharallengedFacilitiesScore' ? "20" : undefined}
                        step={field.suffix === '%' ? "0.1" : "1"}
                        value={field.value || ''}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        placeholder="Enter value"
                      />
                      {field.suffix && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500 text-sm">{field.suffix}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{field.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Show RD calculation breakdown */}
              {index === 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-sm mb-3">Region Diversity Assessment:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-medium">Other States Component</div>
                      <div className="text-blue-600 font-bold">{(outreachScores.rdBreakdown.otherStatesFraction * 100).toFixed(1)}%</div>
                      <div className="text-xs text-gray-500 mt-1">
                        25 × {outreachScores.rdBreakdown.otherStatesFraction.toFixed(3)} = {(25 * outreachScores.rdBreakdown.otherStatesFraction).toFixed(2)} marks
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="font-medium">Other Countries Component</div>
                      <div className="text-green-600 font-bold">{(outreachScores.rdBreakdown.otherCountriesFraction * 100).toFixed(1)}%</div>
                      <div className="text-xs text-gray-500 mt-1">
                        5 × {outreachScores.rdBreakdown.otherCountriesFraction.toFixed(3)} = {(5 * outreachScores.rdBreakdown.otherCountriesFraction).toFixed(2)} marks
                      </div>
                    </div>
                  </div>
                  
                  <Alert className="mt-3">
                    <Globe className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Geographic Diversity:</strong> RD rewards institutions that attract students from diverse geographic regions, promoting national and international integration.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Show WD calculation breakdown */}
              {index === 1 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-sm mb-3">Women Diversity Assessment:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-medium">Students Component</div>
                      <div className="text-blue-600 font-bold">{outreachScores.wdBreakdown.studentsComponent.toFixed(2)}/15</div>
                      <div className="text-xs text-gray-500 mt-1">
                        15 × ({outreachScores.wdBreakdown.nws}%/50%)
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="font-medium">Faculty Component</div>
                      <div className="text-green-600 font-bold">{outreachScores.wdBreakdown.facultyComponent.toFixed(2)}/15</div>
                      <div className="text-xs text-gray-500 mt-1">
                        15 × ({outreachScores.wdBreakdown.nwf}%/20%)
                      </div>
                    </div>
                  </div>
                  
                  <Alert className="mt-3">
                    <Users className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Gender Balance:</strong> WD promotes gender equality with expectations of 50% women students and 20% women faculty for maximum marks.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Show ESCS calculation breakdown */}
              {index === 2 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-sm mb-3">Economic Support Assessment:</h4>
                  <div className="bg-blue-50 p-3 rounded mb-4">
                    <div className="font-medium">Fee Reimbursement Percentage</div>
                    <div className="text-blue-600 font-bold">{outreachScores.escsBreakdown.nesc.toFixed(1)}%</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Scaling factor: {outreachScores.escsBreakdown.fNesc.toFixed(3)}
                    </div>
                  </div>
                  
                  <Alert className="mt-3">
                    <Heart className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Economic Inclusion:</strong> ESCS measures institutional commitment to supporting economically disadvantaged students through fee reimbursement programs.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Show PCS calculation breakdown */}
              {index === 3 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-sm mb-3">Accessibility Facilities Assessment:</h4>
                  <div className="bg-purple-50 p-3 rounded mb-4">
                    <div className="font-medium">Facilities Score</div>
                    <div className="text-purple-600 font-bold">{outreachScores.pcsBreakdown.facilitiesScore}/20</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Based on verifiable responses to facility questions
                    </div>
                  </div>
                  
                  <Alert className="mt-3">
                    <Accessibility className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Physical Accessibility:</strong> PCS evaluates comprehensive facilities for physically challenged students including ramps, elevators, accessible restrooms, and assistive technologies.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-pink-50 border-pink-200">
        <CardHeader>
          <CardTitle className="text-pink-900">Outreach & Inclusivity Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-pink-600">{outreachScores.rd.toFixed(1)}</div>
              <div className="text-sm text-gray-600">RD Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">{outreachScores.wd.toFixed(1)}</div>
              <div className="text-sm text-gray-600">WD Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">{outreachScores.escs.toFixed(1)}</div>
              <div className="text-sm text-gray-600">ESCS Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">{outreachScores.pcs.toFixed(1)}</div>
              <div className="text-sm text-gray-600">PCS Score</div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-900">{outreachScores.total.toFixed(2)}/100</div>
            <div className="text-sm text-gray-600">Total Outreach & Inclusivity Score</div>
            <div className="text-xs text-gray-500 mt-1">
              OI = RD({outreachScores.rd.toFixed(1)}) + WD({outreachScores.wd.toFixed(1)}) + ESCS({outreachScores.escs.toFixed(1)}) + PCS({outreachScores.pcs.toFixed(1)})
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutreachForm;