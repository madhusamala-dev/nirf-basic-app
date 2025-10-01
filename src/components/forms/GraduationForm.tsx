import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calculator, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

const GraduationForm: React.FC = () => {
  const { scores, updateGraduationData } = useData();
  
  // Safe access to Graduation data with fallbacks
  const graduationData = scores?.graduation || { go: 0, gph: 0, gue: 0, gms: 0, grd: 0, total: 0 };
  
  const [formData, setFormData] = useState({
    go: graduationData.go || 0,
    gph: graduationData.gph || 0,
    gue: graduationData.gue || 0,
    gms: graduationData.gms || 0,
    grd: graduationData.grd || 0
  });

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    const updatedData = { ...formData, [field]: numValue };
    setFormData(updatedData);
    updateGraduationData({ [field]: numValue });
  };

  const handleSave = () => {
    updateGraduationData(formData);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const graduationComponents = [
    {
      id: 'go',
      label: 'Graduation Outcomes (GO)',
      description: 'Overall graduation rate and success metrics',
      maxScore: 30,
      weight: '30%',
      value: formData.go,
      placeholder: 'Enter graduation rate'
    },
    {
      id: 'gph',
      label: 'Graduates pursuing Higher Education (GPH)',
      description: 'Percentage of graduates pursuing higher studies',
      maxScore: 20,
      weight: '20%',
      value: formData.gph,
      placeholder: 'Enter percentage'
    },
    {
      id: 'gue',
      label: 'Graduates in University Examinations (GUE)',
      description: 'Performance in university examinations',
      maxScore: 20,
      weight: '20%',
      value: formData.gue,
      placeholder: 'Enter score'
    },
    {
      id: 'gms',
      label: 'Graduates with Median Salary (GMS)',
      description: 'Employment and salary outcomes',
      maxScore: 15,
      weight: '15%',
      value: formData.gms,
      placeholder: 'Enter median salary'
    },
    {
      id: 'grd',
      label: 'Graduates in Research & Development (GRD)',
      description: 'Graduates engaged in R&D activities',
      maxScore: 15,
      weight: '15%',
      value: formData.grd,
      placeholder: 'Enter R&D count'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <GraduationCap className="h-6 w-6" />
            <span>Graduation Outcomes</span>
          </h1>
          <p className="text-gray-600 mt-1">Enter data for Graduation parameters (Weight: 20% of total score)</p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${getScoreColor(graduationData.total)}`}>
            {(graduationData.total || 0).toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">Graduation Score</div>
        </div>
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-purple-600" />
            <span>Graduation Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Overall Graduation Score</span>
              <span className="font-medium">{(graduationData.total || 0).toFixed(2)}/100</span>
            </div>
            <Progress value={graduationData.total || 0} className="h-3" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Weight in Final Score: 20%</span>
              <span>Contribution: {((graduationData.total || 0) * 0.2).toFixed(2)} points</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Graduation Components */}
      <div className="grid gap-6">
        {graduationComponents.map((component) => (
          <Card key={component.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{component.label}</CardTitle>
                  <CardDescription>{component.description}</CardDescription>
                </div>
                <div className="text-right">
                  <Badge variant="outline">Weight: {component.weight}</Badge>
                  <div className="text-sm text-gray-500 mt-1">Max: {component.maxScore}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={component.id}>Enter Value</Label>
                    <Input
                      id={component.id}
                      type="number"
                      placeholder={component.placeholder}
                      value={component.value || ''}
                      onChange={(e) => handleInputChange(component.id, e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Current Score</Label>
                    <div className="flex items-center space-x-2">
                      <div className={`text-2xl font-bold ${getScoreColor(component.value)}`}>
                        {(component.value || 0).toFixed(1)}
                      </div>
                      <span className="text-gray-500">/ {component.maxScore}</span>
                    </div>
                    <Progress value={(component.value / component.maxScore) * 100} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Component Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Graduation Component Breakdown</CardTitle>
          <CardDescription>Detailed view of all Graduation components and their contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {graduationComponents.map((component) => (
              <div key={component.id} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`text-xl font-bold ${getScoreColor(component.value)}`}>
                  {(component.value || 0).toFixed(1)}
                </div>
                <div className="text-xs text-gray-600 mt-1">{component.label}</div>
                <div className="text-xs text-gray-500">Max: {component.maxScore}</div>
                <Progress 
                  value={(component.value / component.maxScore) * 100} 
                  className="h-1 mt-2" 
                />
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-purple-900">Total Graduation Score</div>
                <div className="text-sm text-purple-700">
                  Weighted calculation: GO(30%) + GPH(20%) + GUE(20%) + GMS(15%) + GRD(15%)
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-900">
                  {(graduationData.total || 0).toFixed(2)}
                </div>
                <div className="text-sm text-purple-700">out of 100</div>
              </div>
            </div>
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