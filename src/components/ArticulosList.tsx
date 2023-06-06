import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import GenericTable from './GenericTable';
import ArticulosService from '../services/ArticulosService';
import { Articulo } from '../model/Articulo';
import { Rubro } from '../model/Rubro';

const ArticulosView: React.FC = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [rubros, setRubros] = useState<Rubro[]>([]);
  const [selectedRubroId, setSelectedRubroId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRubros = async () => {
      const rubrosData = await ArticulosService.getRubros();
      setRubros(rubrosData);
      setSelectedRubroId(rubrosData[0].id); // Seteamos el primer rubro por defecto
    };
    fetchRubros();
  }, []);

  useEffect(() => {
    const fetchArticulos = async () => {
      if (selectedRubroId) {
        const articulosData = await ArticulosService.getArticulosPorRubro(selectedRubroId);
        setArticulos(articulosData);
      }
    };

    fetchArticulos();
  }, [selectedRubroId]); // Aquí añadimos selectedRubroId como dependencia para refrescar los articulos cuando cambie

  // Las otras funciones de handleAdd, handleView, handleEdit, handleDelete van aquí...

  const handleSelectRubro = (idRubro: string | null) => {
    if (idRubro) {
      setSelectedRubroId(parseInt(idRubro));
    }
  };
  const handleAdd = () => {
    navigate('/articulos/new');
  };

  const handleView = (articulo: Articulo) => {
    navigate(`/articulos/${articulo.id}`);
  };

  const handleEdit = (articulo: Articulo) => {
    navigate(`/articulos/${articulo.id}/edit`);
  };

  const handleDelete = async (articulo: Articulo) => {
    if(!window.confirm('¿Está seguro que desea eliminar el artículo?')) return;
    if(!articulo.id) return; // Si no tiene id, no se puede eliminar (no existe
    await ArticulosService.deleteArticulo(articulo.id);
    setArticulos(articulos.filter(a => a.id !== articulo.id));
  };

  return (
    <>
    <Dropdown onSelect={handleSelectRubro} className='m-3'>
        <Dropdown.Toggle variant="primary" id="dropdown-basic" className='w-25'>
          {rubros.find(rubro => rubro.id === selectedRubroId)?.denominacion || 'Seleccione un Rubro'}
        </Dropdown.Toggle>
        <Dropdown.Menu className='w-25'>
          {rubros.map(rubro => (
            <Dropdown.Item key={rubro.id} eventKey={rubro.id.toString()}>
              {rubro.denominacion}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

    <GenericTable
      data={articulos}
      columns={[
        { field: 'codigo', title: 'Código', width: 3 },
        { field: 'denominacion', title: 'Denominación', width: 4 },
        { field: 'precio', title: 'Precio', width: 2 },
        { field: 'idrubro', title: 'Rubro', width: 3 },
      ]}
      actions={{
        create: true,
        view: true,
        update: true,
        delete: true,
      }}
      onAdd={handleAdd}
      onView={handleView}
      onUpdate={handleEdit}
      onDelete={handleDelete}
    />

    </>
  );
};

export default ArticulosView;
