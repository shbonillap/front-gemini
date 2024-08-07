import axios from "axios";
import React, { useEffect, useState } from "react";

const Exam = ({ filename }) => {
  console.log("Realizando examen")
  if (filename) {
    const [exercise, setExercise] = useState([]);

    useEffect(() => {
      axios
        .get(`http://localhost:3000/exam/${filename}`)
        .then((response) => {
          setExercise(response.data);
          localStorage.setItem("exam", response.data)
          response.data
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);


    return (
      <div>
        <div>
          {exam}
        </div>
      </div>
    );
  }
}

export default Exam;
