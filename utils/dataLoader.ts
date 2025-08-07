import { ProfileRepository, type AppData, type Profile, type BadgeType, type AchievementType, type Achievement } from '../src/repositories/ProfileRepository';

const profileRepository = new ProfileRepository();

export { type BadgeType, type AchievementType, type Achievement, type Profile, type AppData };

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
