import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GoogleLogin from "./googleLogin.jsx";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Section } from "./styledComponentsLogin.jsx";
import Login from "./login.jsx";
const MySwal = withReactContent(Swal);

const HomeSignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  MySwal.fire({
    title: "<strong><u>Inscription</u></strong>",
    icon: "info",
    html: (
      <Section>
        <GoogleLogin />
        <Button
          onClick={() => {
            Login();
          }}
        >
          Se connecter sur Les Desserts
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
