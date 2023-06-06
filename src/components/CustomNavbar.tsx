import React from 'react';
import { Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';

const Navbar: React.FC = () => {
  return (
    <BootstrapNavbar expand="lg" bg="primary" variant="dark">
      <BootstrapNavbar.Brand href="/"><img 
        className='mx-1'
        src="https://lh3.googleusercontent.com/a/AAcHTtdIGr7QDV0SbESij8C0ny7RUVPRvTJaOf_Ecemkew=s432-c-no" 
        alt="About" 
        style={{borderRadius: '50%', width: '3.2rem', height: '3.2rem'}}
      /></BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
      <BootstrapNavbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/" className='mx-2'>Home</Nav.Link>
          <Nav.Link href="/provincia" className='mx-2'>Provincias</Nav.Link>
          <Nav.Link href="/articulos" className='mx-2'>Articulos</Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
