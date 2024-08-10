import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios";
import Resume from "./components/resume.jsx";
import Exercises from "./components/exercises.jsx";
import Exam from "./components/exam.jsx";
import NewDocumentModal from './components/Modal/newDocumentModal.jsx'; // Importar el componente modal
import logo from './assets/Logo.svg'; // Tell webpack this JS file uses this image
import TopBar from './components/topBar.jsx';
import DocumentDropdown from './components/documentDropdown.jsx';

const MAX_FILE_SIZE = 20971520; // 20 MB

async function uploadFile(file, name, setFilename, setErrorMessage) {
  const archivo = new FormData();

  if (file.size > MAX_FILE_SIZE) {
    setErrorMessage('El archivo es demasiado grande. El tamaño máximo permitido es de 20 MB.');
    return;
  }

  // Crear un nuevo archivo con el nombre personalizado
  const renamedFile = new File([file], name + file.name.substring(file.name.lastIndexOf('.')), {
    type: file.type,
  });

  archivo.append("archivo", renamedFile); // Añadir el archivo renombrado al FormData

  try {
    const { data } = await Axios.post(
      "http://localhost:3000/upload", 
      archivo,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    if (data) {
      console.log(data.archivo);
      const filename = data.archivo.originalname;
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
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para la modal

  useEffect(() => {
    const storedFilename = localStorage.getItem("file");
    if (storedFilename) {
      setFilename(storedFilename);
    }
  }, []);

const showResume = () => {
  setResume(true);
  setExercises(false);
  setExam(false);
}
const showExercises = () => {
  setResume(false);
  setExercises(true);
  setExam(false);
}
const showExam = () => {
  setResume(false);
  setExercises(false);
  setExam(true);
}

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="w-screen h-screen flex">
      <aside className="w-2/10 bg-white p-4">
        <img src={logo} alt="logo" />
        <DocumentDropdown/>
        <button
          className="w-full py-2 semi-rounded text-white bg-customGreen hover:bg-green-800 hover:border-green-950 mt-5"
          onClick={handleOpenModal} // Abrir modal al hacer clic
        >  
          <svg style={{ float: "left", marginLeft:"25px" }} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0"/></svg>
          <p style={{ marginRight:"25px", font:"Inter", fontSize:"16px"}}>New document</p>
        </button>
        <hr className="my-6" />
        <nav className="text-gray-500">
  <ul>
    <li className="flex items-center mb-4">
      <button
        className="mr-2 flex items-center w-full p-2 rounded-md bg-gray-100 hover:border-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        disabled={!filename}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          color="gray"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="mr-2 ml-10p"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193q-.51.041-1.02.072v3.091l-3-3q-2.031 0-4.02-.163a2.1 2.1 0 0 1-.825-.242m9.345-8.334a2 2 0 0 0-.476-.095a48.6 48.6 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.5 48.5 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402c-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235q.865.113 1.74.194V21l4.155-4.155"
          />
        </svg>
        Overview
      </button>
    </li>
    <li className="flex items-center mb-4">
      <button
        className="mr-2 flex items-center w-full p-2 rbg-gray-100 bg-gray-100 hover:border-gray-500  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        disabled={!filename}
        onClick={showResume}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="mr-2 ml-10p"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2"
          />
        </svg>
        Summary
      </button>
    </li>
    <li className="flex items-center mb-4">
      <button
        className="mr-2 flex items-center w-full p-2 bg-gray-100 hover:border-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        disabled={!filename}
        onClick={showExercises}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="mr-2 ml-10p"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13M12 6.253C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13M12 6.253C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13M7.5 5a2 2 0 0 1-1.951 1.976A48.6 48.6 0 0 1 3 7.257m13.5-2.253V6.637c0-1.621 1.152-3.026 2.76-3.235A48.5 48.5 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402c-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235q.865.113 1.74.194V21l4.155-4.155"
          />
        </svg>
        Exercises
      </button>
    </li>
    <li className="flex items-center mb-4">
      <button
        className="mr-2 flex items-center w-full p-2 bg-gray-100 hover:border-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        disabled={!filename}
        onClick={showExam}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
          className="mr-2 ml-10p"
        >
          <path
            fill="currentColor"
            d="M10.394 2.08a1 1 0 0 0-.788 0l-7 3a1 1 0 0 0 0 1.84L5.25 8.051a1 1 0 0 1 .356-.257l4-1.714a1 1 0 1 1 .788 1.838l-2.727 1.17l1.94.831a1 1 0 0 0 .787 0l7-3a1 1 0 0 0 0-1.838zM3.31 9.397L5 10.12v4.102a9 9 0 0 0-1.05-.174a1 1 0 0 1-.89-.89a11.1 11.1 0 0 1 .25-3.762m5.99 7.177A9 9 0 0 0 7 14.935v-3.957l1.818.78a3 3 0 0 0 2.364 0l5.508-2.361a11 11 0 0 1 .25 3.762a1 1 0 0 1-.89.89a8.97 8.97 0 0 0-5.35 2.524a1 1 0 0 1-1.4 0M6 18a1 1 0 0 0 1-1v-2.065a9 9 0 0 0-2-.712V17a1 1 0 0 0 1 1"
          />
        </svg>
        Tests
      </button>
    </li>
  </ul>
</nav>

      </aside>

      <div className="w-8/10 h-screen flex flex-col">
  <TopBar/>

  <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
    {!filename ? (
      <div style={{ textAlign: "center", marginTop: "25%" }}>
        <p style={{ fontSize: "30px" }}>There is nothing to see here.<br />
          Upload a document to start using HelpStudy</p>
        <button onClick={handleOpenModal} className="py-2 text-600 text-white semi-rounded bg-customGreen hover:bg-green-800 hover:border-green-950">
          New document
        </button>
      </div>
    ) : (
      <div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {resume && <div><br></br><h1>Resumen</h1><Resume filename={filename} /></div>}
        {exercises && <div><br></br><h1>Ejercicios</h1><Exercises filename={filename} /><p></p></div>}
        {exam && <div><br></br><h1>Examen</h1><Exam filename={filename} /><p>Cargando ejercicios....</p></div>}
      </div>
    )}
  </main>
</div>


      {/* Modal de "New Document" */}
      <NewDocumentModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        uploadFile={(file, name) => uploadFile(file, name, setFilename, setErrorMessage)} // Pasar la función de subida
      />
    </div>
  );
};

export default App;
