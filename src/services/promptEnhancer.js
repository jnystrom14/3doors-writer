import { sampleTransformation } from '../config/sampleTransformation';

export const buildStyleMatchingPrompt = (section, content) => {
  return `Enhance this ${section} while matching this exact writing style:

STYLE CHARACTERISTICS:
${sampleTransformation.styleCharacteristics[section]}

VOICE EXAMPLE:
${sampleTransformation[section]}

CONTENT TO ENHANCE:
${content}

Requirements:
1. Maintain the personal, direct tone of the original
2. Use similar sentence structures and transitions
3. Integrate Buddhist concepts as naturally as the example
4. Keep the same balance of narrative and reflection
5. Match the paragraph length and structure
6. Use similar emphasis patterns (em dashes, direct quotes)

Enhance the content while preserving these exact characteristics.`;
};
