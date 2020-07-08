import React from "react";
import { render } from "@testing-library/react";
import LoginForm from ".";

test("renders properly", () => {
  const { container } = render(<LoginForm onConnect={() => {}} />);
  expect(container).toMatchSnapshot();
});
