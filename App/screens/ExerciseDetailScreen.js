//Chandler: Excerise detail screen created
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExerciseDetailScreen({ route }) {
    const { exercise } = route.params || {}; // Jacob: added a fallback to avoid errors

    // Jacob: checks if exercise is defined
    if (!exercise) {
        Alert.alert('Error', 'No exercise details available.'); // alerts user if exercise is not provided
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Error</Text>
                <Text style={styles.description}>No exercise details available.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{exercise}</Text>
            <Text style={styles.description}>Exercise details will go here along with videos to show the workouts.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        lineHeight: 30,
    },
});