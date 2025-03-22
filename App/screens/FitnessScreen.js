
import React, { useState, useEffect, useRef  } from 'react'; //ISAAC Added useEffect for random quote selection
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity,  StatusBar, Animated,  } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

// ISAAC Inspirational Quotes array
const quotes = [
    "The best way to predict the future is to create it.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Don't watch the clock; do what it does. Keep going.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Believe you can and you're halfway there.",
    "Success usually comes to those who are too busy to be looking for it.",
];

//Chandler: Added workout data with new workouts
const workoutData = [
    { id: '1', title: "Chest and Triceps", duration: "75 minutes", time: "Tomorrow", imageUri: require('../assets/Images/fit1.jpg') },
    { id: '2', title: "Leg Workout", duration: "65 minutes", time: "Wednesday", imageUri: require('../assets/Images/fit2.jpg') },
    { id: '3', title: "Cardio Training", duration: "30 minutes", time: "Friday", imageUri: require('../assets/Images/fit3.jpg') },
    { id: '4', title: "Yoga Session", duration: "45 minutes", time: "Saturday", imageUri: require('../assets/Images/fit4.jpg') },
    { id: '5', title: "Back and Biceps", duration: "75 minutes", time: "Monday", imageUri: require('../assets/Images/fit5.jpg') },
];

const todaysWorkout = [
  { id: '1', title: "Full Workout", duration: '90 minutes', time: "Today", imageUri: require('../assets/Images/fit5.jpg') }
];



const planData = [
    { id: '1', title: "Cardio Training", duration: "55 minutes", description: "10 Mile Run", imageUri: require('../assets/Images/fit5.jpg') },
    { id: '2', title: "Upper Body", duration: "45 minutes", description: "Target Chest", imageUri: require('../assets/Images/fit3.jpg') },
];

