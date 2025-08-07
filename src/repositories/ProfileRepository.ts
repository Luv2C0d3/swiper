import { Asset } from 'expo-asset';
import yaml from 'js-yaml';

export type BadgeType = 'star' | 'trophy' | 'leaf' | 'fire' | 'gem';
export type AchievementType = 'economy' | 'sports' | 'gardening' | 'marketing' | 'arts';

export interface GradeFetchingMethod {
  name: AchievementType;
  method: string;
  args: string[];
}

export interface Diploma {
  diploma: boolean;
  institution: string;
  year: number;
  degree: string;
  major: string;
  gpa: number;
  honors?: string;
  awards?: string;
}

export interface Publication {
  title: string;
  journal: string;
  year: number;
  volume: number;
  issue: number;
  pages: string;
}

export interface YouTubeChannel {
  name: string;
  url: string;
  description: string;
}

export interface Championship {
  name: string;
  year: number;
  position: string;
  description: string;
}

export interface Project {
  name: string;
  year: number;
  description: string;
}

export interface Performance {
  name: string;
  year: number;
  description: string;
}

export interface AchievementDetails {
  diploma?: Diploma[];
  postgraduate?: Diploma[];
  publications?: Publication[];
  youtube_channel?: YouTubeChannel[];
  championships?: Championship[];
  projects?: Project[];
  performances?: Performance[];
}

export interface Achievement {
  name: AchievementType;
  grade?: number;
  description: string;
  details?: AchievementDetails;
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

export class ProfileRepository {
  async fetchAppData(): Promise<AppData | null> {
    try {
      // Load the YAML file from assets
      const asset = Asset.fromModule(require('../../assets/data/profiles.yaml'));
      await asset.downloadAsync();
      
      const response = await fetch(asset.uri);
      const yamlText = await response.text();
      
      const parsed = yaml.load(yamlText) as AppData;
      return parsed;
    } catch (err) {
      console.error('Error reading YAML data:', err);
      return null;
    }
  }

  async fetchAllProfiles(): Promise<Profile[]> {
    try {
      const data = await this.fetchAppData();
      return data?.profiles || [];
    } catch (err) {
      console.error('Error reading YAML data:', err);
      return [];
    }
  }

  async fetchGradeFetchingMethods(): Promise<GradeFetchingMethod[]> {
    try {
      const data = await this.fetchAppData();
      return data?.grade_fetching_methods || [];
    } catch (err) {
      console.error('Error reading YAML data:', err);
      return [];
    }
  }

  async fetchAchievementBadges(): Promise<Record<AchievementType, BadgeType>> {
    try {
      const data = await this.fetchAppData();
      return data?.achievement_badges || {
        economy: 'star',
        sports: 'trophy',
        gardening: 'leaf',
        marketing: 'fire',
        arts: 'gem',
      };
    } catch (err) {
      console.error('Error reading YAML data:', err);
      return {
        economy: 'star',
        sports: 'trophy',
        gardening: 'leaf',
        marketing: 'fire',
        arts: 'gem',
      };
    }
  }
}
