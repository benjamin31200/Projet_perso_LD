import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import { BrowserRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
import {
  InputName,
  InputLastname,
  InputPseudonyme,
  InputEmail,
  InputPassword,
  InputRepeatPassword,
  InputSubmit,
  Form,
} from "./styleComponentInscription.jsx";

const MySwal = withReactContent(Swal);

const Inscription = () => {

  const [inscription, setInscription] = useState({
    name: "",
    lastname: "",
    pseudonyme: "",
    email: "",
    password: "",
    repeat_password: "",
  });

  const handleChange = (event) => {
    setInscription({ ...inscription,   [event.target.name]:event.target.value });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(inscription);
      };

  MySwal.fire({
    title: "Inscription",
    html: (
      <Form method="post"
      action="/inscription" onSubmit={handleSubmit}>
        <InputName nameValue={inscription.name} onChange={handleChange}/>
        <InputLastname lastnameValue={inscription.lastname} onChange={handleChange}/>
        <InputPseudonyme pseudonymeValue={inscription.pseudonyme} onChange={handleChange}/>
        <InputEmail emailValue={inscription.email} onChange={handleChange}/>
        <InputPassword passwordValue={inscription.password} onChange={handleChange}/>
        <InputRepeatPassword repeatPasswordValue={inscription.repeat_password} onChange={handleChange}/>
        <InputSubmit type="submit"/>
      </Form>
    ),
    focusConfirm: false,
    showCloseButton: true,
    preConfirm: () => {
      const name = Swal.getPopup().querySelector("#name").value;
      const lastname = Swal.getPopup().querySelector("#lastname").value;
      const pseudonyme = Swal.getPopup().querySelector("#pseudonyme").value;
      const email = Swal.getPopup().querySelector("#email").value;
      const password = Swal.getPopup().querySelector("#password").value;
      const repeat_password =
        Swal.getPopup().querySelector("#repeat_password").value;
      if (
        !name ||
        !lastname ||
        !pseudonyme ||
        !email ||
        !password ||
        !repeat_password
      ) {
        Swal.showValidationMessage("L'un des champs d'enregistrement est vide");
      }
      return {
        name: name,
        lastname: lastname,
        pseudonyme: pseudonyme,
        email: email,
        password: password,
        repeat_password: repeat_password,
      };
    },
  }).then((result) => {
    return JSON.parse(result);
  });
};

export default Inscription;
