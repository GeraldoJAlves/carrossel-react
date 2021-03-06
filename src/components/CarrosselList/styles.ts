import styled, { css } from "styled-components";

import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

export const CarrosselWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000;
  display: grid;
  place-items: center;
`;

export const List = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100vw;
  height: 100vh;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  align-items:start;

  @media (min-width: 900px) {
    overflow-x: auto;
  }
`;

export const CarrosselContainer = styled.div`
  position: relative;
  flex: none;
  width: 100%;
  height: 70%;
  scroll-snap-align: start;
  margin-top: 3px;

  @media (min-width: 900px) {

    height: 80%;
    width: 100%;
  }
`;

export const CarrosselTitle = styled.h1`
  position: absolute;
  margin-top: 30px;
  left: 0;
  right: 0;
  font-size: 40px;
  color: #26e7e1;
  text-align: center;
  -webkit-text-stroke: .5px #79cc33;
  text-shadow: 0px 0px 10px black;
  font-family: get_schwifty;

  @media (min-width: 900px) {
    font-size: 70px;
  }
`;

export const CarrosselDescription = styled.p`
  position: absolute;
  left: 0;
  right: 0;
  font-size: 20px;
  color: #26e7e1;
  text-align: center;
  padding: 10px 20px 0px;
  font-weight: 700;

  font-family: get_schwifty;
  font-weight: 700;
  @media (min-width: 900px) {
    font-size: 30px;
  }
`;

export const CarrosselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;


export const CarrosselPrevious = styled.div`
  position: absolute;

  display: flex;
  align-items:center;
  justify-content:start;
  top: 0;
  bottom: 0;
  width: 30%;
  transition: all 2s;
  &:hover {
    background-image: linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0));
    svg {
      fill: rgba(255,255,255,0.2);
    }
  }
`;

export const CarrosselNext = styled.div`
  position: absolute;
  display: flex;
  align-items:center;
  justify-content:flex-end;
  top: 0;
  bottom: 0;
  right: 0;
  width: 30%;
  &:hover {
    background-image: linear-gradient(to right, rgba(0,0,0,0) , rgba(0,0,0,0.5));
    svg {
      fill: rgba(255,255,255,0.2);
    }
  }
`;

const generalIconCSS = css`
  width: 0px;
  height: 0px;
  fill: rgba(255,255,255,0.05);
  transition: fill 0.5s;
  &:hover {
    fill: rgba(255,255,255,0.1);
  }

  @media (min-width: 900px){
    width: 50px;
    height: 50px;
  }
`;

export const NextIcon = styled(FaArrowCircleRight)`
  ${generalIconCSS}
  margin-right: 20px;
`;
export const PreviousIcon = styled(FaArrowCircleLeft)`
  ${generalIconCSS}
  margin-left: 20px;
`;

export const CarrosselProgress = styled.div`
  height: 3px;
  position: absolute;
  left: 0;
  top: -3px;
  background: #26e7e1;

  &.animation {
    animation-name: progressBar;
    animation-iteration-count: 1;
  }

  &.stop-animation {
    animation-play-state: paused;
  }

  @keyframes progressBar {
    from {width: 0vw;}
    to {width: 100vw;}
  }
`;
