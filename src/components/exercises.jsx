import axios from "axios";
import MarkdownIt from "markdown-it";
import React, { useEffect, useState } from "react";
import Skeleton from "./skeleton";

const QUESTION = 0;
const SOLUTION = 1;

const Exercises = ({ filename }) => {
  const [exerciseContent, setExerciseContent] = useState(""); // Estado para almacenar el contenido renderizado
  const [solutionContent, setSolutionContent] = useState(""); // Estado para almacenar el contenido renderizado
  const [showAnswer, setShowAnswer] = useState(false); // Estado para mostrar u ocultar la respuesta
  const [isLoading, setLoading] = useState(false); // Estado para gestionar la carga

  useEffect(() => {
    if (filename) {
      if (localStorage.getItem("exercise")) {
        setExerciseContent(JSON.parse(localStorage.getItem("exercise")).enunciado);
      } else {
        fetchExercise();
      }
    }
  }, [filename]);

  // Función para obtener los ejercicios desde la API
  const fetchExercise = () => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/exercisebychapter/${filename}`)
      .then((response) => {
        renderMarkdown(response.data.pregunta[0].enunciado, QUESTION);
        setLoading(false);
        localStorage.setItem("exercise", JSON.stringify(response.data.pregunta[0]));
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Asegúrate de establecer isLoading a false si hay un error
      });
  };

  const getNewExercise = () => {
    setShowAnswer(false);
    fetchExercise(); // Reutiliza la función para obtener nuevos ejercicios
  };

  const handleCheckAllAnswers = () => {
    setLoading(true);
    renderMarkdown(JSON.parse(localStorage.getItem("exercise")).respuesta, SOLUTION);
    setShowAnswer(true);
    setLoading(false);

  };

  const renderMarkdown = (markdownText, type) => {
    const md = new MarkdownIt();
    const result = md.render(markdownText);
    type == QUESTION ? setExerciseContent(result) : setSolutionContent(result); // Actualiza el estado con el contenido renderizado
  };


  return (
    <div><p style={{ fontWeight: "bold", fontSize: "30px" }}>Exercises</p><hr></hr>
      <div>
        <div className="flex mt-4 justify-end mb-4">
          <button
            className={
              "py-2 px-4 mr-2 text-customGreen bg-gray-100 border border-customGreen rounded hover:bg-white" +
              ((showAnswer || isLoading) ? 'opacity-50 cursor-not-allowed' : '')}
            disabled={(showAnswer || isLoading)}
            onClick={handleCheckAllAnswers}
          >
            Show answer
          </button>
          <button
            className="py-2 px-4 text-white bg-customGreen border-green-600 rounded hover:bg-green-800 hover:border-green-950"
            onClick={getNewExercise}
          >
            New Exercises
          </button>
        </div>
        <div className="content">
          {isLoading ? (
            <Skeleton />
          ) : (
            <div>
              <h2 className="text-2xl">Question:</h2>
              <div className="ai-content mb-4" dangerouslySetInnerHTML={{ __html: exerciseContent }} />
              {
                showAnswer &&
                <div>
                  <h2 className="text-2xl">Answer:</h2>
                  <div className="ai-content" dangerouslySetInnerHTML={{ __html: solutionContent }} />
                </div>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercises;
