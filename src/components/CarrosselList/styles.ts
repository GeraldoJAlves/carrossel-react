import styled from 'styled-components';

export const CarrosselWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000;
  display:grid;
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
`;

export const CarrosselContainer = styled.div`
  flex:none;
  width: 100%;
  scroll-snap-align: start;
`;

export const CarrosselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