export default function FitnessScreen() {
  const [visibleWorkouts, setVisibleWorkouts] = useState(3);
  const [randomQuote, setRandomQuote] = useState(''); // ISAAC State to store random quote
  const fadeAnimDay = useRef(new Animated.Value(0)).current;
  const fadeAnimQuote = useRef(new Animated.Value(0)).current;

  // new ISAAC Select a random quote when the component mounts
  useEffect(() => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    setRandomQuote(quote); // Set random quote state
  }, []); // Empty dependency array means it runs only once after the component mounts
  

  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity style={styles.workoutContainer}>
      <Image source={item.imageUri} style={styles.workoutImage} />
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutTitle}>{item.title}</Text>
        <Text style={styles.workoutDetails}>{item.duration} - {item.time}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={30} color="#0690FF" style={styles.iconStyle} />
    </TouchableOpacity>
  );

  const renderPlanItem = ({ item }) => (
    <View style={styles.planContainer}>
      <Text style={styles.planDuration}>{item.duration}</Text>
      <Image source={item.imageUri} style={styles.planImage} />
      <Text style={styles.planTitle}>{item.title}</Text>
      <Text style={styles.planDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Start Now</Text>
      </TouchableOpacity>
    </View>
  );

  //Sam
  const DateTitle = () => {
    const todayDate = new Date();
    const monthYear = todayDate.toLocaleString("default", { month: "long", year: "numeric" });
  
    return <Text style={styles.monthYearText}>{monthYear}</Text>;
  };
  //Sam
  const CalendarBar = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayIndex = new Date().getDay();
    const todayDate = new Date();

  
    return (
      <View style={styles.calendarContainer}>
        {daysOfWeek.map((day, index) => {
          const date = new Date();
          date.setDate(todayDate.getDate() - todayIndex + index); // Adjust date to match the day
          return (
            <View
              key={index}
              style={[
                styles.dayBox,
                index === todayIndex && styles.currentDayBox, // Highlight today's box
              ]}
            >
              <Text style={[styles.dayText, index === todayIndex && styles.currentDayText]}>
                {day}
              </Text>
              <Text style={[styles.dateText, index === todayIndex && styles.currentDateText]}>
                {date.getDate()}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <FlatList
      data={[]} 
      keyExtractor={(index) => index.toString()}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <StatusBar barStyle="dark-content" />
          <DateTitle/>
          <CalendarBar/>

          {/* ISAAC - Added the overlay container to ensure the quote is visible on the image */}
          <View style={styles.overlayContainer}>
            <Text style={styles.quoteText}>{randomQuote}</Text>
            <Image source={require('../assets/darkLogo1.png')} style={styles.logo} />
          </View>
          <Text style={styles.wTitle}>Workouts</Text>
          <FlatList 
            data={workoutData.slice(0, visibleWorkouts)}
            renderItem={renderWorkoutItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          {visibleWorkouts < workoutData.length ? (
            <TouchableOpacity style={styles.loadMoreButton} onPress={() => setVisibleWorkouts(workoutData.length)}>
              <Text style={styles.loadMoreText}>Load More</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.loadMoreButton} onPress={() => setVisibleWorkouts(3)}>
              <Text style={styles.loadMoreText}>Show Less</Text>
            </TouchableOpacity>
          )}

                    <View style={styles.currentPlanHeader}>
                        <Text style={styles.title}>Current Plan</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AllPlans')}>
                            <Text style={styles.viewAllText}>View All Plans</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
      ListFooterComponent={
        <View style={styles.footerContainer}>
          <FlatList
            horizontal
            data={planData}
            renderItem={renderPlanItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.modifyContainer}>
            <Text style={styles.modifyText}>Modify Workout Plan</Text>
            <Text style={styles.descriptionText}>You have a new schedule change? Need to update your fitness goal? Time to update your workout plan.</Text>
            <TouchableOpacity style={styles.updateButton}>
              <Text style={styles.updateButtonText}>Update Preferences</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      style={styles.container} 
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fc', 
    backgroundColor: '#f8f9fc', 
  },
  headerContainer: {
    backgroundColor: '#f8f9fc',
    position: 'relative', //NEW ISAAC Make the header container relative so that the overlay can be positioned on top
  },
  footerContainer: {
    backgroundColor: '#f8f9fc', 
  },
  wTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 150,
    textAlign: 'center',
  },

  pTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  overlayContainer: { // New style for quote overlay
    position: 'absolute',
    top: 105,
    left: 12,
    right: 12,
    bottom: 0, //remove if doesnt work
    height: 145,  // Same height as the image
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, //also remove if doesnt work
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    zIndex: 10, // Ensure this is on top
    backgroundColor: '#0690FF',

    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 3 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 2, 

  },
  logo: {
   width: 35, 
   height: 35,
  },
  quoteText: { // Style for the quote text NEW
    color: '#f8f9fc',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    margin: 10,
    fontStyle: 'italic',
  },
  workoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fc',
    padding: 20,
    margin: 10,
    borderRadius: 5,

    shadowColor: '#000000', 
    shadowOffset: { width: 1, height: 3 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 2, 
  },
  workoutImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  workoutDetails: {
    color: '#000000',
    fontSize: 14,
  },
  firstTitle: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  todayContainer: {
    alignItems: 'center',
    padding: 20,
    margin: 10,
    backgroundColor: '#0690ffff',
    borderRadius: 10,
  },
  todayInfo: {
    flex: 1,
  },
  todayImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  todayTitle: {
    fontSize: 18,
    color: '#f8f9fc',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  todayDetails: {
    color: '#f8f9fc',
    fontSize: 14,
    textAlign: 'center',
  },
  iconStyle: {
    marginLeft: 10,
  },
  loadMoreButton: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '40%',
    backgroundColor: '#0690FF',

    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  loadMoreText: {
    color: '#f8f9fc',
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  planContainer: {
    backgroundColor: '#f8f9fc',
    padding: 20,
    margin: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    position: 'relative',  // Allow absolute positioning for the duration icon

    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  planImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 20, // Add margin bottom to give space for the icon
  },
  planDuration: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#0690FF',
    color: 'white',
    padding: 5,
    borderRadius: 10,
    zIndex: 10, // Ensure the icon is above the image
  },
  planTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    color: '#f8f9fc',
  },
  planDescription: {
    fontSize: 14,
    color: '#f8f9fc',
    textAlign: 'center',
    marginVertical: 5,
  },
  startButton: {
    backgroundColor: '#0690FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modifyContainer: {
    backgroundColor: '#0690FF',
    padding: 15,
    marginTop: 50,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',

    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  modifyText: {
    color: '#f8f9fc',
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionText: {
    color: '#f8f9fc',
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: '#f9f9fc',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,

    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  updateButtonText: {
    color: '#0690FF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  currentPlanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginTop: 10,
  },
  viewAllText: {
    color: '#0690FF',
    fontSize: 16,
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderRadius: 40,
    padding: '5',
  },
  dayBox: {
    width: 40,
    height: 60,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#2585F830',
  },
  currentDayBox: {
    backgroundColor: '#2585F8', // Highlight for today
  },
  dayText: {
    fontSize: 16,
    color: '#2C2D2F',
    marginTop: 6,
  },
  dateText: {
    color: '#2C2D2F',
    fontSize: 20,

  },
  currentDateText: {
    color: '#e6f2ff',
    fontWeight: 'bold',
  },
  currentDayText: {
    color: '#e6f2ff',
    fontWeight: 'bold',
  },  

  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderRadius: 20,
    padding: 5,
  },
  dayBox: {
    width: 40,
    height: 60,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    alignItems: 'center',
    backgroundColor: '#f8f9fc',
  },
  currentDayBox: {
    backgroundColor: '#0690FF', 
    shadowColor: '#000000', 
    shadowOffset: { width: 1, height: 0 }, 
    shadowOpacity: 0.3,
    shadowRadius: 2, 
  },
  dayText: {
    fontSize: 16,
    color: '#000000',
    marginTop: 6,
  },
  dateText: {
    color: '#000000',
    fontSize: 20,

  },
  currentDateText: {
    color: '#f8f9fc',
    fontWeight: 'bold',
  },
  currentDayText: {
    color: '#f8f9fc',
    fontWeight: 'bold',
  },  
  monthYearText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "#000000",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
