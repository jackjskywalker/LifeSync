import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView, // For long text scrolling
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PrivacyAndSecurityScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Privacy & Security', 
      headerBackTitle: 'Back',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Privacy and Security Policy for LifeSync+</Text>
        
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.bodyText}>
          At LifeSync+, your privacy is of utmost importance to us. This Privacy and Security Policy outlines the information we collect, how we use and protect your data, and your rights in relation to the data we hold. By using LifeSync+, you consent to the practices described in this policy.
        </Text>

        <Text style={styles.sectionTitle}>2. Information We Collect</Text>
        <Text style={styles.bodyText}>
          LifeSync+ collects both personal and non-personal information to provide and improve our services.
        </Text>
        <Text style={styles.subSectionTitle}>a) Personal Information:</Text>
        <Text style={styles.bodyText}>
          - Account Information: When you create an account, we collect your name, email address, and other account details.{' \n'}
          - Health Data: We collect health-related data, including but not limited to your fitness goals, workout history, calorie intake, weight, activity levels, and sleep patterns.{' \n'}
          - Payment Information: If you subscribe to a premium version of the app, we collect payment information, including billing details, through a third-party payment processor.
        </Text>
        
        <Text style={styles.subSectionTitle}>b) Non-Personal Information:</Text>
        <Text style={styles.bodyText}>
          - Usage Data: We collect data on how you interact with LifeSync+, such as the pages you visit, the time spent on the app, and crash logs, which helps us improve the user experience.{' \n'}
          - Device Information: We may collect information about the devices you use to access LifeSync+, including device type, operating system, and browser type.{' \n'}
          - Cookies: LifeSync+ uses cookies to enhance your experience and provide a more personalized service. You can control cookies through your device settings.
        </Text>

        <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
        <Text style={styles.bodyText}>
          We use your data for the following purposes:
        </Text>
        <Text style={styles.bodyText}>
          - To Provide Services: We use your information to create and manage your account, track your fitness progress, and offer personalized recommendations based on your health data.{' \n'}
          - To Improve User Experience: Your data helps us enhance the functionality and performance of LifeSync+, making the app more tailored to your needs.{' \n'}
          - To Communicate with You: We may send you updates, notifications, and customer support information. You can opt-out of marketing communications at any time.{' \n'}
          - To Process Payments: Payment information is used solely for processing transactions for premium services, using a secure, third-party payment processor.{' \n'}
          - Legal Compliance: We may use your data to comply with legal obligations, resolve disputes, and enforce our agreements.
        </Text>

        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <Text style={styles.bodyText}>
          We take the security of your personal information seriously. We implement industry-standard security measures, including:
        </Text>
        <Text style={styles.bodyText}>
          - Encryption: Sensitive data, such as passwords and health information, is encrypted both in transit and at rest to protect against unauthorized access.{' \n'}
          - Secure Servers: We store your information on secure servers with strong firewalls and other security measures to prevent unauthorized access.{' \n'}
          - Access Control: We restrict access to your personal information to authorized personnel only, who require the data to perform their duties.
        </Text>

        <Text style={styles.sectionTitle}>5. User Rights</Text>
        <Text style={styles.bodyText}>
          As a user of LifeSync+, you have the following rights:
        </Text>
        <Text style={styles.bodyText}>
          - Access: You have the right to access the personal information we hold about you.{' \n'}
          - Correction: You can update or correct your personal information through the app settings or by contacting us directly.{' \n'}
          - Deletion: You can request to delete your account and personal data. We will delete your data as required by law, but certain information may be retained for legal or administrative purposes.{' \n'}
          - Opt-Out: You can opt out of receiving marketing communications at any time by adjusting your settings or following the unsubscribe link in our emails.{' \n'}
          - Data Portability: You can request to receive a copy of your data in a portable format.
        </Text>

        <Text style={styles.sectionTitle}>6. Changes to This Privacy and Security Policy</Text>
        <Text style={styles.bodyText}>
          We may update this Privacy and Security Policy from time to time. Any changes will be posted within the app and on this page, and the "Effective Date" will be updated. We encourage you to review this policy periodically for any updates.
        </Text>

        <Text style={styles.sectionTitle}>7. Contact Us</Text>
        <Text style={styles.bodyText}>
          If you have any questions or concerns about this Privacy and Security Policy, or if you wish to exercise any of your rights, please contact us at:
        </Text>
        <Text style={styles.bodyText}>
          **LifeSync+ Support Team**{' \n'}
          Email: support@lifesyncapp.com{' \n'}
          Address: [Insert Address Here]
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 15,
  },
  scrollContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 22,
    marginTop: 5,
  },
});
