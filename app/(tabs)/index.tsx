import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const profiles = [
  {
    id: '1',
    name: 'Sophia Chen',
    image: { uri: 'https://randomuser.me/api/portraits/women/44.jpg' },
    badges: ['star', 'trophy', 'leaf', 'fire', 'gem'],
  },
  {
    id: '2',
    name: 'Liam Zhang',
    image: { uri: 'https://randomuser.me/api/portraits/men/33.jpg' },
    badges: ['star', 'fire', 'leaf'],
  },
  {
    id: '3',
    name: 'Ava Kumar',
    image: { uri: 'https://randomuser.me/api/portraits/women/68.jpg' },
    badges: ['trophy', 'gem', 'fire', 'leaf'],
  },
];

const badgeIcons = {
  star: '⭐',
  trophy: '🏆',
  leaf: '🍃',
  fire: '🔥',
  gem: '💎',
};

const Card = ({ profile }: { profile: typeof profiles[0] }) => (
  <View style={styles.card}>
    <Image source={profile.image} style={styles.avatar} />
    <View style={styles.badgeContainer}>
      {profile.badges.map((badge, index) => (
        <Text key={index} style={styles.badge}>{badgeIcons[badge]}</Text>
      ))}
    </View>
    <Text style={styles.name}>{profile.name}</Text>
  </View>
);

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        cards={profiles}
        renderCard={(card) => <Card profile={card} />}
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
  avatar: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    marginBottom: 20,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  badge: {
    fontSize: 24,
    margin: 4,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
