import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';
import ArticulosService from '../services/ArticulosService';
import { Articulo } from '../model/Articulo';
import { Rubro } from '../model/Rubro';

interface RouteParams extends Record<string, string | undefined> {
    id?: string;
  }

  const ArticuloForm: React.FC = () => {
    const [articulo, setArticulo] = useState<Articulo | null>(null);
    const [rubros, setRubros] = useState<Rubro[]>([]);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const { id } = useParams<RouteParams>();
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchRubros = async () => {
        const rubrosData = await ArticulosService.getRubros();
        setRubros(rubrosData);
      };
  
      const fetchArticulo = async () => {
        if (id) {
          const data = await ArticulosService.getArticulo(Number(id));
          setArticulo(data);
        } else {
          setArticulo({
            codigo: '',
            denominacion: '',
            precio: 0,
            idrubro: 0
          });
        }
      };
  
      fetchRubros();
      fetchArticulo();
    }, [id]);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setArticulo(prev => prev ? { ...prev, [name]: value } : null);
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (articulo) {
          ArticulosService.getArticulosPorCodigo(articulo.codigo).then(existingArticulos => {
            const existingArticulo = existingArticulos[0]; // Si devuelve una lista de artículos, tomamos el primer elemento
            if (existingArticulo && existingArticulo.id !== articulo.id) {
              // Existe un artículo con el mismo código y no es el que estamos editando actualmente
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 3000); // La alerta desaparece después de 3 segundos
            } else {
              // No existe un artículo con el mismo código o es el que estamos editando actualmente
              if (id) {
                ArticulosService.putArticulo(articulo).then(() => navigate('/articulos'));
              } else {
                ArticulosService.postArticulo(articulo).then(() => navigate('/articulos'));
              }
            }
          });
        }
      };
  
    const handleCancel = () => {
      navigate('/articulos');
    };
  
    if (!articulo || !rubros.length) return <div>Loading...</div>;
  return (
    <div className='container m-5'>
      <Form onSubmit={handleSubmit}>
      {articulo.id && (
          <Form.Group controlId="id">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" name="id" value={String(articulo.id)} readOnly />
          </Form.Group>
        )}
        <Form.Group controlId="codigo">
          <Form.Label>Código</Form.Label>
          <Form.Control type="text" name="codigo" value={articulo.codigo} onChange={handleChange} />
          {showAlert && (
            <Alert variant='danger'>
              Este código ya está asignado a otro artículo.
            </Alert>
          )}
        </Form.Group>

        <Form.Group controlId="denominacion">
          <Form.Label>Denominación</Form.Label>
          <Form.Control type="text" name="denominacion" value={articulo.denominacion} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="precio">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" name="precio" value={articulo.precio} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="idrubro">
          <Form.Label>Rubro</Form.Label>
          <Form.Control as="select" name="idrubro" value={articulo.idrubro} onChange={handleChange}>
            {rubros.map((rubro) => (
              <option key={rubro.id} value={rubro.id}>{rubro.denominacion}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={showAlert}>
          Guardar
        </Button>
        <Button variant="secondary" onClick={handleCancel} style={{ marginLeft: '10px' }}>
          Cancelar
        </Button>
      </Form>
    </div>
  );
};

export default ArticuloForm;
