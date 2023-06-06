import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProvinciaService from '../services/ProvinciaService';
import { Provincia } from '../model/Provincia';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';

interface RouteParams {
  id: string;
}

const ProvinciaDetail: React.FC = () => {
  const [provincia, setProvincia] = useState<Provincia | null>(null);
  const { id } = useParams<Record<string, string | undefined>>();


  useEffect(() => {
    const fetchProvincia = async () => {
      const data = await ProvinciaService.getProvincia(Number(id));
      setProvincia(data);
    };

    fetchProvincia();
  }, [id]);

  if (!provincia) return <div>Loading...</div>;

  return (
    <Container>
        <Row className="justify-content-center mt-5">
            <Col md="8">
                <Card >
                    <Card.Body>
                        <Card.Title><h1>{provincia.nombre}</h1></Card.Title>
                        <Card.Text>
                            <p><strong>Capital:</strong> {provincia.capital}</p>
                            <p><strong>Población:</strong> {provincia.poblacion}</p>
                            <p><strong>Superficie:</strong> {provincia.superficie}</p>
                            <p><strong>Número de Departamentos:</strong> {provincia.nroDepartamentos}</p>
                            <p><strong>Abreviatura:</strong> {provincia.abreviatura}</p>
                            <p><strong>Bandera:</strong></p>
                            <Image src={"/img/"+provincia.bandera} alt={provincia.nombre} className="img-thumbnail w-25" />
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="info" href={"/provincia"} className='w-50'>Volver</Button>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </Container>
  );
};

export default ProvinciaDetail;
