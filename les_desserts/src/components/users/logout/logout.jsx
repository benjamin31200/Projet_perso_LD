import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function closeSess() {
    return axios.get("/logout");
  }

const MySwal = withReactContent(Swal);
const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    MySwal.fire({
      title: "Se déconnecter?",
      text: "La déconnection mettra fin à votre session.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Se déconnecter",
      cancelButtonText: "Rester connecté",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "Retour à l'acceuil",
          showConfirmButton: false,
          timer: 1500,
        });
        Promise.resolve(closeSess())
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
        navigate("/");
      } else if (result.dismiss || result.isDenied) {
        navigate("/");
      }
    });
  });
};

export default Logout;
