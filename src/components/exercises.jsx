import axios from "axios";
import MarkdownIt from "markdown-it";
import React, { useEffect, useState } from "react";

const Exercises = ({ filename }) => {
  //const [exercise, setExercise] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (filename) {
      console.log("Realizando ejercicios");
      console.log({ filename });
      setLoading(true);

      axios
        .get(`http://localhost:3000/exercisebychapter/${filename}`)
        .then((response) => {
          const output = document.querySelector(".response");
          const md = new MarkdownIt();
          const result = md.render(response.data);

          //setExercise(result);
          setLoading(false);

          output.innerHTML = result;

          localStorage.setItem("exercisebychapter", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [filename]);

  const getNewExercise = () => {
    setLoading(true);

    axios
        .get(`http://localhost:3000/exercisebychapter/${filename}`)
        .then((response) => {
          const output = document.querySelector(".response");
          const md = new MarkdownIt();
          const result = md.render(response.data);

          //setExercise(result);
          setLoading(false);

          output.innerHTML = result;

          localStorage.setItem("exercisebychapter", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  return (
    <div>
      <button className="w-full py-2 text-red-600 border border-red-600 rounded" onClick={() => getNewExercise()}>
          Ejercicios
        </button>
        <div className="response">
          {
            isLoading ?
            <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div> : <div></div>
          }
        </div>
    </div>
  );
}

export default Exercises;
