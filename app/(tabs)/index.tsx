import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [streak, setStreak] = useState(0);
  const [lastDate, setLastDate] = useState<string | null>(null);

  // 1. Load data when the app starts
  useEffect(() => {
    loadStreak();
  }, []);

  const loadStreak = async () => {
    try {
      const savedStreak = await AsyncStorage.getItem('streak');
      const savedDate = await AsyncStorage.getItem('lastDate');
      
      if (savedStreak !== null) setStreak(parseInt(savedStreak));
      if (savedDate !== null) setLastDate(savedDate);
    } catch (e) {
      console.error("Failed to load streak");
    }
  };

  // 2. The Logic: Handling the click
  const handlePress = async () => {
    const today = new Date().toLocaleDateString();

    // Check if already clicked today
    if (lastDate === today) {
      Alert.alert("Good job!", "You already kept your streak alive today.");
      return;
    }

    // Logic: If they missed yesterday, reset to 1. Otherwise, add 1.
    // (For simplicity in this version, we just increment, but you can add the 'reset' logic here later)
    const newStreak = streak + 1;
    
    // Update State (Visuals)
    setStreak(newStreak);
    setLastDate(today);

    // Save to Storage (Phone Memory)
    try {
      await AsyncStorage.setItem('streak', newStreak.toString());
      await AsyncStorage.setItem('lastDate', today);
    } catch (e) {
      console.error("Failed to save streak");
    }
  };

  // 3. Reset Button (for testing)
  const resetStreak = async () => {
    setStreak(0);
    setLastDate(null);
    await AsyncStorage.clear();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Streak</Text>
      
      <View style={styles.circle}>
        <Text style={styles.count}>{streak}</Text>
        <Text style={styles.subtitle}>DAYS</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>🔥 I Did It Today!</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={resetStreak}>
        <Text style={styles.resetText}>Reset Logic (Dev Only)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Dark Mode background
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#FF4500', // Orange Red
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    backgroundColor: '#1E1E1E',
  },
  count: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    letterSpacing: 2,
  },
  button: {
    backgroundColor: '#FF4500',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  resetText: {
    marginTop: 30,
    color: '#444',
    textDecorationLine: 'underline',
  }
});