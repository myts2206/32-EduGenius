import mockData from './mockData';
const findMostSimilarQuestion = (inputQuestion) => {
    let highestSimilarity = 0;
    let mostSimilarQuestion = null;
  
    for (const question of Object.keys(mockData)) {
      // Calculate similarity (this is a very basic form of similarity check)
      const inputWords = inputQuestion.toLowerCase().split(/\s+/);
      const questionWords = question.toLowerCase().split(/\s+/);
      const commonElements = inputWords.filter(element => questionWords.includes(element));
      const similarity = commonElements.length / Math.max(inputWords.length, questionWords.length);
  
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        mostSimilarQuestion = question;
      }
    }
  
    return mostSimilarQuestion;
  };
  
  const simulateLLM = (inputQuestion) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mostSimilarQuestion = findMostSimilarQuestion(inputQuestion);
        const answer = mostSimilarQuestion ? mockData[mostSimilarQuestion] : "I'm not sure how to answer that. Can you ask something else?";
        resolve(answer);
      }, 1500); // Simulate a delay for 'processing' the question
    });
  };
  
  export default simulateLLM;