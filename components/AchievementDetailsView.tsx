import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { type AchievementDetails } from '../utils/dataLoader';

interface AchievementDetailsViewProps {
  details: AchievementDetails;
}

export const AchievementDetailsView: React.FC<AchievementDetailsViewProps> = ({ details }) => {
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

const styles = StyleSheet.create({
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
});
