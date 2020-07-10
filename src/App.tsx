import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import Ingredients from "./Ingredients";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { fetchApi } from "./utils/fetchApi";

const App = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    fetchApi("/me")
    .then(({ email }) => setUser(email))
    .catch(() => setUser(''));
  }, [user]);

  return (
    <Container>
      {user === null ? (
        <Typography>Welcome to twist-ui</Typography>
      ) : user === "user" ? (
        <Ingredients />
      ) : (
        <LoginForm onConnect={setUser}></LoginForm>
      )}
    </Container>
  );
};

export default App;
