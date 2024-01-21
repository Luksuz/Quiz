import { useEffect, useState } from "react";
import he from "he";
import Question from "./Question";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        data.results = data.results.map((question, index) => {
            question.id = index + 1
            console.log(question.id)
            console.log(question.question)
            console.log(question.correct_answer)
            console.log(question.incorrect_answers)
            return question;
        })
        setQuestions(data.results);
      })
      .catch((error) => console.error(error));
  }, []);
  
  return (
    <div>
      {questions && questions.map((question, index) => (
        <div key={index}>
          <Question question={he.decode(question.question)}
                    correctAnswer={he.decode(question.correct_answer)}
                    incorrectAnswers={(question.incorrect_answers)}
          />
        </div>
      ))}
    </div>
  );
};

export default Quiz;