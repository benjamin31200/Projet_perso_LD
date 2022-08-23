import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GoogleSignIn from "./googleSignUp.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import { Button, Section } from "./styledComponentsSignUp.jsx";
import SignIn from "./signUp.jsx"
const MySwal = withReactContent(Swal);

const HomeSignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  MySwal.fire({
    title: "<strong><u>Inscription</u></strong>",
    icon: "info",
    html: (
      <Section>
        <GoogleSignIn />
          <Button
            onClick={() => {
              SignIn()
            }}
          >
            S'inscrire sur Les Desserts
          </Button>
      </Section>
    ),
    showCloseButton: true,
    focusConfirm: false,
  }).then((result) => {
    if (result.dismiss) {
      navigate("/" + location.search);
    }
  });
};

export default HomeSignIn;
