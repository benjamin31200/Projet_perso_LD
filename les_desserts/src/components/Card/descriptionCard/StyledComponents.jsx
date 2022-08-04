import styled from "styled-components";

export const Input = styled.input.attrs((props) => ({
  type: "button",
  inputMarginTop: props.inputMarginTop,
}))`
    font-size: 1.2rem;
    width: 30px;
    background-color: white ;
    cursor: pointer;
    height: 27px;
    border: 1px solid;
    font-style: normal;
    justify-content: center;
    display: flex;
    margin: ${(props) => props.inputMarginTop};
    &:hover {
      background-image: linear-gradient(#020520, rgba(21, 21, 214, 0.5)),
        url(https://tse1.mm.bing.net/th?id=OIP.1GrT5PWR6d1WhbyQWcvd8AHaEo&pid=Api&P=0&w=275&h=171);
        color: white;
    }
  `;
  
export const SectionDesc = styled.section`
    width: auto;
    display: flex;
    height: auto;
    justify-content: center;
    flex-direction: column;
  `;
  
export const Div = styled.div`
    width: auto;
    justify-content: center;
    display: flex;
    &.rating {
      background: url(https://img.freepik.com/vecteurs-libre/fond-abstrait-blanc_23-2148806276.jpg?t=st=1657015296~exp=1657015896~hmac=06acbdc…&w=996);
      background-position: center;
      background-clip: content-box;
      background-size: cover;
      border-radius: 2pc;
      border: 2px solid black;
      p {
        color: #070f4e;
        font-family: "SimplySansBold";
        font-weight: bold;
        padding: 0.2rem;
        margin: 0.4rem;
        font-size: 1rem;
      }
    }
    &.title {
      place-content: space-evenly;
      flex-direction: row;
      background-image: linear-gradient(#020520, rgba(21, 21, 214, 0.5)),
        url(https://tse1.mm.bing.net/th?id=OIP.1GrT5PWR6d1WhbyQWcvd8AHaEo&pid=Api&P=0&w=275&h=171);
      background-position: center;
      background-clip: content-box;
      background-size: cover;
      height: 90px;
      align-items: center;
      border-bottom: 2px solid;
      &::before {
        content: "";
        width: 100%;
        height: 29px;
        background-color: #02072b;
        position: absolute;
        top: 175px;
        z-index: -1;
      }
      h1 {
        font-family: "SimplySansBold";
        font-weight: bold;
        font-size: ${(props) => props.sizeH1};
        color: white;
        text-shadow: -5px 3px 7px rgb(0 0 0), -1px -3px 2px rgb(0 0 0);
      }
    }
    &.desc {
      flex-direction: column;
    }
    &.desc-p {
      text-align: justify;
      padding: 0.7rem 0.5rem 0.5rem 0.7rem;
      align-items: center;
      flex-direction: column;
      p:nth-child(0n + 1) {
        display: contents;
        font-style: italic;
        font-family: "ConstantineRegular";
        font-weight: bold;
        font-size: 0.8rem;
      }
    }
    &.desc-h3 {
      justify-content: justify;
      padding-left: 0.3rem;
      justify-content: flex-start;
      h1:first-child {
        font-family: "ConstantineRegular";
        margin: 0.7rem 0 0 0.5rem;
        font-size: 1.2rem;
      }
    }
  `;
  
export const Logo = styled(Div)`
    background-image: url(${(props) => props.logo});
    width: 25px;
    background-position: center;
    background-size: cover;
    background-clip: content-box;
    height: 25px;
    position: relative;
    bottom: 10px;
    left: 5px;
    border-radius: 20px;
    mix-blend-mode: inherit;
  `;
  
export const Title = styled.h1``;
export const Text = styled.p``;