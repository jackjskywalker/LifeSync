import React, { useState, useEffect } from 'react';
import { Text, View, Button, FlatList, ActivityIndicator } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

// This usually helps with the in-app browser hooking
WebBrowser.maybeCompleteAuthSession();

// Replace with your own Google OAuth client ID
const CLIENT_ID = '653945354930-rcuphnf62hg8lroh93vena38gja6frud.apps.googleusercontent.com';
// The scopes we want – Calendar.readonly for retrieving events
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

export default function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Build Auth URL
  const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint:       'https://oauth2.googleapis.com/token',
    revocationEndpoint:  'https://oauth2.googleapis.com/revoke'
  };

  const redirectUri = "https://auth.expo.io/@jackjskywalker/lifesync";

  // Then pass it in:
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: SCOPES,
      redirectUri,
    },
    discovery
  );
  
  useEffect(() => {
    // If we get a response with a token, store it
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        setAccessToken(authentication.accessToken);
      }
    }
  }, [response]);

  useEffect(() => {
    // Once we have an access token, fetch events
    if (accessToken) {
      fetchCalendarEvents();
    }
  }, [accessToken]);

  const fetchCalendarEvents = async () => {
    setLoading(true);

    // Build request to get events from "primary" calendar
    // We'll filter by "today's" time range
    // (For a real production app, you might want to handle time zones carefully)
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).toISOString();
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).toISOString();

    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${startOfToday}&timeMax=${endOfToday}&singleEvents=true&orderBy=startTime`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.json();

      if (data?.items) {
        setCalendarEvents(data.items);
      } else {
        console.log('No items or error in response:', data);
      }
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 8 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.summary}</Text>
        {item.start?.dateTime && (
          <Text>Start: {new Date(item.start.dateTime).toLocaleTimeString()}</Text>
        )}
        {item.end?.dateTime && (
          <Text>End: {new Date(item.end.dateTime).toLocaleTimeString()}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 50 }}>
      {!accessToken ? (
        <Button
          disabled={!request}
          title="Login with Google"
          onPress={() => {
            promptAsync({ useProxy: true });
          }}
        />
      ) : loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Today's Events</Text>
          <FlatList
            data={calendarEvents}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={<Text>No events for today.</Text>}
          />
        </>
      )}
    </View>
  );
}
