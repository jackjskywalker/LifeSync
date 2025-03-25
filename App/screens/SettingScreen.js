// screens/SettingScreen.js

import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { API_URL } from '../config';

const settingsOptions = [
  'Account Profile',
  'Schedule Availability',
  'Fitness Preferences',
  'Diet Preferences',
  'Notifications',
  'Help Center',
  'Privacy & Security',
  'Terms & Conditions',
];

export default function SettingsScreen({ navigation }) {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsAuthenticated(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  // Handle navigation based on settings item pressed
  const handleOptionPress = (option) => {
    switch (option) {
      case 'Calendar Integration':
        navigation.navigate('CalendarIntegrationScreen');
        break;
      case 'Notifications':
        navigation.navigate('NotificationScreen');
        break;
      case 'Terms & Conditions':
        navigation.navigate('TermsAndConditionsScreen');
        break;
      case 'Privacy & Security':
        navigation.navigate('PrivacyAndSecurityScreen');
        break;
      case 'Help Center':
        navigation.navigate('HelpCenterScreen');
        break;
      case 'Account Profile':
        navigation.navigate('AccountProfileScreen');
        break;
      default:
        Alert.alert('Selected Option', option);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.profileImage}>
          <MaterialIcons name="person" size={50} color="gray" />
        </View>
        <TouchableOpacity style={styles.editIcon}>
          <MaterialIcons name="edit" size={24} color="#0690FF" />
        </TouchableOpacity>
        <Text style={styles.name}>{name || 'User Name'}</Text>
        <Text style={styles.username}>{email || 'user@example.com'}</Text>
      </View>
      <FlatList
        data={settingsOptions}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.option} onPress={() => handleOptionPress(item)}>
            <Text style={styles.optionText}>{item}</Text>
            <MaterialIcons name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  profile: {
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  username: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  optionText: { fontSize: 16 },
  separator: { height: 1, backgroundColor: '#ccc' },
  logoutButton: {
    backgroundColor: '#0690FF',
    padding: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
