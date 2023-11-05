import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import mockData from './mockData'; // Import the mock data

// Shuffle the questions
const shuffleQuestions = (questions) => {
  const array = questions.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

const GameComponent = () => {
  const [questions, setQuestions] = useState(shuffleQuestions(Object.keys(mockData)));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  // Load a new set of shuffled questions when the component mounts
  useEffect(() => {
    setQuestions(shuffleQuestions(Object.keys(mockData)));
  }, []);

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (userAnswer.trim().toLowerCase() === mockData[currentQuestion].toLowerCase()) {
      setFeedback('Correct!');
    } else {
      setFeedback('Sorry, that’s not right.');
    }
    setUserAnswer('');
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    setFeedback('');
    setUserAnswer('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUserAnswer}
        value={userAnswer}
        placeholder="Type your answer here"
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Text style={styles.feedback}>{feedback}</Text>
      {feedback && (
        <TouchableOpacity onPress={handleNextQuestion} style={styles.button}>
          <Text style={styles.buttonText}>Next Question</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// ... styles remain the same ...


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    question: {
      fontSize: 18,
      color: '#333',
      marginBottom: 15,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: '100%',
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#2ecc71',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    feedback: {
      fontSize: 18,
      color: 'blue',
      marginTop: 10,
    },
  });

export default GameComponent;