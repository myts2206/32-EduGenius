import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import QuestionAnswerComponent from './QuestionAnswerComponent'; // Make sure this import path is correct
import FlashcardsComponent from './FlashcardsComponent'; // Import the Flashcards component
import GameComponent from './GameComponent';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="wifi-off" size={100} color="#2ecc71" />
      <Text style={styles.logo}>
        <Text style={styles.glowingText}>EduGenius</Text>
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('QuestionAnswer')} // Navigate to QuestionAnswerComponent
      >
        <MaterialIcons name="text-fields" size={24} color="#3498db" />
        <Text style={styles.buttonText}>Offline LLM</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Flashcards')} // Navigate to FlashcardsComponent
      >
        <MaterialIcons name="credit-card" size={24} color="#3498db" />
        <Text style={styles.buttonText}>Flashcards</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <MaterialIcons name="book" size={24} color="#3498db" />
        <Text style={styles.buttonText}>Text Books            </Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('Games')}
>
  <MaterialIcons name="sports-esports" size={24} color="#3498db" />
  <Text style={styles.buttonText}>Games</Text>
</TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="QuestionAnswer" component={QuestionAnswerComponent} options={{ title: 'Question Answer' }} />
        <Stack.Screen name="Flashcards" component={FlashcardsComponent} options={{ title: 'Flashcards' }} />
        <Stack.Screen name="Games" component={GameComponent} options={{ title: 'Games' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c3e50',
  },
  logo: {
    fontSize: 48,
    color: '#2ecc71',
    marginBottom: 20,
    fontFamily: 'sans-serif-light',
  },
  glowingText: {
    color: '#2ecc71',
    textShadowColor: '#2ecc71',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    height: 60,
    width: '80%',
    borderRadius: 30,
    justifyContent: 'space-around',
    marginVertical: 10,
    elevation: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#2c3e50',
    fontSize: 18,
    fontFamily: 'sans-serif-medium',
  },
});