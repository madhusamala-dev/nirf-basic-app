import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TLRForm from '../components/forms/TLRForm';
import ResearchForm from '../components/forms/ResearchForm';
import GraduationForm from '../components/forms/GraduationForm';
import OutreachForm from '../components/forms/OutreachForm';
import PerceptionForm from '../components/forms/PerceptionForm';
import ResultsDashboard from '../components/ResultsDashboard';

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('tlr');

  const renderContent = () => {
    switch (activeSection) {
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
      default:
        return <TLRForm />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;