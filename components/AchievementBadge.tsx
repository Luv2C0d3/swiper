import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { badgeIcons } from '../constants/badgeIcons';
import { type Achievement, type BadgeType } from '../utils/dataLoader';

interface AchievementBadgeProps {
  achievement: Achievement;
  badge: BadgeType;
  index: number;
  totalAchievements: number;
  avatarSize: number;
  badgeSize: number;
  onBadgePress: (achievement: Achievement) => void;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  badge,
  index,
  totalAchievements,
  avatarSize,
  badgeSize,
  onBadgePress,
}) => {
  // Calculate badge position around the avatar in a semi-circle
  const badgeRadius = avatarSize * 0.5;
  const angle = (index * 180) / (totalAchievements - 1) - 90;
  const x = Math.cos((angle * Math.PI) / 180) * badgeRadius;
  const y = Math.sin((angle * Math.PI) / 180) * badgeRadius;

  return (
    <TouchableOpacity
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
      onPress={() => onBadgePress(achievement)}
    >
      <Text style={styles.badgeText}>{badgeIcons[badge]}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
