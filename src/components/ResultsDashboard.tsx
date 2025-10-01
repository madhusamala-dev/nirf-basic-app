import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Award, 
  GraduationCap, 
  Users, 
  Eye,
  TrendingUp,
  Target,
  BarChart3
} from 'lucide-react';
import { useData } from '../context/DataContext';

const ResultsDashboard: React.FC = () => {
  const { scores } = useData();

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">NIRF Results Overview</h1>
          <p className="text-gray-600 mt-1">Comprehensive breakdown of all NIRF parameters</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">{scores.overall.toFixed(2)}</div>
          <div className="text-sm text-gray-500">Overall NIRF Score</div>
        </div>
      </div>

      {/* Overall Score Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>Overall Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{scores.tlr.total.toFixed(1)}</div>
              <div className="text-sm text-gray-600">TLR (30%)</div>
              <Progress value={scores.tlr.total} className="h-2 mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{scores.research.total.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Research (30%)</div>
              <Progress value={scores.research.total} className="h-2 mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{scores.graduation.total.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Graduation (20%)</div>
              <Progress value={scores.graduation.total} className="h-2 mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{scores.outreach.total.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Outreach (10%)</div>
              <Progress value={scores.outreach.total} className="h-2 mt-1" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{scores.perception.total.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Perception (10%)</div>
              <Progress value={scores.perception.total} className="h-2 mt-1" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">
              Weighted Score: {scores.tlr.total.toFixed(1)}×0.3 + {scores.research.total.toFixed(1)}×0.3 + {scores.graduation.total.toFixed(1)}×0.2 + {scores.outreach.total.toFixed(1)}×0.1 + {scores.perception.total.toFixed(1)}×0.1 = {scores.overall.toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TLR Component Breakdown */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-900">
            <BookOpen className="h-5 w-5" />
            <span>TLR Component Breakdown</span>
          </CardTitle>
          <CardDescription>Teaching, Learning & Resources (Weight: 30%)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.tlr.ss, 20)}`}>
                {scores.tlr.ss.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Student Strength</div>
              <div className="text-xs text-gray-500">Max: 20</div>
              <Progress value={(scores.tlr.ss / 20) * 100} className="h-2 mt-2" />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.tlr.fsr, 30)}`}>
                {scores.tlr.fsr.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Faculty-Student Ratio</div>
              <div className="text-xs text-gray-500">Max: 30</div>
              <Progress value={(scores.tlr.fsr / 30) * 100} className="h-2 mt-2" />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.tlr.fqe, 20)}`}>
                {scores.tlr.fqe.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Faculty Quality</div>
              <div className="text-xs text-gray-500">Max: 20</div>
              <Progress value={(scores.tlr.fqe / 20) * 100} className="h-2 mt-2" />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.tlr.fru, 30)}`}>
                {scores.tlr.fru.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Financial Resources</div>
              <div className="text-xs text-gray-500">Max: 30</div>
              <Progress value={(scores.tlr.fru / 30) * 100} className="h-2 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Research Component Breakdown */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-900">
            <Award className="h-5 w-5" />
            <span>Research Component Breakdown</span>
          </CardTitle>
          <CardDescription>Research and Professional Practice (Weight: 30%)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.research.pu, 35)}`}>
                {scores.research.pu.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Publications</div>
              <div className="text-xs text-gray-500">Max: 35</div>
              <Progress value={(scores.research.pu / 35) * 100} className="h-2 mt-2" />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.research.qp, 35)}`}>
                {scores.research.qp.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Quality Publications</div>
              <div className="text-xs text-gray-500">Max: 35</div>
              <Progress value={(scores.research.qp / 35) * 100} className="h-2 mt-2" />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.research.ipr, 15)}`}>
                {scores.research.ipr.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">IPR & Patents</div>
              <div className="text-xs text-gray-500">Max: 15</div>
              <Progress value={(scores.research.ipr / 15) * 100} className="h-2 mt-2" />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.research.fppp, 15)}`}>
                {scores.research.fppp.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Projects & Practice</div>
              <div className="text-xs text-gray-500">Max: 15</div>
              <Progress value={(scores.research.fppp / 15) * 100} className="h-2 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Graduation Component Breakdown */}
      <Card className="bg-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-900">
            <GraduationCap className="h-5 w-5" />
            <span>Graduation Component Breakdown</span>
          </CardTitle>
          <CardDescription>Graduation Outcomes (Weight: 20%)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.graduation.go || 0, 40)}`}>
                {(scores.graduation.go || 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Graduation Outcomes</div>
              <div className="text-xs text-gray-500">Max: 40</div>
              <Progress value={((scores.graduation.go || 0) / 40) * 100} className="h-2 mt-2" />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.graduation.gph || 0, 20)}`}>
                {(scores.graduation.gph || 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Higher Studies</div>
              <div className="text-xs text-gray-500">Max: 20</div>
              <Progress value={((scores.graduation.gph || 0) / 20) * 100} className="h-2 mt-2" />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.graduation.gue || 0, 15)}`}>
                {(scores.graduation.gue || 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">University Exams</div>
              <div className="text-xs text-gray-500">Max: 15</div>
              <Progress value={((scores.graduation.gue || 0) / 15) * 100} className="h-2 mt-2" />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.graduation.gms || 0, 25)}`}>
                {(scores.graduation.gms || 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Median Salary</div>
              <div className="text-xs text-gray-500">Max: 25</div>
              <Progress value={((scores.graduation.gms || 0) / 25) * 100} className="h-2 mt-2" />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.graduation.grd || 0, 20)}`}>
                {(scores.graduation.grd || 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Regional Diversity</div>
              <div className="text-xs text-gray-500">Max: 20</div>
              <Progress value={((scores.graduation.grd || 0) / 20) * 100} className="h-2 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Outreach Component Breakdown */}
      <Card className="bg-orange-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-900">
            <Users className="h-5 w-5" />
            <span>Outreach Component Breakdown</span>
          </CardTitle>
          <CardDescription>Outreach & Inclusivity (Weight: 10%)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.outreach.oi, 100)}`}>
                {scores.outreach.oi.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Overall Inclusivity</div>
              <div className="text-xs text-gray-500">Max: 100</div>
              <Progress value={scores.outreach.oi} className="h-2 mt-2" />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-lg font-semibold text-orange-600">30</div>
              <div className="text-sm text-gray-600 mt-1">Regional Diversity</div>
              <div className="text-xs text-gray-500">Geographic spread</div>
              <div className="h-2 bg-orange-200 rounded mt-2"></div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-lg font-semibold text-orange-600">30</div>
              <div className="text-sm text-gray-600 mt-1">Women Participation</div>
              <div className="text-xs text-gray-500">Gender inclusivity</div>
              <div className="h-2 bg-orange-200 rounded mt-2"></div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-lg font-semibold text-orange-600">40</div>
              <div className="text-sm text-gray-600 mt-1">Economic & Physical</div>
              <div className="text-xs text-gray-500">Support systems</div>
              <div className="h-2 bg-orange-200 rounded mt-2"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Perception Component Breakdown */}
      <Card className="bg-indigo-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-indigo-900">
            <Eye className="h-5 w-5" />
            <span>Perception Component Breakdown</span>
          </CardTitle>
          <CardDescription>Perception Ranking (Weight: 10%)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.perception.pr, 100)}`}>
                {scores.perception.pr.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Overall Perception</div>
              <div className="text-xs text-gray-500">Max: 100</div>
              <Progress value={scores.perception.pr} className="h-2 mt-2" />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-lg font-semibold text-indigo-600">40%</div>
              <div className="text-sm text-gray-600 mt-1">Academic Peers</div>
              <div className="text-xs text-gray-500">Faculty reputation</div>
              <div className="h-2 bg-indigo-200 rounded mt-2"></div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-lg font-semibold text-indigo-600">35%</div>
              <div className="text-sm text-gray-600 mt-1">Employer Rating</div>
              <div className="text-xs text-gray-500">Industry perception</div>
              <div className="h-2 bg-indigo-200 rounded mt-2"></div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-lg font-semibold text-indigo-600">25%</div>
              <div className="text-sm text-gray-600 mt-1">Public Recognition</div>
              <div className="text-xs text-gray-500">Media & stakeholder</div>
              <div className="h-2 bg-indigo-200 rounded mt-2"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Performance Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">Strengths</span>
              </div>
              <div className="text-sm text-green-700 mt-2">
                {scores.tlr.total >= 70 && "Strong TLR performance"}
                {scores.research.total >= 70 && " • Excellent research output"}
                {scores.graduation.total >= 70 && " • Good graduation outcomes"}
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-900">Improvement Areas</span>
              </div>
              <div className="text-sm text-yellow-700 mt-2">
                {scores.outreach.total < 50 && "Focus on outreach activities"}
                {scores.perception.total < 50 && " • Enhance perception ranking"}
                {scores.graduation.total < 50 && " • Improve graduation outcomes"}
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Overall Rating</span>
              </div>
              <div className="text-sm text-blue-700 mt-2">
                {scores.overall >= 80 ? "Excellent Performance" : 
                 scores.overall >= 60 ? "Good Performance" :
                 scores.overall >= 40 ? "Average Performance" : "Needs Improvement"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDashboard;