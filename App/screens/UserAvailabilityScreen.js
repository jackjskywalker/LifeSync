import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

// Hardcode the days of the week you want to display
const ALL_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function UserAvailabilityScreen({ navigation }) {
  const [selectedDays, setSelectedDays] = useState([]);

  // On mount, fetch existing availability
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const res = await fetch(`${API_URL}/user-availability`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json(); 
          // data.available_days might be comma-separated e.g. "Mon,Wed,Fri"
          const savedDays = data.available_days.split(',');
          setSelectedDays(savedDays); 
        } else if (res.status === 404) {
          // No availability set => do nothing
          console.log('No availability found, using empty selection');
        } else {
          throw new Error('Failed to fetch availability');
        }
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };
    fetchAvailability();
  }, []);

  // Toggle a day in or out of selectedDays array
  const toggleDay = (day) => {
    setSelectedDays((prevSelected) => {
      if (prevSelected.includes(day)) {
        // remove it
        return prevSelected.filter(d => d !== day);
      } else {
        // add it
        return [...prevSelected, day];
      }
    });
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await fetch(`${API_URL}/user-availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ available_days: selectedDays })
      });

      if (!res.ok) {
        throw new Error('Failed to save availability');
      }

      const data = await res.json();
      Alert.alert('Success', data.message);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving availability:', error);
      Alert.alert('Error', 'An error occurred while saving availability.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Available Days</Text>
      {ALL_DAYS.map((day) => {
        const isSelected = selectedDays.includes(day);
        return (
          <TouchableOpacity
            key={day}
            style={[styles.dayItem, isSelected && styles.dayItemSelected]}
            onPress={() => toggleDay(day)}
          >
            <Text
              style={[
                styles.dayText,
                isSelected && styles.dayTextSelected
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Availability</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center'
  },
  dayItem: {
    padding: 15,
    marginVertical: 5,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5
  },
  dayItemSelected: {
    backgroundColor: '#007bff'
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333'
  },
  dayTextSelected: {
    color: '#fff'
  },
  saveButton: {
    backgroundColor: '#007bff',
    marginTop: 30,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
