import axios from "axios";
import React, { useEffect, useState } from "react";

const Exercises = ({ filename }) => {
  console.log("Realizando ejercicios")
  if (filename) {
    const [exercise, setExercise] = useState([]);

    useEffect(() => {
      axios
        .get(`http://localhost:3000/exercisebychapter/${filename}`)
        .then((response) => {
          setExercise(response.data);
          localStorage.setItem("exercisebychapter", response.data)
          response.data
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);


    return (
      <div>
        <div>
          {exercise}
        </div>
      </div>
    );
  }
}

export default Exercises;
