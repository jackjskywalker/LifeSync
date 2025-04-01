// screens/RecommendedScheduleScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

// All 7 days, in order
const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function RecommendedScheduleScreen() {
  const [loading, setLoading] = useState(true);
  const [recommendedProgram, setRecommendedProgram] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        setLoading(true);

        const token = await AsyncStorage.getItem('userToken');

        // Jacob: Ensures token exists
        if (!token) {
          Alert.alert('Error', 'User  is not authenticated. Please log in.');
          setLoading(false);
          return;
        }

        // 1) Fetch recommended program
        let response = await fetch(`${API_URL}/recommended-program`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) {
          if (response.status === 404) {
            return Alert.alert('No Program', 'No recommended program found.');
          }
          throw new Error('Failed to fetch recommended program');
        }
        let data = await response.json();
        const program = data.program; 
        setRecommendedProgram(program);

        // 2) Fetch user availability
        response = await fetch(`${API_URL}/user-availability`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const availData = await response.json();
          // e.g. "Mon,Tue,Thu,Fri"
          const days = availData.available_days ? availData.available_days.split(',') : [];
          setAvailability(days); 
        } else if (response.status === 404) {
          // No availability set
          console.log('No availability found; user has not selected days.');
        } else {
          throw new Error('Failed to fetch availability');
        }

        // 3) Fetch workout plans for the recommended program
        response = await fetch(`${API_URL}/program/${program.id}/plans`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch workout plans');
        }
        const plansData = await response.json();
        setPlans(plansData);

      } catch (error) {
        console.error('Error fetching schedule data:', error);
        Alert.alert('Error', 'Could not load recommended schedule');
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!recommendedProgram) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No recommended program found.</Text>
      </View>
    );
  }

  // If we have recommendedProgram, availability, and plans, let's map them to a schedule.
  // We'll keep an index to the current workout plan in `plans`.
  let planIndex = 0;
  const schedule = DAYS_OF_WEEK.map((day) => {
    const isAvailable = availability.includes(day.slice(0,3)); 
    // e.g. user might store "Mon" for Monday, 
    // but if you stored full "Monday", just match them exactly or do a mapping

    if (isAvailable && planIndex < plans.length) {
      // Assign the next workout plan
      const nextPlan = plans[planIndex];
      planIndex++;
      return { day, workoutName: nextPlan.workout_name };
    } else {
      // Mark as Rest day
      return { day, workoutName: 'Rest' };
    }
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Weekly Schedule</Text>
      <Text style={styles.subtitle}>
        Program: {recommendedProgram.name} ({recommendedProgram.number_of_workout_days}-Day)
      </Text>

      {schedule.map((entry, idx) => (
        <View key={idx} style={styles.dayContainer}>
          <Text style={styles.dayText}>{entry.day}:</Text>
          <Text style={styles.workoutText}>{entry.workoutName}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center'
  },
  dayContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center'
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 100
  },
  workoutText: {
    fontSize: 16
  }
});
