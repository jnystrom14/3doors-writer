import { transformationRequirements, sampleVoice } from '../config/transformationRequirements';

export const buildAnalysisPrompt = (originalContent) => {
  return `
As an AI assistant for The 3 Doors Academy transformation papers, analyze and enhance this content while strictly following these requirements:

VOICE AND STYLE MATCH:
${transformationRequirements.voiceGuidelines.tone.map(g => '- ' + g).join('\n')}

STRUCTURAL REQUIREMENTS:
${Object.entries(transformationRequirements.structureRequirements)
  .map(([section, reqs]) => `${section.toUpperCase()}:
${reqs.elements.map(e => '- ' + e).join('\n')}
Length: ${reqs.length}`).join('\n\n')}

BUDDHIST CONCEPT INTEGRATION:
${transformationRequirements.buddhistConcepts.integration.map(i => '- ' + i).join('\n')}

AUTHENTICITY REQUIREMENTS:
${transformationRequirements.authenticityGuidelines.map(g => '- ' + g).join('\n')}

SAMPLE VOICE TO MATCH:
${sampleVoice}

ORIGINAL CONTENT TO ENHANCE:
${originalContent}

Provide a complete enhanced version that:
1. Maintains the author's authentic voice and experiences
2. Deepens the integration of Buddhist concepts
3. Ensures all structural requirements are met
4. Enhances rather than replaces the original insights
`;
};
