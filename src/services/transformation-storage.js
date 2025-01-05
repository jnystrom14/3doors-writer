const STORAGE_KEY = '3doors_transformations';
const DRAFTS_KEY = '3doors_drafts';

export const TransformationService = {
  saveTransformation: (transformation) => {
    const transformations = TransformationService.getAllTransformations();
    const newTransformation = {
      ...transformation,
      id: Date.now().toString(),
      lastModified: new Date().toISOString(),
    };
    
    transformations.push(newTransformation);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transformations));
    return newTransformation;
  },

  getAllTransformations: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  getTransformationsByCategory: (category) => {
    const all = TransformationService.getAllTransformations();
    return all.filter(t => t.category === category);
  },

  saveDraft: (draft) => {
    const drafts = TransformationService.getAllDrafts();
    const newDraft = {
      ...draft,
      id: draft.id || Date.now().toString(),
      lastModified: new Date().toISOString(),
    };

    const existingIndex = drafts.findIndex(d => d.id === newDraft.id);
    if (existingIndex >= 0) {
      drafts[existingIndex] = newDraft;
    } else {
      drafts.push(newDraft);
    }

    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    return newDraft;
  },

  getAllDrafts: () => {
    const stored = localStorage.getItem(DRAFTS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  getDraftById: (id) => {
    const drafts = TransformationService.getAllDrafts();
    return drafts.find(d => d.id === id);
  },

  deleteDraft: (id) => {
    const drafts = TransformationService.getAllDrafts();
    const filtered = drafts.filter(d => d.id !== id);
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(filtered));
  }
};
