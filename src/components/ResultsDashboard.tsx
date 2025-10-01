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
          <h1 className="text-2xl font-bold text-gray-900">NIRF Ranking Overview</h1>
          <p className="text-gray-600 mt-1">Comprehensive analysis of institutional performance</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">{scores.overall.toFixed(1)}</div>
          <div className="text-sm text-gray-500">Overall Score</div>
        </div>
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>Overall NIRF Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Total Score</span>
              <span className="font-medium">{scores.overall.toFixed(2)}/100</span>
            </div>
            <Progress value={scores.overall} className="h-4" />
            <div className="grid grid-cols-5 gap-4 text-center text-xs">
              <div>
                <div className="font-medium text-blue-600">{scores.tlr.total.toFixed(1)}</div>
                <div className="text-gray-500">TLR (30%)</div>
              </div>
              <div>
                <div className="font-medium text-green-600">{scores.research.total.toFixed(1)}</div>
                <div className="text-gray-500">Research (30%)</div>
              </div>
              <div>
                <div className="font-medium text-purple-600">{scores.graduation.total.toFixed(1)}</div>
                <div className="text-gray-500">Graduation (20%)</div>
              </div>
              <div>
                <div className="font-medium text-orange-600">{scores.outreach.total.toFixed(1)}</div>
                <div className="text-gray-500">Outreach (10%)</div>
              </div>
              <div>
                <div className="font-medium text-indigo-600">{scores.perception.total.toFixed(1)}</div>
                <div className="text-gray-500">Perception (10%)</div>
              </div>
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
          <CardDescription>Teaching, Learning & Resources (Weight: 30%) - Official NIRF Structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.tlr.ss, 20)}`}>
                {scores.tlr.ss.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Student Strength (SS)</div>
              <div className="text-xs text-gray-500">Including Doctoral Students</div>
              <div className="text-xs text-gray-600 font-medium">Max: 20 marks</div>
              <Progress 
                value={(scores.tlr.ss / 20) * 100} 
                className="h-2 mt-2"
              />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.tlr.fsr, 30)}`}>
                {scores.tlr.fsr.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Faculty-Student Ratio (FSR)</div>
              <div className="text-xs text-gray-500">Emphasis on Permanent Faculty</div>
              <div className="text-xs text-gray-600 font-medium">Max: 30 marks</div>
              <Progress 
                value={(scores.tlr.fsr / 30) * 100} 
                className="h-2 mt-2"
              />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.tlr.fqe, 20)}`}>
                {scores.tlr.fqe.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Faculty Qualification (FQE)</div>
              <div className="text-xs text-gray-500">PhD & Experience Combined</div>
              <div className="text-xs text-gray-600 font-medium">Max: 20 marks</div>
              <Progress 
                value={(scores.tlr.fqe / 20) * 100} 
                className="h-2 mt-2"
              />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.tlr.fru, 30)}`}>
                {scores.tlr.fru.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Financial Resources (FRU)</div>
              <div className="text-xs text-gray-500">Resources & Utilization</div>
              <div className="text-xs text-gray-600 font-medium">Max: 30 marks</div>
              <Progress 
                value={(scores.tlr.fru / 30) * 100} 
                className="h-2 mt-2"
              />
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <div className="text-sm text-blue-800 text-center">
              <strong>Official NIRF TLR Structure:</strong> SS (20) + FSR (30) + FQE (20) + FRU (30) = 100 marks total
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
          <CardDescription>Research and Professional Practice (Weight: 30%) - Official NIRF Structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.research.pu, 35)}`}>
                {scores.research.pu.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Publications (PU)</div>
              <div className="text-xs text-gray-500">Combined metric</div>
              <div className="text-xs text-gray-600 font-medium">Max: 35 marks</div>
              <Progress 
                value={(scores.research.pu / 35) * 100} 
                className="h-2 mt-2"
              />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.research.qp, 40)}`}>
                {scores.research.qp.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Quality Publications (QP)</div>
              <div className="text-xs text-gray-500">Impact & Citations</div>
              <div className="text-xs text-gray-600 font-medium">Max: 40 marks</div>
              <Progress 
                value={(scores.research.qp / 40) * 100} 
                className="h-2 mt-2"
              />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.research.ipr, 15)}`}>
                {scores.research.ipr.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">IPR & Patents (IPR)</div>
              <div className="text-xs text-gray-500">Published & Granted</div>
              <div className="text-xs text-gray-600 font-medium">Max: 15 marks</div>
              <Progress 
                value={(scores.research.ipr / 15) * 100} 
                className="h-2 mt-2"
              />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.research.fppp, 10)}`}>
                {scores.research.fppp.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Projects & Practice (FPPP)</div>
              <div className="text-xs text-gray-500">Professional Footprint</div>
              <div className="text-xs text-gray-600 font-medium">Max: 10 marks</div>
              <Progress 
                value={(scores.research.fppp / 10) * 100} 
                className="h-2 mt-2"
              />
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-100 rounded-lg">
            <div className="text-sm text-green-800 text-center">
              <strong>Official NIRF Research Structure:</strong> PU (35) + QP (40) + IPR (15) + FPPP (10) = 100 marks total
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
          <CardDescription>Graduation Outcomes (Weight: 20%) - Official NIRF Structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.graduation.gph || 0, 40)}`}>
                {(scores.graduation.gph || 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Placement & Higher Studies (GPH)</div>
              <div className="text-xs text-gray-500">Combined metric</div>
              <div className="text-xs text-gray-600 font-medium">Max: 40 marks</div>
              <Progress 
                value={((scores.graduation.gph || 0) / 40) * 100} 
                className="h-2 mt-2"
              />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.graduation.gue || 0, 15)}`}>
                {(scores.graduation.gue || 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">University Exams (GUE)</div>
              <div className="text-xs text-gray-500">Academic Performance</div>
              <div className="text-xs text-gray-600 font-medium">Max: 15 marks</div>
              <Progress 
                value={((scores.graduation.gue || 0) / 15) * 100} 
                className="h-2 mt-2"
              />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.graduation.gms || 0, 25)}`}>
                {(scores.graduation.gms || 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Median Salary (GMS)</div>
              <div className="text-xs text-gray-500">Compensation Data</div>
              <div className="text-xs text-gray-600 font-medium">Max: 25 marks</div>
              <Progress 
                value={((scores.graduation.gms || 0) / 25) * 100} 
                className="h-2 mt-2"
              />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.graduation.gphd || 0, 20)}`}>
                {(scores.graduation.gphd || 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">PhD Graduated (GPHD)</div>
              <div className="text-xs text-gray-500">Doctoral Outcomes</div>
              <div className="text-xs text-gray-600 font-medium">Max: 20 marks</div>
              <Progress 
                value={((scores.graduation.gphd || 0) / 20) * 100} 
                className="h-2 mt-2"
              />
            </div>
          </div>
          <div className="mt-4 p-3 bg-purple-100 rounded-lg">
            <div className="text-sm text-purple-800 text-center">
              <strong>Official NIRF Graduation Structure:</strong> GPH (40) + GUE (15) + GMS (25) + GPHD (20) = 100 marks total
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Outreach Component Breakdown - Updated with new NIRF structure */}
      <Card className="bg-orange-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-900">
            <Users className="h-5 w-5" />
            <span>Outreach Component Breakdown</span>
          </CardTitle>
          <CardDescription>Outreach & Inclusivity (Weight: 10%) - Official NIRF Structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.outreach.rd || 0, 30)}`}>
                {(scores.outreach.rd || 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Region Diversity (RD)</div>
              <div className="text-xs text-gray-500">Other States/Countries</div>
              <div className="text-xs text-gray-600 font-medium">Max: 30 marks</div>
              <Progress 
                value={((scores.outreach.rd || 0) / 30) * 100} 
                className="h-2 mt-2"
              />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.outreach.wd || 0, 30)}`}>
                {(scores.outreach.wd || 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Women Diversity (WD)</div>
              <div className="text-xs text-gray-500">Gender Inclusivity</div>
              <div className="text-xs text-gray-600 font-medium">Max: 30 marks</div>
              <Progress 
                value={((scores.outreach.wd || 0) / 30) * 100} 
                className="h-2 mt-2"
              />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.outreach.escs || 0, 20)}`}>
                {(scores.outreach.escs || 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">ESCS Support</div>
              <div className="text-xs text-gray-500">Economic & Social</div>
              <div className="text-xs text-gray-600 font-medium">Max: 20 marks</div>
              <Progress 
                value={((scores.outreach.escs || 0) / 20) * 100} 
                className="h-2 mt-2"
              />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.outreach.pcs || 0, 20)}`}>
                {(scores.outreach.pcs || 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">PCS Facilities</div>
              <div className="text-xs text-gray-500">Physical Accessibility</div>
              <div className="text-xs text-gray-600 font-medium">Max: 20 marks</div>
              <Progress 
                value={((scores.outreach.pcs || 0) / 20) * 100} 
                className="h-2 mt-2"
              />
            </div>
          </div>
          <div className="mt-4 p-3 bg-orange-100 rounded-lg">
            <div className="text-sm text-orange-800 text-center">
              <strong>Official NIRF Outreach Structure:</strong> RD (30) + WD (30) + ESCS (20) + PCS (20) = 100 marks total
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${getScoreColor(scores.perception.pr, 100)}`}>
                {scores.perception.pr.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Overall Perception</div>
              <div className="text-xs text-gray-500">Max: 100</div>
              <Progress 
                value={scores.perception.pr} 
                className="h-2 mt-2"
              />
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-lg font-medium text-indigo-600">Academic</div>
              <div className="text-sm text-gray-600 mt-1">Peers</div>
              <div className="text-xs text-gray-500">Faculty reputation (40%)</div>
              <div className="mt-2 h-2 bg-indigo-200 rounded-full">
                <div className="h-2 bg-indigo-500 rounded-full" style={{width: '40%'}}></div>
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-lg font-medium text-indigo-600">Employer</div>
              <div className="text-sm text-gray-600 mt-1">Rating</div>
              <div className="text-xs text-gray-500">Industry perception (35%)</div>
              <div className="mt-2 h-2 bg-indigo-200 rounded-full">
                <div className="h-2 bg-indigo-500 rounded-full" style={{width: '35%'}}></div>
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-lg font-medium text-indigo-600">Public</div>
              <div className="text-sm text-gray-600 mt-1">Recognition</div>
              <div className="text-xs text-gray-500">Media visibility (25%)</div>
              <div className="mt-2 h-2 bg-indigo-200 rounded-full">
                <div className="h-2 bg-indigo-500 rounded-full" style={{width: '25%'}}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-gray-700" />
            <span>Performance Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{((scores.tlr.total + scores.research.total) / 2).toFixed(1)}</div>
              <div className="text-sm text-gray-600">Academic Excellence</div>
              <div className="text-xs text-gray-500">TLR + Research Average</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{scores.graduation.total.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Student Success</div>
              <div className="text-xs text-gray-500">Graduation Outcomes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{((scores.outreach.total + scores.perception.total) / 2).toFixed(1)}</div>
              <div className="text-sm text-gray-600">Social Impact</div>
              <div className="text-xs text-gray-500">Outreach + Perception Average</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDashboard;