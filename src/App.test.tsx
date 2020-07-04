import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders properly", () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
