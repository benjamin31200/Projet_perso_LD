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

export const Button = styled.button`
  backface-visibility: hidden;
  background-color: #405cf5;
  border-radius: 6px;
  border-width: 0;
  box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
  color: #fff;
  cursor: pointer;
  font-family: -apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif;
  font-size: 90%;
  height: auto;
  line-height: 1.15;
  margin: 1rem;
  width: 13rem;
  overflow: hidden;
  text-align: center;
  justify-content: center;
  position: relative;
  left: 0.8rem;
  transform: translateZ(0);
  transition: all .2s,box-shadow .08s ease-in;
  &:disabled {
    cursor: default;
  };
  &:focus {
    box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .2) 0 6px 15px 0, rgba(0, 0, 0, .1) 0 2px 2px 0, rgba(50, 151, 211, .3) 0 0 0 4px;
  }
`;
