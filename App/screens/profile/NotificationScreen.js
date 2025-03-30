// by Sam Linnemann

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const notificationOptions = [
  'Notifications',
  'App Icon Badges',
  'Lock Screen Notifications',
  'Sound',
  'Vibration'
];

export default function NotificationScreen() {
  const [switchStates, setSwitchStates] = useState(
    Object.fromEntries(notificationOptions.map((option) => [option, false]))
  );
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Notifications', 
      headerBackTitle: 'Back',
    });
  }, [navigation]);


  // Toggle Switch Handler
  const toggleSwitch = (option) => {
    setSwitchStates((prevState) => {
      if (option === 'Notifications') {
        // Enable or disable all options when "Notifications" is toggled
        const newState = { ...prevState, [option]: !prevState[option] };
        if (!newState[option]) {
          // If Notifications is turned off, turn all others off
          notificationOptions.forEach((opt) => {
            if (opt !== 'Notifications') newState[opt] = false;
          });
        }
        return newState;
      } else if (prevState['Notifications']) {
        // Only allow toggling other switches if Notifications is enabled
        return { ...prevState, [option]: !prevState[option] };
      } else {
        return prevState; // Do nothing if Notifications is off
      }
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notificationOptions}
        renderItem={({ item }) => (
          <View
            style={[
              styles.option,
              item === 'Notifications' && switchStates[item] && styles.optionActive,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                item === 'Notifications' && switchStates[item] && styles.textActive,
              ]}
            >
              {item}
            </Text>
            <Switch
              value={switchStates[item]}
              onValueChange={() => toggleSwitch(item)}
              disabled={item !== 'Notifications' && !switchStates['Notifications']}
              trackColor={{ false: '#ccc', true: item === 'Notifications' ? '#fff' : '#007bff' }} 
              thumbColor={item === 'Notifications' ? '#07D99D' : "#fff"}
            />
          </View>
        )}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, backgroundColor: '#fff', 
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  optionActive: {
    backgroundColor: '#007bff',
  },
  optionText: { fontSize: 16 },
  textActive: {
    color: '#fff',
  },
  separator: { height: 1, backgroundColor: '#ccc' },
});
