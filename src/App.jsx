// src/App.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios";
import Resume from "./components/resume.jsx";
import Exercises from "./components/exercises.jsx";
import Exam from "./components/exam.jsx";

async function uploadFile(setFilename) {
  const archivo = new FormData();
  const file = document.querySelector('#file');
  archivo.append("archivo", file.files[0]);
  try {
    const { data } = await Axios.post(
      "http://localhost:3000/upload", archivo,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    if (data) {
      console.log(data.archivo.filename);
      const filename = data.archivo.filename;
      localStorage.setItem("file", data.archivo.filename)
      setFilename(filename);
    }

  } catch (error) {
    console.log(error);
  }

}

const App = () => {
  const [filename, setFilename] = useState("");

  const [resume, setResume] = useState(false);
  const [exercises, setExercises] = useState(false);
  const [exam, setExam] = useState(false);

  return (
    <div className="w-screen h-screen flex">
      {/* Sidebar */}
      <aside className="w-2/10 bg-gray-100 p-4 ">
        <h2 className="text-lg font-bold mb-4 mt-1">PROFESSOR GEMINI</h2>
        <ul className="mb-6">
          <li className="mb-2">tema 1</li>
          <li className="mb-2">tema 2</li>
          <li className="mb-2">tema 3</li>
          <li className="mb-2">tema 4</li>
        </ul>
        <button className="w-full py-2 text-red-600 border border-red-600 rounded">
          nuevo tema
        </button>
        <hr className="my-6" />
        {filename &&
          <nav disable={filename}>
            <ul>
              <li className="flex items-center mb-4">
                <span className="mr-2">🏠</span>
                <span>Contenido</span>
              </li>
              <li className="flex items-center mb-4">
                <span className="mr-2">📄</span>
                <input type='button' onClick={() => setResume(true)} value="Resumen"></input>
              </li>
              <li className="flex items-center mb-4">
                <span className="mr-2">✏️</span>
                <input type='button' onClick={() => setExercises(true)} value="Ejercicios"></input>
              </li>
              <li className="flex items-center mb-4">
                <span className="mr-2">📝</span>
                <input type='button' onClick={() => setExam(true)} value="Examen"></input>
                {/* <span>Tests</span> */}
              </li>
            </ul>
          </nav>
        }
      </aside>

      {/* Main Content Area */}
      <div className="w-8/10 h-screen flex flex-col">
        {/* Topbar */}
        <div className="w-full bg-gray-100 p-4 flex justify-end">
          <Link to="/login" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <span role="img" aria-label="user-icon">👤</span>
          </Link>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {<form method="POST" encType="multipart/form-data">
            <input id="file" type="file" name="file" />
            <input type="button" onClick={() => uploadFile(setFilename)} value="Subir Archivo" />
          </form>}
          {resume && <div><br></br><h1>Resumen</h1><Resume filename={filename} /><p>Cargando resumen....</p></div>}
          {exercises && <div><br></br><h1>Ejercicios</h1><Exercises filename={filename} /><p>Cargando ejercicios....</p></div>}
          {exam && <div><br></br><h1>Examen</h1><Exam filename={filename} /><p>Cargando ejercicios....</p></div>}
        </main>
      </div>
    </div>
  );
};

export default App;
