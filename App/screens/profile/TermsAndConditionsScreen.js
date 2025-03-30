// by Sam Linnemann

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView, // Use ScrollView for long text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TermsAndConditionsScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Terms & Conditions', 
      headerBackTitle: 'Back',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Terms & Conditions for LifeSync+ Health and Fitness Application</Text>
        
        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.bodyText}>
          By downloading, installing, or using LifeSync+, you agree to comply with these Terms & Conditions.
          If you do not agree with any part of these terms, you should not use the application.
        </Text>

        <Text style={styles.sectionTitle}>2. User Eligibility</Text>
        <Text style={styles.bodyText}>
          You must be at least 18 years of age or the age of majority in your jurisdiction to use LifeSync+.
          If you are under 18, you may only use the application with parental consent.
        </Text>

        <Text style={styles.sectionTitle}>3. Privacy and Data Usage</Text>
        <Text style={styles.bodyText}>
          Your privacy is important to us. We collect and store personal data to provide services to you, including tracking your health metrics and activity data.
        </Text>

        <Text style={styles.sectionTitle}>4. Health and Fitness Information</Text>
        <Text style={styles.bodyText}>
          LifeSync+ provides recommendations and guidance based on your activity and fitness levels. However, we do not claim to replace professional medical advice. Always consult a healthcare professional before making changes to your fitness or diet regimen.
        </Text>

        <Text style={styles.sectionTitle}>5. Termination of Service</Text>
        <Text style={styles.bodyText}>
          We reserve the right to suspend or terminate your access to the application at any time without prior notice for violation of these Terms & Conditions.
        </Text>

        <Text style={styles.sectionTitle}>6. Limitation of Liability</Text>
        <Text style={styles.bodyText}>
          LifeSync+ is not liable for any damages resulting from the use or inability to use the application, including but not limited to injury, loss of data, or any indirect or consequential loss.
        </Text>

        <Text style={styles.sectionTitle}>7. Changes to Terms</Text>
        <Text style={styles.bodyText}>
          We may update or modify these Terms & Conditions at any time. The latest version will be posted within the application.
        </Text>
        
        <Text style={styles.sectionTitle}>8. Governing Law</Text>
        <Text style={styles.bodyText}>
          These terms are governed by the laws of the jurisdiction in which LifeSync+ operates. Any disputes will be resolved in the courts of that jurisdiction.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: '1', 
    backgroundColor: '#fff', 
    padding: '15',
  },
  scrollContainer: {
    marginTop: '20',
  },
  title: {
    fontSize: '24',
    fontWeight: 'bold',
    marginBottom: '20',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '18',
    fontWeight: 'bold',
    marginTop: '15',
  },
  bodyText: {
    fontSize: '16',
    lineHeight: '22',
    marginTop: '5',
  },
});
