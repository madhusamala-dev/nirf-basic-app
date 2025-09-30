import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useData } from '../../context/DataContext';

const GraduationForm: React.FC = () => {
  const { data, scores, updateGraduation } = useData();
  const { graduation } = data;
  const graduationScore = scores.graduation;

  const handleInputChange = (field: keyof typeof graduation, value: string) => {
    const numValue = parseFloat(value) || 0;
    updateGraduation({ [field]: numValue });
  };

  const fields = [
    { key: 'graduationRate' as const, label: 'Graduation Rate (%)', description: 'Percentage of students graduating on time' },
    { key: 'employmentRate' as const, label: 'Employment Rate (%)', description: 'Percentage of graduates employed within 6 months' },
    { key: 'higherStudiesRate' as const, label: 'Higher Studies Rate (%)', description: 'Percentage pursuing higher education' },
    { key: 'medianSalary' as const, label: 'Median Salary (₹)', description: 'Median salary of placed graduates' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Graduation Outcomes</h1>
          <p className="text-gray-600 mt-1">Maximum Marks: 100 | Weight: 20%</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600">{graduationScore.toFixed(2)}/100</div>
          <div className="text-sm text-gray-500">Current Score</div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Graduate Outcomes</CardTitle>
          <CardDescription>Enter data about your graduates' performance and placement</CardDescription>
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
                  step={field.key === 'medianSalary' ? '1000' : '0.01'}
                  max={field.key !== 'medianSalary' ? '100' : undefined}
                  value={graduation[field.key] || ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  placeholder="Enter value"
                />
                <p className="text-sm text-gray-500">{field.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-900">Graduation Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {fields.map((field) => (
              <div key={field.key}>
                <div className="text-2xl font-bold text-purple-600">
                  {field.key === 'medianSalary' 
                    ? `₹${(graduation[field.key] / 100000).toFixed(1)}L`
                    : `${graduation[field.key]}${field.key !== 'medianSalary' ? '%' : ''}`
                  }
                </div>
                <div className="text-sm text-gray-600">{field.label.replace(' (%)', '').replace(' (₹)', '')}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-purple-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-900">{graduationScore.toFixed(2)}/100</div>
              <div className="text-sm text-gray-600">Total Graduation Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraduationForm;