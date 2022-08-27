import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GoogleSignUp from "./googleSignUp.jsx";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { chalkFunc, deleteBlank } from "../../../Function.js";
import { Section } from "./styledComponentsSignUp.jsx";
import { useEffect } from "react";
const MySwal = withReactContent(Swal);

const HomeSignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {

    MySwal.fire({
      title: "<strong><u>Inscription</u></strong>",
      icon: "info",
      html: (
        <Section>
          <GoogleSignUp />
          <form action="/inscription" method="post">
            <input
              type="text"
              id="name"
              className="swal2-input"
              placeholder="Prénom"
            />
            <input
              type="text"
              id="lastname"
              className="swal2-input"
              placeholder="Nom"
            />
            <input
              type="text"
              id="pseudonyme"
              className="swal2-input"
              placeholder="Pseudonyme"
            />
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
            <input
              type="password"
              inputMode="numeric"
              id="repeat_password"
              className="swal2-input"
              placeholder="répéter le mot de passe"
            />
          </form>
        </Section>
      ),
      confirmButtonText: "S'inscrire",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Retourner à l'accueil",
      focusConfirm: false,
      showCloseButton: true,
      width: "auto",
      preConfirm: () => {
        const formName = Swal.getPopup().querySelector("#name").value;
        const formLastname = Swal.getPopup().querySelector("#lastname").value;
        const formPseudonyme = Swal.getPopup().querySelector("#pseudonyme").value;
        const formEmail = Swal.getPopup().querySelector("#email").value;
        const formPassword = Swal.getPopup().querySelector("#password").value;
        const formRepeat_password =
          Swal.getPopup().querySelector("#repeat_password").value;
        if (
          !formName ||
          !formLastname ||
          !formPseudonyme ||
          !formEmail ||
          !formPassword ||
          !formRepeat_password
        ) {
          Swal.showValidationMessage("L'un des champs d'enregistrement est vide");
        }
        axios
          .post("/inscription", {
            name: deleteBlank(formName),
            lastname: deleteBlank(formLastname),
            pseudonyme: deleteBlank(formPseudonyme),
            email: deleteBlank(formEmail),
            password: deleteBlank(formPassword),
            repeat_password: deleteBlank(formRepeat_password),
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            const err = error.response.data.validationErrors.details[0].context;
            if (err.label === "email") {
              Swal.showValidationMessage("L'email n'est pas conforme.");
            } else if (err.label === "pseudonyme" && err.limit === 3) {
              Swal.showValidationMessage(
                "Le Pseudonyme doit comporter au minimum 3 caractères."
              );
            } else if (err.label === "lastname" && err.limit === 100) {
              Swal.showValidationMessage(
                "Le Nom doit comporter moins de 100 caractères."
              );
            } else if (err.label === "name" && err.limit === 100) {
              Swal.showValidationMessage(
                "Le Prénom doit comporter moins de 100 caractères."
              );
            } else if (err.label === "pseudonyme" && err.limit === 100) {
              Swal.showValidationMessage(
                "Le Pseudonyme doit comporter moins de 100 caractères."
              );
            } else if (err.label === "repeat_password") {
              Swal.showValidationMessage("Le mot de passe n'est pas identique.");
            }
          });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          position: "top-end",
          icon: "success",
          title: "Inscription réussie, Bonne visite !",
          confirmButtonText: "Confirmer",
        }).then((result) => {
          if (result.isConfirmed) chalkFunc.log(chalkFunc.success("User create"));
          navigate("/Connexion");
        });
      }
      if (result.dismiss) {
        navigate("/");
      }
    });
  });
};

export default HomeSignUp;
