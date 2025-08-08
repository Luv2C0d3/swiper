import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import {
  type Achievement,
  type AchievementType,
  type BadgeType,
  type Profile,
} from "../utils/dataLoader";
import { gradeFetchers, type GradeFetchResult } from "../utils/gradeFetchers";
import { AchievementBadge } from "./AchievementBadge";
import { AchievementDetailsView } from "./AchievementDetailsView";

const { width } = Dimensions.get("window");

function capitalize(word: string) {
  if (!word) return "";
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

interface CardProps {
  profile: Profile;
  achievementBadges: Record<AchievementType, BadgeType>;
}

export const Card: React.FC<CardProps> = ({ profile, achievementBadges }) => {
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const [fetchingMessage, setFetchingMessage] = useState<string | null>(null);

  // Reset selectedAchievement when profile changes
  useEffect(() => {
    setSelectedAchievement(null);
    setFetchingMessage(null);
  }, [profile.id]);

  // Size of the main profile avatar image (60% of screen width)
  const avatarSize = width * 0.6;
  // Distance from avatar center to badge positions (half of avatar size)
  const badgeRadius = avatarSize * 0.5;
  // Size of each achievement badge (40px diameter)
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
      console.error("Error fetching grade:", error);
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
          {profile.achievements.map(
            (achievement: Achievement, index: number) => {
              const badge = achievementBadges[achievement.name];

              return (
                <AchievementBadge
                  key={index}
                  achievement={achievement}
                  badge={badge}
                  index={index}
                  totalAchievements={profile.achievements.length}
                  avatarSize={avatarSize}
                  badgeSize={badgeSize}
                  onBadgePress={handleBadgePress}
                />
              );
            }
          )}
        </View>
      </View>

      <Text style={styles.name}>{profile.name}</Text>

      {selectedAchievement && (
        <View style={styles.achievementInfo}>
          <Text style={styles.achievementName}>
            {capitalize(selectedAchievement.name)}
          </Text>
          <Text style={styles.achievementDescription}>
            {selectedAchievement.description}
          </Text>
          {selectedAchievement.details && (
            <AchievementDetailsView details={selectedAchievement.details} />
          )}
        </View>
      )}

      {fetchingMessage && (
        <Text style={styles.fetchingMessage}>{fetchingMessage} Aqui</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2a2a2a",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 20,
  },
  avatar: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
  },
  badgeOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  achievementInfo: {
    marginTop: 15,
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1,
    width: "100%",
  },
  achievementName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  achievementDescription: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    opacity: 0.9,
    marginBottom: 10,
  },
  fetchingMessage: {
    color: "#FFD700",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
    opacity: 1,
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
