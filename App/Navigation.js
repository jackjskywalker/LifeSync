import React, { useEffect, useState, createContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import DashboardScreen from './screens/Dashboard';
import RecommendedProgramScreen from './screens/CurrentProgram';
import HealthScreen from './screens/Nutrition';
import SettingsScreen from './screens/UserProfile';
import FitnessPreferenceScreen from './screens/profile/FitnessPreferenceScreen';
import LoginScreen from './screens/login/Login';
import RegisterScreen from './screens/login/Register';
import ForgotPasswordScreen from './screens/login/ForgotPassword';
import RecipeDetailScreen from './screens/Recipe';
import UserAvailabilityScreen from './screens/profile/UserAvailabilityScreen';
import ScheduleScreen from './screens/Schedule';

// Newly added screens in the settings/profile section
import AccountProfileScreen from './screens/profile/AccountProfileScreen';
import NotificationScreen from './screens/profile/NotificationScreen';
import PrivacyAndSecurityScreen from './screens/profile/PrivacyAndSecurityScreen';
import TermsAndConditionsScreen from './screens/profile/TermsAndConditionsScreen';
import HelpCenterScreen from './screens/profile/HelpCenterScreen';

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
                headerStyle: { backgroundColor: '#f8f9fc' },
                headerTitleStyle: { fontWeight: 'bold', color: '#333' },
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
                headerStyle: { backgroundColor: '#f8f9fc' },
                headerTitleStyle: { fontWeight: 'bold', color: '#333' },
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
                headerStyle: { backgroundColor: '#f8f9fc' },
                headerTitleStyle: { fontWeight: 'bold', color: '#333' },
            }}
        />
        <Stack.Screen
            name="RecipeDetail"
            component={RecipeDetailScreen}
            options={{
                headerShown: true,
                title: 'Recipe Detail',
                headerStyle: { backgroundColor: '#f8f9fc' },
                headerTitleStyle: { fontWeight: 'bold', color: '#333' },
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
                headerStyle: { backgroundColor: '#f8f9fc' },
                headerTitleStyle: { fontWeight: 'bold', color: '#333' },
            }}
        />
    </Stack.Navigator>
);

// 5) Profile Stack (formerly Settings)
// The updated stack now includes additional screens.
const ProfileStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="ProfileMain"
            component={SettingsScreen}
            options={{
                headerShown: true,
                title: 'Profile',
                headerStyle: { backgroundColor: '#f8f9fc' },
                headerTitleStyle: { fontWeight: 'bold', color: '#333' },
            }}
        />
        <Stack.Screen
            name="AccountProfile"
            component={AccountProfileScreen}
            options={{
                headerShown: true,
                title: 'Account Profile',
                headerStyle: { backgroundColor: '#f8f9fc' },
                headerTitleStyle: { fontWeight: 'bold', color: '#333' },
            }}
        />
        <Stack.Screen
            name="UserAvailabilityScreen"
            component={UserAvailabilityScreen}
            options={{
                headerShown: true,
                title: 'User Availability',
                headerStyle: { backgroundColor: '#f8f9fc' },
                headerTitleStyle: { fontWeight: 'bold', color: '#333' },
            }}
        />
        <Stack.Screen
            name="FitnessPreferenceScreen"
            component={FitnessPreferenceScreen}
            options={{
                headerShown: true,
                title: 'Fitness Preference',
                headerStyle: { backgroundColor: '#f8f9fc' },
                headerTitleStyle: { fontWeight: 'bold', color: '#333' },
            }}
        />
        <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={{
                headerShown: true,
                title: 'Notifications',
                headerStyle: { backgroundColor: '#f8f9fc' },
                headerTitleStyle: { fontWeight: 'bold', color: '#333' },
            }}
        />
        <Stack.Screen
            name="PrivacyAndSecurityScreen"
            component={PrivacyAndSecurityScreen}
            options={{
                headerShown: true,
                title: 'Privacy & Security',
                headerStyle: { backgroundColor: '#f8f9fc' },
                headerTitleStyle: { fontWeight: 'bold', color: '#333' },
            }}
        />
        <Stack.Screen
            name="TermsAndConditionsScreen"
            component={TermsAndConditionsScreen}
            options={{
                headerShown: true,
                title: 'Terms & Conditions',
                headerStyle: { backgroundColor: '#f8f9fc' },
                headerTitleStyle: { fontWeight: 'bold', color: '#333' },
            }}
        />
        <Stack.Screen
            name="HelpCenterScreen"
            component={HelpCenterScreen}
            options={{
                headerShown: true,
                title: 'Help Center',
                headerStyle: { backgroundColor: '#f8f9fc' },
                headerTitleStyle: { fontWeight: 'bold', color: '#333' },
            }}
        />
    </Stack.Navigator>
);

// 6) Main Tab Navigator
const MainTabNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
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
        return null;
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
                                        headerStyle: { backgroundColor: '#f8f9fc' },
                                        headerTitleStyle: { fontWeight: 'bold', color: '#333' },
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