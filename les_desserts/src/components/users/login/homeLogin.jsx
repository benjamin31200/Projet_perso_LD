import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GoogleLogin from "./googleLogin.jsx";
import React, { useEffect } from "react";
import { Section } from "./styledComponentsLogin.jsx";
import { chalkFunc, deleteBlank } from "../../../Function.js";
import axios from "axios";
const MySwal = withReactContent(Swal);

const HomeSignIn = () => {
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
        if (!formEmail || !formPassword) {
          Swal.showValidationMessage(
            "L'un des champs d'enregistrement est vide"
          );
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
            console.log(error);
            if (
              error.response.data.message === "Le mot de passe est incorrect."
            ) {
              window.alert("L'email ou le mot de passe ne correspondent pas.");
            } else if (
              error.response.data.message ===
              "L'email n'est associé à aucun compte."
            ) {
              window.alert("Aucun compte détécté avec cet email.");
            }
          });
      },
    }).then((result) => {
      if (result.dismiss || result.isDenied) {
        window.location.href = "/";
      } else if (result.isConfirmed) {
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "Connexion réussie, Bonne session !",
          confirmButtonText: "Confirmer",
        }).then((result) => {
          if (result.isConfirmed) {
            chalkFunc.log(chalkFunc.success("Connexion"));
            window.location.href = "/";
          }
        });
      }
    });
  });
};

export default HomeSignIn;
