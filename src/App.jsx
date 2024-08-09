import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios";
import Resume from "./components/resume.jsx";
import Exercises from "./components/exercises.jsx";
import Exam from "./components/exam.jsx";
import logo from './assets/Logo.svg'; // Tell webpack this JS file uses this image

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
</svg>

const MAX_FILE_SIZE = 20971520; // 20 MB

async function uploadFile(setFilename, setErrorMessage) {
  const archivo = new FormData();
  const file = document.querySelector('#file').files[0];

  if (file.size > MAX_FILE_SIZE) {
    setErrorMessage('El archivo es demasiado grande. El tamaño máximo permitido es de 20 MB.');
    return;
  }

  archivo.append("archivo", file);
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
      console.log('Archivo subido con éxito:', filename);
      localStorage.setItem("file", filename);
      setFilename(filename);
      setErrorMessage(''); // Reset error message on success
    }

  } catch (error) {
    console.log(error);
    setErrorMessage('Error al subir el archivo.');
  }
}

const App = () => {
  const [filename, setFilename] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [resume, setResume] = useState(false);
  const [exercises, setExercises] = useState(false);
  const [exam, setExam] = useState(false);

  return (
    <div className="w-screen h-screen flex">
      <aside className="w-2/10 bg-gray-100 p-4">
        <img src={logo} alt="logo" />
        {localStorage.getItem("file") ?
          <p>{localStorage.getItem("file")}</p> :
          <div >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} width={0.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <p>Documentos</p>
          </div>

        }
        <button style={{ 'background-color': '#047857', 'color': "white" }} className="w-full py-2 text-600 semi-rounded">
          New document
        </button>
        <hr className="my-6" />
        {!filename ?
          <nav style={{ 'color': "grey" }}>
            <ul>
              <li className="flex items-center mb-4">
                <span className="mr-2">🏠</span>
                <span>Overview</span>
              </li>
              <li className="flex items-center mb-4">
                <span className="mr-2">📄</span>
                <span>Summary</span>
              </li>
              <li className="flex items-center mb-4">
                <span className="mr-2">✏️</span>
                <span>Exercises</span>
              </li>
              <li className="flex items-center mb-4">
                <span className="mr-2">📝</span>
                <span>Tests</span>
              </li>
            </ul>
          </nav> :
          <nav>
            <ul>
              <li className="flex items-center mb-4">
                <span className="mr-2">🏠</span>
                <span>Overview</span>
              </li>
              <li className="flex items-center mb-4">
                <span className="mr-2">📄</span>
                <input type='button' onClick={() => setResume(true)} value="Summary"></input>
              </li>
              <li className="flex items-center mb-4">
                <span className="mr-2">✏️</span>
                <input type='button' onClick={() => setExercises(true)} value="Exercises"></input>
              </li>
              <li className="flex items-center mb-4">
                <span className="mr-2">📝</span>
                <input type='button' onClick={() => setExam(true)} value="Tests"></input>
              </li>
            </ul>
          </nav>

        }
      </aside>

      <div className="w-8/10 h-screen flex flex-col">
        <div className="w-full bg-gray-100 p-4 flex justify-end">
          <Link to="/login" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <span role="img" aria-label="user-icon">👤</span>
          </Link>
        </div>

        <main className="flex-1 p-4">
          {!filename ?
            <div style={{ textAlign: "center", marginTop:"25%" }}>
              <p style={{fontSize:"30px"}}>There is nothing to see here.<br/>
                Upload a document to start using HelpStudy</p>
                <form method="POST" encType="multipart/form-data">
              <input id="file" type="file" name="file" />
              <input type="button" onClick={() => uploadFile(setFilename, setErrorMessage)} value="Subir Archivo" />
            </form>
              <button onClick={() => uploadFile(setFilename, setErrorMessage)} style={{ 'background-color': '#047857', 'color': "white" }} className="py-2 text-600 semi-rounded">
                New document
              </button>
            </div>
            :
            <div>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              {resume && <div><br></br><h1>Resumen</h1><Resume filename={filename} /></div>}
              {exercises && <div><br></br><h1>Ejercicios</h1><Exercises filename={filename} /><p></p></div>}
              {exam && <div><br></br><h1>Examen</h1><Exam filename={filename} /><p>Cargando ejercicios....</p></div>}
            </div>}

        </main>
      </div>
    </div>
  );
};

export default App;
