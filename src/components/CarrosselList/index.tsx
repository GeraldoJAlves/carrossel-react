import React, { WheelEvent } from "react";

import {
  CarrosselWrapper,
  List,
  CarrosselContainer,
  CarrosselImage,
} from "./styles";

interface PropsItem {
  image: any;
  key: number;
}

interface PropsList {
  images: Array<string>;
}

const CarrosselList: React.FC<PropsList> = ({ images }) => {
  const CarrosselItem: React.FC<PropsItem> = ({ image }) => {
    return (
      <CarrosselContainer>
        <CarrosselImage src={image} />
      </CarrosselContainer>
    );
  };

  const eventWheel = (event: WheelEvent) => {
    let scrollX = 300;
    scrollX *= event.deltaY > 0 ? 1 : -1;
    const divElement = event.target as HTMLDivElement;
    divElement.scrollBy(scrollX, 0);
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
