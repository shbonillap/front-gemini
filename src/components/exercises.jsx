import axios from "axios";
import React, { useEffect, useState } from "react";

const Exercises = ({ filename }) => {
  const [exercise, setExercise] = useState([]);

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
      <div>
        {exercise}
      </div>
    </div>
  );
}

export default Exercises;
