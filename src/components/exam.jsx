import axios from "axios";
import React, { useEffect, useState } from "react";

const Exam = ({ filename }) => {
  const [exam, setExam] = useState([]);
  const [getExam, setGetExam] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState({});

  const generateExam = () => {
    setSelectedAnswers({});
    setResults({});
    setGetExam(false);

    if (filename) {
      console.log("Realizando examen");
      console.log(filename);

      axios
        .get(`http://localhost:3000/exam/${filename}`)
        .then((response) => {
          setExam(response.data.preguntas);
          localStorage.setItem("exam", JSON.stringify(response.data.preguntas));
          setGetExam(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer,
    });
  };

  const handleCheckAllAnswers = () => {
    const newResults = {};

    exam.forEach((question, index) => {
      const correctAnswerKey = `respuesta${question.solucion}`;
      const correctAnswer = question[correctAnswerKey];
      const userAnswer = selectedAnswers[index];

      newResults[index] = userAnswer === correctAnswer;
    });

    setResults(newResults);
  };

  const getAnswerClassName = (questionIndex, answer) => {
    if (!results.hasOwnProperty(questionIndex)) return '';

    const correctAnswerKey = `respuesta${exam[questionIndex].solucion}`;
    const isCorrect = exam[questionIndex][correctAnswerKey] === answer;
    const isSelected = selectedAnswers[questionIndex] === answer;

    if (isSelected && isCorrect) return 'bg-green-100 border border-green-500 rounded-lg p-1';
    if (isSelected && !isCorrect) return 'bg-red-100 border border-red-500 rounded-lg p-1';
    if (!isSelected && isCorrect) return 'bg-green-100 border border-green-500 rounded-lg p-1';

    return '';
  };

  return (
    <div>
      <br />
      <h1>Tests</h1>
      <div className="flex justify-end mb-4">
        <button
          className="py-2 px-4 mr-2 text-customGreen bg-gray-100 border border-customGreen rounded hover:bg-white"
          onClick={handleCheckAllAnswers}
        >
          Evaluate
        </button>
        <button
          className="py-2 px-4 text-white bg-customGreen border-green-600 rounded hover:bg-green-800 hover:border-green-950"
          onClick={generateExam}
        >
          New test
        </button>
      </div>
      {getExam && (
        <div>
          {exam.length > 0 ? (
            exam.map((question, index) => (
              <div key={index} className="mt-5 mb-6 p-4 border border-gray-200 rounded-lg">
                <h2 className="font-bold text-lg">{index + 1}. {question.enunciado}</h2>
                <ul className="list-none mt-2">
                  <li className={`mt-1 ${getAnswerClassName(index, question.respuesta1)}`}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value="1"
                        onChange={() => handleAnswerSelect(index, question.respuesta1)}
                        disabled={results.hasOwnProperty(index)}
                      />
                      {question.respuesta1}
                    </label>
                  </li>
                  <li className={`mt-1 ${getAnswerClassName(index, question.respuesta2)}`}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value="2"
                        onChange={() => handleAnswerSelect(index, question.respuesta2)}
                        disabled={results.hasOwnProperty(index)}
                      />
                      {question.respuesta2}
                    </label>
                  </li>
                  <li className={`mt-1 ${getAnswerClassName(index, question.respuesta3)}`}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value="3"
                        onChange={() => handleAnswerSelect(index, question.respuesta3)}
                        disabled={results.hasOwnProperty(index)}
                      />
                      {question.respuesta3}
                    </label>
                  </li>
                  <li className={`mt-1 ${getAnswerClassName(index, question.respuesta4)}`}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value="4"
                        onChange={() => handleAnswerSelect(index, question.respuesta4)}
                        disabled={results.hasOwnProperty(index)}
                      />
                      {question.respuesta4}
                    </label>
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <p>Cargando examen...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Exam;
