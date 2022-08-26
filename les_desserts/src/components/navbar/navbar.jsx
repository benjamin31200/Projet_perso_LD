import React from "react";
import { Section, Nav, Div } from "./StyledComponentNavbar.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function getSess() {
  return axios.get("/home");
}

const Navbar = () => {
  const [getSession, setGetSession] = useState({});
  const [onSession, setOnSession] = useState(Boolean);

  useEffect(() => {
    const promise1 = new Promise((resolve, reject) => {
      resolve(getSess());
    });

    promise1.then((value) => {
      console.log(value);
      setGetSession(value.data);
    });
  });

  console.log(getSession);
  const isConnect = () => {
    if (getSession === false) {
      setOnSession(false);
    } else {
      setOnSession(true);
    }
  };

  useEffect(() => {
    isConnect();
  });

  return (
    <Section>
      <Nav>
        {onSession ? (
          <>
            <Div>
              <Link to="/">Accueil</Link>
            </Div>
            <Div>
              <Link to="/desserts">Les desserts</Link>
            </Div>
            <Div>
              <Link to="/logout">Déconnection</Link>
            </Div>
            <Div>
              <Link to="/inscription">Inscription</Link>
            </Div>
          </>
        ) : (
          <>
            <Div>
              <Link to="/">Accueil</Link>
            </Div>
            <Div>
              <Link to="/desserts">Les desserts</Link>
            </Div>
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
