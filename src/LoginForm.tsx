import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

type Props = {
  onConnect: React.Dispatch<React.SetStateAction<null | string>>;
};

const LoginForm: React.FC<Props> = ({ onConnect }) => {
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const body = await fetch("http://localhost:3333/login", {
      method: "POST",
      body: data,
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
    const response = await body.json();
    onConnect(response.email);
  };

  return (
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
  );
};

export default LoginForm;
