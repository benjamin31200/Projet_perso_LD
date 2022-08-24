import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GoogleSignUp from "./googleSignUp.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import { Button, Section } from "./styledComponentsSignUp.jsx";
import SignUp from "./signUp.jsx"
const MySwal = withReactContent(Swal);

const HomeSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  MySwal.fire({
    title: "<strong><u>Inscription</u></strong>",
    icon: "info",
    html: (
      <Section>
        <GoogleSignUp />
          <Button
            onClick={() => {
              SignUp()
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

export default HomeSignUp;
