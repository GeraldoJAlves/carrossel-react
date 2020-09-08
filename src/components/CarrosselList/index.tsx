import React, { WheelEvent } from "react";

import {
  CarrosselWrapper,
  List,
  CarrosselContainer,
  CarrosselImage,
  CarrosselTitle,
  CarrosselDescription,
  CarrosselPrevious,
  CarrosselNext,
} from "./styles";

interface PropsItem {
  item: any;
  previousClick: any;
  nextClick: any;
  key: number;
}

interface PropsList {
  images: Array<any>;
}

const CarrosselList: React.FC<PropsList> = ({ images }) => {
  const CarrosselItem: React.FC<PropsItem> = ({
    item,
    previousClick,
    nextClick,
  }) => {
    return (
      <CarrosselContainer>
        <CarrosselTitle>{item.title}</CarrosselTitle>
        <CarrosselImage src={item.src} />
        <CarrosselDescription>{item.description}</CarrosselDescription>
        <CarrosselPrevious onClick={previousClick} />
        <CarrosselNext onClick={nextClick} />
      </CarrosselContainer>
    );
  };
  const scrollList = (toLeft: boolean, reset?:boolean) => {
    const element = document.getElementById("items");
    if (element) {

      if(reset && element.scrollLeft === (element.scrollWidth - document.body.clientWidth)) {
        element.scrollLeft=0;
        return;
      }
      element.scrollBy(toLeft ? 300 : -300,0);
    }
  };

  const eventWheel = (event: WheelEvent) => {
    scrollList(event.deltaY < 0);
  };

  const scrollListToRight = () => {
    scrollList(false);
  };

  const scrollListToLeft = () => {
    scrollList(true);
  };

  setInterval(() => {
    scrollList(true, true);
  }, 10000);

  return (
    <CarrosselWrapper>
      <List id="items" className="items" onWheel={eventWheel}>
        {images.map((item, index) => {
          return (
            <CarrosselItem
              item={item}
              key={index}
              previousClick={() => scrollListToRight()}
              nextClick={() => scrollListToLeft()}
            />
          );
        })}
      </List>
    </CarrosselWrapper>
  );
};

export default CarrosselList;
