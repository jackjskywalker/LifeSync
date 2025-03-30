import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
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
          headers: { Authorization: `Bearer ${token}` },
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
          headers: { Authorization: `Bearer ${token}` },
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
          headers: { Authorization: `Bearer ${token}` },
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
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No recommended program found.</Text>
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
      <View style={styles.card}>
        <Text style={styles.title}>Your Current Program</Text>
        <Text style={styles.subtitle}>
          {recommendedProgram.name} ({recommendedProgram.number_of_workout_days}-Day)
        </Text>
      </View>

      {schedule.map((entry, idx) => {
        const isToday = entry.day === today;
        return (
          <View
            key={idx}
            style={[
              styles.dayCard,
              isToday && styles.highlightCard,
            ]}
          >
            <Text style={[styles.dayText, isToday && styles.highlightText]}>
              {entry.day}
            </Text>
            <Text style={[styles.workoutText, isToday && styles.highlightText]}>
              {entry.workoutName}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f4f6f8',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  dayCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  highlightCard: {
    backgroundColor: '#e6f0ff',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  workoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  highlightText: {
    color: '#007bff',
    fontWeight: '700',
  },
});
