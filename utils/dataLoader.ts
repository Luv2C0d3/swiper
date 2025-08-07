import yaml from 'js-yaml';

export type BadgeType = 'star' | 'trophy' | 'leaf' | 'fire' | 'gem';
export type AchievementType = 'economy' | 'sports' | 'gardening' | 'marketing' | 'arts';

export interface GradeFetchingMethod {
  name: AchievementType;
  method: string;
  args: string[];
}

export interface Achievement {
  name: AchievementType;
  grade?: number;
  description: string;
}

export interface Profile {
  id: string;
  name: string;
  image: string;
  achievements: Achievement[];
}

export interface AppData {
  grade_fetching_methods: GradeFetchingMethod[];
  profiles: Profile[];
  achievement_badges: Record<AchievementType, BadgeType>;
}

// In a real app, you might load this from an API or local storage
// For now, we'll embed the YAML content as a string and parse it
const yamlData = `
grade_fetching_methods:
  - name: economy
    method: fetchEconomyGrade
    args:
      - id
  - name: sports
    method: fetchSportsGrade
    args:
      - id
  - name: gardening
    method: fetchGardeningGrade
    args:
      - id
  - name: marketing
    method: fetchMarketingGrade
    args:
      - id
  - name: arts
    method: fetchArtsGrade
    args:
      - id

profiles:
  - id: '1'
    name: 'Sophia Chen'
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
    achievements:
      - name: economy
        grade: 7
        description: >
          Sophia has demonstrated exceptional skills in financial management and economic analysis.
          She has successfully managed multiple investment portfolios and provided strategic
          financial guidance to startups.
      - name: sports
        grade: 8
        description: >
          Sophia is an accomplished athlete who has competed at regional level in swimming.
          She maintains an active lifestyle and enjoys coaching youth sports teams.
      - name: gardening
        grade: 6
        description: >
          Sophia has a green thumb and maintains a beautiful organic garden. She grows
          her own vegetables and herbs, and shares her knowledge with the community.
      - name: marketing
        grade: 9
        description: >
          Sophia has led successful marketing campaigns for several companies, increasing
          brand awareness and driving significant revenue growth through innovative strategies.
      - name: arts
        grade: 7
        description: >
          Sophia is a talented painter and photographer. Her work has been featured
          in local galleries and she regularly participates in community art events.

  - id: '2'
    name: 'Liam Zhang'
    image: 'https://randomuser.me/api/portraits/men/33.jpg'
    achievements:
      - name: economy
        grade: 8
        description: >
          Liam has a strong background in economics and has worked as a financial analyst
          for major corporations, specializing in market trends and investment strategies.
      - name: marketing
        grade: 9
        description: >
          Liam excels in digital marketing and has helped numerous businesses increase
          their online presence and customer engagement through data-driven campaigns.
      - name: gardening
        grade: 5
        description: >
          Liam enjoys urban gardening and has transformed his apartment balcony into
          a thriving mini-garden with herbs, flowers, and small vegetables.

  - id: '3'
    name: 'Ava Kumar'
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
    achievements:
      - name: sports
        grade: 9
        description: >
          Ava is a dedicated runner and yoga instructor. She has completed multiple
          marathons and helps others achieve their fitness goals through personalized training.
      - name: arts
        grade: 8
        description: >
          Ava is a skilled musician who plays multiple instruments and composes her own music.
          She performs regularly at local venues and teaches music to children.
      - name: marketing
        grade: 7
        description: >
          Ava specializes in social media marketing and content creation. She has built
          strong online communities and helped brands connect authentically with their audiences.
      - name: gardening
        grade: 6
        description: >
          Ava practices sustainable gardening techniques and focuses on native plants
          that support local ecosystems and wildlife.

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
  }
};
