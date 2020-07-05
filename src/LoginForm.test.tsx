import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";

test("renders properly", () => {
  const { container } = render(<LoginForm />);
  expect(container).toMatchSnapshot();
});
