// App.js
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  ActivityIndicator, 
  TouchableOpacity, 
  RefreshControl,
  SafeAreaView,
  StatusBar
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

// Register your app in Google Cloud Console to get these credentials
// https://docs.expo.dev/guides/authentication/#google
const CLIENT_ID = 'YOUR_CLIENT_ID';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';

// Ensure web browser redirect is handled properly
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Set up Google OAuth
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI,
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    responseType: ResponseType.Token,
  });

  // Handle OAuth response
  useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
    } else if (response?.type === 'error') {
      setError('Authentication failed');
    }
  }, [response]);

  // Get today's events when authenticated
  useEffect(() => {
    if (accessToken) {
      fetchTodaysEvents();
    }
  }, [accessToken]);

  // Format time from ISO string to readable format
  const formatTime = (isoString) => {
    if (!isoString) return 'All day';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Fetch events for today
  const fetchTodaysEvents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get today's date boundaries
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();
      
      // Make API request to Google Calendar
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${startOfDay}&timeMax=${endOfDay}&orderBy=startTime&singleEvents=true`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }
      
      setEvents(data.items || []);
    } catch (err) {
      setError(`Failed to fetch events: ${err.message}`);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Pull to refresh functionality
  const onRefresh = () => {
    setRefreshing(true);
    fetchTodaysEvents();
  };

  // Render each event
  const renderEvent = (event, index) => {
    const startTime = event.start.dateTime ? formatTime(event.start.dateTime) : 'All day';
    const endTime = event.end.dateTime ? formatTime(event.end.dateTime) : '';
    const timeDisplay = endTime ? `${startTime} - ${endTime}` : startTime;
    
    return (
      <View key={index} style={styles.eventCard}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle}>{event.summary || 'Untitled Event'}</Text>
          <Text style={styles.eventTime}>{timeDisplay}</Text>
        </View>
        
        {event.location && (
          <View style={styles.eventDetail}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.eventLocation}>{event.location}</Text>
          </View>
        )}
        
        {event.description && (
          <Text style={styles.eventDescription}>{event.description}</Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today's Schedule</Text>
        <Text style={styles.dateText}>
          {new Date().toLocaleDateString(undefined, { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
      </View>
      
      {!accessToken ? (
        <View style={styles.authContainer}>
          <Text style={styles.authText}>Sign in to view your schedule</Text>
          <TouchableOpacity 
            style={styles.authButton} 
            onPress={() => promptAsync()}
            disabled={!request}
          >
            <Text style={styles.authButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {loading && !refreshing ? (
            <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity 
                style={styles.retryButton} 
                onPress={fetchTodaysEvents}
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : events.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>No events scheduled for today</Text>
            </View>
          ) : (
            events.map(renderEvent)
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  scrollContent: {
    padding: 16,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  authText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  authButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loader: {
    marginTop: 40,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  eventTime: {
    fontSize: 14,
    color: '#4285F4',
    fontWeight: '500',
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
});