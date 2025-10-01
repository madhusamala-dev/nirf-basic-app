import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Eye, Calculator, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

const PerceptionForm: React.FC = () => {
  const { scores, updatePerceptionData } = useData();
  
  // Safe access to Perception data with fallbacks
  const perceptionData = scores?.perception || { pr: 0, total: 0 };
  
  const [formData, setFormData] = useState({
    pr: perceptionData.pr || 0
  });

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    const updatedData = { ...formData, [field]: numValue };
    setFormData(updatedData);
    updatePerceptionData({ [field]: numValue });
  };

  const handleSave = () => {
    updatePerceptionData(formData);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const perceptionComponents = [
    {
      id: 'pr',
      label: 'Perception Ranking (PR)',
      description: 'External stakeholder perception and ranking',
      maxScore: 100,
      weight: '100%',
      value: formData.pr,
      placeholder: 'Enter perception score'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Eye className="h-6 w-6" />
            <span>Perception</span>
          </h1>
          <p className="text-gray-600 mt-1">Enter data for Perception parameters (Weight: 10% of total score)</p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${getScoreColor(perceptionData.total)}`}>
            {(perceptionData.total || 0).toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">Perception Score</div>
        </div>
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-indigo-600" />
            <span>Perception Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Overall Perception Score</span>
              <span className="font-medium">{(perceptionData.total || 0).toFixed(2)}/100</span>
            </div>
            <Progress value={perceptionData.total || 0} className="h-3" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Weight in Final Score: 10%</span>
              <span>Contribution: {((perceptionData.total || 0) * 0.1).toFixed(2)} points</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Perception Components */}
      <div className="grid gap-6">
        {perceptionComponents.map((component) => (
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
          <CardTitle>Perception Component Breakdown</CardTitle>
          <CardDescription>Detailed view of Perception ranking metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-xl font-bold ${getScoreColor(formData.pr)}`}>
                {(formData.pr || 0).toFixed(1)}
              </div>
              <div className="text-xs text-gray-600 mt-1">Perception Ranking</div>
              <div className="text-xs text-gray-500">Max: 100</div>
              <Progress 
                value={(formData.pr / 100) * 100} 
                className="h-1 mt-2" 
              />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-indigo-900">Total Perception Score</div>
                <div className="text-sm text-indigo-700">
                  Based on external stakeholder surveys and rankings
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-900">
                  {(perceptionData.total || 0).toFixed(2)}
                </div>
                <div className="text-sm text-indigo-700">out of 100</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Perception Data</span>
        </Button>
      </div>
    </div>
  );
};

export default PerceptionForm;