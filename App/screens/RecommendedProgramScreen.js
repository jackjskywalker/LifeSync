// RecommendedProgramScreen.js

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { useFocusEffect } from '@react-navigation/native'; // <-- Import useFocusEffect

export default function RecommendedProgramScreen({ navigation }) {
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  // Reusable fetch function
  const fetchRecommendedProgram = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/recommended-program`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          const data = await response.json();
          Alert.alert('No Program Found', data.error || 'No matching program');
          setProgram(null);
        } else {
          throw new Error('Failed to fetch recommended program');
        }
      } else {
        const data = await response.json();
        setProgram(data.program);
      }
    } catch (error) {
      console.error('Error fetching recommended program:', error);
      Alert.alert('Error', 'Failed to load recommended program');
    } finally {
      setLoading(false);
    }
  };

  // useFocusEffect re-runs fetchRecommendedProgram whenever this screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchRecommendedProgram();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!program) {
    return (
      <View style={styles.noProgramContainer}>
        <Text style={styles.noProgramText}>
          No recommended program found.
        </Text>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // If program is found, display its details
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{program.name}</Text>
      <Text style={styles.subtitle}>
        Difficulty: {program.difficulty} | Goal: {program.goal} | Type: {program.type}
      </Text>
      <Text style={styles.subtitle}>
        {program.number_of_workout_days} workout days
      </Text>

      {program.cover_image ? (
        <Image
          source={{ uri: program.cover_image }}
          style={styles.coverImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderImage}>
          <Text>No Cover Image</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noProgramContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noProgramText: {
    fontSize: 16,
    marginBottom: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5
  },
  coverImage: {
    width: '100%',
    height: 200,
    marginVertical: 20
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#ccc',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  goBackButton: {
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20
  },
  goBackText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
