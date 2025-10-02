import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Save, BookOpen } from 'lucide-react';
import { useData } from '../../context/DataContext';

const TLRForm: React.FC = () => {
  const { scores, updateTLRData } = useData();
  const [formData, setFormData] = useState({
    ss: 0,    // Student Strength (20 marks)
    fsr: 0,   // Faculty-Student Ratio (30 marks)
    fqe: 0,   // Faculty with PhD (20 marks)
    fru: 0,   // Financial Resources and their Utilization (30 marks)
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load current scores into form
  useEffect(() => {
    setFormData({
      ss: scores.tlr.ss,
      fsr: scores.tlr.fsr,
      fqe: scores.tlr.fqe,
      fru: scores.tlr.fru,
    });
  }, [scores.tlr]);

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const total = formData.ss + formData.fsr + formData.fqe + formData.fru;
      await updateTLRData({ ...formData, total });
      alert('TLR data saved successfully!');
    } catch (error) {
      alert('Error saving TLR data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentTotal = formData.ss + formData.fsr + formData.fqe + formData.fru;
  const progressPercentage = (currentTotal / 100) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <CardTitle>Teaching, Learning & Resources (TLR)</CardTitle>
          </div>
          <CardDescription>
            Enter data related to teaching, learning resources, and infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="ss">Student Strength (SS) - Max 20 marks</Label>
              <Input
                id="ss"
                type="number"
                step="0.1"
                min="0"
                max="20"
                value={formData.ss}
                onChange={(e) => handleInputChange('ss', e.target.value)}
                placeholder="Enter student strength score"
              />
              <p className="text-xs text-gray-500">
                Based on student enrollment and diversity
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fsr">Faculty-Student Ratio (FSR) - Max 30 marks</Label>
              <Input
                id="fsr"
                type="number"
                step="0.1"
                min="0"
                max="30"
                value={formData.fsr}
                onChange={(e) => handleInputChange('fsr', e.target.value)}
                placeholder="Enter FSR score"
              />
              <p className="text-xs text-gray-500">
                Faculty to student ratio and teaching load
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fqe">Faculty with PhD (FQE) - Max 20 marks</Label>
              <Input
                id="fqe"
                type="number"
                step="0.1"
                min="0"
                max="20"
                value={formData.fqe}
                onChange={(e) => handleInputChange('fqe', e.target.value)}
                placeholder="Enter faculty qualification score"
              />
              <p className="text-xs text-gray-500">
                Percentage of faculty with PhD and experience
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fru">Financial Resources Utilization (FRU) - Max 30 marks</Label>
              <Input
                id="fru"
                type="number"
                step="0.1"
                min="0"
                max="30"
                value={formData.fru}
                onChange={(e) => handleInputChange('fru', e.target.value)}
                placeholder="Enter FRU score"
              />
              <p className="text-xs text-gray-500">
                Budget allocation and infrastructure development
              </p>
            </div>
          </div>

          {/* Score Summary */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-blue-900">Total TLR Score:</span>
              <span className="text-2xl font-bold text-blue-600">
                {currentTotal.toFixed(1)} / 100
              </span>
            </div>
            <Progress value={progressPercentage} className="mb-2" />
            <div className="text-xs text-blue-700">
              SS: {formData.ss} + FSR: {formData.fsr} + FQE: {formData.fqe} + FRU: {formData.fru}
            </div>
          </div>

          <Button onClick={handleSave} disabled={isLoading} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save TLR Data'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TLRForm;