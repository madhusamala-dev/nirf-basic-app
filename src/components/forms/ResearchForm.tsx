import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, BookOpen, Award, Briefcase, TrendingUp } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ResearchForm: React.FC = () => {
  const { data, scores, updateResearch } = useData();
  const { research } = data;
  const researchScores = scores.research;

  const handleInputChange = (field: keyof typeof research, value: string) => {
    const numValue = parseFloat(value) || 0;
    updateResearch({ [field]: numValue });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const sections = [
    {
      title: 'Publications (PU)',
      description: 'Combined metric for publications from third-party sources',
      maxMarks: 35,
      score: researchScores.pu,
      icon: BookOpen,
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
      description: 'Citation metrics and publication quality assessment',
      maxMarks: 40,
      score: researchScores.qp,
      icon: Award,
      fields: [
        { 
          key: 'totalCitationCount' as const, 
          label: 'Total Citation Count (CC)', 
          value: research.totalCitationCount,
          description: 'Total citation count over the previous three years'
        },
        { 
          key: 'top25PercentileCitations' as const, 
          label: 'Top 25 Percentile Citations (TOP25P)', 
          value: research.top25PercentileCitations,
          description: 'Number of citations in the top 25 percentile averaged over the previous three years'
        },
        { 
          key: 'retractedCitations' as const, 
          label: 'Retracted Citations (Cret)', 
          value: research.retractedCitations,
          description: 'Total retracted citations count over the previous three years'
        }
      ]
    },
    {
      title: 'IPR and Patents (IPR)',
      description: 'Intellectual Property Rights and Patents',
      maxMarks: 15,
      score: researchScores.ipr,
      icon: TrendingUp,
      fields: [
        { 
          key: 'patentsGranted' as const, 
          label: 'Patents Granted (PG)', 
          value: research.patentsGranted,
          description: 'Number of patents granted over the previous three years'
        },
        { 
          key: 'patentsPublished' as const, 
          label: 'Patents Published (PP)', 
          value: research.patentsPublished,
          description: 'Number of patents published over the previous three years'
        }
      ]
    },
    {
      title: 'Footprint of Projects and Professional Practice (FPPP)',
      description: 'Research funding and consultancy impact',
      maxMarks: 10,
      score: researchScores.fppp,
      icon: Briefcase,
      fields: [
        { 
          key: 'averageResearchFundingPerFaculty' as const, 
          label: 'Average Research Funding per Faculty (RF) - ₹', 
          value: research.averageResearchFundingPerFaculty,
          description: 'Average annual research funding earnings (amount actually received) per faculty over the previous three years'
        },
        { 
          key: 'averageConsultancyPerFaculty' as const, 
          label: 'Average Consultancy per Faculty (CF) - ₹', 
          value: research.averageConsultancyPerFaculty,
          description: 'Average annual consultancy amount (amount actually received) per faculty over the previous three years'
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
                <div className="flex items-center gap-3">
                  <section.icon className="h-6 w-6 text-gray-600" />
                  <div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
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
                      step={field.key.includes('Funding') || field.key.includes('Consultancy') ? "1000" : "1"}
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
                  
                  <Alert className="mt-3">
                    <BookOpen className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Third-party Sources:</strong> Publications must be verified through reputable databases like Scopus, Web of Science, PubMed, etc. Weighted scoring considers journal impact and citation metrics.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Show QP calculation breakdown */}
              {index === 1 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-sm mb-3">Quality of Publications (QP) Assessment:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-medium">Citation Ratio (CC/FRQ)</div>
                      <div className="text-blue-600 font-bold">{researchScores.qpBreakdown.citationRatio.toFixed(2)}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Citations per faculty requirement
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="font-medium">Top 25% Ratio (TOP25P/P)</div>
                      <div className="text-green-600 font-bold">{researchScores.qpBreakdown.top25Ratio.toFixed(3)}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        High-impact citation ratio
                      </div>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <div className="font-medium">Retracted Citations</div>
                      <div className="text-red-600 font-bold">{researchScores.qpBreakdown.cret}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Penalty component
                      </div>
                    </div>
                  </div>
                  
                  <Alert className="mt-3">
                    <Award className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Quality Metrics:</strong> Top 25 percentile citations indicate high-impact research. Citation counts should reflect actual impact over the previous three years.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Show IPR calculation breakdown */}
              {index === 2 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-sm mb-3">IPR and Patents Assessment:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-medium">IPG Component</div>
                      <div className="text-blue-600 font-bold">{researchScores.iprBreakdown.ipg.toFixed(2)}/10</div>
                      <div className="text-xs text-gray-500 mt-1">
                        10 × f(Patents Granted)
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="font-medium">IPP Component</div>
                      <div className="text-green-600 font-bold">{researchScores.iprBreakdown.ipp.toFixed(2)}/5</div>
                      <div className="text-xs text-gray-500 mt-1">
                        5 × f(Patents Published)
                      </div>
                    </div>
                  </div>
                  
                  <Alert className="mt-3">
                    <TrendingUp className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Patent Assessment:</strong> Granted patents carry higher weight than published patents. Include only patents from the previous three years.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Show FPPP calculation breakdown */}
              {index === 3 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-sm mb-3">Projects and Professional Practice Assessment:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-medium">Research Funding (FPR)</div>
                      <div className="text-blue-600 font-bold">{researchScores.fpppBreakdown.fpr.toFixed(2)}/7.5</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatCurrency(researchScores.fpppBreakdown.rf)} per faculty
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="font-medium">Consultancy (FPC)</div>
                      <div className="text-green-600 font-bold">{researchScores.fpppBreakdown.fpc.toFixed(2)}/2.5</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatCurrency(researchScores.fpppBreakdown.cf)} per faculty
                      </div>
                    </div>
                  </div>
                  
                  <Alert className="mt-3">
                    <Briefcase className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Funding Metrics:</strong> Include only amounts actually received (not sanctioned). Research funding carries higher weight than consultancy in the FPPP calculation.
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
            <div className="text-xs text-gray-500 mt-1">
              RP = PU({researchScores.pu.toFixed(1)}) + QP({researchScores.qp.toFixed(1)}) + IPR({researchScores.ipr.toFixed(1)}) + FPPP({researchScores.fppp.toFixed(1)})
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchForm;