// Import the necessary Firebase libraries and set up the database reference
import { get, questionsRef } from './firebase'; // Adjust this import as per your project structure

// Function to generate a question paper for multiple modules
async function generateQuestionPaper(selectedModules, questionsConfig) {
  try {
    const questionsSnapshot = await get(questionsRef);
    if (questionsSnapshot.exists()) {
      const questionsData = questionsSnapshot.val();

      const selectedQuestions = [];

      for (const module of selectedModules) {
        const filteredQuestions = Object.keys(questionsData)
          .filter((questionId) => {
            const question = questionsData[questionId];
            return question.module === module;
          })
          .map((questionId) => {
            const question = questionsData[questionId];
            return {
              id: questionId,
              ...question,
            };
          });

        for (const config of questionsConfig) {
          const { marks, numSubQuestions } = config;
          const filteredQuestionsForConfig = filteredQuestions.filter((question) => question.marks === marks);

          for (let i = 0; i < numSubQuestions; i++) {
            const randomQuestion = filteredQuestionsForConfig[Math.floor(Math.random() * filteredQuestionsForConfig.length)];
            selectedQuestions.push(randomQuestion);
          }
        }
      }

      return selectedQuestions;
    } else {
      console.log('No questions available');
      return [];
    }
  } catch (error) {
    console.error('Error fetching questions from the database:', error);
    return [];
  }
}

// Export the generateQuestionPaper function
export { generateQuestionPaper };
