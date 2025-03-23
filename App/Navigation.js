// Navigation.js

import React, { useEffect, useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FitnessScreen from './screens/FitnessScreen';
import HealthScreen from './screens/HealthScreen';
import StatsScreen from './screens/StatsScreen';
import SettingsScreen from './screens/SettingScreen'; 
import CalendarIntegrationScreen from './screens/CalendarIntegrationScreen';
import FitnessPreferenceScreen from './screens/FitnessPreferenceScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import WorkoutRoutineScreen from './screens/WorkoutRoutineScreen';
import WorkoutDetailScreen from './screens/WorkoutDetailScreen';
import ExerciseDetailScreen from './screens/ExerciseDetailScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import RecommendedProgramScreen from './screens/RecommendedProgramScreen'; // <-- Import the new screen
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 0) Home Stack: This shows the recommended workout program on the home page
const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="RecommendedProgram"
      component={RecommendedProgramScreen}
      options={{ headerShown: false }} // or set a header if you prefer
    />
  </Stack.Navigator>
);

// 1) Fitness Stack: holds screens for the Fitness tab
const FitnessStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Fitness"
      component={FitnessScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="WorkoutRoutine" component={WorkoutRoutineScreen} />
    <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
    <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
  </Stack.Navigator>
);

// 2) Health Stack: holds screens for the Health tab
const HealthStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Health"
      component={HealthScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
  </Stack.Navigator>
);

// 3) Settings Stack: holds SettingsScreen, CalendarIntegrationScreen, FitnessPreferenceScreen
const SettingsStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SettingsMain"
      component={SettingsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CalendarIntegrationScreen"
      component={CalendarIntegrationScreen}
    />
    <Stack.Screen
      name="FitnessPreferenceScreen"
      component={FitnessPreferenceScreen}
    />
  </Stack.Navigator>
);

// 4) Main Tab Navigator
const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Fitness') {
          iconName = 'bolt';
        } else if (route.name === 'Health') {
          iconName = 'person';
        } else if (route.name === 'Stats') {
          iconName = 'trending-up';
        } else if (route.name === 'Settings') {
          iconName = 'settings';
        }
        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007bff',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { paddingBottom: 15, paddingTop: 5 },
      headerShown: false, // Hide headers on tab screens
    })}
  >
    {/* 
      NEW 'Home' tab goes first. 
      It loads the HomeStackNavigator which shows RecommendedProgramScreen. 
    */}
    <Tab.Screen name="Home" component={HomeStackNavigator} />
    <Tab.Screen name="Fitness" component={FitnessStackNavigator} />
    <Tab.Screen name="Health" component={HealthStackNavigator} />
    <Tab.Screen name="Stats" component={StatsScreen} />
    <Tab.Screen name="Settings" component={SettingsStackNavigator} />
  </Tab.Navigator>
);

// 5) Root Navigation handling authentication
const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuthentication();
  }, []);

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Stack.Screen name="MainMenu" component={MainTabNavigator} />
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigation;
