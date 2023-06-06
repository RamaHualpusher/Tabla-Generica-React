import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArticulosService from '../services/ArticulosService';
import { Articulo } from '../model/Articulo';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

interface RouteParams {
  id: string;
}

const ArticuloView: React.FC = () => {
  const [articulo, setArticulo] = useState<Articulo | null>(null);
  const { id } = useParams<Record<string, string | undefined>>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticulo = async () => {
      const data = await ArticulosService.getArticulo(Number(id));
      setArticulo(data);
    };

    fetchArticulo();
  }, [id]);

  if (!articulo) return <div>Loading...</div>;

  return (
    <Container>
        <Row className="justify-content-center mt-5">
            <Col md="8">
                <Card >
                    <Card.Body>
                        <Card.Title><h1>{articulo.denominacion}</h1></Card.Title>
                        <Card.Text>
                            <p><strong>ID:</strong> {articulo.id}</p>
                            <p><strong>Código:</strong> {articulo.codigo}</p>
                            <p><strong>Precio:</strong> {articulo.precio}</p>
                            <p><strong>ID Rubro:</strong> {articulo.idrubro}</p>
                            {articulo.nuevo && <p><strong>Nuevo:</strong> {articulo.nuevo}</p>}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="info" onClick={() => navigate("/articulos")} className='w-50'>Volver</Button>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </Container>
  );
};

export default ArticuloView;
