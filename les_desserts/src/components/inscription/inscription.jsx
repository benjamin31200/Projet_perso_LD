import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { chalkFunc } from "../../Function.js";

const MySwal = withReactContent(Swal);

const Inscription = () => {
 
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
      return {
        name: formName,
        lastname: formLastname,
        pseudonyme: formPseudonyme,
        email: formEmail,
        password: formPassword,
        repeat_password: formRepeat_password
      }
    },
  }).then((result, err) => {
    console.log(result, result.value);
    if (result.isConfirmed) {
      axios
        .post("http://localhost:3001/inscription", {
          name: result.value.name,
          lastname: result.value.lastname,
          pseudonyme: result.value.pseudonyme,
          email: result.value.email,
          password: result.value.password,
          repeat_password: result.value.repeat_password,
        })
        .then(() =>
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Inscription réussie, Bonne visite !",
            confirmButtonText: "Confirmer"
          }).then((result) => {
            if(result.isConfirmed)
            chalkFunc.log(chalkFunc.success("User create"));
            window.location.href = "/";
          })
        )
        .catch((err) => {
          console.error(err);
        });
    }
  });
};

export default Inscription;
