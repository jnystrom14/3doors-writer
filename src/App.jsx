import React, { useState, useEffect } from 'react';
import TransformationDashboard from './components/TransformationDashboard/TransformationDashboard';
import TransformationWriter from './components/TransformationWriter/TransformationWriter';
import AIEnhancementPanel from './components/AIEnhancement/AIEnhancement';
import BuddhistEditor from './components/BuddhistEditor/BuddhistEditor';
import { ClaudeService } from './services/claude-service';
import { AutosaveService } from './services/autosave-service';
import { TransformationService } from './services/transformation-storage';
import { PDFExportService } from './services/pdf-export';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentTransformation, setCurrentTransformation] = useState({
    reflection: '',
    practice: '',
    progression: '',
    result: ''
  });

  console.log('Current transformation:', currentTransformation); // Add this for debugging

  const handleNewTransformation = () => {
    setCurrentTransformation({
      id: Date.now().toString(),
      name: '',
      category: '',
      number: '',
      date: new Date().toISOString().split('T')[0],
      reflection: '',
      practice: '',
      progression: '',
      result: ''
    });
    setCurrentView('writer');
  };

  const handleAIEnhancement = (enhancedContent) => {
    console.log('Enhanced content received:', enhancedContent); // Add this for debugging
    setCurrentTransformation(prev => ({
      ...prev,
      ...enhancedContent
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'dashboard' ? (
        <TransformationDashboard
          onNewTransformation={handleNewTransformation}
          onEditTransformation={(id) => {
            const transformation = TransformationService.getDraftById(id);
            if (transformation) {
              setCurrentTransformation(transformation);
              setCurrentView('writer');
            }
          }}
        />
      ) : (
        <div className="max-w-7xl mx-auto p-4 space-y-6">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="mb-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            ← Back to Dashboard
          </button>
          
          <TransformationWriter
            transformation={currentTransformation}
            onChange={(updatedTransformation) => {
              console.log('Writer update:', updatedTransformation); // Add this for debugging
              setCurrentTransformation(updatedTransformation);
            }}
          />

          <AIEnhancementPanel
            transformationContent={currentTransformation}
            onApplyChanges={handleAIEnhancement}
          />
        </div>
      )}
    </div>
  );
}

export default App;
