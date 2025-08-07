import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, LoadingView, NavigationBar } from '../../components';
import { useProfiles } from '../../src/hooks/useProfiles';

export default function HomeScreen() {
  const { profiles, achievementBadges, loading, error } = useProfiles();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : profiles.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < profiles.length - 1 ? prev + 1 : 0));
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingView loading={loading} error={error}>
        <View style={styles.cardContainer}>
          <Card 
            profile={profiles[currentIndex]} 
            achievementBadges={achievementBadges} 
          />
        </View>
        
        <NavigationBar
          currentIndex={currentIndex}
          totalProfiles={profiles.length}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      </LoadingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
