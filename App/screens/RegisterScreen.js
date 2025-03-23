// RegisterScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar, //Imported for light theme
  Appearance,
  Animated, //Imported for fade in animation
} from 'react-native';
import { API_URL } from '../config';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
  Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed. Please try again.');
      }

      Alert.alert('Success', 'Registration successful', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

    // Changing phone theme to light so that time and other top bar information appears black (Sam)
    Appearance.setColorScheme('light');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" />
      <Animated.View style={[styles.innerContainer, {opacity: fadeAnim}]}>
        <Image source={require('../assets/lightLogo1.png')} style={styles.logo} />
        <Text style={styles.title}>Register</Text>
        
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
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholderTextColor="#00000060"
        />

        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.registerBtnText}>Register</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>
            Already a member? <Text style={styles.loginLink}>Login</Text>
          </Text>
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
    position: 'fixed',
    paddingBottom: 50,
  },
  logo: {
    width: 275,
    height: 275,
    alignSelf: 'center',
    position: 'fixed',
    top: 30, // Moves it up dynamically
  },
  logo: {
    alignSelf: 'center',
    width: 230,
    height: 230,
    marginBottom: 10,
  },
  title: {
    fontSize: 45,
    color: '#000000',
    alignSelf: 'center',
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 40,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#f8f9fc', // Ensure background color is set
    borderWidth: 1,
    borderColor: '#00000060',
  },
  registerBtn: {
    backgroundColor: '#0690FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 40,
    marginTop: 40,
    marginLeft: 70,
    marginRight: 70,
  },
  registerBtnText: {
    color: '#f8f9fc',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  loginText: {
    marginTop: 20,
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
  },
  loginLink: {
    color: '#007bff',
  },
});

export default RegisterScreen;
