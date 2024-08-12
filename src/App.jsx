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
      const filename = data.archivo.originalname;
      localStorage.setItem("file", filename);
      setFilename(filename);
      setErrorMessage(''); // Reset error message on success
    }

  } catch (error) {
    console.log(error);
    setErrorMessage('Error uploading file');
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
  }, [filename]);

  const showResume = () => {
    setResume(true);
    setExercises(false);
    setExam(false);
    return (
      <Resume filename={localStorage.getItem("file")} />
    )
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
  const hideAll = () => {
    setResume(false);
    setExercises(false);
    setExam(false);
  }
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    showResume();
    setIsModalOpen(false)
  };

  return (
    <div className="w-screen h-screen flex">
      <aside className="w-2/10 bg-white p-4">
        <img src={logo} alt="logo" />
        <DocumentDropdown hideAll={hideAll} setFilename={setFilename} />
        <button
          className="w-full py-2 semi-rounded text-white bg-customGreen hover:bg-green-800 hover:border-green-950 mt-5"
          onClick={handleOpenModal} // Abrir modal al hacer clic
        >
          <svg style={{ float: "left", marginLeft: "25px" }} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0" /></svg>
          <p style={{ marginRight: "25px", font: "Inter", fontSize: "16px" }}>New document</p>
        </button>
        <hr className="my-6" />
        <nav className="text-gray-500">
          <ul>
            {/* <li className="flex items-center mb-4">
      <button
        className="mr-2 flex items-center w-full p-2 rounded-md bg-gray-100 hover:border-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        disabled={!filename}
      >
      <svg className="h-5 w-5 mr-2 ml-10p text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" 
        strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
      </svg>
        Overview
      </button>
    </li> */}
            <li className="flex items-center mb-4">
              <button
                className="mr-2 flex items-center w-full p-2 rbg-gray-100 bg-gray-100 hover:border-gray-500  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                disabled={!filename}
                onClick={showResume}
              >
                <svg className="mr-2 ml-10p h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round">  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />  <line x1="16" y1="13" x2="8" y2="13" />  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
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
                <svg className=" mr-2 ml-10p h-5 w-5 text-gray-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                  strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="13" y1="20" x2="20" y2="13" />
                  <path d="M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7" /></svg>

                Exercises
              </button>
            </li>
            <li className="flex items-center mb-4">
              <button
                className="mr-2 flex items-center w-full p-2 bg-gray-100 hover:border-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                disabled={!filename}
                onClick={showExam}
              >
                <svg className="mr-2 ml-10p h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Tests
              </button>
            </li>
          </ul>
        </nav>

      </aside>

      <div className="w-8/10 h-screen flex flex-col">
        <TopBar />

        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          {!filename ? (
            <div style={{ textAlign: "center", marginTop: "25%" }}>
              <p style={{ fontSize: "30px" }}>There is nothing to see here.<br />
                Upload a PDF document to start using HelpStudy</p>
              <button onClick={handleOpenModal} className="py-2 px-4 text-600 text-white semi-rounded bg-customGreen hover:bg-green-800 hover:border-green-950">
                New document
              </button>
            </div>
          ) : (
            <div>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              {resume && <Resume filename={filename} />}
              {exercises && <Exercises filename={filename} />}
              {exam && <Exam filename={filename} />}
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
