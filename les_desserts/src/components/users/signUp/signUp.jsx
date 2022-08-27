import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { chalkFunc, deleteBlank } from "../../../Function.js";
const MySwal = withReactContent(Swal);

const SignUp = () => {
  MySwal.fire({
    title: "Inscription",
    icon: "info",
    html: (
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
    ),
    focusConfirm: false,
    confirmButtonText: "S'inscrire",
    showCloseButton: true,
    width: "35rem",
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
      return axios
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
          console.log(error);
          const labelArray = [
            "email",
            "name",
            "lastname",
            "pseudonyme",
            "password",
          ];
          if (error.response.status === 422) {
            const countError =
              error.response.data.validationErrors.details.length;
            for (let index = 0; index < countError; index++) {
              if (
                error.response.data.validationErrors.details[index].label ===
                labelArray[index]
              ) {
                Swal.showValidationMessage(`${labelArray[index]} est vide.`);
              }
            }
            if (error.label === "email") {
              Swal.showValidationMessage("L'email n'est pas conforme.");
            } else if (
              error.response.data.validationErrors.details[index].context.label ===
                "pseudonyme" &&
              error.response.data.validationErrors.details[0].context.limit ===
                3
            ) {
              Swal.showValidationMessage(
                "Le Pseudonyme doit comporter au minimum 3 caractères."
              );
            } else if (error.label === "lastname" && error.limit === 100) {
              Swal.showValidationMessage(
                "Le Nom doit comporter moins de 100 caractères."
              );
            } else if (error.label === "name" && error.limit === 100) {
              Swal.showValidationMessage(
                "Le Prénom doit comporter moins de 100 caractères."
              );
            } else if (error.label === "pseudonyme" && error.limit === 100) {
              Swal.showValidationMessage(
                "Le Pseudonyme doit comporter moins de 100 caractères."
              );
            } else if (
              error.response.data.validationErrors.details[1].context.label ===
              "repeat_password"
            ) {
              Swal.showValidationMessage(
                "Le mot de passe n'est pas identique."
              );
            } else if (
              error.response.data.message === "This email is already used"
            ) {
              Swal.showValidationMessage("L'adresse mail est déjà utilisée.");
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
        window.location.href("/connexion");
      });
    }
  });
};

export default SignUp;
