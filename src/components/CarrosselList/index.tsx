import React from "react";

import {
  CarrosselWrapper,
  List,
  CarrosselContainer,
  CarrosselImage,
} from "./styles";

import images from "./data";

interface PropsItem {
  image: any;
}

const CarrosselList: React.FC = () => {
  const CarrosselItem: React.FC<PropsItem> = ({ image }) => {
    return (
      <CarrosselContainer>
        <CarrosselImage src={image} />
      </CarrosselContainer>
    );
  };

  return (
    <CarrosselWrapper>
      <List>
        {images.map((item) => (
          <CarrosselItem image={item} />
        ))}
      </List>
    </CarrosselWrapper>
  );
};

export default CarrosselList;
