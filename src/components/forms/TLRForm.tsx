import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, GraduationCap, DollarSign, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

const TLRForm: React.FC = () => {
  const { scores, updateTLRData } = useData();
  
  // Local state for form inputs
  const [formData, setFormData] = React.useState({
    // Student Strength (SS) - 20 marks
    totalStudents: 0,
    doctoralStudents: 0,
    
    // Faculty-Student Ratio (FSR) - 30 marks
    totalFaculty: 0,
    permanentFaculty: 0,
    studentCount: 0,
    
    // Faculty Qualification & Experience (FQE) - 20 marks
    facultyWithPhD: 0,
    facultyExperience: 0,
    
    // Financial Resources & Utilisation (FRU) - 30 marks
    totalRevenue: 0,
    capitalExpenditure: 0,
    operationalExpenditure: 0,
    salaryExpenditure: 0
  });

  // Calculate individual component scores
  const calculateSS = () => {
    // Student Strength calculation (20 marks max)
    const totalWeight = Math.min((formData.totalStudents / 1000) * 15, 15);
    const doctoralWeight = Math.min((formData.doctoralStudents / 100) * 5, 5);
    return Math.min(totalWeight + doctoralWeight, 20);
  };

  const calculateFSR = () => {
    // Faculty-Student Ratio calculation (30 marks max)
    if (formData.studentCount === 0 || formData.totalFaculty === 0) return 0;
    
    const ratio = formData.studentCount / formData.totalFaculty;
    const permanentRatio = formData.permanentFaculty / formData.totalFaculty;
    
    // Ideal ratio is around 15:1, permanent faculty should be high
    const ratioScore = Math.max(0, 20 - Math.abs(ratio - 15) * 2);
    const permanentScore = permanentRatio * 10;
    
    return Math.min(ratioScore + permanentScore, 30);
  };

  const calculateFQE = () => {
    // Faculty Qualification & Experience calculation (20 marks max)
    if (formData.totalFaculty === 0) return 0;
    
    const phdRatio = formData.facultyWithPhD / formData.totalFaculty;
    const experienceScore = Math.min(formData.facultyExperience / 15, 1);
    
    const phdScore = phdRatio * 12;
    const expScore = experienceScore * 8;
    
    return Math.min(phdScore + expScore, 20);
  };

  const calculateFRU = () => {
    // Financial Resources & Utilisation calculation (30 marks max)
    if (formData.totalRevenue === 0) return 0;
    
    const revenueScore = Math.min((formData.totalRevenue / 100000000) * 15, 15); // 10 crores base
    const utilizationRatio = (formData.capitalExpenditure + formData.operationalExpenditure) / formData.totalRevenue;
    const utilizationScore = Math.min(utilizationRatio * 15, 15);
    
    return Math.min(revenueScore + utilizationScore, 30);
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const handleSave = () => {
    const ss = calculateSS();
    const fsr = calculateFSR();
    const fqe = calculateFQE();
    const fru = calculateFRU();
    
    updateTLRData({
      ss,
      fsr,
      fqe,
      fru
    });
  };

  const currentSS = calculateSS();
  const currentFSR = calculateFSR();
  const currentFQE = calculateFQE();
  const currentFRU = calculateFRU();
  const totalScore = currentSS + currentFSR + currentFQE + currentFRU;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Teaching, Learning & Resources (TLR)</h2>
          <p className="text-gray-600 mt-1">Weight: 30% | Maximum Score: 100 marks</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600">{totalScore.toFixed(1)}</div>
          <div className="text-sm text-gray-500">Current Score</div>
        </div>
      </div>

      {/* Score Overview */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">TLR Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{currentSS.toFixed(1)}</div>
              <div className="text-sm text-gray-600">SS (20 max)</div>
              <Progress value={(currentSS / 20) * 100} className="h-2 mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{currentFSR.toFixed(1)}</div>
              <div className="text-sm text-gray-600">FSR (30 max)</div>
              <Progress value={(currentFSR / 30) * 100} className="h-2 mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{currentFQE.toFixed(1)}</div>
              <div className="text-sm text-gray-600">FQE (20 max)</div>
              <Progress value={(currentFQE / 20) * 100} className="h-2 mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{currentFRU.toFixed(1)}</div>
              <div className="text-sm text-gray-600">FRU (30 max)</div>
              <Progress value={(currentFRU / 30) * 100} className="h-2 mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* A. Student Strength (SS) - 20 marks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span>A. Student Strength including Doctoral Students (SS)</span>
            <Badge variant="outline">20 marks</Badge>
          </CardTitle>
          <CardDescription>
            Total student enrollment including undergraduate, postgraduate, and doctoral students
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalStudents">Total Students</Label>
              <Input
                id="totalStudents"
                type="number"
                placeholder="e.g., 5000"
                value={formData.totalStudents || ''}
                onChange={(e) => handleInputChange('totalStudents', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">All enrolled students (UG + PG + PhD)</p>
            </div>
            <div>
              <Label htmlFor="doctoralStudents">Doctoral Students</Label>
              <Input
                id="doctoralStudents"
                type="number"
                placeholder="e.g., 200"
                value={formData.doctoralStudents || ''}
                onChange={(e) => handleInputChange('doctoralStudents', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">PhD and research scholars</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* B. Faculty-Student Ratio (FSR) - 30 marks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-green-600" />
            <span>B. Faculty-Student Ratio with emphasis on permanent faculty (FSR)</span>
            <Badge variant="outline">30 marks</Badge>
          </CardTitle>
          <CardDescription>
            Faculty strength and student-faculty ratio with emphasis on permanent appointments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="totalFaculty">Total Faculty</Label>
              <Input
                id="totalFaculty"
                type="number"
                placeholder="e.g., 300"
                value={formData.totalFaculty || ''}
                onChange={(e) => handleInputChange('totalFaculty', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">All teaching faculty</p>
            </div>
            <div>
              <Label htmlFor="permanentFaculty">Permanent Faculty</Label>
              <Input
                id="permanentFaculty"
                type="number"
                placeholder="e.g., 250"
                value={formData.permanentFaculty || ''}
                onChange={(e) => handleInputChange('permanentFaculty', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Regular/permanent appointments</p>
            </div>
            <div>
              <Label htmlFor="studentCount">Student Count for Ratio</Label>
              <Input
                id="studentCount"
                type="number"
                placeholder="e.g., 4500"
                value={formData.studentCount || ''}
                onChange={(e) => handleInputChange('studentCount', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Students considered for ratio calculation</p>
            </div>
          </div>
          {formData.totalFaculty > 0 && formData.studentCount > 0 && (
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                Current Ratio: {(formData.studentCount / formData.totalFaculty).toFixed(1)}:1 
                | Permanent Faculty: {((formData.permanentFaculty / formData.totalFaculty) * 100).toFixed(1)}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* C. Faculty Qualification & Experience (FQE) - 20 marks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-purple-600" />
            <span>C. Combined metric for Faculty with PhD and Experience (FQE)</span>
            <Badge variant="outline">20 marks</Badge>
          </CardTitle>
          <CardDescription>
            Faculty qualifications (PhD) and average teaching/research experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="facultyWithPhD">Faculty with PhD</Label>
              <Input
                id="facultyWithPhD"
                type="number"
                placeholder="e.g., 280"
                value={formData.facultyWithPhD || ''}
                onChange={(e) => handleInputChange('facultyWithPhD', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Faculty with PhD or equivalent degree</p>
            </div>
            <div>
              <Label htmlFor="facultyExperience">Average Faculty Experience (years)</Label>
              <Input
                id="facultyExperience"
                type="number"
                placeholder="e.g., 12"
                value={formData.facultyExperience || ''}
                onChange={(e) => handleInputChange('facultyExperience', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Average teaching/research experience</p>
            </div>
          </div>
          {formData.totalFaculty > 0 && formData.facultyWithPhD > 0 && (
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-800">
                PhD Ratio: {((formData.facultyWithPhD / formData.totalFaculty) * 100).toFixed(1)}%
                | Average Experience: {formData.facultyExperience} years
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* D. Financial Resources & Utilisation (FRU) - 30 marks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-orange-600" />
            <span>D. Financial Resources and their Utilisation (FRU)</span>
            <Badge variant="outline">30 marks</Badge>
          </CardTitle>
          <CardDescription>
            Annual financial resources, expenditure patterns, and resource utilization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalRevenue">Total Annual Revenue (₹)</Label>
              <Input
                id="totalRevenue"
                type="number"
                placeholder="e.g., 50000000"
                value={formData.totalRevenue || ''}
                onChange={(e) => handleInputChange('totalRevenue', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Total institutional revenue per year</p>
            </div>
            <div>
              <Label htmlFor="capitalExpenditure">Capital Expenditure (₹)</Label>
              <Input
                id="capitalExpenditure"
                type="number"
                placeholder="e.g., 10000000"
                value={formData.capitalExpenditure || ''}
                onChange={(e) => handleInputChange('capitalExpenditure', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Infrastructure, equipment, facilities</p>
            </div>
            <div>
              <Label htmlFor="operationalExpenditure">Operational Expenditure (₹)</Label>
              <Input
                id="operationalExpenditure"
                type="number"
                placeholder="e.g., 25000000"
                value={formData.operationalExpenditure || ''}
                onChange={(e) => handleInputChange('operationalExpenditure', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Running costs, maintenance, utilities</p>
            </div>
            <div>
              <Label htmlFor="salaryExpenditure">Salary Expenditure (₹)</Label>
              <Input
                id="salaryExpenditure"
                type="number"
                placeholder="e.g., 20000000"
                value={formData.salaryExpenditure || ''}
                onChange={(e) => handleInputChange('salaryExpenditure', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Faculty and staff salaries</p>
            </div>
          </div>
          {formData.totalRevenue > 0 && (
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                Total Expenditure: ₹{((formData.capitalExpenditure + formData.operationalExpenditure + formData.salaryExpenditure) / 10000000).toFixed(1)} Cr
                | Utilization: {(((formData.capitalExpenditure + formData.operationalExpenditure) / formData.totalRevenue) * 100).toFixed(1)}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-800">NIRF TLR Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Scoring Guidelines</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• SS (20 marks): Student enrollment strength</li>
                <li>• FSR (30 marks): Faculty-student ratio quality</li>
                <li>• FQE (20 marks): Faculty qualifications & experience</li>
                <li>• FRU (30 marks): Financial resource utilization</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Best Practices</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Optimal faculty-student ratio: 1:15 or better</li>
                <li>• High percentage of permanent faculty (&gt;70%)</li>
                <li>• Faculty with PhD: &gt;80% recommended</li>
                <li>• Adequate per-student expenditure (&gt;₹2 lakhs)</li>
                <li>• Significant research funding allocation (&gt;15%)</li>
                <li>• Strong doctoral program participation</li>
                <li>• Experienced faculty retention (&gt;60%)</li>
                <li>• Infrastructure investment (&gt;20% capital exp.)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save TLR Data</span>
        </Button>
      </div>
    </div>
  );
};

export default TLRForm;