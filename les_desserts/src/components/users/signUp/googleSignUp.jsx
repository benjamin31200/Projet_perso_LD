import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { chalkFunc, deleteBlank } from "../../../Function.js";
const MySwal = withReactContent(Swal);

function GoogleSignIn(props) {
const [userGoogleData, setUserGoogleData] = useState({undefined});
  const handleCallbackResponse = (res) => {
    console.log("Encoded JWT ID token: " + res.credential);
    let data = jwtDecode(res.credential);
    setUserGoogleData({data});
  };

  console.log(userGoogleData);
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "filled_blue",
      size: "large",
      text: "continue_with",
      shape: "pill",
      logo_alignment: "left",
    });
  });

  useEffect(() => {
    if (userGoogleData.data !== undefined) {
      MySwal.fire({
        title: "Inscription",
        html: 
            <form action="/inscription" method="post">
              <input
                type="text"
                id="name"
                class="swal2-input"
                placeholder={userGoogleData.data.given_name}
                value={userGoogleData.data.given_name}
              />
              <input
                type="text"
                id="lastname"
                class="swal2-input"
                placeholder={userGoogleData.data.given_name}
                value={userGoogleData.data.given_name}
              />
              <input
                type="text"
                id="pseudonyme"
                class="swal2-input"
                placeholder={userGoogleData.data.given_name}
                value={userGoogleData.data.given_name}
              />
            </form>
        ,
        focusConfirm: false,
        confirmButtonText: "S'inscrire",
        showCloseButton: true,
        preConfirm: () => {
          const formName = Swal.getPopup().querySelector("#name").value;
          const formLastname = Swal.getPopup().querySelector("#lastname").value;
          const formPseudonyme = Swal.getPopup().querySelector("#pseudonyme").value;
          if (
            !formName ||
            !formLastname ||
            !formPseudonyme
          ) {
            Swal.showValidationMessage("L'un des champs d'enregistrement est vide");
          }
          axios
            .post("http://localhost:3000/inscription", {
              name: deleteBlank(formName),
              lastname: deleteBlank(formLastname),
              pseudonyme: deleteBlank(formPseudonyme),
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
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Inscription réussie, Bonne visite !",
            confirmButtonText: "Confirmer",
          }).then((result) => {
            if (result.isConfirmed) chalkFunc.log(chalkFunc.success("User create"));
            window.location.href = "/";
          });
        }
        if (result.dismiss) {
          window.location.href = "/";
        }
      });
    }
  })

  return (
  <div id="signInDiv"></div>
  );
}

export default GoogleSignIn;
