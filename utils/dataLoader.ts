import { ProfileRepository, type Achievement, type AchievementDetails, type AchievementType, type AppData, type BadgeType, type Championship, type Diploma, type Performance, type Profile, type Project, type Publication, type YouTubeChannel } from '../src/repositories/ProfileRepository';

const profileRepository = new ProfileRepository();

export { type Achievement, type AchievementDetails, type AchievementType, type AppData, type BadgeType, type Championship, type Diploma, type Performance, type Profile, type Project, type Publication, type YouTubeChannel };

export const loadAppData = async (): Promise<AppData> => {
  try {
    const data = await profileRepository.fetchAppData();
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error loading YAML data:', error);
  }
  
  // Return fallback data if loading fails
  return {
    grade_fetching_methods: [],
    profiles: [],
    achievement_badges: {
      economy: 'star',
      sports: 'trophy',
      gardening: 'leaf',
      marketing: 'fire',
      arts: 'gem',
    },
  };
};
