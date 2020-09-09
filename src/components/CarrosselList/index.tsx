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
  CarrosselProgress,
  NextIcon,
  PreviousIcon
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
        <CarrosselProgress className='content animation' />
        <CarrosselTitle>{item.title}</CarrosselTitle>
        <CarrosselImage src={item.src} />
        <CarrosselDescription>{item.description}</CarrosselDescription>
        <CarrosselPrevious onClick={previousClick}>
          <PreviousIcon />
        </CarrosselPrevious>
        <CarrosselNext onClick={nextClick} >
          <NextIcon />
        </CarrosselNext>
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

  let timeScroll:any = null;

  const resetAnimtion = () => {
    const items = document.querySelectorAll('.content');
    items.forEach( (item) => {
      item.classList.remove('animation');
      void item.clientWidth;
      item.classList.add('animation');
    });
  }

  let defineScroll = () => {
    if( !timeScroll) {
      resetAnimtion();
      timeScroll = setInterval(() => {
        scrollList(true, true);
        console.log('scrolling');
      }, 5000);
    }
  }

  const eventWheel = (event: WheelEvent) => {
    scrollList(event.deltaY < 0);
  };

  const scrollListToRight = () => {
    scrollList(false);
  };

  const scrollListToLeft = () => {
    scrollList(true);
  };

  const scroll = (event: any) => {
    console.log('clean');
    clearInterval(timeScroll);
    timeScroll = null;
    defineScroll();
  }

  defineScroll();

  return (
    <CarrosselWrapper>
      <List id="items" className="items" onWheel={eventWheel} onScroll={scroll} >
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
