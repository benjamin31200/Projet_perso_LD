import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GoogleSignUp from "./googleSignUp.jsx";
import SignUp from "./signUp.jsx";
import { Section, Button } from "./styledComponentsSignUp.jsx";
import { useEffect } from "react";
const MySwal = withReactContent(Swal);

const HomeSignUp = () => {

  useEffect(() => {
    MySwal.fire({
      title: "<strong><u>Inscription</u></strong>",
      icon: "info",
      html: (
        <Section>
          <GoogleSignUp />
          <Button onClick={SignUp}>Créer un compte sur Les Desserts</Button>
        </Section>
      ),
      confirmButtonText: "Retourner à l'acceuil",
      confirmButtonColor: "#d33",
      focusConfirm: false,
      showCloseButton: true,         
      width: "20rem",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
      }
      if (result.dismiss) {
        window.location.href = "/";
      }
    });
  });
};

export default HomeSignUp;
