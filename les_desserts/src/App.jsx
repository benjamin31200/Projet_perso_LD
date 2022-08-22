import { useEffect } from "react";
import { Main, Section } from "./styledComponentApp.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Header from "./components/header/header.jsx";
import RecipeCard from "./components/Card/Card.jsx";

function App() {

  const handleCallbackResponse = (res) => {
    console.log("Encoded JWT ID token: " + res.credential);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    )
  }, []); 

  return (
    <Main>
      <Navbar />
      <Section>
        <Header />
        <RecipeCard />
      </Section>
      <div id="signInDiv"></div>
    </Main>
  );
}

export default App;
