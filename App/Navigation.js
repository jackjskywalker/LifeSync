import React, { useEffect, useState, createContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import DashboardScreen from './screens/DashboardScreen';
import RecommendedProgramScreen from './screens/RecommendedProgramScreen';
import HealthScreen from './screens/HealthScreen';
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
import ScheduleScreen from './screens/ScheduleScreen';
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
            headerShown: false, // Hide header for tab screens
            tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Dashboard') {
                    iconName = 'dashboard';
                } else if (route.name === 'Nutrition') {
                    iconName = 'favorite';
                } else if (route.name === 'Schedule') {
                    iconName = 'event';
                } else if (route.name === 'Profile') {
                    iconName = 'people';
                }
                return <MaterialIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007bff',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { paddingBottom: 15, paddingTop: 5 },
        })}
    >
        <Tab.Screen name="Dashboard" component={DashboardStackNavigator} />
        <Tab.Screen name="Nutrition" component={NutritionStackNavigator} />
        <Tab.Screen name="Schedule" component={ScheduleStackNavigator} />
        <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
);

// 7) Root Navigation
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
                            <>
                                <Stack.Screen name="MainMenu" component={MainTabNavigator} />
                                <Stack.Screen
                                    name="RecommendedProgram"
                                    component={RecommendedProgramScreen}
                                    options={{
                                        headerShown: true,
                                        title: 'Recommended Program',
                                        headerStyle: {
                                            backgroundColor: '#f8f9fc',
                                        },
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                            color: '#333',
                                        },
                                    }}
                                />
                            </>
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