import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

function GoogleLogin() {
  const [, setUser] = useState({});

  const handleCallbackResponse = (res) => {
    console.log("Encoded JWT ID token: " + res.credential);
    let userObject = jwtDecode(res.credential);
    console.log(userObject);
    setUser(userObject);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
      cancel_on_tap_outside: true,
    });

    google.accounts.id.renderButton(document.getElementById("loginDiv"), {
      theme: "filled_blue",
      size: "large",
      text: "signin_with",
      shape: "pill",
      logo_alignment: "left",
    });
    google.accounts.id.prompt();
  }, []);

  return (
  <div id="loginDiv"></div>
  );
}

export default GoogleLogin;
