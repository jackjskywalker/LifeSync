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

export const AuthContext = createContext();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 1) Dashboard Stack
const DashboardStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
                headerShown: true,
                title: 'Dashboard',
                headerStyle: {
                    backgroundColor: '#f8f9fc',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#333',
                },
            }}
        />
    </Stack.Navigator>
);

// 2) Recommended Program Stack
const RecommendedProgramStackNavigator = () => (
    <Stack.Navigator>
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
    </Stack.Navigator>
);

// 2) Recommended Program Stack
const RecommendedProgramStackNavigator = () => (
    <Stack.Navigator>
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
    </Stack.Navigator>
);

// 3) Nutrition Stack (formerly Health)
const NutritionStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="NutritionMain"
            component={HealthScreen}
            options={{
                headerShown: true,
                title: 'Nutrition',
                headerStyle: {
                    backgroundColor: '#f8f9fc',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#333',
                },
            }}
        />
        <Stack.Screen
            name="RecipeDetail"
            component={RecipeDetailScreen}
            options={{
                headerShown: true,
                title: 'Recipe Detail',
                headerStyle: {
                    backgroundColor: '#f8f9fc',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#333',
                },
            }}
        />
    </Stack.Navigator>
);

// 4) Schedule Stack
const ScheduleStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="ScheduleMain"
            component={ScheduleScreen}
            options={{
                headerShown: true,
                title: 'Schedule',
                headerStyle: {
                    backgroundColor: '#f8f9fc',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#333',
                },
            }}
        />
    </Stack.Navigator>
);

// 5) Profile Stack (formerly Settings)
const ProfileStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="ProfileMain"
            component={SettingsScreen}
            options={{
                headerShown: true,
                title: 'Profile',
                headerStyle: {
                    backgroundColor: '#f8f9fc',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#333',
                },
            }}
        />
        <Stack.Screen
            name="UserAvailabilityScreen"
            component={UserAvailabilityScreen}
            options={{
                headerShown: true,
                title: 'User Availability',
                headerStyle: {
                    backgroundColor: '#f8f9fc',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#333',
                },
            }}
        />
        <Stack.Screen
            name="FitnessPreferenceScreen"
            component={FitnessPreferenceScreen}
            options={{
                headerShown: true,
                title: 'Fitness Preference',
                headerStyle: {
                    backgroundColor: '#f8f9fc',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#333',
                },
            }}
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

// 6) Main Tab Navigator
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