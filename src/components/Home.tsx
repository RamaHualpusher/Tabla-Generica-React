import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container-fluid text-center">
      <h1 className='mt-3'>Hualpusher Dev</h1>
      <img 
        className='mb-2'
        src="https://lh3.googleusercontent.com/a/AAcHTtdIGr7QDV0SbESij8C0ny7RUVPRvTJaOf_Ecemkew=s432-c-no" 
        alt="About" 
        style={{borderRadius: '50%', width: '10rem', height: '10rem'}}
      />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum doloribus eligendi tempora delectus itaque similique! Alias expedita dolorum magnam assumenda rem nulla, labore esse est aliquid modi corrupti autem aut.</p>
      <Link to={"/provincia"} className='mx-2'>
        <button className="btn btn-primary"> Lista Provincias</button>
      </Link>
      <Link to={"/articulos"} className='mx-2'>
        <button className="btn btn-primary"> Lista Articulos</button>
      </Link>
    </div>
  );
};

export default Home;
