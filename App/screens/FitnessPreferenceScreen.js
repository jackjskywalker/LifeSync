import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { API_URL } from '../config';

export default function FitnessPreferenceScreen({ navigation }) {
  // For "Level" dropdown
  const [openLevel, setOpenLevel] = useState(false);
  const [level, setLevel] = useState(null); // null so placeholder shows if not fetched
  const [levelItems, setLevelItems] = useState([
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ]);

  // For "Type" dropdown
  const [openType, setOpenType] = useState(false);
  const [type, setType] = useState(null);
  const [typeItems, setTypeItems] = useState([
    { label: 'Home', value: 'home' },
    { label: 'Gym', value: 'gym' },
  ]);

  // For "Goal" dropdown
  const [openGoal, setOpenGoal] = useState(false);
  const [goal, setGoal] = useState(null);
  const [goalItems, setGoalItems] = useState([
    { label: 'Muscle Gain', value: 'muscle gain' },
    { label: 'Lose Weight', value: 'lose weight' },
  ]);

  // Only one dropdown open at a time
  const handleOpenLevel = (open) => {
    setOpenLevel(open);
    if (open) {
      setOpenType(false);
      setOpenGoal(false);
    }
  };
  const handleOpenType = (open) => {
    setOpenType(open);
    if (open) {
      setOpenLevel(false);
      setOpenGoal(false);
    }
  };
  const handleOpenGoal = (open) => {
    setOpenGoal(open);
    if (open) {
      setOpenLevel(false);
      setOpenType(false);
    }
  };

  // Save preferences to DB
  const handleSavePreferences = async () => {
    if (!level || !type || !goal) {
      Alert.alert('Validation', 'Please select all preferences before saving.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/user-preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ level, type, goal }),
      });

      if (!response.ok) {
        throw new Error('Failed to save preferences');
      }

      const data = await response.json();
      Alert.alert('Success', data.message);
      // Return to previous screen or do whatever suits your app flow
      navigation.goBack();
    } catch (error) {
      console.error('Error saving preferences:', error);
      Alert.alert('Error', 'An error occurred while saving preferences.');
    }
  };

  // Fetch existing preferences from DB
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const res = await fetch(`${API_URL}/user-preference`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          // Preference found, parse JSON and set states
          const prefData = await res.json();
          // prefData: { level: 'beginner', type: 'gym', goal: 'muscle gain' }
          setLevel(prefData.level);
          setType(prefData.type);
          setGoal(prefData.goal);
        } else if (res.status === 404) {
          // No preference found => leave them as null, show placeholders
          console.log('No user preference found, using placeholders');
        } else {
          throw new Error('Failed to fetch user preference');
        }
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };
    fetchPreferences();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Set Your Fitness Preferences</Text>

      <Text style={styles.label}>Level</Text>
      <DropDownPicker
        open={openLevel}
        value={level} // controlled by state
        items={levelItems}
        setOpen={handleOpenLevel}
        setValue={setLevel}
        setItems={setLevelItems}
        placeholder="Select your level"
        placeholderStyle={{ color: '#999' }}
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        zIndex={3000}
        zIndexInverse={1000}
      />

      <Text style={styles.label}>Type</Text>
      <DropDownPicker
        open={openType}
        value={type}
        items={typeItems}
        setOpen={handleOpenType}
        setValue={setType}
        setItems={setTypeItems}
        placeholder="Select your workout type"
        placeholderStyle={{ color: '#999' }}
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        zIndex={2000}
        zIndexInverse={2000}
      />

      <Text style={styles.label}>Goal</Text>
      <DropDownPicker
        open={openGoal}
        value={goal}
        items={goalItems}
        setOpen={handleOpenGoal}
        setValue={setGoal}
        setItems={setGoalItems}
        placeholder="Select your goal"
        placeholderStyle={{ color: '#999' }}
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        zIndex={1000}
        zIndexInverse={3000}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSavePreferences}>
        <Text style={styles.saveButtonText}>Save Preferences</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdown: {
    borderColor: '#ccc'
  },
  saveButton: {
    backgroundColor: '#007bff',
    marginTop: 20,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
