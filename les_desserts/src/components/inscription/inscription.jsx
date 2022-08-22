import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { chalkFunc, deleteBlank } from "../../Function.js";
import { useEffect } from "react";
const MySwal = withReactContent(Swal);

const Inscription = () => {
  const connect = () => {
    window.location.href = "/connexion";
  };

  useEffect(() => {
    const connexion = document.querySelector("#connexion");
    connexion.addEventListener("click", connect);
  });

  MySwal.fire({
    title: "Inscription",
    html: (
      <>
        <button id="connexion">Déja Inscrit ?</button>
        <form action="/inscription" method="post">
          <input
            type="text"
            id="name"
            class="swal2-input"
            placeholder="Prénom"
          />
          <input
            type="text"
            id="lastname"
            class="swal2-input"
            placeholder="Nom"
          />
          <input
            type="text"
            id="pseudonyme"
            class="swal2-input"
            placeholder="Pseudonyme"
          />
          <input
            type="email"
            pattern=".+@globex.com"
            size="30"
            required
            id="email"
            class="swal2-input"
            placeholder="Email"
          />
          <input
            type="password"
            inputmode="numeric"
            id="password"
            class="swal2-input"
            placeholder="mot de passe"
          />
          <input
            type="password"
            inputmode="numeric"
            id="repeat_password"
            class="swal2-input"
            placeholder="répéter le mot de passe"
          />
        </form>
      </>
    ),
    focusConfirm: false,
    confirmButtonText: "S'inscrire",
    showCloseButton: true,
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
        .post("http://localhost:3001/inscription", {
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
};

export default Inscription;
