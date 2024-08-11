import axios from "axios";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

const Resume = ({ filename }) => {
    console.log("Realizando resumen")

    const [resume, setResume] = useState([]);
    const [viewmore, setViewmore] = useState(false);


    useEffect(() => {
        if(localStorage.getItem(filename) && !viewmore){
            setResume(localStorage.getItem(filename))
            localStorage.setItem(filename, response.data);

        }
        else{
            if (filename && !viewmore) {
                axios
                    .get(`http://localhost:3000/resume/${filename}`)
                    .then((response) => {
                        setResume(response.data);
                        localStorage.setItem(filename, response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
    
            }
            if (viewmore) {
                axios
                    .get(`http://localhost:3000/resume/${filename}/${localStorage.getItem(filename)}`)
                    .then((response) => {
                        console.log(response.data)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }

       
    }, [filename]);


    const DownloadPDF = (filename) => {
          // Crear una instancia de jsPDF
          const doc = new jsPDF();
      
          // Agregar contenido al PDF
          if(localStorage.getItem(filename)){
            doc.text("Resumen del libro:"+localStorage.getItem("file"),10,10);
      
          // Dividir el texto en líneas que se ajusten al ancho de la página
          const margin = 10;
          const pageWidth = doc.internal.pageSize.getWidth();
          const textWidth = pageWidth + 30;
          const textLines = doc.splitTextToSize(localStorage.getItem(filename), textWidth);
      
          // Agregar el texto dividido al PDF, con un espaciado adecuado
          doc.setFontSize(12);
          let verticalOffset = 20;
          textLines.forEach(line => {
            if (verticalOffset > 280) {  // Si la posición Y es demasiado baja, añade una nueva página
              doc.addPage();
              verticalOffset = 20;
            }
            doc.text(line, margin, verticalOffset);
            verticalOffset += 5; // Ajustar el espaciado entre líneas
          });
      
          // Descargar el PDF
          doc.save("resumen_proyecto.pdf");
            // Descargar el PDF con un nombre personalizado
          }
      
          
        };

    return (
        <div>
            <div style={{ float: "right", display:"inline-block" }}>
                <button
                    className="w-full py-2 semi-rounded text-customGreen bg-white hover:bg-white-800 hover:border-green-950 mt-5"
                    // onClick={handleOpenModal} // Abrir modal al hacer clic
                    style={{ width: "150px", marginRight: "8px" }}
                    onClick={() => setViewmore(true)}
                >
                    <svg style={{ float: "left" }} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#047857" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" /></svg>
                    <p>More info</p>
                </button>
                <button
                    className="w-full py-2 semi-rounded text-customGreen bg-white hover:bg-white-800 hover:border-green-950 mt-5"
                    // onClick={handleOpenModal} // Abrir modal al hacer clic
                    style={{ width: "150px", marginRight: "8px" }}
                    onClick={() => DownloadPDF(filename)}
                >
                    <svg style={{ float: "left" }} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#047857"  d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75m-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75" clip-rule="evenodd" /></svg>                {/* <svg  style={{float:"left"}} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#047857"  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg> */}
                    <p>Export PDF</p>
                </button>
                <button
                    className="w-full py-2 semi-rounded text-white bg-customGreen hover:bg-green-800 hover:border-green-950 mt-5"
                    // onClick={handleOpenModal} // Abrir modal al hacer clic
                    style={{ width: "150px" }}
                > <p>New summary</p>
                </button>

            </div>
            <div style={{ display:"inline-block", marginTop:"10px" }}>

                {resume}
            </div>
            <input type='button' ></input>
        </div>
    );
}

export default Resume;
