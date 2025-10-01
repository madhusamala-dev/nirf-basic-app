import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Briefcase, Trophy, BookOpen, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

const GraduationForm: React.FC = () => {
  const { scores, updateGraduationData } = useData();
  
  // Local state for form inputs
  const [formData, setFormData] = useState({
    // Combined metric for Placement and Higher Studies (GPH) - 40 marks
    totalGraduates: 0,
    placedStudents: 0,
    higherStudiesStudents: 0,
    employmentRate: 0,
    
    // Metric for University Examinations (GUE) - 15 marks
    universityPassRate: 0,
    firstClassPercentage: 0,
    academicAchievements: 0,
    
    // Median Salary (GMS) - 25 marks
    medianSalary: 0,
    averageSalary: 0,
    highestSalary: 0,
    salaryRange: 0,
    
    // Metric for Number of Ph.D. Students Graduated (GPHD) - 20 marks
    phdGraduated: 0,
    totalPhdEnrolled: 0,
    phdCompletionRate: 0,
    researchPublications: 0
  });

  // Calculate individual component scores
  const calculateGPH = () => {
    // Combined metric for Placement and Higher Studies (40 marks max)
    if (formData.totalGraduates === 0) return 0;
    
    const placementRate = (formData.placedStudents / formData.totalGraduates) * 100;
    const higherStudiesRate = (formData.higherStudiesStudents / formData.totalGraduates) * 100;
    const combinedRate = placementRate + higherStudiesRate;
    
    const placementScore = Math.min((placementRate / 90) * 20, 20);
    const higherStudiesScore = Math.min((higherStudiesRate / 30) * 10, 10);
    const employmentScore = Math.min((formData.employmentRate / 95) * 10, 10);
    
    return Math.min(placementScore + higherStudiesScore + employmentScore, 40);
  };

  const calculateGUE = () => {
    // Metric for University Examinations (15 marks max)
    const passRateScore = Math.min((formData.universityPassRate / 100) * 8, 8);
    const firstClassScore = Math.min((formData.firstClassPercentage / 80) * 4, 4);
    const achievementScore = Math.min((formData.academicAchievements / 10) * 3, 3);
    
    return Math.min(passRateScore + firstClassScore + achievementScore, 15);
  };

  const calculateGMS = () => {
    // Median Salary (25 marks max)
    const medianScore = Math.min((formData.medianSalary / 1000000) * 15, 15);
    const averageScore = Math.min((formData.averageSalary / 1200000) * 5, 5);
    const rangeScore = Math.min((formData.salaryRange / 500000) * 3, 3);
    const highestScore = Math.min((formData.highestSalary / 2000000) * 2, 2);
    
    return Math.min(medianScore + averageScore + rangeScore + highestScore, 25);
  };

  const calculateGPHD = () => {
    // Metric for Number of Ph.D. Students Graduated (20 marks max)
    const graduatedScore = Math.min((formData.phdGraduated / 20) * 10, 10);
    const completionScore = formData.totalPhdEnrolled > 0 ? 
      Math.min((formData.phdCompletionRate / 80) * 5, 5) : 0;
    const publicationScore = Math.min((formData.researchPublications / 50) * 5, 5);
    
    return Math.min(graduatedScore + completionScore + publicationScore, 20);
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const handleSave = () => {
    const gph = calculateGPH();
    const gue = calculateGUE();
    const gms = calculateGMS();
    const gphd = calculateGPHD();
    
    updateGraduationData({
      gph,
      gue,
      gms,
      gphd
    });
  };

  const currentGPH = calculateGPH();
  const currentGUE = calculateGUE();
  const currentGMS = calculateGMS();
  const currentGPHD = calculateGPHD();
  const totalScore = currentGPH + currentGUE + currentGMS + currentGPHD;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Graduation Outcomes (GO)</h2>
          <p className="text-gray-600 mt-1">Weight: 20% | Maximum Score: 100 marks</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-purple-600">{totalScore.toFixed(1)}</div>
          <div className="text-sm text-gray-500">Current Score</div>
        </div>
      </div>

      {/* Score Overview */}
      <Card className="bg-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-900">Graduation Outcomes Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{currentGPH.toFixed(1)}</div>
              <div className="text-sm text-gray-600">GPH (40 max)</div>
              <Progress value={(currentGPH / 40) * 100} className="h-2 mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{currentGUE.toFixed(1)}</div>
              <div className="text-sm text-gray-600">GUE (15 max)</div>
              <Progress value={(currentGUE / 15) * 100} className="h-2 mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{currentGMS.toFixed(1)}</div>
              <div className="text-sm text-gray-600">GMS (25 max)</div>
              <Progress value={(currentGMS / 25) * 100} className="h-2 mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{currentGPHD.toFixed(1)}</div>
              <div className="text-sm text-gray-600">GPHD (20 max)</div>
              <Progress value={(currentGPHD / 20) * 100} className="h-2 mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* A. Combined metric for Placement and Higher Studies (GPH) - 40 marks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-purple-600" />
            <span>A. Combined metric for Placement and Higher Studies (GPH)</span>
            <Badge variant="outline">40 marks</Badge>
          </CardTitle>
          <CardDescription>
            Student placement statistics, higher studies enrollment, and overall employment outcomes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalGraduates">Total Graduates</Label>
              <Input
                id="totalGraduates"
                type="number"
                placeholder="e.g., 500"
                value={formData.totalGraduates || ''}
                onChange={(e) => handleInputChange('totalGraduates', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Total students graduated in the academic year</p>
            </div>
            <div>
              <Label htmlFor="placedStudents">Placed Students</Label>
              <Input
                id="placedStudents"
                type="number"
                placeholder="e.g., 400"
                value={formData.placedStudents || ''}
                onChange={(e) => handleInputChange('placedStudents', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Students placed in jobs/internships</p>
            </div>
            <div>
              <Label htmlFor="higherStudiesStudents">Higher Studies Students</Label>
              <Input
                id="higherStudiesStudents"
                type="number"
                placeholder="e.g., 80"
                value={formData.higherStudiesStudents || ''}
                onChange={(e) => handleInputChange('higherStudiesStudents', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Students pursuing higher education</p>
            </div>
            <div>
              <Label htmlFor="employmentRate">Employment Rate (%)</Label>
              <Input
                id="employmentRate"
                type="number"
                placeholder="e.g., 85"
                value={formData.employmentRate || ''}
                onChange={(e) => handleInputChange('employmentRate', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Overall employment percentage</p>
            </div>
          </div>
          {formData.totalGraduates > 0 && (
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-800">
                Placement Rate: {((formData.placedStudents / formData.totalGraduates) * 100).toFixed(1)}% | 
                Higher Studies: {((formData.higherStudiesStudents / formData.totalGraduates) * 100).toFixed(1)}% | 
                Combined: {(((formData.placedStudents + formData.higherStudiesStudents) / formData.totalGraduates) * 100).toFixed(1)}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* B. Metric for University Examinations (GUE) - 15 marks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-blue-600" />
            <span>B. Metric for University Examinations (GUE)</span>
            <Badge variant="outline">15 marks</Badge>
          </CardTitle>
          <CardDescription>
            University examination performance, pass rates, and academic achievements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="universityPassRate">University Pass Rate (%)</Label>
              <Input
                id="universityPassRate"
                type="number"
                placeholder="e.g., 95"
                value={formData.universityPassRate || ''}
                onChange={(e) => handleInputChange('universityPassRate', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Overall pass percentage in university exams</p>
            </div>
            <div>
              <Label htmlFor="firstClassPercentage">First Class Percentage (%)</Label>
              <Input
                id="firstClassPercentage"
                type="number"
                placeholder="e.g., 60"
                value={formData.firstClassPercentage || ''}
                onChange={(e) => handleInputChange('firstClassPercentage', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Students achieving first class/distinction</p>
            </div>
            <div>
              <Label htmlFor="academicAchievements">Academic Achievements</Label>
              <Input
                id="academicAchievements"
                type="number"
                placeholder="e.g., 8"
                value={formData.academicAchievements || ''}
                onChange={(e) => handleInputChange('academicAchievements', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Awards, medals, recognitions received</p>
            </div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Academic Performance: Pass Rate ({formData.universityPassRate}%) | First Class ({formData.firstClassPercentage}%) | Achievements ({formData.academicAchievements})
            </p>
          </div>
        </CardContent>
      </Card>

      {/* C. Median Salary (GMS) - 25 marks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-green-600" />
            <span>C. Median Salary (GMS)</span>
            <Badge variant="outline">25 marks</Badge>
          </CardTitle>
          <CardDescription>
            Salary statistics including median, average, and salary distribution data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="medianSalary">Median Salary (₹)</Label>
              <Input
                id="medianSalary"
                type="number"
                placeholder="e.g., 600000"
                value={formData.medianSalary || ''}
                onChange={(e) => handleInputChange('medianSalary', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Median annual salary of placed students</p>
            </div>
            <div>
              <Label htmlFor="averageSalary">Average Salary (₹)</Label>
              <Input
                id="averageSalary"
                type="number"
                placeholder="e.g., 750000"
                value={formData.averageSalary || ''}
                onChange={(e) => handleInputChange('averageSalary', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Average annual salary of placed students</p>
            </div>
            <div>
              <Label htmlFor="highestSalary">Highest Salary (₹)</Label>
              <Input
                id="highestSalary"
                type="number"
                placeholder="e.g., 1500000"
                value={formData.highestSalary || ''}
                onChange={(e) => handleInputChange('highestSalary', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Highest package offered</p>
            </div>
            <div>
              <Label htmlFor="salaryRange">Salary Range (₹)</Label>
              <Input
                id="salaryRange"
                type="number"
                placeholder="e.g., 400000"
                value={formData.salaryRange || ''}
                onChange={(e) => handleInputChange('salaryRange', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Difference between highest and lowest salary</p>
            </div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              Salary Statistics: Median (₹{(formData.medianSalary / 100000).toFixed(1)}L) | Average (₹{(formData.averageSalary / 100000).toFixed(1)}L) | Highest (₹{(formData.highestSalary / 100000).toFixed(1)}L)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* D. Metric for Number of Ph.D. Students Graduated (GPHD) - 20 marks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-orange-600" />
            <span>D. Metric for Number of Ph.D. Students Graduated (GPHD)</span>
            <Badge variant="outline">20 marks</Badge>
          </CardTitle>
          <CardDescription>
            Doctoral program outcomes, PhD graduation rates, and research productivity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phdGraduated">Ph.D. Students Graduated</Label>
              <Input
                id="phdGraduated"
                type="number"
                placeholder="e.g., 15"
                value={formData.phdGraduated || ''}
                onChange={(e) => handleInputChange('phdGraduated', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Number of PhD students graduated this year</p>
            </div>
            <div>
              <Label htmlFor="totalPhdEnrolled">Total Ph.D. Enrolled</Label>
              <Input
                id="totalPhdEnrolled"
                type="number"
                placeholder="e.g., 80"
                value={formData.totalPhdEnrolled || ''}
                onChange={(e) => handleInputChange('totalPhdEnrolled', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Total PhD students currently enrolled</p>
            </div>
            <div>
              <Label htmlFor="phdCompletionRate">Ph.D. Completion Rate (%)</Label>
              <Input
                id="phdCompletionRate"
                type="number"
                placeholder="e.g., 70"
                value={formData.phdCompletionRate || ''}
                onChange={(e) => handleInputChange('phdCompletionRate', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">PhD completion rate within stipulated time</p>
            </div>
            <div>
              <Label htmlFor="researchPublications">Research Publications by PhD Students</Label>
              <Input
                id="researchPublications"
                type="number"
                placeholder="e.g., 35"
                value={formData.researchPublications || ''}
                onChange={(e) => handleInputChange('researchPublications', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Publications by PhD students during their tenure</p>
            </div>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-800">
              PhD Metrics: Graduated ({formData.phdGraduated}) | Completion Rate ({formData.phdCompletionRate}%) | Publications ({formData.researchPublications})
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Graduation Data</span>
        </Button>
      </div>
    </div>
  );
};

export default GraduationForm;