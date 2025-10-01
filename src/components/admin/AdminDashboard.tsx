import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  Edit, 
  User, 
  Building, 
  Calendar,
  BarChart3,
  GraduationCap,
  Users,
  Eye,
  BookOpen,
  Award
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface AdminDashboardProps {
  onEditSubmission?: (submissionId: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onEditSubmission }) => {
  const { getAllSubmissions, approveSubmission, rejectSubmission, user } = useData();
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  
  const submissions = getAllSubmissions();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'submitted':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (submissionId: string) => {
    if (window.confirm('Are you sure you want to approve this submission?')) {
      approveSubmission(submissionId);
    }
  };

  const handleReject = (submissionId: string) => {
    if (window.confirm('Are you sure you want to reject this submission?')) {
      rejectSubmission(submissionId, 'Rejected by admin');
    }
  };

  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'submitted').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
    draft: submissions.filter(s => s.status === 'draft').length
  };

  const selectedSubmissionData = selectedSubmission 
    ? submissions.find(s => s.id === selectedSubmission)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Review and manage NIRF submissions</p>
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">{user?.email}</span>
          <Badge variant="default">Admin</Badge>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-xs text-gray-500">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
                <div className="text-xs text-gray-500">Approved</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                <div className="text-xs text-gray-500">Rejected</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Edit className="h-4 w-4 text-gray-600" />
              <div>
                <div className="text-2xl font-bold text-gray-600">{stats.draft}</div>
                <div className="text-xs text-gray-500">Draft</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>All Submissions</CardTitle>
              <CardDescription>
                Review coordinator submissions and manage approval status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div 
                    key={submission.id} 
                    className={`border rounded-lg p-4 space-y-4 cursor-pointer transition-colors ${
                      selectedSubmission === submission.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedSubmission(submission.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium text-sm">{submission.college}</div>
                            <div className="text-xs text-gray-500">
                              Coordinator: {submission.coordinator}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(submission.status)}
                        <Badge className={getStatusColor(submission.status)}>
                          {submission.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">
                          {submission.scores.tlr.total.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">TLR</div>
                        <Progress value={submission.scores.tlr.total} className="h-1 mt-1" />
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">
                          {submission.scores.research.total.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">Research</div>
                        <Progress value={submission.scores.research.total} className="h-1 mt-1" />
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">
                          {submission.scores.graduation.total.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">Graduation</div>
                        <Progress value={submission.scores.graduation.total} className="h-1 mt-1" />
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">
                          {submission.scores.outreach.total.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">Outreach</div>
                        <Progress value={submission.scores.outreach.total} className="h-1 mt-1" />
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-indigo-600">
                          {submission.scores.perception.total.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">Perception</div>
                        <Progress value={submission.scores.perception.total} className="h-1 mt-1" />
                      </div>
                      
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">
                          {submission.scores.overall.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">Overall</div>
                        <Progress value={submission.scores.overall} className="h-1 mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {submission.submittedAt ? `Submitted: ${new Date(submission.submittedAt).toLocaleDateString()}` : 'Draft'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {onEditSubmission && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditSubmission(submission.id);
                            }}
                            className="flex items-center space-x-1"
                          >
                            <Edit className="h-3 w-3" />
                            <span>Edit</span>
                          </Button>
                        )}
                        
                        {submission.status === 'submitted' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReject(submission.id);
                              }}
                              className="text-red-600 hover:text-red-700"
                            >
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApprove(submission.id);
                              }}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Approve
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {submissions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No submissions found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed View */}
        <div className="lg:col-span-1">
          {selectedSubmissionData ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Detailed Breakdown</span>
                </CardTitle>
                <CardDescription>
                  {selectedSubmissionData.college}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tlr" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="tlr" className="text-xs">TLR</TabsTrigger>
                    <TabsTrigger value="research" className="text-xs">RES</TabsTrigger>
                    <TabsTrigger value="graduation" className="text-xs">GO</TabsTrigger>
                    <TabsTrigger value="outreach" className="text-xs">OI</TabsTrigger>
                    <TabsTrigger value="perception" className="text-xs">PR</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tlr" className="space-y-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      <h4 className="font-medium">TLR Component Breakdown</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Student Strength (SS)</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-blue-600">{selectedSubmissionData.scores.tlr.ss.toFixed(1)}</span>
                          <Progress value={(selectedSubmissionData.scores.tlr.ss / 30) * 100} className="w-16 h-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Faculty-Student Ratio (FSR)</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-blue-600">{selectedSubmissionData.scores.tlr.fsr.toFixed(1)}</span>
                          <Progress value={(selectedSubmissionData.scores.tlr.fsr / 30) * 100} className="w-16 h-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Faculty Qualification (FQE)</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-blue-600">{selectedSubmissionData.scores.tlr.fqe.toFixed(1)}</span>
                          <Progress value={(selectedSubmissionData.scores.tlr.fqe / 20) * 100} className="w-16 h-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Financial Resources (FRU)</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-blue-600">{selectedSubmissionData.scores.tlr.fru.toFixed(1)}</span>
                          <Progress value={(selectedSubmissionData.scores.tlr.fru / 20) * 100} className="w-16 h-2" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="research" className="space-y-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Award className="h-4 w-4 text-green-600" />
                      <h4 className="font-medium">Research Component Breakdown</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Publications (PU)</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-green-600">{selectedSubmissionData.scores.research.pu.toFixed(1)}</span>
                          <Progress value={(selectedSubmissionData.scores.research.pu / 35) * 100} className="w-16 h-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Quality Publications (QP)</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-green-600">{selectedSubmissionData.scores.research.qp.toFixed(1)}</span>
                          <Progress value={(selectedSubmissionData.scores.research.qp / 35) * 100} className="w-16 h-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">IPR & Patents (IPR)</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-green-600">{selectedSubmissionData.scores.research.ipr.toFixed(1)}</span>
                          <Progress value={(selectedSubmissionData.scores.research.ipr / 15) * 100} className="w-16 h-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Faculty & Ph.D (FPPP)</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-green-600">{selectedSubmissionData.scores.research.fppp.toFixed(1)}</span>
                          <Progress value={(selectedSubmissionData.scores.research.fppp / 15) * 100} className="w-16 h-2" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="graduation" className="space-y-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <GraduationCap className="h-4 w-4 text-purple-600" />
                      <h4 className="font-medium">Graduation Component Breakdown</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Graduation Outcomes (GO)</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-purple-600">{selectedSubmissionData.scores.graduation.go.toFixed(1)}</span>
                          <Progress value={(selectedSubmissionData.scores.graduation.go / 40) * 100} className="w-16 h-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Higher Studies (GPH)</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-purple-600">{selectedSubmissionData.scores.graduation.gph?.toFixed(1) || '0.0'}</span>
                          <Progress value={((selectedSubmissionData.scores.graduation.gph || 0) / 20) * 100} className="w-16 h-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">University Exams (GUE)</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-purple-600">{selectedSubmissionData.scores.graduation.gue?.toFixed(1) || '0.0'}</span>
                          <Progress value={((selectedSubmissionData.scores.graduation.gue || 0) / 15) * 100} className="w-16 h-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Median Salary (GMS)</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-purple-600">{selectedSubmissionData.scores.graduation.gms?.toFixed(1) || '0.0'}</span>
                          <Progress value={((selectedSubmissionData.scores.graduation.gms || 0) / 25) * 100} className="w-16 h-2" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Regional Diversity (GRD)</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-purple-600">{selectedSubmissionData.scores.graduation.grd?.toFixed(1) || '0.0'}</span>
                          <Progress value={((selectedSubmissionData.scores.graduation.grd || 0) / 20) * 100} className="w-16 h-2" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="outreach" className="space-y-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Users className="h-4 w-4 text-orange-600" />
                      <h4 className="font-medium">Outreach Component Breakdown</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Outreach & Inclusivity (OI)</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-orange-600">{selectedSubmissionData.scores.outreach.oi.toFixed(1)}</span>
                          <Progress value={selectedSubmissionData.scores.outreach.oi} className="w-16 h-2" />
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        <div>• Regional Diversity (30 marks)</div>
                        <div>• Women Diversity (30 marks)</div>
                        <div>• Economically Challenged (20 marks)</div>
                        <div>• Physically Challenged (20 marks)</div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="perception" className="space-y-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Eye className="h-4 w-4 text-indigo-600" />
                      <h4 className="font-medium">Perception Component Breakdown</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Perception Ranking (PR)</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-indigo-600">{selectedSubmissionData.scores.perception.pr.toFixed(1)}</span>
                          <Progress value={selectedSubmissionData.scores.perception.pr} className="w-16 h-2" />
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        <div>• Academic Peer Perception (40%)</div>
                        <div>• Employer Perception (35%)</div>
                        <div>• Stakeholder Feedback (15%)</div>
                        <div>• Public Perception (10%)</div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Overall Score Summary */}
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Overall NIRF Score</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {selectedSubmissionData.scores.overall.toFixed(1)}
                    </span>
                  </div>
                  <Progress value={selectedSubmissionData.scores.overall} className="mt-2" />
                  <div className="text-xs text-gray-500 mt-2">
                    TLR(30%) + Research(30%) + Graduation(20%) + Outreach(10%) + Perception(10%)
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                <Building className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select a submission to view detailed breakdown</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;