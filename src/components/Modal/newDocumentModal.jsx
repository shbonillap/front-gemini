import React, { useState } from 'react';

const NewDocumentModal = ({ isOpen, onClose, uploadFile }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (file && title) {
      uploadFile(file, title); // Pasar el archivo y el nombre personalizado al backend
      onClose(); // Cerrar el modal después de enviar
    } else {
      alert("Por favor, completa todos los campos antes de enviar.");
    }
  };

  // Evitar renderizar el modal si no está abierto
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Load new document</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Enter file name..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mt-2 bg-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Document</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded mt-2"
            id="file" // ID para referencia adicional si es necesario
          />
        </div>
        <div className="flex justify-end">
        <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            style={{ marginTop: "20px"}}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            style={{ backgroundColor: '#047857', color: "white", marginTop: "20px"}}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewDocumentModal;
