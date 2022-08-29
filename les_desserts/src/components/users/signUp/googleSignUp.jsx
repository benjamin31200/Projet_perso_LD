import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { definePassword, chalkFunc } from "../../../Function.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { Div } from "./styledComponentsSignUp.jsx";

const MySwal = withReactContent(Swal);

function GoogleSignIn() {
  const [userGoogleData, setUserGoogleData] = useState({ undefined });

  const handleCallbackResponse = (res) => {
    console.log("Encoded JWT ID token: " + res.credential);
    let data = jwtDecode(res.credential);
    setUserGoogleData({ data });
  };
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
      const Password = definePassword;
      axios
        .post("/inscription/google", {
          name: userGoogleData.data.given_name,
          lastname: userGoogleData.data.given_name,
          pseudonyme: userGoogleData.data.name,
          email: userGoogleData.data.email,
          password: Password,
          repeat_password: Password,
          picture: userGoogleData.data.picture,
          Client_id_google: userGoogleData.data.aud,
        })
        .then(function (response) {
          console.log(response);
          MySwal.fire({
            position: "center",
            icon: "success",
            title: "Inscription réussie, Bonne visite !",
            confirmButtonText: "Confirmer",
          }).then((result) => {
            if (result.isConfirmed)
              chalkFunc.log(chalkFunc.success("Connexion"));
            window.location.href = "/";
          });
        })
        .catch(function (error) {
          console.log(error);
          if (error.response.data.message === "This email is already used") {
            window.alert("L'adresse email est déjà utilisée");
          }
        });
    }
  });
  return <Div id="signInDiv"></Div>;
}

export default GoogleSignIn;
