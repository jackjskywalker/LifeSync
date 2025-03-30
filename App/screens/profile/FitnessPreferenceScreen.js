// by Jack Skywalker enhanced by Isaac Ludwig
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config';

export default function FitnessPreferenceScreen({ navigation }) {
    const [level, setLevel] = useState(null);
    const [type, setType] = useState(null);
    const [goal, setGoal] = useState(null);
    const [loading, setLoading] = useState(false);
    const scaleAnim = useState(new Animated.Value(1))[0];

    const handleSavePreferences = async () => {

        if (!level || !type || !goal) {
            Alert.alert('Validation', 'Please select all preferences before saving.');
            return;
        }
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await fetch(`${API_URL}/user-preference`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ level, type, goal }),
            });
            if (!response.ok) throw new Error('Failed to save preferences');
            const data = await response.json();
            Alert.alert('Success', data.message);
            navigation.goBack();
        } catch (error) {
            console.error('Error saving preferences:', error);
            Alert.alert('Error', 'An error occurred while saving preferences.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const res = await fetch(`${API_URL}/user-preference`, { headers: { Authorization: `Bearer ${token}` } });
                if (res.ok) {
                    const prefData = await res.json();
                    setLevel(prefData.level);
                    setType(prefData.type);
                    setGoal(prefData.goal);
                }
            } catch (error) {
                console.error('Error fetching preferences:', error);
            }
        };
        fetchPreferences();
    }, []);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, { toValue: 0.9, useNativeDriver: true }).start();
    };
    const handlePressOut = () => {
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
    };

    const renderSegmentedControl = (options, selected, setSelected) => (
        <View style={styles.segmentContainer}>
            {options.map((option) => (
                <TouchableOpacity
                    key={option.value}
                    style={[styles.segment, selected === option.value && styles.segmentSelected]}
                    onPress={() => setSelected(option.value)}>
                    <Text style={[styles.segmentText, selected === option.value && styles.segmentTextSelected]}>
                        {option.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set Your Fitness Preferences</Text>
            <Text style={styles.label}>Level</Text>
            {renderSegmentedControl([
                { label: 'Beginner', value: 'beginner' },
                { label: 'Interm', value: 'intermediate' },
                { label: 'Advanced', value: 'advanced' }
            ], level, setLevel)}
            <Text style={styles.label}>Type</Text>
            {renderSegmentedControl([
                { label: 'Home', value: 'home' },
                { label: 'Gym', value: 'gym' }
            ], type, setType)}

            <Text style={styles.label}>Goal</Text>
            {renderSegmentedControl([
                { label: 'Muscle Gain', value: 'muscle gain' },
                { label: 'Lose Weight', value: 'lose weight' }
            ], goal, setGoal)}

            {loading && <ActivityIndicator size="large" color="#007bff" style={styles.loader} />}

            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSavePreferences}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}>
                    <Text style={styles.saveButtonText}>Save Preferences</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f7f7f7' },
    title: { fontSize: 22, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
    label: { fontSize: 16, marginTop: 20, marginBottom: 5 },
    segmentContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
    segment: { padding: 10, flex: 1, alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, margin: 3 },
    segmentSelected: { backgroundColor: '#007bff', borderColor: '#007bff' },
    segmentText: { fontSize: 16, color: '#333' },
    segmentTextSelected: { color: '#fff', fontWeight: 'bold' },
    loader: { marginTop: 10 },
    saveButton: { backgroundColor: '#007bff', marginTop: 20, padding: 15, alignItems: 'center', borderRadius: 5 },
    saveButtonText: { color: '#fff', fontWeight: 'bold' }
});
