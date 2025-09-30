import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { BarChart3, TrendingUp, Award, Target } from 'lucide-react';

const ResultsDashboard: React.FC = () => {
  const { scores } = useData();
  const { college } = useAuth();

  const parameters = [
    {
      name: 'Teaching, Learning & Resources',
      score: scores.tlr.total,
      maxScore: 100,
      weight: 0.30,
      weightedScore: scores.tlr.total * 0.30,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      name: 'Research & Professional Practice',
      score: scores.research,
      maxScore: 100,
      weight: 0.30,
      weightedScore: scores.research * 0.30,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      name: 'Graduation Outcomes',
      score: scores.graduation,
      maxScore: 100,
      weight: 0.20,
      weightedScore: scores.graduation * 0.20,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      name: 'Outreach & Inclusivity',
      score: scores.outreach,
      maxScore: 100,
      weight: 0.10,
      weightedScore: scores.outreach * 0.10,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    },
    {
      name: 'Perception',
      score: scores.perception,
      maxScore: 100,
      weight: 0.10,
      weightedScore: scores.perception * 0.10,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600'
    }
  ];

  const getRankingCategory = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 60) return { label: 'Good', color: 'bg-blue-100 text-blue-800' };
    if (score >= 40) return { label: 'Average', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Needs Improvement', color: 'bg-red-100 text-red-800' };
  };

  const category = getRankingCategory(scores.finalScore);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">NIRF Results Dashboard</h1>
          <p className="text-gray-600 mt-1">{college?.name} - {college?.category} Category</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">{scores.finalScore.toFixed(2)}</div>
          <div className="text-sm text-gray-500">Final NIRF Score</div>
        </div>
      </div>

      {/* Overall Score Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-6 w-6 text-blue-600" />
            <span>Overall Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-4xl font-bold text-blue-900">{scores.finalScore.toFixed(2)}</div>
              <div className="text-sm text-gray-600">out of 100</div>
            </div>
            <Badge className={category.color}>
              {category.label}
            </Badge>
          </div>
          <Progress value={scores.finalScore} className="h-3" />
        </CardContent>
      </Card>

      {/* Parameter Breakdown */}
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Parameter-wise Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {parameters.map((param, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${param.color}`}></div>
                      <span className="font-medium text-sm">{param.name}</span>
                      <Badge variant="outline" className="text-xs">
                        Weight: {(param.weight * 100)}%
                      </Badge>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${param.textColor}`}>
                        {param.score.toFixed(1)}/100
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        (Weighted: {param.weightedScore.toFixed(1)})
                      </span>
                    </div>
                  </div>
                  <Progress value={param.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* TLR Detailed Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>TLR Detailed Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{scores.tlr.ss.toFixed(1)}</div>
                <div className="text-xs text-gray-600">Student Strength</div>
                <div className="text-xs text-gray-500">Max: 20</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{scores.tlr.fsr.toFixed(1)}</div>
                <div className="text-xs text-gray-600">Faculty-Student Ratio</div>
                <div className="text-xs text-gray-500">Max: 30</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{scores.tlr.fqe.toFixed(1)}</div>
                <div className="text-xs text-gray-600">Faculty Quality</div>
                <div className="text-xs text-gray-500">Max: 20</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{scores.tlr.fru.toFixed(1)}</div>
                <div className="text-xs text-gray-600">Financial Resources</div>
                <div className="text-xs text-gray-500">Max: 30</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Improvement Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {parameters
                .filter(param => param.score < 70)
                .map((param, index) => (
                  <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="font-medium text-yellow-800">{param.name}</div>
                    <div className="text-sm text-yellow-700">
                      Current score: {param.score.toFixed(1)}/100. Consider focusing on this area to improve your overall ranking.
                    </div>
                  </div>
                ))}
              {parameters.every(param => param.score >= 70) && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-medium text-green-800">Excellent Performance!</div>
                  <div className="text-sm text-green-700">
                    All parameters are performing well. Continue maintaining these standards.
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultsDashboard;