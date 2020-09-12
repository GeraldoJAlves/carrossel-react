
import React from 'react';
import CarrosselList from '../../components/CarrosselList';

import items from "./data";


const Carrossel: React.FC = () => {
  return (
    <CarrosselList items={items} />
  );
}

export default Carrossel;