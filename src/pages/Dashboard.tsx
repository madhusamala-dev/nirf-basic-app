import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  Heart, 
  Eye,
  BarChart3,
  FileText,
  Award,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import TLRForm from '../components/forms/TLRForm';
import ResearchForm from '../components/forms/ResearchForm';
import GraduationForm from '../components/forms/GraduationForm';
import OutreachForm from '../components/forms/OutreachForm';
import PerceptionForm from '../components/forms/PerceptionForm';
import ResultsDashboard from '../components/ResultsDashboard';

const Dashboard: React.FC = () => {
  const { college } = useAuth();
  const { scores, getCompletionStatus } = useData();
  const [activeTab, setActiveTab] = useState('overview');
  
  const completionStatus = getCompletionStatus();
  
  const sections = [
    {
      id: 'tlr',
      name: 'Teaching, Learning & Resources',
      icon: BookOpen,
      score: scores.tlr.total,
      maxScore: 100,
      weight: 30,
      completed: completionStatus.tlr,
      color: 'blue'
    },
    {
      id: 'research',
      name: 'Research & Professional Practice',
      icon: Award,
      score: scores.research.total,
      maxScore: 100,
      weight: 30,
      completed: completionStatus.research,
      color: 'green'
    },
    {
      id: 'graduation',
      name: 'Graduation Outcomes',
      icon: GraduationCap,
      score: scores.graduation.total,
      maxScore: 100,
      weight: 20,
      completed: completionStatus.graduation,
      color: 'purple'
    },
    {
      id: 'outreach',
      name: 'Outreach and Inclusivity',
      icon: Heart,
      score: scores.outreach.total,
      maxScore: 100,
      weight: 10,
      completed: completionStatus.outreach,
      color: 'pink'
    },
    {
      id: 'perception',
      name: 'Perception',
      icon: Eye,
      score: scores.perception.total,
      maxScore: 100,
      weight: 10,
      completed: completionStatus.perception,
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      pink: 'bg-pink-50 text-pink-700 border-pink-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">NIRF Assessment Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome, <span className="font-semibold">{college?.name}</span> | Category: {college?.category}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tlr" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              TLR
            </TabsTrigger>
            <TabsTrigger value="research" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Research
            </TabsTrigger>
            <TabsTrigger value="graduation" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Graduation
            </TabsTrigger>
            <TabsTrigger value="outreach" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Outreach
            </TabsTrigger>
            <TabsTrigger value="perception" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Perception
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Overall Score
                  </CardTitle>
                  <CardDescription>Current NIRF ranking score</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {scores.finalScore.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">out of 100</div>
                    <Progress value={scores.finalScore} className="mt-4" />
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Section Progress</CardTitle>
                  <CardDescription>Complete all sections for accurate assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sections.map((section) => (
                      <div key={section.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <section.icon className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">{section.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={section.completed ? "default" : "secondary"}>
                            {section.completed ? "Completed" : "Pending"}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {section.score.toFixed(1)}/{section.maxScore}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {sections.map((section) => (
                <Card key={section.id} className={`border-2 ${getColorClasses(section.color)}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <section.icon className="h-6 w-6" />
                      <Badge variant="outline">{section.weight}%</Badge>
                    </div>
                    <CardTitle className="text-lg">{section.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{section.score.toFixed(1)}</span>
                        <span className="text-sm text-gray-500">/{section.maxScore}</span>
                      </div>
                      <Progress value={(section.score / section.maxScore) * 100} className="h-2" />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3"
                        onClick={() => setActiveTab(section.id)}
                      >
                        {section.completed ? 'Review' : 'Complete'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <ResultsDashboard />
          </TabsContent>

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

          <TabsContent value="perception">
            <PerceptionForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;