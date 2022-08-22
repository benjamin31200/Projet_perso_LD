import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { chalkFunc, deleteBlank } from "../../../Function.js";
const MySwal = withReactContent(Swal);

const Connexion = () => {
  MySwal.fire({
    title: "Connection",
    html: `
    <form action="/connexion" method="post">
    <input type="email" pattern=".+@globex.com" size="30" required id="email" class="swal2-input" placeholder="Email"/>
    <input type="password" inputmode="numeric" id="password" class="swal2-input" placeholder="mot de passe"/>
    </form>
    `,
    focusConfirm: false,
    confirmButtonText: "Se connecter",
    showCloseButton: true,
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
        .post("http://localhost:3001/connexion", {
          email: deleteBlank(formEmail),
          password: deleteBlank(formPassword),
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          const err = error.response.data.validationErrors.details[0].context;
          if (err.label === "email") {
            Swal.showValidationMessage("L'email n'est pas conforme.");
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

export default Connexion;
