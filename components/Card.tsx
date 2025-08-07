import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AchievementDetailsView } from '.';
import { badgeIcons } from '../constants/badgeIcons';
import { type Achievement, type AchievementType, type BadgeType, type Profile } from '../utils/dataLoader';
import { gradeFetchers, type GradeFetchResult } from '../utils/gradeFetchers';

const { width } = Dimensions.get('window');

interface CardProps {
  profile: Profile;
  achievementBadges: Record<AchievementType, BadgeType>;
}

export const Card: React.FC<CardProps> = ({ profile, achievementBadges }) => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [fetchingMessage, setFetchingMessage] = useState<string | null>(null);
  
  const avatarSize = width * 0.6;
  const badgeRadius = avatarSize * 0.5;
  const badgeSize = 40;
  
  const handleBadgePress = async (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    
    try {
      const fetcher = gradeFetchers[achievement.name];
      if (fetcher) {
        const result: GradeFetchResult = await fetcher(profile.id);
        setFetchingMessage(result.message);
      }
    } catch (error) {
      console.error('Error fetching grade:', error);
      setFetchingMessage(`Error fetching ${achievement.name} grade`);
    }
    
    setTimeout(() => {
      setFetchingMessage(null);
    }, 3000);
  };
  
  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: profile.image }} style={styles.avatar} />
        <View style={styles.badgeOverlay}>
          {profile.achievements.map((achievement: Achievement, index: number) => {
            const badge = achievementBadges[achievement.name];
            const angle = (index * 180) / (profile.achievements.length - 1) - 90;
            const x = Math.cos((angle * Math.PI) / 180) * badgeRadius;
            const y = Math.sin((angle * Math.PI) / 180) * badgeRadius;
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.badge,
                  {
                    position: 'absolute',
                    left: avatarSize / 2 + x - badgeSize / 2,
                    top: avatarSize / 2 + y - badgeSize / 2,
                    width: badgeSize,
                    height: badgeSize,
                    borderRadius: badgeSize / 2,
                    backgroundColor: '#2a2a2a',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: '#fff',
                  },
                ]}
                onPress={() => handleBadgePress(achievement)}
              >
                <Text style={styles.badgeText}>{badgeIcons[badge]}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      
      <Text style={styles.name}>{profile.name}</Text>
      
      {selectedAchievement && (
        <View style={styles.achievementInfo}>
          <Text style={styles.achievementName}>{selectedAchievement.name}</Text>
          <Text style={styles.achievementDescription}>{selectedAchievement.description}</Text>
          {selectedAchievement.details && (
            <AchievementDetailsView details={selectedAchievement.details} />
          )}
        </View>
      )}
      
      {fetchingMessage && (
        <Text style={styles.fetchingMessage}>{fetchingMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
  },
  badgeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  badge: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  badgeText: {
    fontSize: 20,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  achievementInfo: {
    marginTop: 15,
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
    width: '100%',
  },
  achievementName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  achievementDescription: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.9,
    marginBottom: 10,
  },
  fetchingMessage: {
    color: '#FFD700',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    opacity: 1,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});
