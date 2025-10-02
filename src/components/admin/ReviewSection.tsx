import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Save, Edit, Clock, User } from 'lucide-react';
import type { FormSection } from '../../context/DataContext';

interface ReviewSectionProps {
  title: string;
  sectionData: FormSection;
  onUpdate: (data: any) => void;
  maxScore: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ 
  title, 
  sectionData, 
  onUpdate, 
  maxScore 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [adminNotes, setAdminNotes] = useState('');

  // Safe access to section data with fallbacks
  const safeData = sectionData?.data || {};
  const coordinatorEmail = sectionData?.coordinatorEmail || 'Unknown';
  const lastModified = sectionData?.lastModified || new Date();
  const modifiedBy = sectionData?.modifiedBy || 'coordinator';
  const existingNotes = sectionData?.adminNotes || '';

  useEffect(() => {
    setEditData(safeData);
    setAdminNotes(existingNotes);
  }, [safeData, existingNotes]);

  const handleSave = () => {
    const updatedData = {
      ...editData,
      total: calculateTotal(editData)
    };
    
    onUpdate(updatedData);
    setIsEditing(false);
  };

  const calculateTotal = (data: any) => {
    const values = Object.values(data).filter(val => typeof val === 'number');
    return values.reduce((sum: number, val: any) => sum + (val || 0), 0);
  };

  const renderFields = () => {
    if (!safeData || Object.keys(safeData).length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>No data available for this section</p>
        </div>
      );
    }

    return Object.entries(safeData).map(([key, value]) => {
      if (key === 'total') return null;
      
      return (
        <div key={key} className="space-y-2">
          <label className="text-sm font-medium text-gray-700 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          {isEditing ? (
            <Input
              type="number"
              value={editData[key] || 0}
              onChange={(e) => setEditData(prev => ({
                ...prev,
                [key]: parseFloat(e.target.value) || 0
              }))}
              className="w-full"
            />
          ) : (
            <div className="p-2 bg-gray-50 rounded border">
              {typeof value === 'number' ? value.toFixed(1) : value || 'N/A'}
            </div>
          )}
        </div>
      );
    });
  };

  const currentTotal = isEditing ? calculateTotal(editData) : (safeData.total || 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant={modifiedBy === 'admin' ? 'destructive' : 'secondary'}>
              {modifiedBy === 'admin' ? 'Modified by Admin' : 'Original'}
            </Badge>
            {!isEditing ? (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            ) : (
              <div className="space-x-2">
                <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Section Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500">Coordinator</div>
              <div className="text-sm font-medium">{coordinatorEmail}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500">Last Modified</div>
              <div className="text-sm font-medium">{lastModified.toLocaleDateString()}</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {currentTotal.toFixed(1)} / {maxScore}
            </div>
            <div className="text-xs text-gray-500">Current Score</div>
          </div>
        </div>

        {/* Data Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderFields()}
        </div>

        {/* Admin Notes */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Admin Notes</label>
          {isEditing ? (
            <Textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add notes about changes made..."
              rows={3}
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded border min-h-[80px]">
              {existingNotes || 'No admin notes'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewSection;