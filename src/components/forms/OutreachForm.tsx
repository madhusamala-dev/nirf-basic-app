import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Users, Calculator, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

const OutreachForm: React.FC = () => {
  const { scores, updateOutreachData } = useData();
  
  // Safe access to Outreach data with fallbacks
  const outreachData = scores?.outreach || { oi: 0, total: 0 };
  
  const [formData, setFormData] = useState({
    oi: outreachData.oi || 0
  });

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    const updatedData = { ...formData, [field]: numValue };
    setFormData(updatedData);
    updateOutreachData({ [field]: numValue });
  };

  const handleSave = () => {
    updateOutreachData(formData);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const outreachComponents = [
    {
      id: 'oi',
      label: 'Outreach & Inclusivity (OI)',
      description: 'Diversity and inclusivity metrics',
      maxScore: 100,
      weight: '100%',
      value: formData.oi,
      placeholder: 'Enter outreach score'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Users className="h-6 w-6" />
            <span>Outreach & Inclusivity</span>
          </h1>
          <p className="text-gray-600 mt-1">Enter data for Outreach parameters (Weight: 10% of total score)</p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${getScoreColor(outreachData.total)}`}>
            {(outreachData.total || 0).toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">Outreach Score</div>
        </div>
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-orange-600" />
            <span>Outreach Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Overall Outreach Score</span>
              <span className="font-medium">{(outreachData.total || 0).toFixed(2)}/100</span>
            </div>
            <Progress value={outreachData.total || 0} className="h-3" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Weight in Final Score: 10%</span>
              <span>Contribution: {((outreachData.total || 0) * 0.1).toFixed(2)} points</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Outreach Components */}
      <div className="grid gap-6">
        {outreachComponents.map((component) => (
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
          <CardTitle>Outreach Component Breakdown</CardTitle>
          <CardDescription>Detailed view of Outreach & Inclusivity metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-xl font-bold ${getScoreColor(formData.oi)}`}>
                {(formData.oi || 0).toFixed(1)}
              </div>
              <div className="text-xs text-gray-600 mt-1">Outreach & Inclusivity</div>
              <div className="text-xs text-gray-500">Max: 100</div>
              <Progress 
                value={(formData.oi / 100) * 100} 
                className="h-1 mt-2" 
              />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-orange-900">Total Outreach Score</div>
                <div className="text-sm text-orange-700">
                  Measures institutional diversity and inclusivity efforts
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-900">
                  {(outreachData.total || 0).toFixed(2)}
                </div>
                <div className="text-sm text-orange-700">out of 100</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Outreach Data</span>
        </Button>
      </div>
    </div>
  );
};

export default OutreachForm;