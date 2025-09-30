import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useData } from '../../context/DataContext';

const OutreachForm: React.FC = () => {
  const { data, scores, updateOutreach } = useData();
  const { outreach } = data;
  const outreachScore = scores.outreach;

  const handleInputChange = (field: keyof typeof outreach, value: string) => {
    const numValue = parseFloat(value) || 0;
    updateOutreach({ [field]: numValue });
  };

  const fields = [
    { key: 'diversityIndex' as const, label: 'Diversity Index', description: 'Overall diversity score (0-100)' },
    { key: 'womenEnrollment' as const, label: 'Women Enrollment (%)', description: 'Percentage of women students' },
    { key: 'economicallyBackward' as const, label: 'Economically Backward (%)', description: 'Percentage of economically disadvantaged students' },
    { key: 'sociallyBackward' as const, label: 'Socially Backward (%)', description: 'Percentage of socially disadvantaged students' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Outreach and Inclusivity</h1>
          <p className="text-gray-600 mt-1">Maximum Marks: 100 | Weight: 10%</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-orange-600">{outreachScore.toFixed(2)}/100</div>
          <div className="text-sm text-gray-500">Current Score</div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inclusivity Metrics</CardTitle>
          <CardDescription>Enter data about diversity and inclusivity in your institution</CardDescription>
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
                  value={outreach[field.key] || ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  placeholder="Enter value"
                />
                <p className="text-sm text-gray-500">{field.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-orange-50 border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-900">Outreach Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {fields.map((field) => (
              <div key={field.key}>
                <div className="text-2xl font-bold text-orange-600">
                  {outreach[field.key]}{field.key === 'diversityIndex' ? '' : '%'}
                </div>
                <div className="text-sm text-gray-600">{field.label.replace(' (%)', '')}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-orange-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-900">{outreachScore.toFixed(2)}/100</div>
              <div className="text-sm text-gray-600">Total Outreach Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutreachForm;