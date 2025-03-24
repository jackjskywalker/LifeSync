import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StatsScreen from './StatsScreen';

// Inspirational Quotes array
const quotes = [
    "The best way to predict the future is to create it.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Don't watch the clock; do what it does. Keep going.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Believe you can and you're halfway there.",
    "Success usually comes to those who are too busy to be looking for it.",
];

const DashboardScreen = () => {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [quote, setQuote] = useState(''); // State for the randomly selected quote
    const [programName, setProgramName] = useState(''); // State for the program name

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const response = await fetch(`${API_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setUserName(data.name);
            } catch (error) {
                console.error('Error fetching user name:', error);
            }
        };

        const fetchProgramName = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const response = await fetch(`${API_URL}/recommended-program`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        const data = await response.json();
                        console.error('No Program Found:', data.error || 'No matching program');
                        setProgramName('Enter preferences in profile!');
                    } else {
                        throw new Error('Failed to fetch recommended program');
                    }
                } else {
                    const data = await response.json();
                    setProgramName(data.program.name);
                }
            } catch (error) {
                console.error('Error fetching program name:', error);
            }
        };

        fetchUserName();
        fetchProgramName();

        // Select a random quote
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
    }, []);

    const splitProgramName = (name) => {
        const parts = name.split(' - ');
        return {
            firstLine: parts[0] || '',
            secondLine: parts[1] || '',
        };
    };

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDayIndex = new Date().getDay();

    // Data for FlatList
    const data = [
        { key: 'daysOfWeek', render: () => renderDaysOfWeek() },
        { key: 'quoteBox', render: () => renderQuoteBox() },
        { key: 'greeting', render: () => renderGreeting() },
        { key: 'currentPlanBoxTitle', render: () => renderCurrentPlanBoxTitle() },
        { key: 'currentPlanBox', render: () => renderCurrentPlanBox() },
        { key: 'statsTitle', render: () => renderStatsTitle() },
        { key: 'statsBox', render: () => <StatsScreen /> },
    ];

    const renderDaysOfWeek = () => (
        <View style={styles.daysOfWeekContainer}>
            {daysOfWeek.map((day, index) => (
                <View
                    key={index}
                    style={[
                        styles.dayCircle,
                        index === currentDayIndex ? styles.currentDayCircle : styles.defaultDayCircle,
                    ]}
                >
                    <Text style={[
                        styles.dayText,
                        index === currentDayIndex ? styles.currentDayText : styles.defaultDayText,
                    ]}>{day}</Text>
                </View>
            ))}
        </View>
    );

    const renderQuoteBox = () => (
        <ImageBackground
            source={require('../assets/Images/istockphoto-1681619429-612x612.jpg')}
            style={styles.quoteBox}
            imageStyle={styles.quoteBackgroundImage}
        >
            <Text style={styles.quoteText}>{quote}</Text>
        </ImageBackground>
    );

    const renderGreeting = () => (
        <Text style={styles.greeting}>Hello, {userName}!</Text>
    );

    const renderCurrentPlanBoxTitle = () => (
        <Text style={styles.currentPlanTitle}>Current Plan</Text>
    );

    const renderCurrentPlanBox = () => {
        const { firstLine, secondLine } = splitProgramName(programName);

        return (
            <TouchableOpacity
                style={styles.currentPlanBox}
                onPress={() => navigation.navigate('RecommendedProgram')}
            >
                <Image
                    source={require('../assets/Images/istockphoto-1681619429-612x612.jpg')}
                    style={styles.currentPlanImage}
                />
                <View style={styles.currentPlanTextContainer}>
                    <Text style={styles.currentPlanText}>{firstLine}</Text>
                    <Text style={styles.currentPlanText}>{secondLine}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderStatsTitle = () => (
        <Text style={styles.statsTitle}>Stats Overview</Text>
    );

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => item.render()}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.contentContainer}
        />
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        padding: 20,
        paddingTop: 12,
    },
    daysOfWeekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    dayCircle: {
        width: 45,
        height: 45,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentDayCircle: {
        backgroundColor: '#007bff',
    },
    defaultDayCircle: {
        backgroundColor: '#fff',
        borderWidth: 4,
        borderColor: '#007bff',
    },
    dayText: {
        fontSize: 16,
    },
    currentDayText: {
        color: '#fff',
    },
    defaultDayText: {
        color: '#007bff',
    },
    quoteBox: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 5,
        padding: 10,
        overflow: 'hidden', // Ensure rounded corners are applied to the background image
    },
    quoteBackgroundImage: {
        borderRadius: 5,
        resizeMode: 'stretch', // Ensures the image covers the entire box
    },
    quoteText: {
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        color: '#fff', // Assuming the background image has a dark color, we use white text
        paddingHorizontal: 10, // Add some padding to prevent text from touching the edges
        fontWeight: 'bold', // Make the text bold
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'left',
    },
    currentPlanTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
        color: '#000',
    },
    currentPlanBox: {
        height: 120,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 5,
        padding: 10,
    },
    currentPlanImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
        marginRight: 10,
    },
    currentPlanTextContainer: {
        flexDirection: 'column',
    },
    currentPlanText: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    currentPlanContent: {
        flex: 1,
        backgroundColor: '#f8f9fc',
        width: '100%',
        borderRadius: 5,
    },
    statsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
        color: '#000',
    },
    statsBox: {
        flex: 1,
        backgroundColor: '#f8f9fc',
        borderRadius: 5,
        padding: 10,
    },
});

export default DashboardScreen;