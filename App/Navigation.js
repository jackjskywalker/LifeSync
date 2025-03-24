// Navigation.js

import React, { useEffect, useState, createContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import RecommendedProgramScreen from './screens/RecommendedProgramScreen'; // NEW home page
import HealthScreen from './screens/HealthScreen';
import StatsScreen from './screens/StatsScreen';
import SettingsScreen from './screens/SettingScreen';
import FitnessPreferenceScreen from './screens/FitnessPreferenceScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import WorkoutRoutineScreen from './screens/WorkoutRoutineScreen';
import WorkoutDetailScreen from './screens/WorkoutDetailScreen';
import ExerciseDetailScreen from './screens/ExerciseDetailScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import UserAvailabilityScreen from './screens/UserAvailabilityScreen';
import ScheduleScreen from './screens/ScheduleScreen'; // Already created?

export const AuthContext = createContext();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 1) Home Stack (RecommendedProgram replaces Fitness)
const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="RecommendedProgram"
      component={RecommendedProgramScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// 2) Nutrition Stack (formerly Health)
const NutritionStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="NutritionMain"
      component={HealthScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
  </Stack.Navigator>
);

// 3) Schedule Stack
const ScheduleStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ScheduleMain"
      component={ScheduleScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// 4) Profile Stack (formerly Settings)
const ProfileStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProfileMain"
      component={SettingsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="UserAvailabilityScreen" component={UserAvailabilityScreen} />
    <Stack.Screen name="FitnessPreferenceScreen" component={FitnessPreferenceScreen} />
  </Stack.Navigator>
);

// 5) Main Tab Navigator
const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        // We match by route.name to set the right icon + label
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Nutrition') {
          iconName = 'favorite'; // heart icon
        } else if (route.name === 'Schedule') {
          iconName = 'event'; // calendar-type icon
        } else if (route.name === 'Stats') {
          iconName = 'trending-up';
        } else if (route.name === 'Profile') {
          iconName = 'people'; // "people" icon
        }
        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007bff',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { paddingBottom: 15, paddingTop: 5 },
    })}
  >
    {/* Replaces Fitness with Home */}
    <Tab.Screen name="Home" component={HomeStackNavigator} />

    {/* Renamed Health to Nutrition, icon is a heart */}
    <Tab.Screen name="Nutrition" component={NutritionStackNavigator} />

    {/* Keep your existing "Schedule" */}
    <Tab.Screen name="Schedule" component={ScheduleStackNavigator} />

    {/* Stats remains the same (just a single screen, presumably) */}
    <Tab.Screen name="Stats" component={StatsScreen} />

    {/* Renamed Settings to Profile with the people icon */}
    <Tab.Screen name="Profile" component={ProfileStackNavigator} />
  </Tab.Navigator>
);

// 6) Root Navigation
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
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
};

export default Navigation;
