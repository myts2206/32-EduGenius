import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import simulateLLM from './simulateLLM'; // Import the simulation function

const QuestionAnswerComponent = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionSubmit = () => {
    if (question.trim() === '') {
      // Optionally handle empty input
      setAnswer("Please enter a question.");
      return;
    }
    setIsLoading(true);
    simulateLLM(question).then((simulatedAnswer) => {
      setAnswer(simulatedAnswer);
      setIsLoading(false);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={question}
        onChangeText={setQuestion}
        placeholder="Ask a question..."
        style={styles.input}
      />
      <Button title="Submit" onPress={handleQuestionSubmit} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.answer}>Answer: {answer}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  answer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default QuestionAnswerComponent;