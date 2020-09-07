
import React from 'react';
import CarrosselList from '../../components/CarrosselList';

import images from "./data";


const Carrossel: React.FC = () => {
  return (
    <CarrosselList images={images} />
  );
}

export default Carrossel;