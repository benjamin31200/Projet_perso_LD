import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { definePassword } from "../../../Function";
import { chalkFunc } from "../../../Function.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

export async function signUpGoogleUser() {
  return axios.get("/inscription");
}

function GoogleSignIn() {
  const [userGoogleData, setUserGoogleData] = useState({ undefined });

  const handleCallbackResponse = (res) => {
    console.log("Encoded JWT ID token: " + res.credential);
    let data = jwtDecode(res.credential);
    setUserGoogleData({ data });
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
      const Password = definePassword;
      axios
        .post("/inscription/google", {
          name: userGoogleData.data.given_name,
          lastname: userGoogleData.data.family_name,
          pseudonyme: userGoogleData.data.name,
          email: userGoogleData.data.email,
          password: Password,
          repeat_password: Password,
          picture: userGoogleData.data.picture,
          Client_id_google: userGoogleData.data.aud,
        })
        .then(function (response) {
          console.log(response);
          signUpGoogleUser();
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
        });
    }
  });
  return <div id="signInDiv"></div>;
}

export default GoogleSignIn;
