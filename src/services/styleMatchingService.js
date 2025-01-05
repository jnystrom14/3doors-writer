import { sampleTransformation } from '../config/sampleTransformation';

export class StyleMatchingService {
  analyzeStyle(text) {
    const styleMatches = {
      tone: this.analyzeTone(text),
      structure: this.analyzeStructure(text),
      buddhistConcepts: this.analyzeBuddhistConcepts(text),
      writingPatterns: this.analyzeWritingPatterns(text)
    };

    return {
      matches: styleMatches,
      suggestions: this.generateStyleSuggestions(styleMatches)
    };
  }

  analyzeTone(text) {
    const toneMarkers = {
      personal: text.includes('I') && text.includes('my'),
      professional: /role|work|employee|supervisor/.test(text),
      emotional: /felt|feeling|emotions|react/.test(text),
      concrete: /moment|situation|morning|days/.test(text)
    };

    return {
      matchesStyle: Object.values(toneMarkers).filter(Boolean).length >= 3,
      details: toneMarkers
    };
  }

  analyzeStructure(text) {
    const structureMarkers = {
      chronological: /recently|after|following|since/.test(text),
      sceneSetting: /when|where|during|while/.test(text),
      paragraphFlow: text.split('\n\n').length > 1,
      narrativeBalance: /[.]\s[A-Z]/.test(text)
    };

    return {
      matchesStyle: Object.values(structureMarkers).filter(Boolean).length >= 3,
      details: structureMarkers
    };
  }

  analyzeBuddhistConcepts(text) {
    const conceptMarkers = {
      practiceTerms: /refuge|meditation|practice|spaciousness|silence/.test(text),
      naturalIntegration: /taking refuge|mindset|awareness/.test(text),
      applicationDescription: /formal|informal|on the mat|off the mat/.test(text)
    };

    return {
      matchesStyle: Object.values(conceptMarkers).filter(Boolean).length >= 2,
      details: conceptMarkers
    };
  }

  analyzeWritingPatterns(text) {
    const patternMarkers = {
      usesDashes: /—/.test(text),
      usesQuotes: /"[^"]*"/.test(text),
      narrativeTension: /but|however|though|yet/.test(text),
      personalInsight: /realize|recognize|reflect|understand/.test(text)
    };

    return {
      matchesStyle: Object.values(patternMarkers).filter(Boolean).length >= 3,
      details: patternMarkers
    };
  }

  generateStyleSuggestions(styleMatches) {
    const suggestions = [];

    if (!styleMatches.tone.matchesStyle) {
      suggestions.push("Consider adding more personal pronouns and concrete examples from your experience");
    }
    if (!styleMatches.structure.matchesStyle) {
      suggestions.push("Try organizing the content chronologically with clear scene-setting");
    }
    if (!styleMatches.buddhistConcepts.matchesStyle) {
      suggestions.push("Integrate Buddhist terms more naturally within your personal experience");
    }
    if (!styleMatches.writingPatterns.matchesStyle) {
      suggestions.push("Include more direct quotes and em dashes for emphasis where appropriate");
    }

    return suggestions;
  }
}
