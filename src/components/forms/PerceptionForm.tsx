import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useData } from '../../context/DataContext';

const PerceptionForm: React.FC = () => {
  const { data, scores, updatePerception } = useData();
  const { perception } = data;
  const perceptionScore = scores.perception;

  const handleInputChange = (field: keyof typeof perception, value: string) => {
    const numValue = parseFloat(value) || 0;
    updatePerception({ [field]: numValue });
  };

  const fields = [
    { key: 'academicPeerScore' as const, label: 'Academic Peer Score', description: 'Score from academic peer review (0-100)' },
    { key: 'employerScore' as const, label: 'Employer Score', description: 'Score from employer feedback (0-100)' },
    { key: 'publicationImpact' as const, label: 'Publication Impact Score', description: 'Impact factor of publications (0-100)' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Perception</h1>
          <p className="text-gray-600 mt-1">Maximum Marks: 100 | Weight: 10%</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-indigo-600">{perceptionScore.toFixed(2)}/100</div>
          <div className="text-sm text-gray-500">Current Score</div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perception Metrics</CardTitle>
          <CardDescription>Enter perception scores from various stakeholders</CardDescription>
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
                  max="100"
                  step="0.01"
                  value={perception[field.key] || ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  placeholder="Enter value"
                />
                <p className="text-sm text-gray-500">{field.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-indigo-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-indigo-900">Perception Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {fields.map((field) => (
              <div key={field.key}>
                <div className="text-2xl font-bold text-indigo-600">{perception[field.key]}</div>
                <div className="text-sm text-gray-600">{field.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-indigo-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-900">{perceptionScore.toFixed(2)}/100</div>
              <div className="text-sm text-gray-600">Total Perception Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerceptionForm;