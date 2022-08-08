import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { chalkFunc } from "../../Function.js";
// import { BrowserRouter } from "react-router-dom";
// import { Link } from "react-router-dom";

const MySwal = withReactContent(Swal);

const Inscription = () => {

  const [inscription, setInscription] = React.useState({
    name: "",
    lastname: "",
    pseudonyme: "",
    email: "",
    password: "",
    repeat_password: "",
  });

  MySwal.fire({
    title: "Inscription",
    html: `<form action="/inscription" method="post">
    <input type="text" id="name" class="swal2-input" placeholder="Prénom">
    <input type="text" id="lastname" class="swal2-input" placeholder="Nom">
    <input type="text" id="pseudonyme" class="swal2-input" placeholder="Pseudonyme">
    <input type="email" id="email" class="swal2-input" placeholder="Email">
    <input type="password" id="password" class="swal2-input" placeholder="mot de passe">
    <input type="password" id="repeat_password" class="swal2-input" placeholder="répéter le mot de passe">
    </form>`,
    focusConfirm: false,
    confirmButtonText: "Sign in",
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
      return setInscription({
        name: formName,
        lastname: formLastname,
        pseudonyme: formPseudonyme,
        email: formEmail,
        password: formPassword,
        repeat_password: formRepeat_password,
      });
    },
  }).then((result) => {
    console.log(result, result.value);
    if (result.isConfirmed) {
      axios
      .post("http://localhost:3001/inscription", {
        name: inscription.name,
        lastname: inscription.lastname,
        pseudonyme: inscription.pseudonyme,
        email: inscription.email,
        password: inscription.password,
        repeat_password: inscription.repeat_password,
      })
      .then(() => chalkFunc.log(chalkFunc.success("User create")))
      .catch((err) => {
        console.error(err);
      });
    }
  });

  

};

export default Inscription;
