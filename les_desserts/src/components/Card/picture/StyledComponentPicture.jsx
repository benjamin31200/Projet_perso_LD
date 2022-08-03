import styled from "styled-components";

export const Div = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  background-image: url(${(props) => props.picture});
  background-position: ${(props) => props.backPos};
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 20px 20px 30px 30px;
  transition: ease-in 200ms;
  border-bottom: 2px solid black;
  box-shadow: inset rgb(227 229 231) 0px 10px 40px -15px,
    inset rgb(227 229 231) 10px 0px 40px -15px;
`;