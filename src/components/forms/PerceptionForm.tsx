import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Users, Building, Star, Eye } from 'lucide-react';
import { useData } from '../../context/DataContext';

const PerceptionForm: React.FC = () => {
  const { data, scores, updatePerception } = useData();
  const { perception } = data;
  const perceptionScores = scores.perception;

  const handleInputChange = (field: keyof typeof perception, value: string) => {
    const numValue = parseFloat(value) || 0;
    updatePerception({ [field]: numValue });
  };

  const sections = [
    {
      title: 'Academic Peer Perception',
      description: 'Reputation and recognition among academic peers',
      weight: 40,
      score: perceptionScores.academicPeerComponent,
      icon: Users,
      fields: [
        { 
          key: 'academicPeerSurveyResponses' as const, 
          label: 'Academic Peer Survey Responses', 
          value: perception.academicPeerSurveyResponses,
          description: 'Number of academic peer survey responses received'
        },
        { 
          key: 'academicPeerRatingAverage' as const, 
          label: 'Academic Peer Rating Average', 
          value: perception.academicPeerRatingAverage,
          description: 'Average rating from academic peers (1-10 scale)',
          max: 10,
          step: 0.1
        },
        { 
          key: 'academicReputationScore' as const, 
          label: 'Academic Reputation Score', 
          value: perception.academicReputationScore,
          description: 'Overall academic reputation score (0-100)',
          max: 100,
          suffix: '%'
        }
      ]
    },
    {
      title: 'Employer Perception',
      description: 'Industry and employer recognition',
      weight: 35,
      score: perceptionScores.employerComponent,
      icon: Building,
      fields: [
        { 
          key: 'employerSurveyResponses' as const, 
          label: 'Employer Survey Responses', 
          value: perception.employerSurveyResponses,
          description: 'Number of employer survey responses received'
        },
        { 
          key: 'employerRatingAverage' as const, 
          label: 'Employer Rating Average', 
          value: perception.employerRatingAverage,
          description: 'Average rating from employers (1-10 scale)',
          max: 10,
          step: 0.1
        },
        { 
          key: 'industryReputationScore' as const, 
          label: 'Industry Reputation Score', 
          value: perception.industryReputationScore,
          description: 'Overall industry reputation score (0-100)',
          max: 100,
          suffix: '%'
        }
      ]
    },
    {
      title: 'Stakeholder Feedback',
      description: 'Alumni and stakeholder perception',
      weight: 15,
      score: perceptionScores.stakeholderComponent,
      icon: Star,
      fields: [
        { 
          key: 'alumniFeedbackScore' as const, 
          label: 'Alumni Feedback Score', 
          value: perception.alumniFeedbackScore,
          description: 'Alumni satisfaction and feedback score (0-100)',
          max: 100,
          suffix: '%'
        },
        { 
          key: 'stakeholderPerceptionScore' as const, 
          label: 'Stakeholder Perception Score', 
          value: perception.stakeholderPerceptionScore,
          description: 'External stakeholder perception score (0-100)',
          max: 100,
          suffix: '%'
        }
      ]
    },
    {
      title: 'Public Perception',
      description: 'Media visibility and public recognition',
      weight: 10,
      score: perceptionScores.publicPerceptionComponent,
      icon: Eye,
      fields: [
        { 
          key: 'mediaVisibilityScore' as const, 
          label: 'Media Visibility Score', 
          value: perception.mediaVisibilityScore,
          description: 'Media coverage and visibility score (0-100)',
          max: 100,
          suffix: '%'
        },
        { 
          key: 'publicPerceptionRating' as const, 
          label: 'Public Perception Rating', 
          value: perception.publicPerceptionRating,
          description: 'General public perception rating (1-10 scale)',
          max: 10,
          step: 0.1
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Perception</h1>
          <p className="text-gray-600 mt-1">Maximum Marks: 100 | Weight: 10%</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-orange-600">{perceptionScores.total}/100</div>
          <div className="text-sm text-gray-500">Current Score</div>
        </div>
      </div>

      <div className="grid gap-6">
        {sections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <section.icon className="h-6 w-6 text-gray-600" />
                  <div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={section.score > section.weight * 0.7 ? "default" : "secondary"}>
                    {section.score.toFixed(2)}/{section.weight}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {section.fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={field.key}>{field.label}</Label>
                    <div className="relative">
                      <Input
                        id={field.key}
                        type="number"
                        min="0"
                        max={field.max}
                        step={field.step || "1"}
                        value={field.value || ''}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        placeholder="Enter value"
                      />
                      {field.suffix && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500 text-sm">{field.suffix}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{field.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Show component-specific information */}
              {index === 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Alert className="mt-3">
                    <Users className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Academic Peer Assessment:</strong> This component evaluates institutional reputation among academic peers through surveys, ratings, and recognition within the academic community. Higher response rates and ratings indicate stronger academic standing.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {index === 1 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Alert className="mt-3">
                    <Building className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Employer Perception:</strong> This measures how industry and employers view the institution and its graduates. Strong employer ratings reflect the quality of education and graduate preparedness for professional roles.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {index === 2 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Alert className="mt-3">
                    <Star className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Stakeholder Feedback:</strong> Alumni satisfaction and external stakeholder perception provide insights into long-term institutional impact and relationship management with key constituencies.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {index === 3 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Alert className="mt-3">
                    <Eye className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Public Perception:</strong> Media visibility and public recognition contribute to institutional brand value and societal impact. This includes media coverage, public awards, and general reputation.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-orange-50 border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-900">Perception Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-600">{perceptionScores.academicPeerComponent.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Academic (40%)</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{perceptionScores.employerComponent.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Employer (35%)</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{perceptionScores.stakeholderComponent.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Stakeholder (15%)</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{perceptionScores.publicPerceptionComponent.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Public (10%)</div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-900">{perceptionScores.total.toFixed(2)}/100</div>
            <div className="text-sm text-gray-600">Total Perception Score</div>
            <div className="text-xs text-gray-500 mt-1">
              PR = Academic({perceptionScores.academicPeerComponent.toFixed(1)}) + Employer({perceptionScores.employerComponent.toFixed(1)}) + Stakeholder({perceptionScores.stakeholderComponent.toFixed(1)}) + Public({perceptionScores.publicPerceptionComponent.toFixed(1)})
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerceptionForm;