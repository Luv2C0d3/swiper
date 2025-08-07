import { useEffect, useState } from 'react';
import { loadAppData, type AchievementType, type BadgeType, type Profile } from '../../utils/dataLoader';

export const useProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [achievementBadges, setAchievementBadges] = useState<Record<AchievementType, BadgeType>>({
    economy: 'star',
    sports: 'trophy',
    gardening: 'leaf',
    marketing: 'fire',
    arts: 'gem',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await loadAppData();
        setProfiles(data.profiles);
        setAchievementBadges(data.achievement_badges);
        setError(null);
      } catch (err) {
        console.error('Error loading profiles:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profiles');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { profiles, achievementBadges, loading, error };
};
