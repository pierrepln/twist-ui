import React from "react";
import { render } from "@testing-library/react";
import AddIngredient from "./AddIngredient";

test("renders properly", () => {
  const { container } = render(<AddIngredient handleSubmit={() => {}} />);
  expect(container).toMatchSnapshot();
});
