import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, GraduationCap, DollarSign } from 'lucide-react';
import { useData } from '../../context/DataContext';

const TLRForm: React.FC = () => {
  const { scores, updateTLRData } = useData();
  
  // Safe destructuring with fallback values
  const tlrData = scores?.tlr || { ss: 0, fsr: 0, fqe: 0, fru: 0, total: 0 };
  
  const [formData, setFormData] = useState({
    studentStrength: 0,
    facultyCount: 0,
    facultyWithPhD: 0,
    totalExpenditure: 0,
  });

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    const updatedData = { ...formData, [field]: numValue };
    setFormData(updatedData);
    
    // Calculate TLR scores based on input
    const calculatedScores = calculateTLRScores(updatedData);
    updateTLRData(calculatedScores);
  };

  const calculateTLRScores = (data: typeof formData) => {
    // Student Strength Score (SS) - Max 20 points
    const ss = Math.min((data.studentStrength / 2000) * 20, 20);
    
    // Faculty-Student Ratio (FSR) - Max 30 points
    const ratio = data.facultyCount > 0 ? data.studentStrength / data.facultyCount : 0;
    const fsr = ratio > 0 ? Math.min((15 / ratio) * 30, 30) : 0;
    
    // Faculty with PhD (FQE) - Max 20 points
    const phdPercentage = data.facultyCount > 0 ? (data.facultyWithPhD / data.facultyCount) * 100 : 0;
    const fqe = Math.min((phdPercentage / 100) * 20, 20);
    
    // Financial Resources and Utilization (FRU) - Max 30 points
    const fru = Math.min((data.totalExpenditure / 100000000) * 30, 30);
    
    const total = ss + fsr + fqe + fru;
    
    return { ss, fsr, fqe, fru, total };
  };

  const metrics = [
    {
      id: 'ss',
      title: 'Student Strength',
      value: tlrData.ss,
      maxValue: 20,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'fsr',
      title: 'Faculty-Student Ratio',
      value: tlrData.fsr,
      maxValue: 30,
      icon: GraduationCap,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'fqe',
      title: 'Faculty Qualification',
      value: tlrData.fqe,
      maxValue: 20,
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'fru',
      title: 'Financial Resources',
      value: tlrData.fru,
      maxValue: 30,
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teaching, Learning & Resources (TLR)</h1>
          <p className="text-gray-600 mt-1">Enter your institution's TLR data for NIRF assessment</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600">{tlrData.total.toFixed(2)}</div>
          <div className="text-sm text-gray-500">Total TLR Score</div>
        </div>
      </div>

      {/* Score Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span>TLR Score Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <div key={metric.id} className={`text-center p-4 ${metric.bgColor} rounded-lg`}>
                <metric.icon className={`h-6 w-6 ${metric.color} mx-auto mb-2`} />
                <div className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value.toFixed(1)}
                </div>
                <div className="text-xs text-gray-600">
                  out of {metric.maxValue}
                </div>
                <Progress 
                  value={(metric.value / metric.maxValue) * 100} 
                  className="h-2 mt-2" 
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Input Forms */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Student & Faculty Data</span>
            </CardTitle>
            <CardDescription>
              Enter the total number of students and faculty members
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentStrength">Total Student Strength</Label>
              <Input
                id="studentStrength"
                type="number"
                value={formData.studentStrength}
                onChange={(e) => handleInputChange('studentStrength', e.target.value)}
                placeholder="Enter total number of students"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="facultyCount">Total Faculty Count</Label>
              <Input
                id="facultyCount"
                type="number"
                value={formData.facultyCount}
                onChange={(e) => handleInputChange('facultyCount', e.target.value)}
                placeholder="Enter total number of faculty"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="facultyWithPhD">Faculty with PhD</Label>
              <Input
                id="facultyWithPhD"
                type="number"
                value={formData.facultyWithPhD}
                onChange={(e) => handleInputChange('facultyWithPhD', e.target.value)}
                placeholder="Enter number of faculty with PhD"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Financial Resources</span>
            </CardTitle>
            <CardDescription>
              Enter the total expenditure for the academic year
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="totalExpenditure">Total Expenditure (in INR)</Label>
              <Input
                id="totalExpenditure"
                type="number"
                value={formData.totalExpenditure}
                onChange={(e) => handleInputChange('totalExpenditure', e.target.value)}
                placeholder="Enter total expenditure in rupees"
              />
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Current Metrics</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Faculty-Student Ratio:</span>
                  <span>{formData.facultyCount > 0 ? (formData.studentStrength / formData.facultyCount).toFixed(2) : '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span>PhD Faculty %:</span>
                  <span>{formData.facultyCount > 0 ? ((formData.facultyWithPhD / formData.facultyCount) * 100).toFixed(1) : '0'}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Expenditure per Student:</span>
                  <span>₹{formData.studentStrength > 0 ? (formData.totalExpenditure / formData.studentStrength).toLocaleString() : '0'}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>TLR Assessment Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Scoring Criteria</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Student Strength (SS): Max 20 points</li>
                <li>• Faculty-Student Ratio (FSR): Max 30 points</li>
                <li>• Faculty Qualification (FQE): Max 20 points</li>
                <li>• Financial Resources (FRU): Max 30 points</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Best Practices</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Maintain optimal faculty-student ratio (1:15 ideal)</li>
                <li>• Encourage faculty to pursue PhD qualifications</li>
                <li>• Invest in infrastructure and learning resources</li>
                <li>• Ensure adequate financial allocation per student</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TLRForm;