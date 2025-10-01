import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Globe, Users, Heart, Accessibility, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

const OutreachForm: React.FC = () => {
  const { scores, updateOutreachData } = useData();
  
  // Local state for form inputs
  const [formData, setFormData] = useState({
    // Region Diversity (RD) - 30 marks
    totalStudents: 0,
    studentsFromOtherStates: 0,
    internationalStudents: 0,
    statesRepresented: 0,
    
    // Women Diversity (WD) - 30 marks
    totalWomenStudents: 0,
    womenFaculty: 0,
    totalFaculty: 0,
    womenInLeadership: 0,
    
    // Economically and Socially Challenged Students (ESCS) - 20 marks
    economicallyChallengedStudents: 0,
    sociallyChallengedStudents: 0,
    scholarshipRecipients: 0,
    freeshipStudents: 0,
    
    // Facilities for Physically Challenged Students (PCS) - 20 marks
    physicallyChallengedStudents: 0,
    accessibleBuildings: 0,
    totalBuildings: 0,
    supportServices: 0
  });

  // Calculate individual component scores
  const calculateRD = () => {
    // Region Diversity calculation (30 marks max)
    if (formData.totalStudents === 0) return 0;
    
    const otherStatesPercentage = (formData.studentsFromOtherStates / formData.totalStudents) * 100;
    const internationalPercentage = (formData.internationalStudents / formData.totalStudents) * 100;
    
    const otherStatesWeight = Math.min((otherStatesPercentage / 50) * 15, 15);
    const internationalWeight = Math.min((internationalPercentage / 10) * 8, 8);
    const statesWeight = Math.min((formData.statesRepresented / 20) * 7, 7);
    
    return Math.min(otherStatesWeight + internationalWeight + statesWeight, 30);
  };

  const calculateWD = () => {
    // Women Diversity calculation (30 marks max)
    if (formData.totalStudents === 0 || formData.totalFaculty === 0) return 0;
    
    const womenStudentsPercentage = (formData.totalWomenStudents / formData.totalStudents) * 100;
    const womenFacultyPercentage = (formData.womenFaculty / formData.totalFaculty) * 100;
    
    const studentsWeight = Math.min((womenStudentsPercentage / 50) * 15, 15);
    const facultyWeight = Math.min((womenFacultyPercentage / 40) * 10, 10);
    const leadershipWeight = Math.min((formData.womenInLeadership / 10) * 5, 5);
    
    return Math.min(studentsWeight + facultyWeight + leadershipWeight, 30);
  };

  const calculateESCS = () => {
    // Economically and Socially Challenged Students calculation (20 marks max)
    if (formData.totalStudents === 0) return 0;
    
    const economicallyPercentage = (formData.economicallyChallengedStudents / formData.totalStudents) * 100;
    const sociallyPercentage = (formData.sociallyChallengedStudents / formData.totalStudents) * 100;
    const scholarshipPercentage = (formData.scholarshipRecipients / formData.totalStudents) * 100;
    
    const economicallyWeight = Math.min((economicallyPercentage / 30) * 8, 8);
    const sociallyWeight = Math.min((sociallyPercentage / 20) * 6, 6);
    const scholarshipWeight = Math.min((scholarshipPercentage / 40) * 6, 6);
    
    return Math.min(economicallyWeight + sociallyWeight + scholarshipWeight, 20);
  };

  const calculatePCS = () => {
    // Facilities for Physically Challenged Students calculation (20 marks max)
    if (formData.totalBuildings === 0) return 0;
    
    const accessibilityPercentage = (formData.accessibleBuildings / formData.totalBuildings) * 100;
    const pcsPercentage = formData.totalStudents > 0 ? (formData.physicallyChallengedStudents / formData.totalStudents) * 100 : 0;
    
    const accessibilityWeight = Math.min((accessibilityPercentage / 100) * 12, 12);
    const servicesWeight = Math.min((formData.supportServices / 15) * 5, 5);
    const inclusionWeight = Math.min((pcsPercentage / 5) * 3, 3);
    
    return Math.min(accessibilityWeight + servicesWeight + inclusionWeight, 20);
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const handleSave = () => {
    const rd = calculateRD();
    const wd = calculateWD();
    const escs = calculateESCS();
    const pcs = calculatePCS();
    
    updateOutreachData({
      rd,
      wd,
      escs,
      pcs
    });
  };

  const currentRD = calculateRD();
  const currentWD = calculateWD();
  const currentESCS = calculateESCS();
  const currentPCS = calculatePCS();
  const totalScore = currentRD + currentWD + currentESCS + currentPCS;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Outreach and Inclusivity (OI)</h2>
          <p className="text-gray-600 mt-1">Weight: 10% | Maximum Score: 100 marks</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-orange-600">{totalScore.toFixed(1)}</div>
          <div className="text-sm text-gray-500">Current Score</div>
        </div>
      </div>

      {/* Score Overview */}
      <Card className="bg-orange-50 border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-900">Outreach and Inclusivity Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{currentRD.toFixed(1)}</div>
              <div className="text-sm text-gray-600">RD (30 max)</div>
              <Progress value={(currentRD / 30) * 100} className="h-2 mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{currentWD.toFixed(1)}</div>
              <div className="text-sm text-gray-600">WD (30 max)</div>
              <Progress value={(currentWD / 30) * 100} className="h-2 mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{currentESCS.toFixed(1)}</div>
              <div className="text-sm text-gray-600">ESCS (20 max)</div>
              <Progress value={(currentESCS / 20) * 100} className="h-2 mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{currentPCS.toFixed(1)}</div>
              <div className="text-sm text-gray-600">PCS (20 max)</div>
              <Progress value={(currentPCS / 20) * 100} className="h-2 mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* A. Region Diversity (RD) - 30 marks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <span>A. Percentage of Students from other States/Countries (Region Diversity RD)</span>
            <Badge variant="outline">30 marks</Badge>
          </CardTitle>
          <CardDescription>
            Geographic diversity including students from other states and international students
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalStudents">Total Students</Label>
              <Input
                id="totalStudents"
                type="number"
                placeholder="e.g., 5000"
                value={formData.totalStudents || ''}
                onChange={(e) => handleInputChange('totalStudents', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Total number of enrolled students</p>
            </div>
            <div>
              <Label htmlFor="studentsFromOtherStates">Students from Other States</Label>
              <Input
                id="studentsFromOtherStates"
                type="number"
                placeholder="e.g., 1500"
                value={formData.studentsFromOtherStates || ''}
                onChange={(e) => handleInputChange('studentsFromOtherStates', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Students from states other than institution's state</p>
            </div>
            <div>
              <Label htmlFor="internationalStudents">International Students</Label>
              <Input
                id="internationalStudents"
                type="number"
                placeholder="e.g., 200"
                value={formData.internationalStudents || ''}
                onChange={(e) => handleInputChange('internationalStudents', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Students from foreign countries</p>
            </div>
            <div>
              <Label htmlFor="statesRepresented">States/Countries Represented</Label>
              <Input
                id="statesRepresented"
                type="number"
                placeholder="e.g., 15"
                value={formData.statesRepresented || ''}
                onChange={(e) => handleInputChange('statesRepresented', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Number of different states/countries represented</p>
            </div>
          </div>
          {formData.totalStudents > 0 && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Other States: {((formData.studentsFromOtherStates / formData.totalStudents) * 100).toFixed(1)}% | 
                International: {((formData.internationalStudents / formData.totalStudents) * 100).toFixed(1)}% | 
                Geographic Diversity: {formData.statesRepresented} regions
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* B. Women Diversity (WD) - 30 marks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-pink-600" />
            <span>B. Percentage of Women (Women Diversity WD)</span>
            <Badge variant="outline">30 marks</Badge>
          </CardTitle>
          <CardDescription>
            Gender diversity metrics including women students, faculty, and leadership positions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalWomenStudents">Total Women Students</Label>
              <Input
                id="totalWomenStudents"
                type="number"
                placeholder="e.g., 2000"
                value={formData.totalWomenStudents || ''}
                onChange={(e) => handleInputChange('totalWomenStudents', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Number of women students enrolled</p>
            </div>
            <div>
              <Label htmlFor="womenFaculty">Women Faculty</Label>
              <Input
                id="womenFaculty"
                type="number"
                placeholder="e.g., 120"
                value={formData.womenFaculty || ''}
                onChange={(e) => handleInputChange('womenFaculty', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Number of women faculty members</p>
            </div>
            <div>
              <Label htmlFor="totalFaculty">Total Faculty</Label>
              <Input
                id="totalFaculty"
                type="number"
                placeholder="e.g., 300"
                value={formData.totalFaculty || ''}
                onChange={(e) => handleInputChange('totalFaculty', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Total number of faculty members</p>
            </div>
            <div>
              <Label htmlFor="womenInLeadership">Women in Leadership</Label>
              <Input
                id="womenInLeadership"
                type="number"
                placeholder="e.g., 8"
                value={formData.womenInLeadership || ''}
                onChange={(e) => handleInputChange('womenInLeadership', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Women in senior administrative positions</p>
            </div>
          </div>
          {formData.totalStudents > 0 && formData.totalFaculty > 0 && (
            <div className="p-3 bg-pink-50 rounded-lg">
              <p className="text-sm text-pink-800">
                Women Students: {((formData.totalWomenStudents / formData.totalStudents) * 100).toFixed(1)}% | 
                Women Faculty: {((formData.womenFaculty / formData.totalFaculty) * 100).toFixed(1)}% | 
                Leadership: {formData.womenInLeadership} positions
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* C. Economically and Socially Challenged Students (ESCS) - 20 marks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-green-600" />
            <span>C. Economically and Socially Challenged Students (ESCS)</span>
            <Badge variant="outline">20 marks</Badge>
          </CardTitle>
          <CardDescription>
            Support for economically and socially disadvantaged students through scholarships and assistance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="economicallyChallengedStudents">Economically Challenged Students</Label>
              <Input
                id="economicallyChallengedStudents"
                type="number"
                placeholder="e.g., 800"
                value={formData.economicallyChallengedStudents || ''}
                onChange={(e) => handleInputChange('economicallyChallengedStudents', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Students from economically weaker sections</p>
            </div>
            <div>
              <Label htmlFor="sociallyChallengedStudents">Socially Challenged Students</Label>
              <Input
                id="sociallyChallengedStudents"
                type="number"
                placeholder="e.g., 600"
                value={formData.sociallyChallengedStudents || ''}
                onChange={(e) => handleInputChange('sociallyChallengedStudents', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Students from SC/ST/OBC categories</p>
            </div>
            <div>
              <Label htmlFor="scholarshipRecipients">Scholarship Recipients</Label>
              <Input
                id="scholarshipRecipients"
                type="number"
                placeholder="e.g., 1200"
                value={formData.scholarshipRecipients || ''}
                onChange={(e) => handleInputChange('scholarshipRecipients', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Students receiving scholarships</p>
            </div>
            <div>
              <Label htmlFor="freeshipStudents">Freeship Students</Label>
              <Input
                id="freeshipStudents"
                type="number"
                placeholder="e.g., 400"
                value={formData.freeshipStudents || ''}
                onChange={(e) => handleInputChange('freeshipStudents', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Students with complete fee waiver</p>
            </div>
          </div>
          {formData.totalStudents > 0 && (
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                Economic Support: {((formData.economicallyChallengedStudents / formData.totalStudents) * 100).toFixed(1)}% | 
                Social Support: {((formData.sociallyChallengedStudents / formData.totalStudents) * 100).toFixed(1)}% | 
                Scholarships: {((formData.scholarshipRecipients / formData.totalStudents) * 100).toFixed(1)}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* D. Facilities for Physically Challenged Students (PCS) - 20 marks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Accessibility className="h-5 w-5 text-purple-600" />
            <span>D. Facilities for Physically Challenged Students (PCS)</span>
            <Badge variant="outline">20 marks</Badge>
          </CardTitle>
          <CardDescription>
            Infrastructure and support services for physically challenged students
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="physicallyChallengedStudents">Physically Challenged Students</Label>
              <Input
                id="physicallyChallengedStudents"
                type="number"
                placeholder="e.g., 50"
                value={formData.physicallyChallengedStudents || ''}
                onChange={(e) => handleInputChange('physicallyChallengedStudents', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Number of physically challenged students</p>
            </div>
            <div>
              <Label htmlFor="accessibleBuildings">Accessible Buildings</Label>
              <Input
                id="accessibleBuildings"
                type="number"
                placeholder="e.g., 25"
                value={formData.accessibleBuildings || ''}
                onChange={(e) => handleInputChange('accessibleBuildings', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Buildings with accessibility features</p>
            </div>
            <div>
              <Label htmlFor="totalBuildings">Total Buildings</Label>
              <Input
                id="totalBuildings"
                type="number"
                placeholder="e.g., 30"
                value={formData.totalBuildings || ''}
                onChange={(e) => handleInputChange('totalBuildings', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Total number of campus buildings</p>
            </div>
            <div>
              <Label htmlFor="supportServices">Support Services</Label>
              <Input
                id="supportServices"
                type="number"
                placeholder="e.g., 12"
                value={formData.supportServices || ''}
                onChange={(e) => handleInputChange('supportServices', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Number of support services available</p>
            </div>
          </div>
          {formData.totalBuildings > 0 && (
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-800">
                Accessibility: {((formData.accessibleBuildings / formData.totalBuildings) * 100).toFixed(1)}% buildings | 
                PCS Students: {formData.physicallyChallengedStudents} | 
                Support Services: {formData.supportServices}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Outreach Data</span>
        </Button>
      </div>
    </div>
  );
};

export default OutreachForm;