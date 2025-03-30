// LoginScreen.js

import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Appearance, //Imported for light theme
  Animated, //Imported for fade in animation
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../Navigation';
import { API_URL } from '../../config';

const LoginScreen = ({ navigation }) => {
  const { setIsAuthenticated } = useContext(AuthContext);
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

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed. Please try again.');
      }

      // Store token and user name
      await AsyncStorage.setItem('userToken', data.token);
      await AsyncStorage.setItem('userName', data.name);

      // Update auth state
      setIsAuthenticated(true);

      // Navigate to the main app screen
      navigation.navigate('Home'); // Replace 'Home' with your home screen name

    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  // Changing phone theme to light so that time and other top bar information appears black (Sam)
  Appearance.setColorScheme('light');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" />
      <Animated.View style={[styles.innerContainer, {opacity: fadeAnim}]}>
        <Image source={require('../../assets/lightLogo1.png')} style={styles.logo} /> 
        <Text style={styles.title}>LifeSync<Text style={styles.titleAccent}>+</Text></Text>
        <Text style={styles.secondaryTitle}>Health + Fitness</Text>

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

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            Not a member? <Text style={styles.registerLink}>Register now</Text>
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
  title: {
    fontSize: 45,
    color: '#000000',
    alignSelf: 'center',
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  titleAccent: {
    fontSize: 50,
    color: '#0690FF',
  },
  secondaryTitle: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#0690FF',
    letterSpacing: 5,
    marginBottom:50,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#f8f9fc', // Ensure background color is set
    borderWidth: 1,
    borderColor: '#00000060',
  },
  forgotPassword: {
    alignSelf: 'flex-left',
    marginLeft: 10,
    color: '#0690FF',
    marginBottom: 40,
  },
  loginBtn: {
    backgroundColor: '#0690FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 70,
    marginRight: 70,
  },
  loginBtnText: {
    color: '#f8f9fc',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  registerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
  },
  registerLink: {
    color: '#0690FF',
  },
});

export default LoginScreen;