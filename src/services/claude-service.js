const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

export class ClaudeService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async analyzeTransformation(transformation, originalStyle) {
    const systemPrompt = `You are assisting with a Buddhist transformation paper for The 3 Doors Academy. 
    The paper should follow this structure:
    1. Reflection: Describe reactivity experience and identify pain identity
    2. Select the Practice: Describe chosen practices and rationale
    3. Progression: Detail practice journey and shifts (longest section)
    4. Result: Describe transformative shifts and new qualities

    The writing should maintain this style: ${originalStyle}`;

    try {
      const response = await fetch(CLAUDE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-opus-20240229',
          max_tokens: 1024,
          messages: [{
            role: 'user',
            content: `Analyze this transformation paper and provide specific suggestions while maintaining 
            the author's voice and style. Focus on:
            1. Structure completeness
            2. Buddhist terminology accuracy
            3. Personal voice consistency
            4. Section development
            
            Paper content:
            ${JSON.stringify(transformation)}`
          }]
        })
      });

      const analysis = await response.json();
      return this.parseAnalysis(analysis);
    } catch (error) {
      console.error('Error analyzing transformation:', error);
      throw new Error('Failed to analyze transformation');
    }
  }

  parseAnalysis(analysis) {
    return {
      structure: {
        status: this.evaluateStatus(analysis.structure),
        suggestions: analysis.structure_suggestions || [],
        score: analysis.structure_score
      },
      buddhist_concepts: {
        status: this.evaluateStatus(analysis.buddhist_concepts),
        suggestions: analysis.concept_suggestions || [],
        terms_to_clarify: analysis.terms_to_clarify || []
      },
      style: {
        status: this.evaluateStatus(analysis.style),
        suggestions: analysis.style_suggestions || [],
        voice_consistency: analysis.voice_consistency
      },
      sections: {
        reflection: this.evaluateStatus(analysis.sections.reflection),
        practice: this.evaluateStatus(analysis.sections.practice),
        progression: this.evaluateStatus(analysis.sections.progression),
        result: this.evaluateStatus(analysis.sections.result)
      }
    };
  }

  evaluateStatus(score) {
    if (score >= 0.9) return 'excellent';
    if (score >= 0.7) return 'good';
    return 'needs_improvement';
  }
}
