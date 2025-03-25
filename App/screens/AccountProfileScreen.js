import React, { useState, useRef, useEffect } from 'react';
import { 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  StatusBar, 
  Animated,
} from 'react-native';
import { API_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState(''); // Add state for current password
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    navigation.setOptions({
      title: 'Manage Profile', 
      headerBackTitle: 'Back',
    });
  }, [navigation]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

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
          const responseText = await response.text();
          console.error('Failed to fetch user data:', responseText);
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
        setCurrentPassword(data.password); // Store the current password
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    if (!name && !email && !password) {
      Alert.alert('Error', 'At least one field must be filled to update');
      return;
    }
  
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('User not authenticated');
      }
  
      const body = {};
      if (name) body.name = name;
      if (email) body.email = email;
      if (password) {
        body.password = password; // Only include password if it is provided
      }
  
      console.log('Request Payload:', body); // Debugging log
      console.log('Token:', token); // Debugging log
  
      const response = await fetch(`${API_URL}/updateProfile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || 'Profile update failed. Please try again.';
        console.error('Backend Error:', errorMessage); // Debugging log
        throw new Error(errorMessage);
      }
  
      Alert.alert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Profile Update Error:', error);
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" />
      <Animated.View style={[styles.innerContainer, { opacity: fadeAnim }]}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setName}
          value={name}
          autoCapitalize="words"
          placeholderTextColor="#00000060"
        />

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#00000060"
        />

        <TextInput
          style={styles.input}
          placeholder="New Password (Optional)"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholderTextColor="#00000060"
        />

        <TouchableOpacity style={styles.updateBtn} onPress={handleUpdateProfile}>
          <Text style={styles.updateBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f8f9fc',
    paddingBottom: 50,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#f8f9fc',
    borderWidth: 1,
    borderColor: '#00000060',
  },
  updateBtn: {
    backgroundColor: '#0690FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 40,
  },
  updateBtnText: {
    color: '#f8f9fc',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default AccountProfileScreen;
