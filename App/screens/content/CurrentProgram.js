import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    ScrollView
} from 'react-native';
// If using Expo:
import { Ionicons } from '@expo/vector-icons';
// Otherwise, for bare RN:
// import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config';
import { useFocusEffect } from '@react-navigation/native';

export default function RecommendedProgramScreen({ navigation }) {
    const [program, setProgram] = useState(null);
    const [plans, setPlans] = useState([]);
    const [loadingProgram, setLoadingProgram] = useState(true);
    const [loadingPlans, setLoadingPlans] = useState(false);

    // Fetch recommended program
    const fetchRecommendedProgram = async () => {
        try {
            setLoadingProgram(true);
            const token = await AsyncStorage.getItem('userToken');
            const response = await fetch(`${API_URL}/recommended-program`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    const data = await response.json();
                    Alert.alert('No Program Found', data.error || 'No matching program');
                    setProgram(null);
                } else {
                    throw new Error('Failed to fetch recommended program');
                }
            } else {
                const data = await response.json();
                setProgram(data.program);
            }
        } catch (error) {
            console.error('Error fetching recommended program:', error);
            Alert.alert('Error', 'Failed to load recommended program');
        } finally {
            setLoadingProgram(false);
        }
    };

    // Fetch workout plans for the recommended program
    const fetchWorkoutPlans = async (programId) => {
        try {
            setLoadingPlans(true);
            const token = await AsyncStorage.getItem('userToken');
            const response = await fetch(`${API_URL}/program/${programId}/plans`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch workout plans');
            }
            const data = await response.json();
            setPlans(data);
        } catch (error) {
            console.error('Error fetching workout plans:', error);
            Alert.alert('Error', 'Failed to load workout plans');
        } finally {
            setLoadingPlans(false);
        }
    };

    // Re-run fetch whenever this screen is focused
    useFocusEffect(
        useCallback(() => {
            fetchRecommendedProgram();
        }, [])
    );

    // Fetch plans if we have a program ID
    useEffect(() => {
        if (program?.id) {
            fetchWorkoutPlans(program.id);
        } else {
            setPlans([]);
        }
    }, [program]);

    // Loading indicator
    if (loadingProgram) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={stylesVars.primaryColor} />
                <Text style={{ marginTop: 10, color: '#333' }}>
                    Loading recommended program...
                </Text>
            </View>
        );
    }

    // If there's no recommended program
    if (!program) {
        return (
            <View style={styles.noProgramContainer}>
                <Text style={styles.noProgramText}>No recommended program found.</Text>
                <TouchableOpacity
                    style={styles.goBackButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.goBackText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Handle plan press (optional)
    const handlePlanPress = (plan) => {
        Alert.alert('Plan Selected', `You tapped: ${plan.workout_name}`);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Program Details */}
            <View style={styles.programContainer}>
                <Text style={styles.title}>{program.name}</Text>

                {/* 
                  Icon row now displays:
                  - Difficulty (barbell)
                  - Goal (flag)
                  - Type (home or location)
                  (Calendar/days is removed)
                */}
                <View style={styles.iconRow}>
                    {/* Difficulty */}
                    <View style={styles.iconItem}>
                        <Ionicons name="barbell-outline" size={18} color={stylesVars.primaryColor} />
                        <Text style={styles.iconText}>{program.difficulty}</Text>
                    </View>
                    {/* Goal */}
                    <View style={styles.iconItem}>
                        <Ionicons name="flag-outline" size={18} color={stylesVars.primaryColor} />
                        <Text style={styles.iconText}>{program.goal}</Text>
                    </View>
                    {/* Type: home or gym */}
                    <View style={styles.iconItem}>
                        <Ionicons
                            name={program.type === 'home' ? 'home-outline' : 'location-outline'}
                            size={18}
                            color={stylesVars.primaryColor}
                        />
                        <Text style={styles.iconText}>{program.type}</Text>
                    </View>
                </View>

                {/* Program Cover Image */}
                {program.cover_image ? (
                    <Image
                        source={{ uri: program.cover_image }}
                        style={styles.coverImage}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.placeholderImage}>
                        <Text style={{ color: '#555' }}>No Cover Image</Text>
                    </View>
                )}
            </View>

            {/* Workout Plans */}
            <Text style={styles.sectionHeader}>Workout Plans</Text>

            {loadingPlans && (
                <ActivityIndicator
                    size="small"
                    color={stylesVars.primaryColor}
                    style={{ marginVertical: 10 }}
                />
            )}

            {plans.map((plan) => (
                <TouchableOpacity
                    key={plan.id}
                    style={styles.planCard}
                    onPress={() => handlePlanPress(plan)}
                >
                    {plan.cover_image ? (
                        <Image
                            source={{ uri: plan.cover_image }}
                            style={styles.planImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.planPlaceholder}>
                            <Ionicons name="image-outline" size={36} color="#999" />
                        </View>
                    )}
                    <View style={styles.planInfo}>
                        <Text style={styles.planName}>{plan.workout_name}</Text>
                        <View style={styles.durationRow}>
                            <Ionicons
                                name="time-outline"
                                size={14}
                                color={stylesVars.primaryColor}
                            />
                            <Text style={styles.planDuration}> {plan.duration} mins</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}

            <TouchableOpacity
                style={styles.goBackButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.goBackText}>Go Back</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

// Shared color and style variables
const stylesVars = {
    primaryColor: '#0690FF',
    lightBg: '#F4FAFF',
    secondaryBg: '#E8F2FF',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: stylesVars.lightBg,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: stylesVars.lightBg,
    },
    noProgramContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: stylesVars.lightBg,
    },
    noProgramText: {
        fontSize: 16,
        marginBottom: 20,
        color: '#333',
    },
    programContainer: {
        padding: 16,
        marginBottom: 10,
        backgroundColor: stylesVars.secondaryBg,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    iconRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    iconItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        marginTop: 4,
    },
    iconText: {
        marginLeft: 6,
        color: '#444',
        fontSize: 14,
    },
    coverImage: {
        width: '100%',
        height: 200,
        marginTop: 10,
        borderRadius: 5,
    },
    placeholderImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#ccc',
        marginTop: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 16,
        marginTop: 10,
        marginBottom: 10,
        color: '#333',
    },
    planCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 16,
        marginBottom: 10,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    planImage: {
        width: 70,
        height: 70,
        borderRadius: 5,
        marginRight: 10,
    },
    planPlaceholder: {
        width: 70,
        height: 70,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    planInfo: {
        flex: 1,
    },
    planName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    durationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    planDuration: {
        fontSize: 14,
        color: '#666',
    },
    goBackButton: {
        backgroundColor: stylesVars.primaryColor,
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        margin: 16,
    },
    goBackText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
