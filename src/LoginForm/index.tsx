import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { fetchApi } from "../utils/fetchApi";

type Props = {
  onConnect: React.Dispatch<React.SetStateAction<null | string>>;
};

const LoginForm = ({ onConnect }: Props) => {
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    fetchApi("/login", {
      method: "POST",
      body: data,
    }).then(onConnect);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Username"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign in
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
