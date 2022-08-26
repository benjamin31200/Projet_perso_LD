import React from "react";
import { Section, Nav, Div } from "./StyledComponentNavbar.jsx";
import { Link } from "react-router-dom";
import { sess } from "../../axiosRequest.js";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
  const [getSession] = useState({sess});
  const [onSession, setOnSession] = useState(Boolean);
  console.log(getSession.sess.data);

  const isConnect = () => {
    if (getSession.sess.data !== null) {
      setOnSession(true);
    } else {
      setOnSession(false);
    }
  };

  useEffect(() => {
    isConnect();
  });

  return (
    <Section>
      <Nav>
        <Div>
          <Link to="/">Accueil</Link>
        </Div>
        <Div>
          <Link to="/desserts">Les desserts</Link>
        </Div>
        {onSession ? (
          <>
            <Div>
              <Link to="/inscription">Inscription</Link>
            </Div>
            <Div>
              <Link to="/connexion">Connection</Link>
            </Div>
          </>
        ) : (
          <>
            <Div>
              <Link to="/inscription">Inscription</Link>
            </Div>
            <Div>
              <Link to="/connexion">Connection</Link>
            </Div>
          </>
        )}
      </Nav>
    </Section>
  );
};

export default Navbar;
