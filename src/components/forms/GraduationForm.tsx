import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, GraduationCap, Users, DollarSign, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';

const GraduationForm: React.FC = () => {
  const { data, scores, updateGraduation } = useData();
  const { graduation } = data;
  const graduationScores = scores.graduation;

  const handleInputChange = (field: keyof typeof graduation, value: string) => {
    const numValue = parseFloat(value) || 0;
    updateGraduation({ [field]: numValue });
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
      title: 'Placement and Higher Studies (GPH)',
      description: 'Combined metric for student placement and higher education outcomes',
      maxMarks: 40,
      score: graduationScores.gph,
      icon: GraduationCap,
      fields: [
        { 
          key: 'placementPercentage' as const, 
          label: 'Placement Percentage (Np)', 
          value: graduation.placementPercentage,
          description: 'Percentage of graduating students (UG/PG) placed in the previous three years',
          suffix: '%'
        },
        { 
          key: 'higherStudiesPercentage' as const, 
          label: 'Higher Studies Percentage (Nhs)', 
          value: graduation.higherStudiesPercentage,
          description: 'Percentage of graduating students (UG/PG) selected for higher studies in the previous three years',
          suffix: '%'
        }
      ]
    },
    {
      title: 'University Examinations (GUE)',
      description: 'Student performance in university examinations',
      maxMarks: 15,
      score: graduationScores.gue,
      icon: Users,
      fields: [
        { 
          key: 'passPercentageInStipulatedTime' as const, 
          label: 'Pass Percentage in Stipulated Time (Ng)', 
          value: graduation.passPercentageInStipulatedTime,
          description: 'Percentage of students passing university examinations in stipulated time (3-year average)',
          suffix: '%'
        }
      ]
    },
    {
      title: 'Median Salary (GMS)',
      description: 'Median salary of graduates',
      maxMarks: 25,
      score: graduationScores.gms,
      icon: DollarSign,
      fields: [
        { 
          key: 'medianSalaryGraduates' as const, 
          label: 'Median Salary of Graduates (MS) - ₹', 
          value: graduation.medianSalaryGraduates,
          description: 'Median salary of graduates (UG/PG) in the previous three years',
          suffix: ''
        }
      ]
    },
    {
      title: 'Ph.D Students Graduated (GPHD)',
      description: 'Number of Ph.D students graduated',
      maxMarks: 20,
      score: graduationScores.gphd,
      icon: Award,
      fields: [
        { 
          key: 'averagePhdGraduates' as const, 
          label: 'Average Ph.D Graduates (Nphd)', 
          value: graduation.averagePhdGraduates,
          description: 'Average number of Ph.D students graduated (awarded Ph.D) over the previous three years'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Graduation Outcomes</h1>
          <p className="text-gray-600 mt-1">Maximum Marks: 100 | Weight: 20%</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600">{graduationScores.total}/100</div>
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
                        max={field.suffix === '%' ? "100" : undefined}
                        step={field.key.includes('Salary') ? "1000" : field.suffix === '%' ? "0.1" : "1"}
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
              
              {/* Show GPH calculation breakdown */}
              {index === 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-sm mb-3">Placement and Higher Studies Assessment:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-medium">Placement Component</div>
                      <div className="text-blue-600 font-bold">{graduationScores.gphBreakdown.np}%</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Students placed in industry
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="font-medium">Higher Studies Component</div>
                      <div className="text-green-600 font-bold">{graduationScores.gphBreakdown.nhs}%</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Students pursuing higher education
                      </div>
                    </div>
                  </div>
                  
                  <Alert className="mt-3">
                    <GraduationCap className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Combined Outcome:</strong> GPH considers both placement and higher studies as positive outcomes. The formula rewards institutions that achieve high rates in either category.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Show GUE calculation breakdown */}
              {index === 1 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-sm mb-3">University Examinations Assessment:</h4>
                  <div className="bg-blue-50 p-3 rounded mb-4">
                    <div className="font-medium">Pass Rate in Stipulated Time</div>
                    <div className="text-blue-600 font-bold">{graduationScores.gueBreakdown.ng}%</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Threshold: 80% for maximum marks
                    </div>
                  </div>
                  
                  <Alert className="mt-3">
                    <Users className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Academic Performance:</strong> GUE measures the percentage of students completing their programs in the stipulated time. Maximum marks awarded when pass rate reaches 80%.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Show GMS calculation breakdown */}
              {index === 2 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-sm mb-3">Median Salary Assessment:</h4>
                  <div className="bg-green-50 p-3 rounded mb-4">
                    <div className="font-medium">Median Salary</div>
                    <div className="text-green-600 font-bold">{formatCurrency(graduationScores.gmsBreakdown.ms)}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Scaling factor: {graduationScores.gmsBreakdown.fMs.toFixed(3)}
                    </div>
                  </div>
                  
                  <Alert className="mt-3">
                    <DollarSign className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Salary Metrics:</strong> GMS uses median salary to assess the market value of graduates. Higher salaries indicate better industry recognition and skill development.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Show GPHD calculation breakdown */}
              {index === 3 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-sm mb-3">Ph.D Graduates Assessment:</h4>
                  <div className="bg-purple-50 p-3 rounded mb-4">
                    <div className="font-medium">Average Ph.D Graduates</div>
                    <div className="text-purple-600 font-bold">{graduationScores.gphdBreakdown.nphd}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Scaling factor: {graduationScores.gphdBreakdown.fNphd.toFixed(3)}
                    </div>
                  </div>
                  
                  <Alert className="mt-3">
                    <Award className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Research Output:</strong> GPHD measures the institution's capacity to produce Ph.D graduates, indicating research strength and doctoral program effectiveness.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-900">Graduation Outcomes Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">{graduationScores.gph.toFixed(1)}</div>
              <div className="text-sm text-gray-600">GPH Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{graduationScores.gue.toFixed(1)}</div>
              <div className="text-sm text-gray-600">GUE Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{graduationScores.gms.toFixed(1)}</div>
              <div className="text-sm text-gray-600">GMS Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{graduationScores.gphd.toFixed(1)}</div>
              <div className="text-sm text-gray-600">GPHD Score</div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-900">{graduationScores.total.toFixed(2)}/100</div>
            <div className="text-sm text-gray-600">Total Graduation Outcomes Score</div>
            <div className="text-xs text-gray-500 mt-1">
              GO = GPH({graduationScores.gph.toFixed(1)}) + GUE({graduationScores.gue.toFixed(1)}) + GMS({graduationScores.gms.toFixed(1)}) + GPHD({graduationScores.gphd.toFixed(1)})
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraduationForm;