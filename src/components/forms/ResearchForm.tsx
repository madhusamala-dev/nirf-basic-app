import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Award, FileText, Briefcase, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ResearchForm: React.FC = () => {
  const { scores, updateResearchData } = useData();
  
  // Local state for form inputs
  const [formData, setFormData] = useState({
    // Publications (PU) - 35 marks
    journalPublications: 0,
    conferencePublications: 0,
    bookChapters: 0,
    books: 0,
    
    // Quality Publications (QP) - 40 marks
    highImpactPublications: 0,
    totalCitations: 0,
    hIndex: 0,
    i10Index: 0,
    
    // IPR and Patents (IPR) - 15 marks
    patentsGranted: 0,
    patentsFiled: 0,
    copyrights: 0,
    trademarks: 0,
    
    // Projects and Professional Practice (FPPP) - 10 marks
    consultancyProjects: 0,
    industryCollaborations: 0,
    professionalPractice: 0,
    technologyTransfer: 0
  });

  // Calculate individual component scores
  const calculatePU = () => {
    // Publications calculation (35 marks max)
    const journalWeight = Math.min((formData.journalPublications / 50) * 20, 20);
    const conferenceWeight = Math.min((formData.conferencePublications / 30) * 8, 8);
    const bookWeight = Math.min((formData.bookChapters / 10) * 4, 4);
    const booksWeight = Math.min((formData.books / 5) * 3, 3);
    
    return Math.min(journalWeight + conferenceWeight + bookWeight + booksWeight, 35);
  };

  const calculateQP = () => {
    // Quality Publications calculation (40 marks max)
    const highImpactWeight = Math.min((formData.highImpactPublications / 20) * 15, 15);
    const citationsWeight = Math.min((formData.totalCitations / 1000) * 12, 12);
    const hIndexWeight = Math.min((formData.hIndex / 30) * 8, 8);
    const i10IndexWeight = Math.min((formData.i10Index / 20) * 5, 5);
    
    return Math.min(highImpactWeight + citationsWeight + hIndexWeight + i10IndexWeight, 40);
  };

  const calculateIPR = () => {
    // IPR and Patents calculation (15 marks max)
    const grantedWeight = Math.min((formData.patentsGranted / 10) * 8, 8);
    const filedWeight = Math.min((formData.patentsFiled / 15) * 4, 4);
    const copyrightsWeight = Math.min((formData.copyrights / 5) * 2, 2);
    const trademarksWeight = Math.min((formData.trademarks / 3) * 1, 1);
    
    return Math.min(grantedWeight + filedWeight + copyrightsWeight + trademarksWeight, 15);
  };

  const calculateFPPP = () => {
    // Projects and Professional Practice calculation (10 marks max)
    const consultancyWeight = Math.min((formData.consultancyProjects / 10) * 4, 4);
    const industryWeight = Math.min((formData.industryCollaborations / 8) * 3, 3);
    const practiceWeight = Math.min((formData.professionalPractice / 5) * 2, 2);
    const transferWeight = Math.min((formData.technologyTransfer / 3) * 1, 1);
    
    return Math.min(consultancyWeight + industryWeight + practiceWeight + transferWeight, 10);
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const handleSave = () => {
    const pu = calculatePU();
    const qp = calculateQP();
    const ipr = calculateIPR();
    const fppp = calculateFPPP();
    
    updateResearchData({
      pu,
      qp,
      ipr,
      fppp
    });
  };

  const currentPU = calculatePU();
  const currentQP = calculateQP();
  const currentIPR = calculateIPR();
  const currentFPPP = calculateFPPP();
  const totalScore = currentPU + currentQP + currentIPR + currentFPPP;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Research and Professional Practice (RP)</h2>
          <p className="text-gray-600 mt-1">Weight: 30% | Maximum Score: 100 marks</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-green-600">{totalScore.toFixed(1)}</div>
          <div className="text-sm text-gray-500">Current Score</div>
        </div>
      </div>

      {/* Score Overview */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900">Research Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{currentPU.toFixed(1)}</div>
              <div className="text-sm text-gray-600">PU (35 max)</div>
              <Progress value={(currentPU / 35) * 100} className="h-2 mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{currentQP.toFixed(1)}</div>
              <div className="text-sm text-gray-600">QP (40 max)</div>
              <Progress value={(currentQP / 40) * 100} className="h-2 mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{currentIPR.toFixed(1)}</div>
              <div className="text-sm text-gray-600">IPR (15 max)</div>
              <Progress value={(currentIPR / 15) * 100} className="h-2 mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{currentFPPP.toFixed(1)}</div>
              <div className="text-sm text-gray-600">FPPP (10 max)</div>
              <Progress value={(currentFPPP / 10) * 100} className="h-2 mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* A. Publications (PU) - 35 marks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-green-600" />
            <span>A. Combined metric for Publications (PU)</span>
            <Badge variant="outline">35 marks</Badge>
          </CardTitle>
          <CardDescription>
            All types of publications including journals, conferences, books, and book chapters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="journalPublications">Journal Publications</Label>
              <Input
                id="journalPublications"
                type="number"
                placeholder="e.g., 25"
                value={formData.journalPublications || ''}
                onChange={(e) => handleInputChange('journalPublications', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Peer-reviewed journal articles</p>
            </div>
            <div>
              <Label htmlFor="conferencePublications">Conference Publications</Label>
              <Input
                id="conferencePublications"
                type="number"
                placeholder="e.g., 15"
                value={formData.conferencePublications || ''}
                onChange={(e) => handleInputChange('conferencePublications', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Conference papers and proceedings</p>
            </div>
            <div>
              <Label htmlFor="bookChapters">Book Chapters</Label>
              <Input
                id="bookChapters"
                type="number"
                placeholder="e.g., 5"
                value={formData.bookChapters || ''}
                onChange={(e) => handleInputChange('bookChapters', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Chapters in edited books</p>
            </div>
            <div>
              <Label htmlFor="books">Books Published</Label>
              <Input
                id="books"
                type="number"
                placeholder="e.g., 2"
                value={formData.books || ''}
                onChange={(e) => handleInputChange('books', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Complete books authored/edited</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* B. Quality Publications (QP) - 40 marks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-blue-600" />
            <span>B. Combined metric for Quality of Publications (QP)</span>
            <Badge variant="outline">40 marks</Badge>
          </CardTitle>
          <CardDescription>
            High-impact publications, citations, and research impact metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="highImpactPublications">High Impact Publications</Label>
              <Input
                id="highImpactPublications"
                type="number"
                placeholder="e.g., 10"
                value={formData.highImpactPublications || ''}
                onChange={(e) => handleInputChange('highImpactPublications', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Publications in top-tier journals (Q1/Q2)</p>
            </div>
            <div>
              <Label htmlFor="totalCitations">Total Citations</Label>
              <Input
                id="totalCitations"
                type="number"
                placeholder="e.g., 500"
                value={formData.totalCitations || ''}
                onChange={(e) => handleInputChange('totalCitations', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Total citation count (Google Scholar/Scopus)</p>
            </div>
            <div>
              <Label htmlFor="hIndex">H-Index</Label>
              <Input
                id="hIndex"
                type="number"
                placeholder="e.g., 15"
                value={formData.hIndex || ''}
                onChange={(e) => handleInputChange('hIndex', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Hirsch index for research impact</p>
            </div>
            <div>
              <Label htmlFor="i10Index">i10-Index</Label>
              <Input
                id="i10Index"
                type="number"
                placeholder="e.g., 12"
                value={formData.i10Index || ''}
                onChange={(e) => handleInputChange('i10Index', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Publications with 10+ citations</p>
            </div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Quality Score: High Impact ({formData.highImpactPublications}) + Citations ({formData.totalCitations}) + H-Index ({formData.hIndex}) + i10-Index ({formData.i10Index})
            </p>
          </div>
        </CardContent>
      </Card>

      {/* C. IPR and Patents (IPR) - 15 marks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-purple-600" />
            <span>C. IPR and Patents: Published and Granted (IPR)</span>
            <Badge variant="outline">15 marks</Badge>
          </CardTitle>
          <CardDescription>
            Intellectual Property Rights including patents, copyrights, and trademarks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patentsGranted">Patents Granted</Label>
              <Input
                id="patentsGranted"
                type="number"
                placeholder="e.g., 5"
                value={formData.patentsGranted || ''}
                onChange={(e) => handleInputChange('patentsGranted', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Patents successfully granted</p>
            </div>
            <div>
              <Label htmlFor="patentsFiled">Patents Filed</Label>
              <Input
                id="patentsFiled"
                type="number"
                placeholder="e.g., 8"
                value={formData.patentsFiled || ''}
                onChange={(e) => handleInputChange('patentsFiled', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Patent applications filed</p>
            </div>
            <div>
              <Label htmlFor="copyrights">Copyrights</Label>
              <Input
                id="copyrights"
                type="number"
                placeholder="e.g., 3"
                value={formData.copyrights || ''}
                onChange={(e) => handleInputChange('copyrights', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Software/content copyrights</p>
            </div>
            <div>
              <Label htmlFor="trademarks">Trademarks</Label>
              <Input
                id="trademarks"
                type="number"
                placeholder="e.g., 1"
                value={formData.trademarks || ''}
                onChange={(e) => handleInputChange('trademarks', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Registered trademarks</p>
            </div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-800">
              IPR Portfolio: Granted ({formData.patentsGranted}) + Filed ({formData.patentsFiled}) + Copyrights ({formData.copyrights}) + Trademarks ({formData.trademarks})
            </p>
          </div>
        </CardContent>
      </Card>

      {/* D. Projects and Professional Practice (FPPP) - 10 marks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-orange-600" />
            <span>D. Footprint of Projects and Professional Practice (FPPP)</span>
            <Badge variant="outline">10 marks</Badge>
          </CardTitle>
          <CardDescription>
            Industry engagement, consultancy, and professional practice activities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="consultancyProjects">Consultancy Projects</Label>
              <Input
                id="consultancyProjects"
                type="number"
                placeholder="e.g., 6"
                value={formData.consultancyProjects || ''}
                onChange={(e) => handleInputChange('consultancyProjects', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Industry consultancy assignments</p>
            </div>
            <div>
              <Label htmlFor="industryCollaborations">Industry Collaborations</Label>
              <Input
                id="industryCollaborations"
                type="number"
                placeholder="e.g., 4"
                value={formData.industryCollaborations || ''}
                onChange={(e) => handleInputChange('industryCollaborations', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Active industry partnerships</p>
            </div>
            <div>
              <Label htmlFor="professionalPractice">Professional Practice</Label>
              <Input
                id="professionalPractice"
                type="number"
                placeholder="e.g., 3"
                value={formData.professionalPractice || ''}
                onChange={(e) => handleInputChange('professionalPractice', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Professional service activities</p>
            </div>
            <div>
              <Label htmlFor="technologyTransfer">Technology Transfer</Label>
              <Input
                id="technologyTransfer"
                type="number"
                placeholder="e.g., 2"
                value={formData.technologyTransfer || ''}
                onChange={(e) => handleInputChange('technologyTransfer', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Technology commercialization</p>
            </div>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-800">
              Professional Footprint: Consultancy ({formData.consultancyProjects}) + Industry ({formData.industryCollaborations}) + Practice ({formData.professionalPractice}) + Transfer ({formData.technologyTransfer})
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Research Data</span>
        </Button>
      </div>
    </div>
  );
};

export default ResearchForm;