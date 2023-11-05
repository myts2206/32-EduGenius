import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import mockData from './mockData'; // Import the mock data

const FlashcardsComponent = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  // Convert the mockData object into an array of question-answer pairs
  const flashcards = Object.entries(mockData).map(([question, answer]) => ({
    question: question.charAt(0).toUpperCase() + question.slice(1), // Capitalize the first letter of the question
    answer,
  }));

  // Function to show next flashcard
  const showNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  // Function to show previous flashcard
  const showPreviousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.question}>{flashcards[currentCardIndex].question}</Text>
        <Text style={styles.answer}>{flashcards[currentCardIndex].answer}</Text>
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={showPreviousCard} style={styles.button}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showNextCard} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  card: {
    width: '80%',
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // Add shadow and other styles for the card
  },
  question: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  answer: {
    fontSize: 16,
    color: '#666',
  },
  navigation: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#2ecc71',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default FlashcardsComponent;