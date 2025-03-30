// by Sam Linnemann

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HelpCenterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !question) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    
    // Handle submission logic here (e.g., send data to backend)
    Alert.alert('Thank You', 'Your question has been submitted!');
    setName('');
    setEmail('');
    setQuestion('');
  };

    const navigation = useNavigation();
  
    useEffect(() => {
      navigation.setOptions({
        title: 'Help Center', 
        headerBackTitle: 'Back',
      });
    }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.faq}>FAQ</Text>

      <Text style={styles.FAQquestion}>What is LifeSyc+?</Text>
      <Text style={styles.FAQanswer}>
      LifeSync+ is a health and fitness app designed for busy professionals. 
      It helps users track workouts, meal plans, and overall wellness by providing personalized recommendations, calendar scheduling, and progress tracking.
      </Text>

      <Text style={styles.FAQquestion}>Does LifeSync+ integrate with my calendar?</Text>
      <Text style={styles.FAQanswer}>
      Yes! LifeSync+ integrates with your calendar to help you schedule workouts, meal plans, and reminders. 
      You can sync it with Google Calendar, Apple Calendar, and other scheduling apps to stay on track with your health goals.
      </Text>

      <Text style={styles.FAQquestion}>Can I customize my workout and meal plans?</Text>
      <Text style={styles.FAQanswer}>
      Absolutely! LifeSync+ offers personalized meal and workout plans based on your fitness goals, dietary preferences, and schedule. 
      You can also manually adjust and create custom plans.
      </Text>

      <Text style={styles.FAQquestion}>How do I enable notifications for workout reminders?</Text>
      <Text style={styles.FAQanswer}>
      You can enable or customize notifications in the Settings section of the app. 
      This allows you to receive reminders for workouts, meals, hydration, and daily wellness tips.
      </Text>

      <Text style={styles.FAQquestion}>How do I contact customer support if I need help?</Text>
      <Text style={styles.FAQanswer}>
        You can submit a question below, or email us at support@lifesyncapp.com for further questions.
      </Text>

      <Text style={styles.formHeader}>Submit a question below</Text>

      <Text style={styles.label}>Your Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Your Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Your Question</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        value={question}
        onChangeText={setQuestion}
        placeholder="Describe your question or issue"
        multiline
      />

      <TouchableOpacity style={styles.button}onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  faq: {
    fontSize: '40',
    textAlign: 'center',
  },
  FAQquestion: {
    fontSize: '24',
    marginTop: '20',
    padding: '5',
  },
  FAQanswer: {
    fontSize: '15',
    marginTop: '5',
  },
  formHeader: {
    marginTop: '100',
    fontSize: '24',
    textAlign: 'center',
    marginBottom: '25',
  },
  title: {
    fontSize: '24',
    fontWeight: 'bold',
    marginBottom: '20',
    textAlign: 'center',
  },
  label: {
    fontSize: '16',
    fontWeight: '600',
    marginVertical: '10',
  },
  input: {
    padding: '10',
    borderRadius: '5',
    marginVertical: '5',
    backgroundColor: '#fff', // Ensure background color is set
    borderWidth: '1',
    borderColor: '#00000060',
  },
  button: {
    backgroundColor: '#0690FF',
    padding: '10',
    borderRadius: '5',
    alignItems: 'center',
    marginLeft: '100',
    marginRight: '100',
    marginTop: '20',
  },
  buttonText: {
    color: '#f8f9fc',
    fontSize: '15',
    fontWeight: '600',
    letterSpacing: '0.5',
  },
});
