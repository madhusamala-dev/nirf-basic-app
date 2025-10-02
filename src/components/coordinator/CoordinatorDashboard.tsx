import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  Globe, 
  BarChart3, 
  LogOut, 
  CheckCircle,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import TLRForm from '../forms/TLRForm';
import ResearchForm from '../forms/ResearchForm';
import GraduationForm from '../forms/GraduationForm';
import OutreachForm from '../forms/OutreachForm';

const CoordinatorDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { scores, submitForReview } = useData();
  const [activeTab, setActiveTab] = useState('tlr');

  const handleSubmitForReview = () => {
    submitForReview();
    alert('Data submitted for admin review successfully!');
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">NIRF Data Entry Portal</h1>
              <p className="text-sm text-gray-500">{user?.college.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Welcome, {user?.name}</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">{scores.overall.toFixed(1)}</div>
                <div className="text-xs text-gray-500">Overall Score</div>
              </div>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Score Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">TLR</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{scores.tlr.total.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">out of 100</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Research</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{scores.research.total.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">out of 100</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Graduation</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{scores.graduation.total.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">out of 100</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outreach</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{scores.outreach.total.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">out of 100</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{scores.overall.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">weighted total</p>
            </CardContent>
          </Card>
        </div>

        {/* Data Entry Forms */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>NIRF Data Entry</CardTitle>
                <CardDescription>Enter your institution's data for NIRF ranking evaluation</CardDescription>
              </div>
              <Button onClick={handleSubmitForReview} className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Submit for Review</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="tlr">TLR (30%)</TabsTrigger>
                <TabsTrigger value="research">Research (30%)</TabsTrigger>
                <TabsTrigger value="graduation">Graduation (20%)</TabsTrigger>
                <TabsTrigger value="outreach">Outreach (10%)</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tlr">
                <TLRForm />
              </TabsContent>
              
              <TabsContent value="research">
                <ResearchForm />
              </TabsContent>
              
              <TabsContent value="graduation">
                <GraduationForm />
              </TabsContent>
              
              <TabsContent value="outreach">
                <OutreachForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default CoordinatorDashboard;