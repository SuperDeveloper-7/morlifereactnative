import { Audio } from 'expo-av';

const CONTENT_AUDIO = 'CONTENT_AUDIO';

export default class ContentManager {
  static content = {};

  static async getContentObj(content) {
    if (content.content_schedule.delivery_type === 'deliver_always') {
      if (content.always.content_type === 'content_audio') {
        const sound = new Audio.Sound();
        await sound.loadAsync({ uri: content.always.audio_url });
        return {
          contentType: CONTENT_AUDIO,
          sound,
        };
      }
    }
    return null;
  }

  static async loadRoutineContent(routineId, content) {
    const obj = await ContentManager.getContentObj(content);
    ContentManager.content[routineId] = obj;
  }

  static async preload(routinesContent) {
    Object.entries(routinesContent || {}).forEach(([routineId, content]) => {
      if (ContentManager.content[routineId]) {
        return;
      }
      ContentManager.loadRoutineContent(routineId, content);
    });
  }

  static deliver(routineId) {
    const content = ContentManager.content[routineId];
    if (!content) {
      return;
    }
    if (content.contentType === CONTENT_AUDIO) {
      content.sound.replayAsync();
    }
  }
}
