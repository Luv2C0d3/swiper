import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface LoadingViewProps {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
}

export const LoadingView: React.FC<LoadingViewProps> = ({ loading, error, children }) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading profiles...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  error: {
    color: '#ff6b6b',
    fontSize: 18,
    textAlign: 'center',
  },
});
