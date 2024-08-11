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
    <div><br></br><h3>Ejercicios</h3>
    <div>
      <button
        className="w-full py-2 text-red-600 border border-red-600 rounded"
        onClick={getNewExercise}
      >
        Ejercicios
      </button>
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
