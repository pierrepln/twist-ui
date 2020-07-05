import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import Container from "@material-ui/core/Container";


const App = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3333/me", {
      credentials: "include",
    }).then((body) =>
      body.json().then(({email}) => {
        setUser(email);
      })
    );
  }, [user]);

  /* user === null ? 
    <div>Welcome to twist-ui</div> :  */
  return (
    <Container>
      {user === null ? (
        <div>Welcome to twist-ui</div>
      ) : user === "user" ? (
        <div>Logged in</div>
      ) : (
        <LoginForm onConnect={setUser}></LoginForm>
      )}
    </Container>
  );
};

export default App;
