export class AutosaveService {
  constructor() {
    this.AUTOSAVE_KEY = '3doors_autosave';
    this.VERSION_KEY = '3doors_versions';
    this.AUTOSAVE_INTERVAL = 30000;
  }

  initAutosave(transformationId, onSave) {
    let timer = null;
    let lastContent = null;

    const save = async (content) => {
      if (JSON.stringify(content) === JSON.stringify(lastContent)) {
        return;
      }

      try {
        await this.saveVersion(transformationId, content);
        lastContent = content;
        if (onSave) onSave(true);
      } catch (error) {
        console.error('Autosave failed:', error);
        if (onSave) onSave(false);
      }
    };

    const startTimer = (content) => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => save(content), this.AUTOSAVE_INTERVAL);
    };

    const stopTimer = () => {
      if (timer) clearInterval(timer);
    };

    return {
      startTimer,
      stopTimer,
      saveNow: save
    };
  }

  async saveVersion(transformationId, content) {
    const timestamp = new Date().toISOString();
    const version = {
      id: `${transformationId}_${timestamp}`,
      transformationId,
      content,
      timestamp
    };

    const versions = await this.getVersions(transformationId);
    versions.push(version);

    if (versions.length > 10) {
      versions.shift();
    }

    localStorage.setItem(
      `${this.VERSION_KEY}_${transformationId}`,
      JSON.stringify(versions)
    );

    localStorage.setItem(
      `${this.AUTOSAVE_KEY}_${transformationId}`,
      JSON.stringify({
        content,
        timestamp
      })
    );

    return version;
  }

  async getVersions(transformationId) {
    const versionsJson = localStorage.getItem(`${this.VERSION_KEY}_${transformationId}`);
    return versionsJson ? JSON.parse(versionsJson) : [];
  }

  async getLatestAutosave(transformationId) {
    const autosaveJson = localStorage.getItem(`${this.AUTOSAVE_KEY}_${transformationId}`);
    return autosaveJson ? JSON.parse(autosaveJson) : null;
  }

  async hasUnsavedDraft(transformationId) {
    const autosave = await this.getLatestAutosave(transformationId);
    if (!autosave) return false;

    const versions = await this.getVersions(transformationId);
    const latestVersion = versions[versions.length - 1];

    return !latestVersion || 
           autosave.timestamp > latestVersion.timestamp;
  }

  async clearAutosave(transformationId) {
    localStorage.removeItem(`${this.AUTOSAVE_KEY}_${transformationId}`);
  }
}
