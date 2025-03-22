// Navigation.js
import React, { useEffect, useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from 'react-native-vector-icons';
import FitnessScreen from './screens/FitnessScreen';
import HealthScreen from './screens/HealthScreen';
import StatsScreen from './screens/StatsScreen';
import SettingsScreen from './screens/SettingScreen'; // Ensure your filename matches
import CalendarIntegrationScreen from './screens/CalendarIntegrationScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import WorkoutRoutineScreen from './screens/WorkoutRoutineScreen';
import WorkoutDetailScreen from './screens/WorkoutDetailScreen';
import ExerciseDetailScreen from './screens/ExerciseDetailScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import NotificationScreen from './screens/NotificationScreen';
import TermsAndConditionsScreen from './screens/TermsAndConditionsScreen';
import PrivacyAndSecurityScreen from './screens/PrivacyAndSecurityScreen';
import HelpCenterScreen from './screens/HelpCenterScreen';
import AccountProfileScreen from './screens/AccountProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

// 3) Settings Stack: holds SettingsScreen + CalendarIntegrationScreen
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
      name = "NotificationScreen"
      component={NotificationScreen}
    />
    <Stack.Screen
      name = "TermsAndConditionsScreen"
      component={TermsAndConditionsScreen}
    />
    <Stack.Screen
      name = "PrivacyAndSecurityScreen"
      component={PrivacyAndSecurityScreen}
    />
    <Stack.Screen
      name = "HelpCenterScreen"
      component={HelpCenterScreen}
    />
    <Stack.Screen
      name = "AccountProfileScreen"
      component={AccountProfileScreen}
    />
  </Stack.Navigator>
);

// 4) Main Tab Navigator
const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Fitness') {
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
    })}
  >
    {/* Fitness tab -> FitnessStackNavigator */}
    <Tab.Screen name="Fitness" component={FitnessStackNavigator} />

    {/* Health tab -> HealthStackNavigator */}
    <Tab.Screen name="Health" component={HealthStackNavigator} />

    {/* Stats tab -> direct StatsScreen */}
    <Tab.Screen name="Stats" component={StatsScreen} />

    {/* Settings tab -> SettingsStackNavigator (includes CalendarIntegrationScreen) */}
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
            // If logged in, show the main tab navigator
            <Stack.Screen name="MainMenu" component={MainTabNavigator} />
          ) : (
            // If not logged in, show login-related flows
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