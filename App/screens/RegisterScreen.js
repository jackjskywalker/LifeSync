// RegisterScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { API_URL } from '../config';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [gender, setGender] = useState('');

    const handleRegister = async () => {
        if (!name || !email || !password || !weight || !height || !gender) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, weight, height, gender }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed. Please try again.');
            }

            Alert.alert('Success', 'Registration successful', [
                { text: 'OK', onPress: () => navigation.navigate('Login') },
            ]);
        } catch (error) {
            console.error('Registration Error:', error);
            Alert.alert('Error', error.message || 'An error occurred');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Register</Text>

                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={setName}
                    value={name}
                    autoCapitalize="words"
                />

                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                />

                <Text style={styles.label}>Weight (kg)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Weight (kg)"
                    onChangeText={setWeight}
                    value={weight}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Height (m)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Height (m)"
                    onChangeText={setHeight}
                    value={height}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Gender</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Gender"
                    onChangeText={setGender}
                    value={gender}
                />

                <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
                    <Text style={styles.registerBtnText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLink}>Already have an account? Login</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f8f9fc',
    },
    title: {
        fontSize: 32,
        marginBottom: 20,
        color: '#333',
        alignSelf: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginVertical: 10,
    },
    registerBtn: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    registerBtnText: {
        color: '#fff',
        fontSize: 16,
    },
    loginLink: {
        marginTop: 20,
        color: '#007bff',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default RegisterScreen;
