import axios from "axios";
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
          setExercise(response.data);
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
        <div>
          <p>Cargando ejercicios...</p>
          {exercise}
        </div>
      }
    </div>
  );
}

export default Exercises;
