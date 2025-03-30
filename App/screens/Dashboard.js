import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from 'react-native-vector-icons';

// Inspirational Quotes array
const quotes = [
  "The best way to predict the future is to create it.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Don't watch the clock; do what it does. Keep going.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Believe you can and you're halfway there.",
  "Success usually comes to those who are too busy to be looking for it.",
];

// ==================
// STATS SCREEN CODE
// (unchanged content, only placed here)
// ==================
function StatsScreen({ navigation }) {
  // All original states and data:
  const [showGoals, setShowGoals] = useState(true);

  const healthData = [
    { id: '1', title: "Step Count", value: "7,320 steps", icon: "directions-walk" },
    { id: '2', title: "Calories Burned", value: "512 kcal", icon: "fitness-center" },
    { id: '3', title: "Active Minutes", value: "30 min", icon: "accessibility" },
    { id: '4', title: "Water Intake", value: "2.5L", icon: "local-drink" },
  ];

  const goalData = [
    { id: '1', title: "Steps Goal", value: "10,000 steps", progress: 0.73 },
    { id: '2', title: "Calories Goal", value: "600 kcal", progress: 0.85 },
    { id: '3', title: "Active Minutes Goal", value: "45 min", progress: 0.66 },
  ];

  // Render item methods:
  const renderHealthItem = ({ item }) => (
    <View style={statsStyles.healthItemContainer}>
      <MaterialIcons name={item.icon} size={40} color="#0690FF" />
      <View style={statsStyles.healthItemText}>
        <Text style={statsStyles.healthItemTitle}>{item.title}</Text>
        <Text style={statsStyles.healthItemValue}>{item.value}</Text>
      </View>
    </View>
  );

  const renderGoalItem = ({ item }) => (
    <View style={statsStyles.goalContainer}>
      <Text style={statsStyles.goalTitle}>{item.title}</Text>
      <Text style={statsStyles.goalValue}>{item.value}</Text>
      <View style={statsStyles.goalProgressBar}>
        <View style={[statsStyles.goalProgressFill, { width: `${item.progress * 100}%` }]} />
      </View>
    </View>
  );

  // Return for StatsScreen
  return (
    <FlatList
      data={[]} // We don't need direct list items; using ListHeaderComponent & ListFooterComponent
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View style={statsStyles.headerContainer}>
          <FlatList
            data={healthData}
            renderItem={renderHealthItem}
            keyExtractor={item => item.id}
            style={statsStyles.healthList}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <TouchableOpacity
            style={statsStyles.toggleGoalsButton}
            onPress={() => setShowGoals(!showGoals)}
          >
            <Text style={statsStyles.toggleGoalsText}>
              {showGoals ? 'Hide Goals' : 'Show Goals'}
            </Text>
          </TouchableOpacity>
        </View>
      }
      ListFooterComponent={
        showGoals && (
          <View style={statsStyles.footerContainer}>
            <Text style={statsStyles.title}>Fitness Goals</Text>
            <FlatList
              data={goalData}
              renderItem={renderGoalItem}
              keyExtractor={item => item.id}
              style={statsStyles.goalList}
            />
          </View>
        )
      }
      style={statsStyles.container}
    />
  );
}

// StatsScreen Styles (unchanged, just renamed to `statsStyles` internally)
const statsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  footerContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  healthList: {
    marginBottom: 20,
  },
  healthItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  healthItemText: {
    marginLeft: 15,
  },
  healthItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  healthItemValue: {
    fontSize: 16,
    color: '#555',
  },
  toggleGoalsButton: {
    padding: 10,
    marginTop: 15,
    backgroundColor: '#0690FF',
    borderRadius: 20,
    alignItems: 'center',
  },
  toggleGoalsText: {
    color: '#fff',
    fontSize: 16,
  },
  goalContainer: {
    marginVertical: 15,
    padding: 20,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  goalValue: {
    fontSize: 16,
    color: '#555',
  },
  goalProgressBar: {
    marginTop: 10,
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  goalProgressFill: {
    height: '100%',
    backgroundColor: '#0690FF',
  },
});

// ==================
// DASHBOARD SCREEN
// ==================
const DashboardScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [quote, setQuote] = useState('');
  const [programName, setProgramName] = useState('');

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
    // We directly render the integrated StatsScreen:
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
          <Text
            style={[
              styles.dayText,
              index === currentDayIndex ? styles.currentDayText : styles.defaultDayText,
            ]}
          >
            {day}
          </Text>
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

// ==============
// DASHBOARD STYLES
// ==============
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
