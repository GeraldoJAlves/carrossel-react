import React, { WheelEvent } from "react";

import {
  CarrosselWrapper,
  List,
  CarrosselContainer,
  CarrosselImage,
} from "./styles";

import images from "./data";

interface PropsItem {
  image: any;
  key: number;
}

const CarrosselList: React.FC = () => {
  const CarrosselItem: React.FC<PropsItem> = ({ image }) => {
    return (
      <CarrosselContainer>
        <CarrosselImage src={image} />
      </CarrosselContainer>
    );
  };

  const eventWheel = (event: WheelEvent) => {
    let x = 300;
    x *= event.deltaY > 0 ? 1 : -1;
    const element: any = event.target;
    element.scrollBy(x, 0);
  };

  return (
    <CarrosselWrapper id="items">
      <List onWheel={eventWheel}>
        {images.map((item, index) => (
          <CarrosselItem image={item} key={index} />
        ))}
      </List>
    </CarrosselWrapper>
  );
};

export default CarrosselList;
