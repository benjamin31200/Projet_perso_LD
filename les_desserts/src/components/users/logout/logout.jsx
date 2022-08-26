import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function closeSess() {
    return axios.get("/logout");
  }

const MySwal = withReactContent(Swal);
const Logout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    MySwal.fire({
      title: "Se déconnecter?",
      text: "La déconnection mettra fin à votre session.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, se déconnecter",
      cancelButtonText: "Non, continuer sur le site",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          position: "top-end",
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
        navigate("/" + location.search);
      } else if (result.dismiss || result.isDenied) {
        navigate("/" + location.search);
      }
    });
  });
};

export default Logout;
