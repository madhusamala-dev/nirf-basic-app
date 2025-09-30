import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useData } from '../../context/DataContext';

const ResearchForm: React.FC = () => {
  const { data, scores, updateResearch } = useData();
  const { research } = data;
  const researchScore = scores.research;

  const handleInputChange = (field: keyof typeof research, value: string) => {
    const numValue = parseFloat(value) || 0;
    updateResearch({ [field]: numValue });
  };

  const fields = [
    { key: 'publications' as const, label: 'Research Publications', description: 'Number of research publications in the last 3 years' },
    { key: 'citations' as const, label: 'Citations', description: 'Total citations received' },
    { key: 'patents' as const, label: 'Patents', description: 'Number of patents filed/granted' },
    { key: 'projects' as const, label: 'Research Projects', description: 'Number of sponsored research projects' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Research and Professional Practice</h1>
          <p className="text-gray-600 mt-1">Maximum Marks: 100 | Weight: 30%</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{researchScore.toFixed(2)}/100</div>
          <div className="text-sm text-gray-500">Current Score</div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Research Metrics</CardTitle>
          <CardDescription>Enter your institution's research performance data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                <Input
                  id={field.key}
                  type="number"
                  min="0"
                  step="1"
                  value={research[field.key] || ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  placeholder="Enter value"
                />
                <p className="text-sm text-gray-500">{field.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900">Research Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {fields.map((field) => (
              <div key={field.key}>
                <div className="text-2xl font-bold text-green-600">{research[field.key]}</div>
                <div className="text-sm text-gray-600">{field.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-green-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-900">{researchScore.toFixed(2)}/100</div>
              <div className="text-sm text-gray-600">Total Research Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchForm;