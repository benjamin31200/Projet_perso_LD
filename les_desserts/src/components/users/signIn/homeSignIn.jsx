import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GoogleSignIn from "./googleSignIn.jsx";
import { Button, Section } from "./styledComponents.jsx";
const MySwal = withReactContent(Swal);

const homeSignIn = () => {
  const getSignIn = () => {
    window.location.href = "/inscription/new";
  };

 MySwal.fire({
    title: "<strong><u>Inscription</u></strong>",
    icon: "info",
    html: (
      <Section>
        <GoogleSignIn />
        <Button onClick={getSignIn}>S'inscrire sur le site</Button>
      </Section>
    ),
    showCloseButton: true,
    focusConfirm: false,
  }).then((result) => {
    if (result.dismiss) {
      window.location.href = "/";
    }
  });
};

export default homeSignIn;
