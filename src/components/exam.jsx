import axios from "axios";
import React, { useEffect, useState } from "react";

const Exam = ({ filename }) => {
  const [exam, setExam] = useState([]);

  useEffect(() => {
    if (filename) {
      console.log("Realizando examen");
      console.log(filename);

      axios
        .get(`http://localhost:3000/exam/${filename}`)
        .then((response) => {
          setExam(response.data);
          localStorage.setItem("exam", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [filename]);

  return (
    <div>
      <div>
        {exam}
      </div>
    </div>
  );
}

export default Exam;
