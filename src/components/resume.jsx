import axios from "axios";
import React, { useEffect, useState } from "react";

const Resume = ({ filename }) => {
    console.log("Realizando resumen")

    const [resume, setResume] = useState([]);
    const [viewmore, setViewmore] = useState(false);


    useEffect(() => {
        if (filename) {
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
        if(viewmore){
            axios
                .get(`http://localhost:3000/resume/${filename}/${localStorage.getItem(filename)}`)
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [filename]);

    return (
        <div>
            <div>
                <p>Cargando resumen...</p>
                {resume}
            </div>
            <input type='button' onClick={() => setViewmore(true)} value="Ver más"></input>
        </div>
    );
}

export default Resume;
