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
            setLoading(true); // Mostrar Skeleton mientras se carga el contenido
            if (localStorage.getItem(filename) && !viewmore) {
                const storedResume = localStorage.getItem(filename);
                renderMarkdown(storedResume);
                setLoading(false);
            } else {
                fetchResume();
            }
        }
    }, [filename, viewmore]);

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
            <p style={{ fontWeight: "bold", fontSize: "30px" }}>Summary</p>
            <hr />
            <div>
                <div style={{ float: "right", display: "inline-block" }}>
                    <button
                        className="w-full py-2 semi-rounded text-customGreen bg-white hover:bg-white-800 hover:border-green-950 mt-4"
                        style={{ width: "150px", marginRight: "8px" }}
                        onClick={() => setViewmore(true)}
                    >
                        <svg style={{ float: "left" }} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                            <path fill="#047857" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                        </svg>
                        <p>More info</p>
                    </button>
                    <button
                        className="w-full py-2 semi-rounded text-customGreen bg-white hover:bg-white-800 hover:border-green-950 mt-4"
                        style={{ width: "150px", marginRight: "8px" }}
                        onClick={() => DownloadPDF(filename)}
                    >
                        <svg style={{ float: "left" }} xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                            <path fill="#047857" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75m-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75" />
                        </svg>
                        <p>Export PDF</p>
                    </button>
                    <button
                        className="w-full py-2 semi-rounded text-white bg-customGreen hover:bg-green-800 hover:border-green-950 mt-4"
                        style={{ width: "150px" }}
                    > <p>New summary</p>
                    </button>
                </div>
                <div style={{ display: "inline-block", marginTop: "10px" }}>
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: resume }} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Resume;
