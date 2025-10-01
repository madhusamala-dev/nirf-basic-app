import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  Edit, 
  User, 
  Building, 
  Calendar,
  BarChart3
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

interface AdminDashboardProps {
  onEditSubmission: (submissionId: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onEditSubmission }) => {
  const { getAllSubmissions, approveSubmission, rejectSubmission } = useData();
  const { user } = useAuth();
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
      rejectSubmission(submissionId);
    }
  };

  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'submitted').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
    draft: submissions.filter(s => s.status === 'draft').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Review and manage NIRF submissions</p>
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">{user?.name}</span>
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

      {/* Submissions List */}
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
              <div key={submission.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="font-medium text-sm">{submission.collegeName}</div>
                        <div className="text-xs text-gray-500">
                          Coordinator: {submission.coordinatorName}
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
                      {submission.scores.finalScore.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">Final Score</div>
                    <Progress value={submission.scores.finalScore} className="h-1 mt-1" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>
                      Last modified: {submission.lastModified.toLocaleDateString()} by {submission.modifiedBy}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditSubmission(submission.id)}
                      className="flex items-center space-x-1"
                    >
                      <Edit className="h-3 w-3" />
                      <span>Edit</span>
                    </Button>
                    
                    {submission.status === 'submitted' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReject(submission.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(submission.id)}
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
  );
};

export default AdminDashboard;