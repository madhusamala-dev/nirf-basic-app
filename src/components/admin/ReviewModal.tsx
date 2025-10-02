import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, X, Clock, User, Mail } from 'lucide-react';
import type { Submission } from '../../context/DataContext';
import { useData } from '../../context/DataContext';
import ReviewSection from './ReviewSection';

interface ReviewModalProps {
  submission: Submission;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ submission, isOpen, onClose }) => {
  const { adminUpdateSection, saveSubmissionChanges } = useData();
  const [activeTab, setActiveTab] = useState('tlr');
  const [hasChanges, setHasChanges] = useState(false);

  const handleSectionUpdate = (sectionName: keyof Submission['sections'], data: any) => {
    adminUpdateSection(sectionName, data, 'admin@example.com');
    setHasChanges(true);
  };

  const handleSaveAll = () => {
    saveSubmissionChanges();
    setHasChanges(false);
    alert('All changes saved successfully!');
  };

  const handleClose = () => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        onClose();
        setHasChanges(false);
      }
    } else {
      onClose();
    }
  };

  const sections = [
    { id: 'tlr', label: 'TLR', title: 'Teaching, Learning & Resources', maxScore: 100 },
    { id: 'research', label: 'Research', title: 'Research & Professional Practice', maxScore: 100 },
    { id: 'graduation', label: 'Graduation', title: 'Graduation Outcomes', maxScore: 100 },
    { id: 'outreach', label: 'Outreach', title: 'Outreach & Inclusivity', maxScore: 100 }
  ];

  // Safe access to scores with fallbacks
  const safeScores = {
    tlr: submission.scores?.tlr || { total: 0 },
    research: submission.scores?.research || { total: 0 },
    graduation: submission.scores?.graduation || { total: 0 },
    outreach: submission.scores?.outreach || { total: 0 },
    overall: submission.scores?.overall || 0
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">Review Submission</DialogTitle>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{submission.coordinatorName || 'Unknown'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{submission.coordinatorEmail || 'No email'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Submitted: {submission.submittedAt?.toLocaleDateString() || 'Unknown date'}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {hasChanges && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  Unsaved Changes
                </Badge>
              )}
              <Button onClick={handleSaveAll} disabled={!hasChanges}>
                <Save className="h-4 w-4 mr-2" />
                Save All Changes
              </Button>
              <Button variant="outline" onClick={handleClose}>
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Overall Score Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Overall Score Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {safeScores.tlr.total.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">TLR (30%)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {safeScores.research.total.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Research (30%)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {safeScores.graduation.total.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Graduation (20%)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {safeScores.outreach.total.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Outreach (10%)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {safeScores.overall.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Overall</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            {sections.map((section) => (
              <TabsTrigger key={section.id} value={section.id}>
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {sections.map((section) => {
            const sectionData = submission.sections?.[section.id as keyof Submission['sections']];
            
            // If section data doesn't exist, create a default one
            if (!sectionData) {
              return (
                <TabsContent key={section.id} value={section.id}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center text-gray-500">
                        <p>No data available for this section</p>
                        <p className="text-sm">This section hasn't been filled out yet.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            }

            return (
              <TabsContent key={section.id} value={section.id}>
                <ReviewSection
                  title={section.title}
                  sectionData={sectionData}
                  onUpdate={(data) => handleSectionUpdate(section.id as keyof Submission['sections'], data)}
                  maxScore={section.maxScore}
                />
              </TabsContent>
            );
          })}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;