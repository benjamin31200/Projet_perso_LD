import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

function GoogleSignIn() {
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
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
  <div id="signInDiv"></div>
  );
}

export default GoogleSignIn;
