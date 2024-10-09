import React from 'react';
import { Link } from 'react-router-dom';

const WorkCard = ({ id, titulo, imagen, categoria, descripcion }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      {/* <img src={imagen} alt={titulo} className="w-50 h-50 object-cover rounded-t-lg" /> */}
      <h2 className="text-xl font-semibold mt-2">{titulo}</h2>
      <p className="text-gray-600">{categoria}</p>
      <p className="text-gray-500">{descripcion}</p>
      {/* Botón "Detalles" estilizado */}
      <Link
        to={`/dashboard-detalle-trabajador/${encodeURIComponent(id)}`}
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4 transition duration-200 ease-in-out"
      >
        Detalles
      </Link>
    </div>
  );
};

export default WorkCard;
