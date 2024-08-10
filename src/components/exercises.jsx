import axios from "axios";
import MarkdownIt from "markdown-it";
import React, { useEffect, useState } from "react";

const Exercises = ({ filename }) => {
  const [exercise, setExercise] = useState([]);
  const [getExercise, getsetExercise] = useState(false);

  useEffect(() => {
    if (filename) {
      console.log("Realizando ejercicios");
      console.log({ filename });

      axios
        .get(`http://localhost:3000/exercisebychapter/${filename}`)
        .then((response) => {
          const output = document.querySelector(".exercise");
          const md = new MarkdownIt();
          const result = md.render(response.data);

          setExercise(result);
          output.innerHTML = result;

          localStorage.setItem("exercisebychapter", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [filename]);

  return (
    <div>
      <button className="w-full py-2 text-red-600 border border-red-600 rounded" onClick={() => getsetExercise(true)}>
          Ejercicios
        </button>
      {getExercise &&
        <div className="exercise">
          <p>Cargando ejercicios...</p>
        </div>
      }
    </div>
  );
}

export default Exercises;
