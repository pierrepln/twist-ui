import React from "react";
import { render } from "@testing-library/react";
import Ingredients from './Ingredients'

test("renders properly", () => {
  const { container } = render(<Ingredients />);
  expect(container).toMatchSnapshot();
});