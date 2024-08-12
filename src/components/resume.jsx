import axios from "axios";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import MarkdownIt from "markdown-it";
import Skeleton from "./skeleton"; // Asumiendo que Skeleton es un componente que muestra un estado de carga

const Resume = ({ filename }) => {
    const [resume, setResume] = useState("");
    const [viewmore, setViewmore] = useState(false);
    const [isLoading, setLoading] = useState(false); // Estado para gestionar la carga
    
    useEffect(() => {
        if (filename) {
            setLoading(true);
        if(localStorage.getItem(filename) && !viewmore){
            renderMarkdown(localStorage.getItem(filename));
            setLoading(false);
            // localStorage.setItem(filename, response.data);
        }
        else{
            if (filename && !viewmore) {
                setLoading(true);
                axios
                    .get(`http://localhost:3000/resume/${filename}`)
                    .then((response) => {
                        renderMarkdown(response.data);
                        localStorage.setItem(filename, response.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
    
            }
            if (viewmore) {
                setLoading(true);
                console.log(localStorage.getItem(filename))
                axios
                    .get(`http://localhost:3000/extendResume/${filename}/${localStorage.getItem(filename)}`)
                    .then((response) => {
                        renderMarkdown(response.data);
                        localStorage.setItem(filename, response.data);
                        setLoading(false);
                        setViewmore(false);
                        console.log(response.data)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }
    }, [filename, viewmore]);

const newSummary = () =>{
    setLoading(true);
    if (filename) {
        axios
            .get(`http://localhost:3000/resume/${filename}`)
            .then((response) => {
                renderMarkdown(response.data);
                setLoading(false);
                localStorage.setItem(filename, response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }
}

    const fetchResume = () => {
        const url = viewmore
            ? `http://localhost:3000/resume/${filename}/${localStorage.getItem(filename)}`
            : `http://localhost:3000/resume/${filename}`;
        
        axios
            .get(url)
            .then((response) => {
                const content = response.data;
                setResume(content);
                localStorage.setItem(filename, content);
                renderMarkdown(content);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const renderMarkdown = (markdownText) => {
        const md = new MarkdownIt();
        const result = md.render(markdownText);
        setResume(result); // Actualiza el estado con el contenido renderizado
    };

    const DownloadPDF = (filename) => {
        const doc = new jsPDF();
        const storedResume = localStorage.getItem(filename);

        if (storedResume) {
            doc.text("Resumen del libro:" + localStorage.getItem("file"), 10, 10);

            const margin = 10;
            const pageWidth = doc.internal.pageSize.getWidth();
            const textWidth = pageWidth - 20; // Ajusta el ancho del texto
            const textLines = doc.splitTextToSize(storedResume, textWidth);

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

            doc.save("resumen_proyecto.pdf");
        }
    };

    return (
        <div>
            <p className="font-bold text-2xl">Summary</p>
            <hr className="my-4" />
            <div className="flex justify-end space-x-4 mb-5">
                <button
                    className="py-2 px-4 rounded text-customGreen bg-white border border-customGreen hover:bg-gray-100"
                    onClick={() => setViewmore(true)}
                >
                    <svg className="inline-block mr-2" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                        <path fill="#047857" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                    </svg>
                    More info
                </button>
                <button
                    className="py-2 px-4 rounded text-customGreen bg-white border border-customGreen hover:bg-gray-100"
                    onClick={() => DownloadPDF(filename)}
                >
                    <svg className="inline-block mr-2" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                        <path fill="#047857" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75m-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75" />
                    </svg>
                    Export PDF
                </button>
                <button
                    className="py-2 px-4 rounded text-white bg-customGreen hover:bg-green-800"
                    onClick={newSummary}
                >
                    New summary
                </button>
            </div>
            <div className="mt-5">
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <div className="ai-content" dangerouslySetInnerHTML={{ __html: resume }} />
                )}
            </div>
        </div>
    );
    
}

export default Resume;
