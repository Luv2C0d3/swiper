import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NavigationBarProps {
  currentIndex: number;
  totalProfiles: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  currentIndex,
  totalProfiles,
  onPrevious,
  onNext,
}) => {
  return (
    <View style={styles.navigationContainer}>
      <TouchableOpacity style={styles.navButton} onPress={onPrevious}>
        <Text style={styles.navButtonText}>← Previous</Text>
      </TouchableOpacity>
      
      <Text style={styles.counterText}>
        {currentIndex + 1} / {totalProfiles}
      </Text>
      
      <TouchableOpacity style={styles.navButton} onPress={onNext}>
        <Text style={styles.navButtonText}>Next →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
