import axios from "axios";
import { signUpGoogleUser } from "./components/users/signUp/googleSignUp.jsx"

  function postUser() {
    return axios.get("/connexion");
  }
   export let sess = {};
if (signUpGoogleUser) {
    Promise.any([postUser(), signUpGoogleUser()]).then(function (result) {
        sess = result
      })
}
 