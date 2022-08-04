import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const MySwal = withReactContent(Swal);

const Connexion = () => {
  MySwal.fire({
    title: "Inscription",
    html: `<input type="text" id="name" class="swal2-input" placeholder="Prénom">
    <input type="text" id="lastname" class="swal2-input" placeholder="Nom">
    <input type="text" id="pseudonyme" class="swal2-input" placeholder="Pseudonyme">
    <input type="email" id="email" class="swal2-input" placeholder="Email">
    <input type="password" id="password" class="swal2-input" placeholder="mot de passe">`,
    confirmButtonText: "S'inscrire",
    focusConfirm: false,
    showCloseButton: true,
    preConfirm: () => {
      const name = Swal.getPopup().querySelector("#name").value;
      const lastname = Swal.getPopup().querySelector("#lastname").value;
      const pseudonyme = Swal.getPopup().querySelector("#pseudonyme").value;
      const email = Swal.getPopup().querySelector("#email").value;
      const password = Swal.getPopup().querySelector("#password").value;
      if (!name || !lastname || !pseudonyme || !email || !password) {
        Swal.showValidationMessage("L'un des champs d'enregistrement est vide");
      }
      return { name: name, lastname: lastname, pseudonyme: pseudonyme, email: email, password: password };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      MySwal.fire({
        showCloseButton: true,
        html: (
          <BrowserRouter>
            <Link to="/" onClick={() => Swal.close()}>
              Retour à l&apos;acceuil
            </Link>
          </BrowserRouter>
        ),
      });
    }
  });
};

export default Connexion;
