import axios from "axios";
import React, { useEffect, useState } from "react";

const Exam = ({ filename }) => {
  const [exam, setExam] = useState([]);
  const [getExam, getsetExam] = useState(false);



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
      <button className="w-full py-2 text-red-600 border border-red-600 rounded" onClick={() => getsetExam(true)}>
          Examen
        </button>
      <div>
      <p>Cargando examen...</p>
        {exam}
      </div>
    </div>
  );
}

export default Exam;
