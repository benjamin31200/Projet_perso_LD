import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GoogleSignUp from "./googleSignUp.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import { Button, Section } from "./styledComponentsSignUp.jsx";
import SignUp from "./signUp.jsx";
import { useEffect } from "react";
const MySwal = withReactContent(Swal);

const HomeSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    MySwal.fire({
      title: "<strong><u>Inscription</u></strong>",
      icon: "info",
      html: (
        <Section>
          <GoogleSignUp />
          <Button
            onClick={() => {
              SignUp();
            }}
          >
            S'inscrire sur Les Desserts
          </Button>
        </Section>
      ),
      confirmButtonText: "Retour à l'accueil",
      focusConfirm: false,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/" + location.search);
      } else if (result.dismiss) {
        navigate("/" + location.search);
      }
    });
  });
};

export default HomeSignUp;
