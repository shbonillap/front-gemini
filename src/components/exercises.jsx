import axios from "axios";
import MarkdownIt from "markdown-it";
import React, { useEffect, useState } from "react";
import Skeleton from "./skeleton";

const Exercises = ({ filename }) => {
  const [exerciseContent, setExerciseContent] = useState(""); // Estado para almacenar el contenido renderizado
  const [isLoading, setLoading] = useState(false); // Estado para gestionar la carga

  useEffect(() => {
    if (filename) {
      console.log("Realizando ejercicios");
      console.log({ filename });
      fetchExercise();
    }
  }, [filename]);

  // Función para obtener los ejercicios desde la API
  const fetchExercise = () => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/exercisebychapter/${filename}`)
      .then((response) => {
        const md = new MarkdownIt();
        const result = md.render(response.data);

        setExerciseContent(result); // Actualiza el estado con el contenido renderizado
        setLoading(false);

        localStorage.setItem("exercisebychapter", response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Asegúrate de establecer isLoading a false si hay un error
      });
  };

  const getNewExercise = () => {
    fetchExercise(); // Reutiliza la función para obtener nuevos ejercicios
  };

  return (
    <div><p style={{fontWeight:"bold", fontSize:"30px"}}>Exercises</p><hr></hr>    
    <div>
      <div className="flex mt-4 justify-end mb-4">
        <button
          className="py-2 px-4 mr-2 text-customGreen bg-gray-100 border border-customGreen rounded hover:bg-white"
        >
          Hide answer
        </button>
        <button
          className="py-2 px-4 text-white bg-customGreen border-green-600 rounded hover:bg-green-800 hover:border-green-950"
          onClick={getNewExercise}
          >
          New Exercises
        </button>
      </div>
      <div className="response">
        {isLoading ? (
          <Skeleton />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: exerciseContent }} />
        )}
      </div>
    </div>
    </div>
  );
};

export default Exercises;
