import React, { useState, useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loadAppData, type Profile, type BadgeType, type AchievementType } from '../../utils/dataLoader';

const { width } = Dimensions.get('window');

const badgeIcons: Record<BadgeType, string> = {
  star: '⭐',
  trophy: '🏆',
  leaf: '🍃',
  fire: '🔥',
  gem: '💎',
};

const Card = ({ profile, achievementBadges }: { profile: Profile; achievementBadges: Record<AchievementType, BadgeType> }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const avatarSize = width * 0.6;
  const badgeRadius = avatarSize * 0.5; // Distance from center of avatar
  const badgeSize = 40;
  
  const handleBadgePress = (achievement: AchievementType) => {
    setSelectedTopic(achievement);
  };
  
  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: profile.image }} style={styles.avatar} />
        <View style={styles.badgeOverlay}>
          {profile.achievements.map((achievement: AchievementType, index: number) => {
            const badge = achievementBadges[achievement];
            const angle = (index * 180) / (profile.achievements.length - 1) - 90; // -90 to start from top
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
      {selectedTopic && (
        <Text style={styles.topic}>{selectedTopic}</Text>
      )}
    </View>
  );
};

export default function HomeScreen() {
  const [appData, setAppData] = useState<{ profiles: Profile[]; achievement_badges: Record<AchievementType, BadgeType> } | null>(null);

  useEffect(() => {
    const data = loadAppData();
    setAppData(data);
  }, []);

  if (!appData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Loading profiles...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        cards={appData.profiles}
        renderCard={(card) => <Card profile={card} achievementBadges={appData.achievement_badges} />}
        stackSize={3}
        backgroundColor={'#1a1a1a'}
        cardVerticalMargin={60}
        cardHorizontalMargin={10}
        stackSeparation={15}
        infinite
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    height: '75%',
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
  topic: {
    color: '#fff',
    fontSize: 40,
    marginTop: 10,
    opacity: 0.8,
  },
  loading: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});
