import yaml from 'js-yaml';

export type BadgeType = 'star' | 'trophy' | 'leaf' | 'fire' | 'gem';
export type AchievementType = 'economy' | 'sports' | 'gardening' | 'marketing' | 'arts';

export interface Profile {
  id: string;
  name: string;
  image: string;
  achievements: AchievementType[];
}

export interface AppData {
  profiles: Profile[];
  achievement_badges: Record<AchievementType, BadgeType>;
}

// In a real app, you might load this from an API or local storage
// For now, we'll embed the YAML content as a string and parse it
const yamlData = `
profiles:
  - id: '1'
    name: 'Sophia Chen'
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
    achievements:
      - economy
      - sports
      - gardening
      - marketing
      - arts

  - id: '2'
    name: 'Liam Zhang'
    image: 'https://randomuser.me/api/portraits/men/33.jpg'
    achievements:
      - economy
      - marketing
      - gardening

  - id: '3'
    name: 'Ava Kumar'
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
    achievements:
      - sports
      - arts
      - marketing
      - gardening

achievement_badges:
  economy: star
  sports: trophy
  gardening: leaf
  marketing: fire
  arts: gem
`;

export const loadAppData = (): AppData => {
  try {
    const data = yaml.load(yamlData) as AppData;
    return data;
  } catch (error) {
    console.error('Error loading YAML data:', error);
    // Return fallback data
    return {
      profiles: [],
      achievement_badges: {
        economy: 'star',
        sports: 'trophy',
        gardening: 'leaf',
        marketing: 'fire',
        arts: 'gem',
      },
    };
  }
};
