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
        setRecommendedProgram(data.program);

        response = await fetch(`${API_URL}/user-availability`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const availData = await response.json();
          const days = availData.available_days ? availData.available_days.split(',') : [];
          setAvailability(days);
        } else if (response.status === 404) {
          console.log('No availability found; user has not selected days.');
        } else {
          throw new Error('Failed to fetch availability');
        }

        response = await fetch(`${API_URL}/program/${data.program.id}/plans`, {
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

  const today = new Date().toLocaleString('en-US', { weekday: 'long' });
  let planIndex = 0;
  const schedule = DAYS_OF_WEEK.map((day) => {
    const isAvailable = availability.includes(day.slice(0, 3));

    if (isAvailable && planIndex < plans.length) {
      const nextPlan = plans[planIndex];
      planIndex++;
      return { day, workoutName: nextPlan.workout_name };
    } else {
      return { day, workoutName: 'Rest' };
    }
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Current Program</Text>
      <Text style={styles.subtitle}>
        {recommendedProgram.name} ({recommendedProgram.number_of_workout_days}-Day)
      </Text>

      {schedule.map((entry, idx) => (
        <View
          key={idx}
          style={[
            styles.dayContainer,
            entry.day === today && styles.currentDayContainer
          ]}
        >
          <Text style={[styles.dayText, entry.day === today && styles.currentDayText]}>{entry.day}:</Text>
          <Text style={[styles.workoutText, entry.day === today && styles.currentWorkoutText]}>{entry.workoutName}</Text>
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
    backgroundColor: '#f0f0f0',
    padding: 16
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    textAlign: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  dayContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
    backgroundColor: '#0690FF',
    padding: 15,
    borderRadius: 30,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  currentDayContainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 100,
    color: '#fff',
  },
  currentDayText: {
    color: '#0690FF',
  },
  workoutText: {
    fontSize: 16,
    color: '#fff',
  },
  currentWorkoutText: {
    color: '#0690FF',
  }
});