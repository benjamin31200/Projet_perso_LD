import styled from "styled-components";

export const Section = styled.section`
  height: auto;
  width: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Div = styled.div`
  display: flex;
  justify-content: center;
  &.swal2-html-container {
    display: flex;
    margin: auto;
  }
`;
