import React from "react";
import { render } from "@testing-library/react";
import IngredientsList from "./IngredientsList";

test("renders properly", () => {
  const { container } = render(
    <IngredientsList
      ingredients={[]}
      updateIngredient={() => {}}
      deleteIngredient={() => {}}
    />
  );
  expect(container).toMatchSnapshot();
});
