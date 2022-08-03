import React from "react";
import PropTypes from "prop-types";
import { Div, Title, Button, List, Element } from "./styledComponentData.jsx";

const DataCard = (props) => {
  return (
    <Div className="scrollDiv">
      <Title>{props.title}</Title>
      <List className="scrollList">
        <Element>
          <Button type="button" value={props.category1}></Button>
        </Element>
        <Element>
          <Button type="button" value={props.category2}></Button>
        </Element>
        <Element>
          <Button type="button" value={props.category3}></Button>
        </Element>
        <Element>
          <Button type="button" value={props.category4}></Button>
        </Element>
        <Element>
          <Button type="button" value={props.category5}></Button>
        </Element>
      </List>
    </Div>
  );
};
  
DataCard.propTypes = {
  title: PropTypes.string,
  category1: PropTypes.string,
  category2: PropTypes.string,
  category3: PropTypes.string,
  category4: PropTypes.string,
  category5: PropTypes.string,
};
  
export default DataCard;