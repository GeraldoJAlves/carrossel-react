import styled from "styled-components";

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
  border-radius: 20px;
  width: 100vw;
  height: 100vh;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  align-items:center;
`;

export const CarrosselContainer = styled.div`
  position: relative;
  pointer-events: none;
  flex: none;
  width: 100%;
  height: 65%;
  scroll-snap-align: start;

  @media (min-width: 900px) {
    width: 100%;
  }
`;

export const CarrosselTitle = styled.h1`
  margin-top: -30px;
  font-size: 40px;
  color: #5cfc53;
  text-align: center;

  @media (min-width: 900px) {
    margin-top: -60px;
    font-size: 70px;
  }
`;

export const CarrosselDescription = styled.p`
  font-size: 20px;
  color: #5cfc53;
  text-align: center;

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
  pointer-events:all;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40%;
`;

export const CarrosselNext = styled.div`
pointer-events:all;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 30%;
`;
