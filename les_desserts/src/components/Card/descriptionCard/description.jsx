/* eslint-disable no-unused-expressions */
import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import {
  Input,
  SectionDesc,
  Div,
  Logo,
  Title,
  Text,
} from "./StyledComponents.jsx";
import { baseText } from "../../../Function.js";

const DescriptionCard = (props) => {
  const smallTexte = baseText(props.texte);
  const [logo, setLogo] = React.useState(props.logo);
  const [texte, setTexte] = React.useState(smallTexte);
  const [input, setInput] = React.useState({
    bool: Boolean,
    inputValue: props.inputValue,
  });
  const initialStateInput = "0.6rem";
  const initialStateH1 = "1.3rem";
  const getLengthH1 = props.name.length;
  const changeMarginInput = (state, action) => {
    switch (action.type) {
    case "true":
      return (state = "0.6rem");
    case "false":
      return (state = "0.3rem");
    default:
      throw new Error();
    }
  };

  const changeSizeH1 = (state, action) => {
    switch (action.type) {
    case "big":
      return (state = "1.5rem");
    case "medium":
      return (state = "1.2rem");
    case "small":
      return (state = "0.9rem");
    default:
      throw new Error();
    }
  };

  const [stateInput, dispatchInput] = React.useReducer(
    changeMarginInput,
    initialStateInput
  );
  const [stateH1, dispatchH1] = React.useReducer(changeSizeH1, initialStateH1);

  const changeBool = () => {
    const actualValue = input.bool;
    console.log(actualValue)
    actualValue
      ? (setInput({ bool: false, inputValue: "↑" }),
      dispatchInput({ type: "false" }),
      setTexte(props.texte))
      : (setInput({ bool: true, inputValue: "↓" }),
      dispatchInput({ type: "true" }),
      setTexte(smallTexte));
  };

  useEffect(() => {
    if (getLengthH1 < 10) {
      dispatchH1({ type: "big" });
    } else if (getLengthH1 >= 12 && getLengthH1 <= 16) {
      dispatchH1({ type: "medium" });
    } else if (getLengthH1 > 16) {
      dispatchH1({ type: "small" });
    }
  }, [getLengthH1]);

  useEffect(() => {
    const getDivRating = props.rating;
    const getNote = getDivRating.split("note: ")[1].split("/5");

    if (getNote[0] <= 2) {
      setLogo(
        "https://tse4.mm.bing.net/th?id=OIP.Mbxj-qx8QeUEqSzV6iUqFgAAAA&pid=Api&P=0&w=238&h=178"
      );
    } else if (getNote[0] > 2 && getNote[0] < 4) {
      setLogo(
        "https://tse2.mm.bing.net/th?id=OIP.naB40B_QUAHHixKvC1AH0AAAAA&pid=Api&P=0&w=167&h=165"
      );
    } else if (getNote[0] >= 4) {
      setLogo(
        "https://tse2.explicit.bing.net/th?id=OIP.EqhFQY5VypD2VL_9DmKE2AHaGw&pid=Api&P=0&w=184&h=168"
      );
    }
  }, [props.rating]);

  return (
    <SectionDesc>
      <Div sizeH1={stateH1} className="title">
        <Div className="title-h1">
          <Title>{props.name}</Title>
        </Div>
        <Div className="rating">
          <Text id="note">{props.rating}</Text>
          <Logo logo={logo}></Logo>
        </Div>
      </Div>
      <Div className="desc">
        <Div className="desc-h3">
          <Title>{props.descTitle}</Title>
        </Div>
        <Div className="desc-p">
          <Text>{texte}</Text>
          <Input
            inputMarginTop={stateInput}
            value={input.inputValue}
            onClick={changeBool}
          ></Input>
        </Div>
      </Div>
    </SectionDesc>
  );
};

DescriptionCard.propTypes = {
  rating: PropTypes.string,
  name: PropTypes.string,
  descTitle: PropTypes.string,
  logo: PropTypes.string,
  texte: PropTypes.string,
  inputValue: PropTypes.string
};

DescriptionCard.defaultProps = {
  inputValue: "↓",
};

export default DescriptionCard;
