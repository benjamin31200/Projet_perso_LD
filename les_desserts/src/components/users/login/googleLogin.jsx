import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { chalkFunc } from "../../../Function.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);
function GoogleLogin() {
  const [userGoogleData, setUserGoogleData] = useState({ undefined });

  const handleCallbackResponse = (res) => {
    console.log("Encoded JWT ID token: " + res.credential);
    let data = jwtDecode(res.credential);
    console.log(data);
    setUserGoogleData(data);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
      cancel_on_tap_outside: true,
    });
    google.accounts.id.prompt();
  });

  useEffect(() => {
    if (userGoogleData.data !== undefined) {
      axios
        .post("/connexion/google", {
          Client_id_google: userGoogleData.data.aud,
          email: userGoogleData.data.email
        })
        .then(function (response) {
          console.log(response);
          MySwal.fire({
            position: "center",
            icon: "success",
            title: "Connection réussie, Bonne session !",
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
}

export default GoogleLogin;
