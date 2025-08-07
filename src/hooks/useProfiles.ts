import { useState, useEffect } from 'react';
import { ProfileRepository, type AppData, type Profile, type BadgeType, type AchievementType } from '../repositories/ProfileRepository';

export const useProfiles = () => {
  const [appData, setAppData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const profileRepository = new ProfileRepository();

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await profileRepository.fetchAppData();
      if (data) {
        setAppData(data);
      } else {
        setError('No data available');
      }
    } catch (err) {
      console.error('Error loading app data:', err);
      setError('Failed to load profiles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refresh = () => {
    loadData();
  };

  return {
    appData,
    profiles: appData?.profiles || [],
    achievementBadges: appData?.achievement_badges || {
      economy: 'star',
      sports: 'trophy',
      gardening: 'leaf',
      marketing: 'fire',
      arts: 'gem',
    },
    loading,
    error,
    refresh,
  };
};
