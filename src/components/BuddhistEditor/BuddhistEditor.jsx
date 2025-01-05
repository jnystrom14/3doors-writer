import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Bold, Italic, List, Timer, Save,
  MessageSquare, RotateCcw, BookOpen
} from 'lucide-react';

const BuddhistEditor = ({ 
  content, 
  onChange, 
  onSave,
  autosaveService,
  transformationId 
}) => {
  const [isEditing, setIsEditing] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [meditationTimer, setMeditationTimer] = useState(null);
  const [showBuddhistTerms, setShowBuddhistTerms] = useState(false);

  const buddhistTerms = {
    'Three Doors': 'The doorways of body, speech, and mind',
    'Pain Identity': 'The limited sense of self associated with suffering',
    'Inner Refuge': 'The space of awareness and warmth within',
    'Precious Pills': 'Practices focusing on stillness, silence, and spaciousness',
  };

  useEffect(() => {
    if (content) {
      const words = content.trim().split(/\s+/).length;
      setWordCount(words);
    }
  }, [content]);

  const startMeditation = (minutes) => {
    if (meditationTimer) clearTimeout(meditationTimer);
    
    const timer = setTimeout(() => {
      const sound = new Audio('/meditation-bell.mp3');
      sound.play();
      setMeditationTimer(null);
    }, minutes * 60 * 1000);
    
    setMeditationTimer(timer);
  };

  const formatSelection = (type) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    let formattedText = selectedText;
    switch (type) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'list':
        formattedText = selectedText
          .split('\n')
          .map(line => `- ${line}`)
          .join('\n');
        break;
      default:
        break;
    }

    const newContent = 
      content.substring(0, range.startOffset) +
      formattedText +
      content.substring(range.endOffset);
    
    onChange(newContent);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-t border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => formatSelection('bold')}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => formatSelection('italic')}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => formatSelection('list')}
          title="List"
        >
          <List className="w-4 h-4" />
        </Button>
        <div className="h-6 w-px bg-gray-200 mx-2" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowBuddhistTerms(!showBuddhistTerms)}
          title="Buddhist Terms"
        >
          <BookOpen className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => startMeditation(15)}
          title="15-minute meditation timer"
        >
          <Timer className="w-4 h-4" />
        </Button>
        <div className="flex-grow" />
        <span className="text-sm text-gray-500">
          {wordCount} words
        </span>
      </div>

      {/* Editor */}
      <div className="min-h-[400px] relative">
        <textarea
          className="w-full h-full p-4 rounded border focus:ring-2 focus:ring-blue-500"
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Begin writing your transformation..."
        />

        {meditationTimer && (
          <div className="absolute top-2 right-2">
            <Alert className="bg-blue-50">
              <AlertDescription>
                Meditation timer active
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    clearTimeout(meditationTimer);
                    setMeditationTimer(null);
                  }}
                >
                  Cancel
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>

      {/* Buddhist Terms Panel */}
      {showBuddhistTerms && (
        <Card className="p-4">
          <h3 className="font-medium mb-2">Buddhist Terms</h3>
          <div className="space-y-2">
            {Object.entries(buddhistTerms).map(([term, definition]) => (
              <div key={term}>
                <span className="font-medium">{term}:</span> {definition}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Status Bar */}
      <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
        <div>
          Press Ctrl+S to save
        </div>
        <div>
          Auto-saving enabled
        </div>
      </div>
    </div>
  );
};

export default BuddhistEditor;
