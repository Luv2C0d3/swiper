import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface AchievementDetailsViewProps {
  details: any; // Accept any type since the data structure can be either object or array
}

export const AchievementDetailsView: React.FC<AchievementDetailsViewProps> = ({
  details,
}) => {
  if (!details) return null;

  // Handle case where details is an array (current data structure)
  if (Array.isArray(details)) {
    return (
      <View style={styles.detailsContainer}>
        <ScrollView
          style={{ maxHeight: 200 }}
          showsVerticalScrollIndicator={true}
        >        
          {/* Education/Diploma */}
          {details.map((detail, detailIndex) => {
            // Handle diploma/education (first item in array)
            if (detailIndex === 0 && detail.diploma) {
              return (
                <View key={detailIndex} style={styles.section}>
                  <Text style={styles.sectionTitle}>🎓 Education</Text>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>{detail.degree}</Text>
                    <Text style={styles.detailText}>
                      {detail.institution} ({detail.year})
                    </Text>
                    <Text style={styles.detailText}>Major: {detail.major}</Text>
                    <Text style={styles.detailText}>GPA: {detail.gpa}</Text>
                    {detail.honors && (
                      <Text style={styles.detailText}>
                        Honors: {detail.honors}
                      </Text>
                    )}
                    {detail.awards && (
                      <Text style={styles.detailText}>
                        Awards: {detail.awards}
                      </Text>
                    )}
                  </View>
                </View>
              );
            }
            
            // Handle postgraduate (second item in array)
            if (detailIndex === 1 && detail.postgraduate && Array.isArray(detail.postgraduate)) {
              return (
                <View key={detailIndex} style={styles.section}>
                  <Text style={styles.sectionTitle}>🎓 Postgraduate Education</Text>
                  {detail.postgraduate.map((diploma: any, index: number) => (
                    <View key={index} style={styles.detailItem}>
                      <Text style={styles.detailTitle}>{diploma.degree}</Text>
                      <Text style={styles.detailText}>
                        {diploma.institution} ({diploma.year})
                      </Text>
                      <Text style={styles.detailText}>Major: {diploma.major}</Text>
                      <Text style={styles.detailText}>GPA: {diploma.gpa}</Text>
                      {diploma.honors && (
                        <Text style={styles.detailText}>
                          Honors: {diploma.honors}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              );
            }
            
            // Handle publications (third item in array)
            if (detailIndex === 2 && detail.publications && Array.isArray(detail.publications)) {
              return (
                <View key={detailIndex} style={styles.section}>
                  <Text style={styles.sectionTitle}>📚 Publications</Text>
                  {detail.publications.map((pub: any, index: number) => (
                    <View key={index} style={styles.detailItem}>
                      <Text style={styles.detailTitle}>{pub.title}</Text>
                      <Text style={styles.detailText}>
                        {pub.journal} ({pub.year})
                      </Text>
                      <Text style={styles.detailText}>
                        Vol. {pub.volume}, Issue {pub.issue}, pp. {pub.pages}
                      </Text>
                    </View>
                  ))}
                </View>
              );
            }
            
            return null;
          })}

          {/* Continue with remaining sections */}
          {details.map((detail, detailIndex) => {
            // Handle YouTube channels (fourth item in array)
            if (detailIndex === 3 && detail.youtube_channel && Array.isArray(detail.youtube_channel)) {
              return (
                <View key={detailIndex} style={styles.section}>
                  <Text style={styles.sectionTitle}>📺 YouTube Channels</Text>
                  {detail.youtube_channel.map((channel: any, index: number) => (
                    <View key={index} style={styles.detailItem}>
                      <Text style={styles.detailTitle}>{channel.name}</Text>
                      <Text style={styles.detailText}>{channel.description}</Text>
                    </View>
                  ))}
                </View>
              );
            }
            
            return null;
          })}
        </ScrollView>
      </View>
    );
  }

  // Handle case where details is an object (expected type definition)
  return null; // For now, return null for object case since your data is array
};

const styles = StyleSheet.create({
  detailsContainer: {
    width: "100%",
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailItem: {
    backgroundColor: "#3a3a3a",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  detailTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailText: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 3,
  },
});
