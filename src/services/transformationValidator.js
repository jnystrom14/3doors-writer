import { transformationGuidelines } from '../config/transformationGuidelines';

export const validateTransformation = (content) => {
  const results = {
    isValid: true,
    warnings: [],
    suggestions: [],
    sections: {}
  };

  // Check each section against guidelines
  Object.entries(transformationGuidelines.transformationStructure.sections)
    .forEach(([section, requirements]) => {
      const sectionContent = content[section] || '';
      const sectionResults = validateSection(section, sectionContent, requirements);
      results.sections[section] = sectionResults;
      
      if (!sectionResults.isValid) {
        results.isValid = false;
      }
      
      results.warnings.push(...sectionResults.warnings);
      results.suggestions.push(...sectionResults.suggestions);
    });

  // Check progression section length
  if (content.progression && content.progression.length) {
    const progressionLength = content.progression.length;
    const otherSectionsLength = Object.entries(content)
      .filter(([key]) => key !== 'progression')
      .reduce((sum, [_, text]) => sum + (text?.length || 0), 0);
    
    if (progressionLength <= otherSectionsLength / 3) {
      results.warnings.push("Progression section should be the longest section");
    }
  }

  return results;
};

const validateSection = (sectionName, content, requirements) => {
  const results = {
    isValid: true,
    warnings: [],
    suggestions: [],
    missingElements: []
  };

  requirements.required.forEach(requirement => {
    if (!content.toLowerCase().includes(requirement.toLowerCase())) {
      results.missingElements.push(requirement);
      results.warnings.push(`${sectionName}: Missing ${requirement}`);
      results.isValid = false;
    }
  });

  return results;
};
