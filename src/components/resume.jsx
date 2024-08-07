import axios from "axios";
import React, { useEffect, useState } from "react";

const Resume = ({ filename }) => {
    console.log("Realizando resumen")
    if (filename) {
        const [resume, setResume] = useState([]);

        useEffect(() => {
            axios
                .get(`http://localhost:3000/resume/${filename}`)
                .then((response) => {
                    setResume(response.data);
                    localStorage.setItem(filename, response.data)

                })
                .catch((error) => {
                    console.log(error);
                });
        }, []);


        return (
            <div>
                <div>
                    {resume}
                </div>
            </div>
        );
    }
}

export default Resume;
