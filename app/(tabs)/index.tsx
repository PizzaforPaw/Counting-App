// 1. We import 'useState' to track data, and 'TouchableOpacity' for the button
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  // 2. This is the "State". 
  // 'streak' is the number. 'setStreak' is the tool to change the number.
  // We start at 0.
  const [streak, setStreak] = useState(0);

  // 3. This function runs when you press the button
  const handlePress = () => {
    setStreak(streak + 1); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Streak</Text>
      
      {/* 4. We replace the hardcoded "0" with our variable {streak} */}
      <Text style={styles.count}>{streak}</Text>
      
      <Text style={styles.subtitle}>days</Text>

      {/* 5. This is our Button */}
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>I did it today!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    color: '#333',
  },
  count: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 40, // Push the button down a bit
  },
  // New styles for the button
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30, // Makes it round
    elevation: 5, // Adds a shadow on Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});