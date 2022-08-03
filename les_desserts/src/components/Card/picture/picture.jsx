import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Div } from "./StyledComponentPicture.jsx";

const PictureCard = (props) => {
  const [picture, setPicture] = React.useState(props.picture);
  const [name] = React.useState(props.name);

  const changeBackSize = (state, action) => {
    switch (action.type) {
    case "grayman":
      return (state = "top 20% right 20% bottom 40% left 20%");
    case "others":
      return (state = "center");
    default:
      throw new Error();
    }
  };

  const intialStateSize = "center";
  const [stateSize, dispatchSize] = React.useReducer(
    changeBackSize,
    intialStateSize
  );
  const verifyName = (name, dispatch) => {
    if (name === "Avatar2" || name === "indianaJones" || name === "thor") {
      dispatch({ type: "others" });
    } else if (name === "grayman") {
      dispatch({ type: "grayman" });
    }
  };
  useEffect(() => {
    verifyName(props.name, dispatchSize);
  }, [props.name]);

  useEffect(() => {
    const objPicture = {
      crêpe: [
        "https://cutt.ly/UZRsyCY",
        "https://cutt.ly/oZRsmjH",
        "https://cutt.ly/zZRsHLy"
      ],
    };
    const timeoutSrc = (ele, ind) => {
      setTimeout(() => {
        setPicture(ele);
      }, ind * 4000);
    };
    const getSec = objPicture[name].length * 4000;
    objPicture[name].forEach((element, index) => {
      timeoutSrc(element, index);
      setInterval(() => {
        timeoutSrc(element, index);
      }, getSec);
    });
  }, [name]);

  return <Div backPos={stateSize} picture={picture}></Div>;
};

PictureCard.propTypes = {
  picture: PropTypes.string,
  name: PropTypes.string,
};

export default PictureCard;
