import React from 'react';

import { CarrosselContainer, List, CarrosselImage } from './styles';

import images from './data';

interface PropsItem {
  image: any;
}

const CarrosselList: React.FC = () => {

  const CarrosselItem: React.FC<PropsItem> = ({image}) => {
    return (
      <CarrosselContainer>
        <CarrosselImage  src={image} />
      </CarrosselContainer>
    );
  }


  return (
    <List>
      {images.map( (item) => (
        <CarrosselItem image={item}/>
      ))}
    </List>
  );
};

export default CarrosselList;
