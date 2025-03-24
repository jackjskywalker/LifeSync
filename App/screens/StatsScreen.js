// StatsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

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

export default function HealthScreen({ navigation }) {
  const [showGoals, setShowGoals] = useState(true);

  const renderHealthItem = ({ item }) => (
    <View style={styles.healthItemContainer}>
      <MaterialIcons name={item.icon} size={40} color="#0690FF" />
      <View style={styles.healthItemText}>
        <Text style={styles.healthItemTitle}>{item.title}</Text>
        <Text style={styles.healthItemValue}>{item.value}</Text>
      </View>
    </View>
  );

  const renderGoalItem = ({ item }) => (
    <View style={styles.goalContainer}>
      <Text style={styles.goalTitle}>{item.title}</Text>
      <Text style={styles.goalValue}>{item.value}</Text>
      <View style={styles.goalProgressBar}>
        <View style={[styles.goalProgressFill, { width: `${item.progress * 100}%` }]} />
      </View>
    </View>
  );

  return (
    <FlatList
      data={[]} // Empty array, we don't need list items
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <FlatList
            data={healthData}
            renderItem={renderHealthItem}
            keyExtractor={item => item.id}
            style={styles.healthList}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <TouchableOpacity
            style={styles.toggleGoalsButton}
            onPress={() => setShowGoals(!showGoals)}
          >
            <Text style={styles.toggleGoalsText}>
              {showGoals ? 'Hide Goals' : 'Show Goals'}
            </Text>
          </TouchableOpacity>
        </View>
      }
      ListFooterComponent={
        showGoals && (
          <View style={styles.footerContainer}>
            <Text style={styles.title}>Fitness Goals</Text>
            <FlatList
              data={goalData}
              renderItem={renderGoalItem}
              keyExtractor={item => item.id}
              style={styles.goalList}
            />
          </View>
        )
      }
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
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
