// ... (previous imports)
import { StyleMatchingService } from '../../services/styleMatchingService';
import { buildStyleMatchingPrompt } from '../../services/promptEnhancer';

const styleService = new StyleMatchingService();

const AIEnhancementPanel = ({ transformationContent, onApplyChanges }) => {
  // ... (previous state declarations)
  const [styleAnalysis, setStyleAnalysis] = useState(null);

  const analyzeContent = async () => {
    setIsAnalyzing(true);
    try {
      // Analyze style matching
      const styleResults = styleService.analyzeStyle(transformationContent);
      setStyleAnalysis(styleResults);

      // Build enhanced content using style-matched prompts
      const enhancedContent = {
        reflection: await enhanceSection('reflection', transformationContent.reflection),
        practice: await enhanceSection('practice', transformationContent.practice),
        progression: await enhanceSection('progression', transformationContent.progression),
        result: await enhanceSection('result', transformationContent.result)
      };

      setEnhancedVersion(enhancedContent);
      
      // Update suggestions based on style analysis
      setSuggestions({
        structure: {
          status: styleResults.matches.structure.matchesStyle ? 'success' : 'suggestion',
          message: styleResults.matches.structure.matchesStyle ? 'Structure matches style' : 'Structure needs adjustment',
          details: styleResults.suggestions.filter(s => s.includes('structure'))
        },
        style: {
          status: styleResults.matches.tone.matchesStyle ? 'success' : 'suggestion',
          message: styleResults.matches.tone.matchesStyle ? 'Tone matches style' : 'Tone needs adjustment',
          details: styleResults.suggestions.filter(s => s.includes('tone'))
        },
        buddhist: {
          status: styleResults.matches.buddhistConcepts.matchesStyle ? 'success' : 'suggestion',
          message: styleResults.matches.buddhistConcepts.matchesStyle ? 'Buddhist concepts well integrated' : 'Adjust Buddhist concept integration',
          details: styleResults.suggestions.filter(s => s.includes('Buddhist'))
        }
      });
    } catch (error) {
      console.error('Error analyzing content:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const enhanceSection = async (section, content) => {
    const prompt = buildStyleMatchingPrompt(section, content);
    // In a real implementation, this would call the Claude API
    // For now, we'll return a mock enhancement
    return content; // Replace with actual API call
  };

  // ... (rest of the component)
};

export default AIEnhancementPanel;
