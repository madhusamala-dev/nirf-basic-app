import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Save, Globe } from 'lucide-react';
import { useData } from '../../context/DataContext';

const OutreachForm: React.FC = () => {
  const { scores, updateOutreachData } = useData();
  const [formData, setFormData] = useState({
    rd: 0,    // Regional Diversity (30 marks)
    wd: 0,    // Women Diversity (30 marks)
    escs: 0,  // Economically and Socially Challenged Students (20 marks)
    pcs: 0,   // Physically Challenged Students (20 marks)
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load current scores into form
  useEffect(() => {
    setFormData({
      rd: scores.outreach.rd,
      wd: scores.outreach.wd,
      escs: scores.outreach.escs,
      pcs: scores.outreach.pcs,
    });
  }, [scores.outreach]);

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const total = formData.rd + formData.wd + formData.escs + formData.pcs;
      await updateOutreachData({ ...formData, total });
      alert('Outreach & Inclusivity data saved successfully!');
    } catch (error) {
      alert('Error saving Outreach & Inclusivity data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentTotal = formData.rd + formData.wd + formData.escs + formData.pcs;
  const progressPercentage = (currentTotal / 100) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-orange-600" />
            <CardTitle>Outreach & Inclusivity (OI)</CardTitle>
          </div>
          <CardDescription>
            Enter data related to diversity, inclusivity, and outreach programs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="rd">Regional Diversity (RD) - Max 30 marks</Label>
              <Input
                id="rd"
                type="number"
                step="0.1"
                min="0"
                max="30"
                value={formData.rd}
                onChange={(e) => handleInputChange('rd', e.target.value)}
                placeholder="Enter regional diversity score"
              />
              <p className="text-xs text-gray-500">
                Students from different states and regions
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wd">Women Diversity (WD) - Max 30 marks</Label>
              <Input
                id="wd"
                type="number"
                step="0.1"
                min="0"
                max="30"
                value={formData.wd}
                onChange={(e) => handleInputChange('wd', e.target.value)}
                placeholder="Enter women diversity score"
              />
              <p className="text-xs text-gray-500">
                Percentage of women students and faculty
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="escs">Economically & Socially Challenged Students (ESCS) - Max 20 marks</Label>
              <Input
                id="escs"
                type="number"
                step="0.1"
                min="0"
                max="20"
                value={formData.escs}
                onChange={(e) => handleInputChange('escs', e.target.value)}
                placeholder="Enter ESCS score"
              />
              <p className="text-xs text-gray-500">
                Support for economically and socially disadvantaged students
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pcs">Physically Challenged Students (PCS) - Max 20 marks</Label>
              <Input
                id="pcs"
                type="number"
                step="0.1"
                min="0"
                max="20"
                value={formData.pcs}
                onChange={(e) => handleInputChange('pcs', e.target.value)}
                placeholder="Enter PCS score"
              />
              <p className="text-xs text-gray-500">
                Facilities and support for physically challenged students
              </p>
            </div>
          </div>

          {/* Score Summary */}
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-orange-900">Total Outreach & Inclusivity Score:</span>
              <span className="text-2xl font-bold text-orange-600">
                {currentTotal.toFixed(1)} / 100
              </span>
            </div>
            <Progress value={progressPercentage} className="mb-2" />
            <div className="text-xs text-orange-700">
              RD: {formData.rd} + WD: {formData.wd} + ESCS: {formData.escs} + PCS: {formData.pcs}
            </div>
          </div>

          <Button onClick={handleSave} disabled={isLoading} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Outreach & Inclusivity Data'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutreachForm;