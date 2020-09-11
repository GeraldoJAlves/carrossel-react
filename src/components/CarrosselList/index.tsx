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
  PreviousIcon,
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
      <CarrosselContainer onMouseDown={() => console.log("hold mouse")}>
        <CarrosselProgress className="content animation" />
        <CarrosselTitle>{item.title}</CarrosselTitle>
        <CarrosselImage src={item.src} />
        <CarrosselDescription>{item.description}</CarrosselDescription>
        {!withoutPrev ? (
          <CarrosselPrevious onClick={previousClick}>
            <PreviousIcon />
          </CarrosselPrevious>
        ) : null}
        {!withoutNext ? (
          <CarrosselNext onClick={nextClick}>
            <NextIcon />
          </CarrosselNext>
        ) : null}
      </CarrosselContainer>
    );
  };

  const scrollList = (toLeft: boolean, reset?: boolean) => {
    const element = document.getElementById("items");
    if (element) {
      if (
        reset &&
        Math.ceil(element.scrollLeft) >= element.scrollWidth - window.innerWidth
      ) {
        element.scrollTo(0, 0);
        return;
      }
      element.scrollBy(toLeft ? 300 : -300, 0);
    }
  };

  const resetAnimtion = () => {
    const items = document.querySelectorAll(".content");
    items.forEach((item) => {
      item.classList.remove("animation");
      void item.clientWidth;
      item.classList.add("animation");
    });
  };

  const stopAnimtion = () => {
    const items = document.querySelectorAll(".content");
    items.forEach((item) => {
      item.classList.add("stop-animation");
    });
  };

  const resumeAnimation = () => {
    const items = document.querySelectorAll(".content");
    items.forEach((item) => {
      item.classList.remove("stop-animation");
    });
  };

  let timeScroll: any = null;

  let defineScroll = () => {
    const limitTime = 5000;
    let status = 0;
    if (!timeScroll) {
      resetAnimtion();
      timeScroll = setInterval(() => {
        if(!mouse) {
          status +=500;
          if(Math.ceil(status) >= limitTime){
            scrollList(true, true);
            status = 0;
          }
        }
      }, 490);
    }
  };

  const eventWheel = (event: WheelEvent) => {
    scrollList(event.deltaY < 0);
  };

  const scrollListToRight = () => {
    !notScroll && scrollList(false);
    notScroll = false;
  };

  const scrollListToLeft = () => {
    !notScroll && scrollList(true);
    notScroll = false;
  };

  const scroll = (event: any) => {
    clearInterval(timeScroll);
    timeScroll = null;
    defineScroll();
  };

  defineScroll();

  let mouse= false;
  let notScroll=false;
  let timeMouseHold = 0;
  const holdMouse = () => {
    if (mouse) {
      timeMouseHold += 500;
      if( timeMouseHold > 1000) {
        notScroll = true;
      }
      setTimeout(holdMouse,500);
    }
  }

  return (
    <CarrosselWrapper>
      <List
        id="items"
        className="items"
        onWheel={eventWheel}
        onScroll={scroll}
        onMouseDown={()=> {
          mouse = true;
          stopAnimtion();
          holdMouse();
        }}
        onMouseUp={()=> {
          resumeAnimation();
          mouse = false;
          timeMouseHold = 0;
        }}
        onTouchStart={()=> {
          mouse = true;
          stopAnimtion();
          holdMouse();
        }}
        onTouchEnd={()=> {
          resumeAnimation();
          mouse = false;
          timeMouseHold = 0;
        }}
      >
        {images.map((item, index) => {
          return (
            <CarrosselItem
              item={item}
              key={index}
              previousClick={() => scrollListToRight()}
              nextClick={() => scrollListToLeft()}
              withoutNext={index === images.length - 1}
              withoutPrev={index === 0}
            />
          );
        })}
      </List>
    </CarrosselWrapper>
  );
};

export default CarrosselList;
