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
  withoutPrev?: boolean;
  withoutNext?: boolean;
}

interface PropsList {
  images: Array<any>;
}

const CarrosselList: React.FC<PropsList> = ({ images }) => {
  const CarrosselItem: React.FC<PropsItem> = ({
    item,
    previousClick,
    nextClick,
    withoutPrev,
    withoutNext,
  }) => {
    return (
      <CarrosselContainer>
        <CarrosselProgress className='content animation' />
        <CarrosselTitle>{item.title}</CarrosselTitle>
        <CarrosselImage src={item.src} />
        <CarrosselDescription>{item.description}</CarrosselDescription>
        { !withoutPrev ? (
          <CarrosselPrevious onClick={previousClick}>
            <PreviousIcon />
          </CarrosselPrevious>
        ): null }
        { !withoutNext ? (
        <CarrosselNext onClick={nextClick} >
          <NextIcon />
        </CarrosselNext>
        ): null}
      </CarrosselContainer>
    );
  };

  const scrollList = (toLeft: boolean, reset?:boolean) => {
    const element = document.getElementById("items");
    if (element) {
      if(reset && Math.ceil(element.scrollLeft) >= (element.scrollWidth - window.innerWidth)) {
        element.scrollTo(0,0);
        return;
      }
      element.scrollBy(toLeft ? 300 : -300,0);
    }
  };

  const resetAnimtion = () => {
    const items = document.querySelectorAll('.content');
    items.forEach( (item) => {
      item.classList.remove('animation');
      void item.clientWidth;
      item.classList.add('animation');
    });
  }

  let timeScroll:any = null;

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
              withoutNext={index === (images.length-1)}
              withoutPrev={index === 0}
            />
          );
        })}
      </List>
    </CarrosselWrapper>
  );
};

export default CarrosselList;
