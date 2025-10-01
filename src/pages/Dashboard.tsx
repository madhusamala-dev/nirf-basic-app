import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BookOpen, 
  FlaskConical, 
  GraduationCap, 
  Users, 
  Eye, 
  BarChart3, 
  LogOut,
  User,
  Building,
  Save,
  X,
  Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import TLRForm from '../components/forms/TLRForm';
import ResearchForm from '../components/forms/ResearchForm';
import GraduationForm from '../components/forms/GraduationForm';
import OutreachForm from '../components/forms/OutreachForm';
import PerceptionForm from '../components/forms/PerceptionForm';
import ResultsDashboard from '../components/ResultsDashboard';
import AdminDashboard from '../components/admin/AdminDashboard';

type TabType = 'overview' | 'tlr' | 'research' | 'graduation' | 'outreach' | 'perception' | 'results' | 'admin';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const { user, logout } = useAuth();
  const { 
    submitForApproval, 
    editSubmission, 
    saveSubmissionChanges, 
    cancelEdit, 
    isEditing,
    currentSubmission 
  } = useData();

  const isAdmin = user?.role === 'admin';
  const isCoordinator = user?.role === 'coordinator';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, color: 'bg-gray-500' },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin Panel', icon: Shield, color: 'bg-red-500' }] : []),
    { id: 'tlr', label: 'TLR', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'research', label: 'Research', icon: FlaskConical, color: 'bg-green-500' },
    { id: 'graduation', label: 'Graduation', icon: GraduationCap, color: 'bg-purple-500' },
    { id: 'outreach', label: 'Outreach', icon: Users, color: 'bg-orange-500' },
    { id: 'perception', label: 'Perception', icon: Eye, color: 'bg-indigo-500' },
    { id: 'results', label: 'Results', icon: BarChart3, color: 'bg-gray-500' }
  ];

  const handleEditSubmission = (submissionId: string) => {
    editSubmission(submissionId);
    setActiveTab('tlr'); // Switch to first form tab for editing
  };

  const handleSaveChanges = () => {
    saveSubmissionChanges();
    setActiveTab('admin'); // Return to admin panel
  };

  const handleCancelEdit = () => {
    cancelEdit();
    setActiveTab('admin'); // Return to admin panel
  };

  const handleSubmitForApproval = () => {
    if (window.confirm('Are you sure you want to submit this data for approval? You will not be able to edit it after submission.')) {
      submitForApproval();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'admin':
        return isAdmin ? <AdminDashboard onEditSubmission={handleEditSubmission} /> : null;
      case 'tlr':
        return <TLRForm />;
      case 'research':
        return <ResearchForm />;
      case 'graduation':
        return <GraduationForm />;
      case 'outreach':
        return <OutreachForm />;
      case 'perception':
        return <PerceptionForm />;
      case 'results':
        return <ResultsDashboard />;
      case 'overview':
      default:
        return <ResultsDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">NIRF Portal</h1>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{user?.college.name}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'}>
                  {user?.role}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Edit Mode Alert */}
        {isEditing && currentSubmission && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <Edit className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>
                You are editing submission from <strong>{currentSubmission.coordinatorName}</strong> 
                ({currentSubmission.collegeName})
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                  className="flex items-center space-x-1"
                >
                  <X className="w-3 h-3" />
                  <span>Cancel</span>
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveChanges}
                  className="flex items-center space-x-1"
                >
                  <Save className="w-3 h-3" />
                  <span>Save Changes</span>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {isAdmin ? 'Admin Panel' : 'NIRF Assessment'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left text-sm font-medium rounded-none transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* User Info Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-sm">Institution Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <div className="text-xs text-gray-500">Institution</div>
                  <div className="text-sm font-medium">{user?.college.name}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Category</div>
                  <div className="text-sm font-medium">{user?.college.category}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="text-sm font-medium">{user?.college.location}</div>
                </div>
                
                {isCoordinator && !isEditing && (
                  <div className="pt-3 border-t">
                    <Button
                      onClick={handleSubmitForApproval}
                      className="w-full"
                      size="sm"
                    >
                      Submit for Approval
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;