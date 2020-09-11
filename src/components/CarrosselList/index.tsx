import React, { WheelEvent, useState } from "react";

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
  onEndAnimtaion: any;
  onStartAnimation: any;
  timeAnimation?: number;
  withoutPrev?: boolean;
  withoutNext?: boolean;
  activeItem?: boolean;
}

interface PropsList {
  images: Array<any>;
}

let timerOnWhell: any = null;
let lastDeltaY: number = 0;
let timerOnScroll: any = null;
let lastScrollLeft: number = 0;

const stopAnimation = () => {
  const animation = document.querySelector('#items .animation:not(.stop-animation)');
  if (animation) {
    animation.classList.add('stop-animation');
  }
}

const resumeAnimation = () => {
  const animation = document.querySelector('#items .animation.stop-animation');
  if (animation) {
    animation.classList.remove('stop-animation');
  }
}

const CarrosselList: React.FC<PropsList> = ({ images }) => {
  const CarrosselItem: React.FC<PropsItem> = ({
    item,
    previousClick,
    nextClick,
    withoutPrev,
    withoutNext,
    activeItem,
    onEndAnimtaion,
    onStartAnimation,
    timeAnimation,
  }) => {
    const [isPausedAnimation, setIsPausedAnimation] = useState(false);
    const animationDuration =
      timeAnimation && timeAnimation > 0 ? timeAnimation : 5;

    let stopClickScroll: boolean = false;
    let mouseHold = false;
    let timeMouseHold: number = 0;

    const holdMouse = () => {
      if (mouseHold) {
        timeMouseHold += 250;
        if (timeMouseHold > 500) {
          stopClickScroll = true;
        }
        setTimeout(holdMouse, 250);
      }
    };

    const onMouseDown = () => {
      mouseHold = true;
      setIsPausedAnimation(true);
      holdMouse();
    };

    const onMouseUp = () => {
      setIsPausedAnimation(false);
      mouseHold = false;
      timeMouseHold = 0;
    };

    return (
      <CarrosselContainer
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onMouseDown}
        onTouchEnd={onMouseUp}
      >
        <CarrosselProgress
          className={`
            ${activeItem ? "animation" : ""}
            ${isPausedAnimation ? "stop-animation" : ""}
          `}
          onAnimationEnd={onEndAnimtaion}
          onAnimationStart={onStartAnimation}
          style={
            activeItem ? { animationDuration: `${animationDuration}s` } : {}
          }
        />
        <CarrosselTitle>{item.title}</CarrosselTitle>
        <CarrosselImage src={item.src} alt={item.title} />
        <CarrosselDescription>{item.description}</CarrosselDescription>
        {!withoutPrev ? (
          <CarrosselPrevious
            onClick={() => {
              !stopClickScroll && previousClick();
              stopClickScroll = false;
            }}
          >
            <PreviousIcon />
          </CarrosselPrevious>
        ) : null}
        {!withoutNext ? (
          <CarrosselNext
            onClick={() => {
              !stopClickScroll && nextClick();
              stopClickScroll = false;
            }}
          >
            <NextIcon />
          </CarrosselNext>
        ) : null}
      </CarrosselContainer>
    );
  };

  const [currentItem, setCurrentItem] = useState<number>(0);

  const scrollListTo = (indexItem: number) => {
    const element = document.querySelector(
      `#items>div:nth-child(${indexItem + 1})`
    );
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const nextItem = (reset?: boolean) => {
    const totalItems = images.length - 1;
    if (currentItem === totalItems) {
      reset && setCurrentItem(0);
      return;
    }
    setCurrentItem(currentItem + 1);
  };

  const previousItem = () => currentItem > 0 && setCurrentItem(currentItem - 1);

  const onWheel = (event: WheelEvent) => {
    if (event.deltaY !== 0) {
      clearTimeout(timerOnWhell);
      lastDeltaY = event.deltaY;
      timerOnWhell = setTimeout(() => {
        if (lastDeltaY < 0) {
          nextItem();
        } else {
          previousItem();
        }
      }, 300);
    }
  };

  const onScroll = (e: any) => {
      const element = e.target as HTMLDivElement;
      clearTimeout(timerOnScroll);
      lastScrollLeft = element.scrollLeft;
      stopAnimation();

      timerOnScroll = setTimeout(() => {
        const currentOffset = getOffsetItem();
        if (currentOffset > lastScrollLeft) {
          previousItem();
        } else if (currentOffset < lastScrollLeft) {
          nextItem();
        }
        resumeAnimation();
      }, 400);
  };

  const getOffsetItem = () => {
    const element = document.querySelector(
      `#items > div:nth-child(${currentItem + 1})`
    ) as HTMLDivElement;

    if (element) {
      return element.offsetLeft;
    }
    return 0;
  };

  return (
    <CarrosselWrapper>
      <List id="items" className="items" onWheel={onWheel} onScroll={onScroll}>
        {images.map((item, index) => {
          let time = 5;
          if (item.description) {
            const tot = item.description.trim().split(' ').length;
            time = Math.round(tot * .42);
          }
          return (
            <CarrosselItem
              item={item}
              key={index}
              previousClick={() => previousItem()}
              nextClick={() => nextItem()}
              withoutNext={index === images.length - 1}
              withoutPrev={index === 0}
              activeItem={index === currentItem}
              onEndAnimtaion={() => {
                nextItem(true);
              }}
              onStartAnimation={() => {
                scrollListTo(currentItem);
              }}
              timeAnimation={time}
            />
          );
        })}
      </List>
    </CarrosselWrapper>
  );
};

export default CarrosselList;
