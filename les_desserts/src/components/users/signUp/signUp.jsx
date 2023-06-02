import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import {
  chalkFunc,
  deleteBlank,
  errorMessageSignUp,
} from "../../../Function.js";
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
          if (error.response.status === 422) {
            const countError =
              error.response.data.validationErrors.details.length;
            const err = [];
            for (let index = 0; index < countError; index++) {
              const getErr =
                error.response.data.validationErrors.details[index].context;
              err.push(getErr);
              errorMessageSignUp(err);
            }
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
        position: "center",
        icon: "success",
        title: "Inscription réussie, profitez pleinement du site ou personnalisé votre profil !",
        confirmButtonText: "Confirmer",
      }).then((result) => {
        if (result.isConfirmed) chalkFunc.log(chalkFunc.success("User create"));
        window.location.href = "/";
      });
    } else if (result.dismiss || result.isDenied) {
      window.location.href = "/";
    }
  });
};

export default SignUp;
