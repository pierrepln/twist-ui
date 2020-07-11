import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard/";
import { fetchApi } from "./utils/fetchApi";

const App = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    fetchApi("/me")
      .then(({ email }) => setUser(email))
      .catch(() => setUser(""));
  }, [user]);

  return (
    <>
      {user === "user" ? (
        <Dashboard />
      ) : (
        <LoginForm onConnect={setUser}></LoginForm>
      )}
    </>
  );
};

export default App;
