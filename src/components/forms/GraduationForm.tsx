import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Save, GraduationCap } from 'lucide-react';
import { useData } from '../../context/DataContext';

const GraduationForm: React.FC = () => {
  const { scores, updateGraduationData } = useData();
  const [formData, setFormData] = useState({
    gph: 0,   // Graduate Employment (40 marks)
    gue: 0,   // University Examinations (15 marks)
    gms: 0,   // Median Salary (25 marks)
    grd: 0,   // Graduation Rate (20 marks)
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load current scores into form
  useEffect(() => {
    setFormData({
      gph: scores.graduation.gph,
      gue: scores.graduation.gue,
      gms: scores.graduation.gms,
      grd: scores.graduation.grd,
    });
  }, [scores.graduation]);

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const total = formData.gph + formData.gue + formData.gms + formData.grd;
      await updateGraduationData({ ...formData, total });
      alert('Graduation Outcomes data saved successfully!');
    } catch (error) {
      alert('Error saving Graduation Outcomes data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentTotal = formData.gph + formData.gue + formData.gms + formData.grd;
  const progressPercentage = (currentTotal / 100) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-purple-600" />
            <CardTitle>Graduation Outcomes (GO)</CardTitle>
          </div>
          <CardDescription>
            Enter data related to graduation rates, employment, and student outcomes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="gph">Graduate Employment (GPH) - Max 40 marks</Label>
              <Input
                id="gph"
                type="number"
                step="0.1"
                min="0"
                max="40"
                value={formData.gph}
                onChange={(e) => handleInputChange('gph', e.target.value)}
                placeholder="Enter graduate employment score"
              />
              <p className="text-xs text-gray-500">
                Percentage of graduates employed within 6 months
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gue">University Examinations (GUE) - Max 15 marks</Label>
              <Input
                id="gue"
                type="number"
                step="0.1"
                min="0"
                max="15"
                value={formData.gue}
                onChange={(e) => handleInputChange('gue', e.target.value)}
                placeholder="Enter university examination score"
              />
              <p className="text-xs text-gray-500">
                Performance in university examinations and assessments
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gms">Median Salary (GMS) - Max 25 marks</Label>
              <Input
                id="gms"
                type="number"
                step="0.1"
                min="0"
                max="25"
                value={formData.gms}
                onChange={(e) => handleInputChange('gms', e.target.value)}
                placeholder="Enter median salary score"
              />
              <p className="text-xs text-gray-500">
                Median salary of placed graduates
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="grd">Graduation Rate (GRD) - Max 20 marks</Label>
              <Input
                id="grd"
                type="number"
                step="0.1"
                min="0"
                max="20"
                value={formData.grd}
                onChange={(e) => handleInputChange('grd', e.target.value)}
                placeholder="Enter graduation rate score"
              />
              <p className="text-xs text-gray-500">
                Percentage of students graduating on time
              </p>
            </div>
          </div>

          {/* Score Summary */}
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-purple-900">Total Graduation Outcomes Score:</span>
              <span className="text-2xl font-bold text-purple-600">
                {currentTotal.toFixed(1)} / 100
              </span>
            </div>
            <Progress value={progressPercentage} className="mb-2" />
            <div className="text-xs text-purple-700">
              GPH: {formData.gph} + GUE: {formData.gue} + GMS: {formData.gms} + GRD: {formData.grd}
            </div>
          </div>

          <Button onClick={handleSave} disabled={isLoading} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Graduation Outcomes Data'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraduationForm;