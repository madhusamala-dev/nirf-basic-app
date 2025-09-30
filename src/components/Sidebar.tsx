import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  BookOpen, 
  Search, 
  GraduationCap, 
  Users, 
  Eye, 
  BarChart3,
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { college, logout } = useAuth();
  const { getCompletionStatus } = useData();
  const completionStatus = getCompletionStatus();

  const sections = [
    {
      id: 'tlr',
      name: 'Teaching, Learning & Resources',
      icon: BookOpen,
      weight: '30%',
      completed: completionStatus.tlr
    },
    {
      id: 'research',
      name: 'Research & Professional Practice',
      icon: Search,
      weight: '30%',
      completed: completionStatus.research
    },
    {
      id: 'graduation',
      name: 'Graduation Outcomes',
      icon: GraduationCap,
      weight: '20%',
      completed: completionStatus.graduation
    },
    {
      id: 'outreach',
      name: 'Outreach & Inclusivity',
      icon: Users,
      weight: '10%',
      completed: completionStatus.outreach
    },
    {
      id: 'perception',
      name: 'Perception',
      icon: Eye,
      weight: '10%',
      completed: completionStatus.perception
    },
    {
      id: 'results',
      name: 'Results Dashboard',
      icon: BarChart3,
      weight: '',
      completed: true
    }
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">NIRF Portal</h2>
        <p className="text-sm text-gray-600 mt-1">{college?.name}</p>
        <Badge variant="secondary" className="mt-2 capitalize">
          {college?.category}
        </Badge>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <Button
              key={section.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-auto p-3 text-left",
                isActive && "bg-blue-600 text-white"
              )}
              onClick={() => onSectionChange(section.id)}
            >
              <div className="flex items-start space-x-3 w-full">
                <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm leading-tight">
                    {section.name}
                  </div>
                  {section.weight && (
                    <div className="text-xs opacity-75 mt-1">
                      Weight: {section.weight}
                    </div>
                  )}
                </div>
                {section.completed && section.id !== 'results' && (
                  <div className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0 mt-2" />
                )}
              </div>
            </Button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;