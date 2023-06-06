import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericTable from './GenericTable'; // Importar la tabla genérica
import ProvinciaService from '../services/ProvinciaService';
import { Provincia } from '../model/Provincia';

const ProvinciasView: React.FC = () => {
  const [provincias, setProvincias] = useState<Provincia[]>([]); // Estado para almacenar las provincias
  const [filteredProvincias, setFilteredProvincias] = useState<Provincia[]>(provincias); // Estado para almacenar las provincias filtradas

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProvincias = async () => {
      const data = await ProvinciaService.getProvincias(); // Obtener las provincias desde el servicio
      setProvincias(data); // Actualizar el estado con las provincias
      setFilteredProvincias(data); // Actualizar el estado de las provincias filtradas
    };

    if (provincias.length === 0) {
      fetchProvincias(); // Realizar la llamada al servicio solo si no hay provincias cargadas previamente
    }
  }, [provincias]);

  const customSearch = async (search: string): Promise<Provincia[]> => {
    if (search.trim() === '') {
      return provincias; // Devolver todas las provincias si el texto de búsqueda está vacío
    }

    const filteredData = await ProvinciaService.searchProvincias(search); // Filtrar las provincias según el texto de búsqueda utilizando el servicio
    return filteredData; // Devolver las provincias filtradas
  };

  const handleAdd = () => {
    navigate('/provincia/new'); // Redireccionar a la vista de agregar una nueva provincia
  };

  const handleView = (provincia: Provincia) => {
    navigate(`/provincia/${provincia.id}`); // Redireccionar a la vista de visualización de una provincia específica
  };

  const handleEdit = (provincia: Provincia) => {
    navigate(`/provincia/${provincia.id}/edit`); // Redireccionar a la vista de edición de una provincia específica
  };

  const handleDelete = async (provincia: Provincia) => {
    await ProvinciaService.deleteProvincia(provincia.id); // Eliminar una provincia utilizando el servicio
    setProvincias(provincias.filter(p => p.id !== provincia.id)); // Actualizar el estado eliminando la provincia eliminada
  };

  return (
    <GenericTable
      data={filteredProvincias} // Pasar las provincias filtradas a la tabla genérica
      columns={[
        { field: 'nombre', title: 'Provincia', width: 3 }, // Definir las columnas de la tabla
        { field: 'abreviatura', title: 'Abreviatura', width: 4 },
        {
          field: 'bandera', title: 'Bandera', width: 2, render: (row: Provincia) =>
            <img src={"/img/" + row.bandera} alt={row.nombre} className="img-fluid w-50" /> // Renderizar la imagen de la bandera
        },
      ]}
      actions={{
        create: true, // Habilitar la acción de creación
        view: true, // Habilitar la acción de visualización
        update: true, // Habilitar la acción de actualización
        delete: true, // Habilitar la acción de eliminación
      }}
      onAdd={handleAdd} // Manejador de evento para la acción de agregar
      onView={handleView} // Manejador de evento para la acción de visualización
      onUpdate={handleEdit} // Manejador de evento para la acción de actualización
      onDelete={handleDelete} // Manejador de evento para la acción de eliminación
      customSearch={customSearch} // Función de búsqueda personalizada
    />
  );
};

export default ProvinciasView;
