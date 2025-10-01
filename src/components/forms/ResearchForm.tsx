import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { FlaskConical, Calculator, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ResearchForm: React.FC = () => {
  const { scores, updateResearchData } = useData();
  
  // Safe access to Research data with fallbacks
  const researchData = scores?.research || { pu: 0, qp: 0, ipr: 0, fppp: 0, total: 0 };
  
  const [formData, setFormData] = useState({
    pu: researchData.pu || 0,
    qp: researchData.qp || 0,
    ipr: researchData.ipr || 0,
    fppp: researchData.fppp || 0
  });

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    const updatedData = { ...formData, [field]: numValue };
    setFormData(updatedData);
    updateResearchData({ [field]: numValue });
  };

  const handleSave = () => {
    updateResearchData(formData);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const researchComponents = [
    {
      id: 'pu',
      label: 'Publications (PU)',
      description: 'Number of research publications',
      maxScore: 25,
      weight: '35%',
      value: formData.pu,
      placeholder: 'Enter publication count'
    },
    {
      id: 'qp',
      label: 'Quality of Publications (QP)',
      description: 'Citation impact and quality metrics',
      maxScore: 25,
      weight: '25%',
      value: formData.qp,
      placeholder: 'Enter quality score'
    },
    {
      id: 'ipr',
      label: 'IPR & Patents (IPR)',
      description: 'Intellectual property and patents filed',
      maxScore: 15,
      weight: '15%',
      value: formData.ipr,
      placeholder: 'Enter patent count'
    },
    {
      id: 'fppp',
      label: 'Faculty Papers per Faculty (FPPP)',
      description: 'Research productivity per faculty',
      maxScore: 35,
      weight: '25%',
      value: formData.fppp,
      placeholder: 'Enter ratio'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <FlaskConical className="h-6 w-6" />
            <span>Research & Professional Practice</span>
          </h1>
          <p className="text-gray-600 mt-1">Enter data for Research parameters (Weight: 30% of total score)</p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${getScoreColor(researchData.total)}`}>
            {(researchData.total || 0).toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">Research Score</div>
        </div>
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-green-600" />
            <span>Research Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Overall Research Score</span>
              <span className="font-medium">{(researchData.total || 0).toFixed(2)}/100</span>
            </div>
            <Progress value={researchData.total || 0} className="h-3" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Weight in Final Score: 30%</span>
              <span>Contribution: {((researchData.total || 0) * 0.3).toFixed(2)} points</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Research Components */}
      <div className="grid gap-6">
        {researchComponents.map((component) => (
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
          <CardTitle>Research Component Breakdown</CardTitle>
          <CardDescription>Detailed view of all Research components and their contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {researchComponents.map((component) => (
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
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-green-900">Total Research Score</div>
                <div className="text-sm text-green-700">
                  Weighted calculation: PU(35%) + QP(25%) + IPR(15%) + FPPP(25%)
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-900">
                  {(researchData.total || 0).toFixed(2)}
                </div>
                <div className="text-sm text-green-700">out of 100</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Research Data</span>
        </Button>
      </div>
    </div>
  );
};

export default ResearchForm;