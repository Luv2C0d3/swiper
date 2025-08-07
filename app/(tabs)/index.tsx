import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfiles } from '../../src/hooks/useProfiles';
import { type Achievement, type AchievementDetails, type AchievementType, type BadgeType, type Profile } from '../../utils/dataLoader';
import { gradeFetchers, type GradeFetchResult } from '../../utils/gradeFetchers';

const { width } = Dimensions.get('window');

const badgeIcons: Record<BadgeType, string> = {
  star: '⭐',
  trophy: '🏆',
  leaf: '🍃',
  fire: '🔥',
  gem: '💎',
};

const AchievementDetailsView = ({ details }: { details: AchievementDetails }) => {
  if (!details) return null;

  return (
    <View style={styles.detailsContainer}>
      <ScrollView 
        style={{ maxHeight: 200 }}
        showsVerticalScrollIndicator={true}
      >
        {details.diploma && details.diploma.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎓 Education</Text>
            {details.diploma.map((diploma, index) => (
              <View key={index} style={styles.detailItem}>
                <Text style={styles.detailTitle}>{diploma.degree}</Text>
                <Text style={styles.detailText}>{diploma.institution} ({diploma.year})</Text>
                <Text style={styles.detailText}>Major: {diploma.major}</Text>
                <Text style={styles.detailText}>GPA: {diploma.gpa}</Text>
                {diploma.honors && <Text style={styles.detailText}>Honors: {diploma.honors}</Text>}
                {diploma.awards && <Text style={styles.detailText}>Awards: {diploma.awards}</Text>}
              </View>
            ))}
          </View>
        )}

        {details.postgraduate && details.postgraduate.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎓 Postgraduate Education</Text>
            {details.postgraduate.map((diploma, index) => (
              <View key={index} style={styles.detailItem}>
                <Text style={styles.detailTitle}>{diploma.degree}</Text>
                <Text style={styles.detailText}>{diploma.institution} ({diploma.year})</Text>
                <Text style={styles.detailText}>Major: {diploma.major}</Text>
                <Text style={styles.detailText}>GPA: {diploma.gpa}</Text>
                {diploma.honors && <Text style={styles.detailText}>Honors: {diploma.honors}</Text>}
              </View>
            ))}
          </View>
        )}

        {details.publications && details.publications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📚 Publications</Text>
            {details.publications.map((pub, index) => (
              <View key={index} style={styles.detailItem}>
                <Text style={styles.detailTitle}>{pub.title}</Text>
                <Text style={styles.detailText}>{pub.journal} ({pub.year})</Text>
                <Text style={styles.detailText}>Vol. {pub.volume}, Issue {pub.issue}, pp. {pub.pages}</Text>
              </View>
            ))}
          </View>
        )}

        {details.youtube_channel && details.youtube_channel.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📺 YouTube Channels</Text>
            {details.youtube_channel.map((channel, index) => (
              <View key={index} style={styles.detailItem}>
                <Text style={styles.detailTitle}>{channel.name}</Text>
                <Text style={styles.detailText}>{channel.description}</Text>
              </View>
            ))}
          </View>
        )}

        {details.championships && details.championships.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🏆 Championships</Text>
            {details.championships.map((champ, index) => (
              <View key={index} style={styles.detailItem}>
                <Text style={styles.detailTitle}>{champ.name} ({champ.year})</Text>
                <Text style={styles.detailText}>Position: {champ.position}</Text>
                <Text style={styles.detailText}>{champ.description}</Text>
              </View>
            ))}
          </View>
        )}

        {details.projects && details.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🌱 Projects</Text>
            {details.projects.map((project, index) => (
              <View key={index} style={styles.detailItem}>
                <Text style={styles.detailTitle}>{project.name} ({project.year})</Text>
                <Text style={styles.detailText}>{project.description}</Text>
              </View>
            ))}
          </View>
        )}

        {details.performances && details.performances.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎭 Performances</Text>
            {details.performances.map((perf, index) => (
              <View key={index} style={styles.detailItem}>
                <Text style={styles.detailTitle}>{perf.name} ({perf.year})</Text>
                <Text style={styles.detailText}>{perf.description}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const Card = ({ profile, achievementBadges }: { profile: Profile; achievementBadges: Record<AchievementType, BadgeType> }) => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [fetchingMessage, setFetchingMessage] = useState<string | null>(null);
  const avatarSize = width * 0.6;
  const badgeRadius = avatarSize * 0.5; // Distance from center of avatar
  const badgeSize = 40;
  
  const handleBadgePress = async (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    
    // Call the appropriate grade fetching function
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
    
    // Clear fetching message after a short delay
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

export default function HomeScreen() {
  const { profiles, achievementBadges, loading, error } = useProfiles();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Loading profiles...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (profiles.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>No profiles available</Text>
      </SafeAreaView>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : profiles.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < profiles.length - 1 ? prev + 1 : 0));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <Card profile={profiles[currentIndex]} achievementBadges={achievementBadges} />
      </View>
      
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navButton} onPress={goToPrevious}>
          <Text style={styles.navButtonText}>← Previous</Text>
        </TouchableOpacity>
        
        <Text style={styles.counterText}>
          {currentIndex + 1} / {profiles.length}
        </Text>
        
        <TouchableOpacity style={styles.navButton} onPress={goToNext}>
          <Text style={styles.navButtonText}>Next →</Text>
        </TouchableOpacity>
      </View>
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
  topic: {
    color: '#fff',
    fontSize: 40,
    marginTop: 10,
    opacity: 0.8,
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
  loading: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  error: {
    color: '#ff6b6b',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  detailsContainer: {
    width: '100%',
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  detailTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 3,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#2a2a2a',
    borderTopWidth: 1,
    borderTopColor: '#3a3a3a',
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  counterText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
