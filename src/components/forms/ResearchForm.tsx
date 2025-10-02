import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Save, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ResearchForm: React.FC = () => {
  const { scores, updateResearchData } = useData();
  const [formData, setFormData] = useState({
    pu: 0,    // Publications (35 marks)
    qp: 0,    // Quality of Publications (40 marks)
    iprf: 0,  // IPR and Patents Filed & Published (15 marks)
    fppp: 0,  // Faculty Paper per Faculty (10 marks)
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load current scores into form
  useEffect(() => {
    setFormData({
      pu: scores.research.pu,
      qp: scores.research.qp,
      iprf: scores.research.iprf,
      fppp: scores.research.fppp,
    });
  }, [scores.research]);

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const total = formData.pu + formData.qp + formData.iprf + formData.fppp;
      await updateResearchData({ ...formData, total });
      alert('Research data saved successfully!');
    } catch (error) {
      alert('Error saving Research data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentTotal = formData.pu + formData.qp + formData.iprf + formData.fppp;
  const progressPercentage = (currentTotal / 100) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-green-600" />
            <CardTitle>Research & Professional Practice (RP)</CardTitle>
          </div>
          <CardDescription>
            Enter data related to research output, publications, and professional practice
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pu">Publications (PU) - Max 35 marks</Label>
              <Input
                id="pu"
                type="number"
                step="0.1"
                min="0"
                max="35"
                value={formData.pu}
                onChange={(e) => handleInputChange('pu', e.target.value)}
                placeholder="Enter publications score"
              />
              <p className="text-xs text-gray-500">
                Number and quality of research publications
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="qp">Quality of Publications (QP) - Max 40 marks</Label>
              <Input
                id="qp"
                type="number"
                step="0.1"
                min="0"
                max="40"
                value={formData.qp}
                onChange={(e) => handleInputChange('qp', e.target.value)}
                placeholder="Enter quality publications score"
              />
              <p className="text-xs text-gray-500">
                Citations, impact factor, and journal rankings
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="iprf">IPR & Patents (IPRF) - Max 15 marks</Label>
              <Input
                id="iprf"
                type="number"
                step="0.1"
                min="0"
                max="15"
                value={formData.iprf}
                onChange={(e) => handleInputChange('iprf', e.target.value)}
                placeholder="Enter IPR score"
              />
              <p className="text-xs text-gray-500">
                Intellectual property rights and patents filed
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fppp">Faculty Paper per Faculty (FPPP) - Max 10 marks</Label>
              <Input
                id="fppp"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.fppp}
                onChange={(e) => handleInputChange('fppp', e.target.value)}
                placeholder="Enter FPPP score"
              />
              <p className="text-xs text-gray-500">
                Average research papers per faculty member
              </p>
            </div>
          </div>

          {/* Score Summary */}
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-green-900">Total Research Score:</span>
              <span className="text-2xl font-bold text-green-600">
                {currentTotal.toFixed(1)} / 100
              </span>
            </div>
            <Progress value={progressPercentage} className="mb-2" />
            <div className="text-xs text-green-700">
              PU: {formData.pu} + QP: {formData.qp} + IPRF: {formData.iprf} + FPPP: {formData.fppp}
            </div>
          </div>

          <Button onClick={handleSave} disabled={isLoading} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Research Data'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchForm;