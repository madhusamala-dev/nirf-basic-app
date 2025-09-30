import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, BookOpen } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ResearchForm: React.FC = () => {
  const { data, scores, updateResearch } = useData();
  const { research } = data;
  const researchScores = scores.research;

  const handleInputChange = (field: keyof typeof research, value: string) => {
    const numValue = parseFloat(value) || 0;
    updateResearch({ [field]: numValue });
  };

  const sections = [
    {
      title: 'Publications (PU)',
      description: 'Combined metric for publications from third-party sources',
      maxMarks: 35,
      score: researchScores.pu,
      fields: [
        { 
          key: 'totalWeightedPublications' as const, 
          label: 'Total Weighted Publications (P)', 
          value: research.totalWeightedPublications,
          description: 'Weighted number of publications as ascertained from suitable third-party sources (Scopus, Web of Science, etc.)'
        },
        { 
          key: 'retractedPublications' as const, 
          label: 'Retracted Publications (Pret)', 
          value: research.retractedPublications,
          description: 'Number of publications that have been retracted from journals'
        }
      ]
    },
    {
      title: 'Quality of Publications (QP)',
      description: 'Quality assessment of research publications',
      maxMarks: 40,
      score: researchScores.qp,
      fields: [
        { 
          key: 'qualityPublications' as const, 
          label: 'Quality Publications Score', 
          value: research.qualityPublications,
          description: 'Quality metrics for publications (to be implemented with specific NIRF formula)'
        }
      ]
    },
    {
      title: 'IPR and Patents (IPR)',
      description: 'Intellectual Property Rights and Patents',
      maxMarks: 15,
      score: researchScores.ipr,
      fields: [
        { 
          key: 'patentsPublished' as const, 
          label: 'Patents Published', 
          value: research.patentsPublished,
          description: 'Number of patents published'
        },
        { 
          key: 'patentsGranted' as const, 
          label: 'Patents Granted', 
          value: research.patentsGranted,
          description: 'Number of patents granted'
        }
      ]
    },
    {
      title: 'Footprint of Projects and Professional Practice (FPPP)',
      description: 'Projects and professional practice impact',
      maxMarks: 10,
      score: researchScores.fppp,
      fields: [
        { 
          key: 'projectsFootprint' as const, 
          label: 'Projects Footprint', 
          value: research.projectsFootprint,
          description: 'Impact and footprint of research projects'
        },
        { 
          key: 'professionalPractice' as const, 
          label: 'Professional Practice Score', 
          value: research.professionalPractice,
          description: 'Professional practice and industry engagement metrics'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Research & Professional Practice</h1>
          <p className="text-gray-600 mt-1">Maximum Marks: 100 | Weight: 30%</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{researchScores.total}/100</div>
          <div className="text-sm text-gray-500">Current Score</div>
        </div>
      </div>

      <div className="grid gap-6">
        {sections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
                <div className="text-right">
                  <Badge variant={section.score > section.maxMarks * 0.7 ? "default" : "secondary"}>
                    {section.score.toFixed(2)}/{section.maxMarks}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {section.fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={field.key}>{field.label}</Label>
                    <Input
                      id={field.key}
                      type="number"
                      min="0"
                      step="1"
                      value={field.value || ''}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      placeholder="Enter value"
                    />
                    <p className="text-xs text-gray-500">{field.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Show PU calculation breakdown */}
              {index === 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-sm mb-3">Publications (PU) Assessment:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-medium">Publication Ratio (P/FRQ)</div>
                      <div className="text-blue-600 font-bold">{researchScores.puBreakdown.publicationRatio.toFixed(2)}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Publications per faculty requirement
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="font-medium">Faculty Requirement Quotient (FRQ)</div>
                      <div className="text-green-600 font-bold">{researchScores.puBreakdown.frq.toFixed(2)}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Max of (1:15 ratio faculty OR available faculty)
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded mb-3">
                    <div className="font-medium text-sm mb-2">PU Score Breakdown:</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-medium">Publication Component:</span> {(35 * researchScores.puBreakdown.fPublicationRatio).toFixed(2)} marks
                      </div>
                      <div>
                        <span className="font-medium">Retraction Penalty:</span> -{(5 * researchScores.puBreakdown.fRetracted).toFixed(2)} marks
                      </div>
                    </div>
                  </div>
                  
                  <Alert className="mt-3">
                    <BookOpen className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Third-party Sources:</strong> Publications must be verified through reputable databases like Scopus, Web of Science, PubMed, etc. Weighted scoring considers journal impact and citation metrics.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Show placeholder information for other components */}
              {index > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Implementation Note:</strong> This component uses placeholder calculations. Specific NIRF formulas will be implemented based on official guidelines.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900">Research & Professional Practice Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{researchScores.pu.toFixed(1)}</div>
              <div className="text-sm text-gray-600">PU Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{researchScores.qp.toFixed(1)}</div>
              <div className="text-sm text-gray-600">QP Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{researchScores.ipr.toFixed(1)}</div>
              <div className="text-sm text-gray-600">IPR Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{researchScores.fppp.toFixed(1)}</div>
              <div className="text-sm text-gray-600">FPPP Score</div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-center">
            <div className="text-3xl font-bold text-green-900">{researchScores.total.toFixed(2)}/100</div>
            <div className="text-sm text-gray-600">Total Research Score</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchForm;