import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GoogleLogin from "./googleLogin.jsx";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "./styledComponentsLogin.jsx";
import { chalkFunc, deleteBlank } from "../../../Function.js";
import axios from "axios";
const MySwal = withReactContent(Swal);

const HomeSignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    MySwal.fire({
      title: "<strong><u>Connexion</u></strong>",
      icon: "info",
      html: (
        <Section>
          <GoogleLogin />
          <form action="/connexion" method="post">
            <input
              type="email"
              pattern=".+@globex.com"
              size="30"
              required
              id="email"
              className="swal2-input"
              placeholder="Email"
            />
            <input
              type="password"
              inputMode="numeric"
              id="password"
              className="swal2-input"
              placeholder="mot de passe"
            />
          </form>
        </Section>
      ),
      confirmButtonText: "Se connecter",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Retourner à l'accueil",
      focusConfirm: false,
      showCloseButton: true,
      width: "35rem",
      preConfirm: () => {
        const formEmail = Swal.getPopup().querySelector("#email").value;
        const formPassword = Swal.getPopup().querySelector("#password").value;
        if (
          !formEmail ||
          !formPassword
        ) {
          Swal.showValidationMessage("L'un des champs d'enregistrement est vide");
        }
        axios
          .post("/connexion", {
            email: deleteBlank(formEmail),
            password: deleteBlank(formPassword),
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error)
            const err = error.response.data.validationErrors.details[0].context;
            if (err.label === "email") {
              Swal.showValidationMessage("L'email n'est pas conforme.");
            }
          });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Connection réussie, Bonne visite !",
          confirmButtonText: "Confirmer",
        }).then((result) => {
          if (result.isConfirmed) chalkFunc.log(chalkFunc.success("User create"));
          navigate("/");
        });
      } else if (result.dismiss || result.isDenied) {
        navigate("/");
      }
    });
  });
};

export default HomeSignIn;
