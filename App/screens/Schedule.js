// Dashboard.js by Jack Skywalker contributed by SamLinnemann
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function RecommendedScheduleScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [recommendedProgram, setRecommendedProgram] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [plans, setPlans] = useState([]);

  const fetchScheduleData = useCallback(async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');

      // Fetch recommended program
      let response = await fetch(`${API_URL}/recommended-program`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        if (response.status === 404) {
          Alert.alert('No Program', 'No recommended program found.');
          setLoading(false);
          return;
        }
        throw new Error('Failed to fetch recommended program');
      }
      let data = await response.json();
      setRecommendedProgram(data.program);

      // Fetch user availability
      response = await fetch(`${API_URL}/user-availability`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const availData = await response.json();
        const days = availData.available_days ? availData.available_days.split(',') : [];
        setAvailability(days);
      } else if (response.status === 404) {
        console.log('No availability found.');
        setAvailability([]); // explicitly set to empty array
      } else {
        throw new Error('Failed to fetch availability');
      }

      // Fetch workout plans
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
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchScheduleData();
  }, [fetchScheduleData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchScheduleData();
  }, [fetchScheduleData]);

  const handleUpdateSchedule = () => {
    Alert.alert('Update Schedule', 'You pressed the Update Schedule button!');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  // ---- 1) If no availability, show "Set Availability" page ----
  if (!availability || availability.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="calendar-outline" size={48} color="#666" style={{ marginBottom: 16 }} />
        <Text style={styles.emptyText}>No availability found. Please set your availability first.</Text>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate('UserAvailabilityScreen')}
        >
          <Text style={styles.updateButtonText}>Set Availability</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ---- 2) If no recommended program at all ----
  if (!recommendedProgram) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#666" style={{ marginBottom: 16 }} />
        <Text style={styles.emptyText}>No recommended program found.</Text>

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateSchedule}>
          <Text style={styles.updateButtonText}>Enter Schedule</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Build the schedule
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
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header / Title Container */}
      <View style={styles.headerContainer}>
        <Ionicons name="fitness" size={36} color="#007bff" style={styles.headerIcon} />
        <Text style={styles.headerText}>Your Current Program</Text>
      </View>

      {/* Program info card */}
      <View style={styles.programCard}>
        <Text style={styles.programTitle}>{recommendedProgram.name}</Text>
        <Text style={styles.programSubtitle}>
          {recommendedProgram.number_of_workout_days}-Day Program
        </Text>
      </View>

      {/* Schedule list */}
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
            <View style={styles.dayCardLeft}>
              <Ionicons
                name={entry.workoutName === 'Rest' ? 'bed-outline' : 'barbell-outline'}
                size={24}
                color={isToday ? '#007bff' : '#444'}
                style={{ marginRight: 8 }}
              />
              <Text style={[styles.dayText, isToday && styles.highlightText]}>
                {entry.day}
              </Text>
            </View>
            <Text style={[styles.workoutText, isToday && styles.highlightText]}>
              {entry.workoutName}
            </Text>
          </View>
        );
      })}

      {/* Update Schedule Button */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateSchedule}>
        <Text style={styles.updateButtonText}>Update Schedule</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ----------------------------------
// Styles
// ----------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
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
    marginBottom: 24,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  headerIcon: {
    marginRight: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007bff',
  },

  programCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    alignItems: 'center',
  },
  programTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  programSubtitle: {
    fontSize: 14,
    color: '#555',
  },

  dayCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 10,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  dayCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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

  updateButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 14,
    marginVertical: 20,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
