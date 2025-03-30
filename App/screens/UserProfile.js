// UserProfile.js  by Jack Skywalker

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

    const handleOptionPress = (option) => {
        switch (option) {
            case 'Account Profile':
                navigation.navigate('AccountProfile');
                break;
            case 'Schedule Availability':
                navigation.navigate('UserAvailabilityScreen');
                break;
            case 'Fitness Preferences':
                navigation.navigate('FitnessPreferenceScreen');
                break;
            case 'Diet Preferences':
                Alert.alert('Diet Preferences', 'Diet Preferences screen not implemented yet.');
                break;
            case 'Notifications':
                navigation.navigate('NotificationScreen');
                break;
            case 'Help Center':
                navigation.navigate('HelpCenterScreen');
                break;
            case 'Privacy & Security':
                navigation.navigate('PrivacyAndSecurityScreen');
                break;
            case 'Terms & Conditions':
                navigation.navigate('TermsAndConditionsScreen');
                break;
            default:
                Alert.alert('Selected Option', option);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.profileImage}>
                    <MaterialIcons name="person" size={50} color="#007bff" />
                </View>
                <Text style={styles.name}>{name || 'User Name'}</Text>
                <View style={styles.emailRow}>
                    {/* Removed the @ icon here */}
                    <Text style={styles.emailText}>
                        {email || 'user@example.com'}
                    </Text>
                </View>
            </View>

            <FlatList
                data={settingsOptions}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.optionCard}
                        onPress={() => handleOptionPress(item)}
                    >
                        <Text style={styles.optionText}>{item}</Text>
                        <MaterialIcons name="chevron-right" size={24} color="#888" />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.optionList}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fb',
    },
    profileContainer: {
        backgroundColor: '#007bff',
        alignItems: 'center',
        paddingVertical: 35,  // increased from 30 to 50 for a taller header
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    emailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    emailText: {
        color: '#e0e0e0',
        fontSize: 14,
        marginLeft: 5,
    },
    optionList: {
        paddingHorizontal: 15,
    },
    optionCard: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        backgroundColor: '#007bff',
        padding: 15,
        alignItems: 'center',
        margin: 20,
        borderRadius: 10,
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
