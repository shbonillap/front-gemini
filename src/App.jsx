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
      <aside className="w-2/10 bg-white-100 p-4">
        <img src={logo} alt="logo" />
        {localStorage.getItem("file") ?
          <p>{localStorage.getItem("file")}</p> :
          <div style={{ marginTop: "20px" }}>
            <svg style={{ float: "left" }} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <p style={{ float: "left", marginLeft:"2px" }}>Documents</p>
          </div>

        }
          <button style={{ backgroundColor: '#047857', color: "white", marginTop: "20px"}} className="w-full py-2 semi-rounded">  
          <svg style={{ float: "left", marginLeft:"25px" }} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0"/></svg>
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="white" d="M15 12.5h-2.5V15a.5.5 0 0 1-1 0v-2.5H9a.5.5 0 0 1 0-1h2.5V9a.5.5 0 0 1 1 0v2.5H15a.5.5 0 0 1 0 1"/><path fill="white" d="M12 21.932A9.934 9.934 0 1 1 21.932 12A9.944 9.944 0 0 1 12 21.932m0-18.867A8.934 8.934 0 1 0 20.932 12A8.944 8.944 0 0 0 12 3.065"/></svg> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16"><path fill="white" fill-rule="evenodd" d="M13.5 8a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0M8.75 5.5a.75.75 0 0 0-1.5 0v1.75H5.5a.75.75 0 0 0 0 1.5h1.75v1.75a.75.75 0 0 0 1.5 0V8.75h1.75a.75.75 0 0 0 0-1.5H8.75z" clip-rule="evenodd" /></svg> */}
          <p style={{ marginRight:"25px", font:"Inter", fontSize:"16px"}}>New document</p>
          </button>
        <hr className="my-6" />
        {!filename ?
          <nav style={{ 'color': "grey" }}>
            <ul>
              <li className="flex items-center mb-4">
                <span className="mr-2">            <svg style={{ float: "left" }} xmlns="http://www.w3.org/2000/svg" color="gray" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193q-.51.041-1.02.072v3.091l-3-3q-2.031 0-4.02-.163a2.1 2.1 0 0 1-.825-.242m9.345-8.334a2 2 0 0 0-.476-.095a48.6 48.6 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.5 48.5 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402c-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235q.865.113 1.74.194V21l4.155-4.155" /></svg>
                </span>
                <span>Overview</span>
              </li>
              <li className="flex items-center mb-4">
                <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2" /></svg></span>
                <span>Summary</span>
              </li>
              <li className="flex items-center mb-4">
                <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18s-3.332.477-4.5 1.253" /></svg></span>
                <span>Exercises</span>
              </li>
              <li className="flex items-center mb-4">
                <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M10.394 2.08a1 1 0 0 0-.788 0l-7 3a1 1 0 0 0 0 1.84L5.25 8.051a1 1 0 0 1 .356-.257l4-1.714a1 1 0 1 1 .788 1.838l-2.727 1.17l1.94.831a1 1 0 0 0 .787 0l7-3a1 1 0 0 0 0-1.838zM3.31 9.397L5 10.12v4.102a9 9 0 0 0-1.05-.174a1 1 0 0 1-.89-.89a11.1 11.1 0 0 1 .25-3.762m5.99 7.177A9 9 0 0 0 7 14.935v-3.957l1.818.78a3 3 0 0 0 2.364 0l5.508-2.361a11 11 0 0 1 .25 3.762a1 1 0 0 1-.89.89a8.97 8.97 0 0 0-5.35 2.524a1 1 0 0 1-1.4 0M6 18a1 1 0 0 0 1-1v-2.065a9 9 0 0 0-2-.712V17a1 1 0 0 0 1 1" /></svg></span>
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
        <div className="w-full bg-white-100 p-4 flex justify-end">
          <Link to="/login" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <span role="img" aria-label="user-icon">👤</span>
          </Link>
        </div>

        <main className="flex-1 p-4 bg-gray-100">
          {!filename ?
            <div style={{ textAlign: "center", marginTop: "25%" }}>
              <p style={{ fontSize: "30px" }}>There is nothing to see here.<br />
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
