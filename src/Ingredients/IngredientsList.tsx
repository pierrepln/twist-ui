import React from "react";
import List from "@material-ui/core/List";
import IngredientListItem from "./IngredientListItem";

type Ingredient = {
  id: number;
  title: string;
  unit?: string;
};

type Props = {
  ingredients: Ingredient[];
  updateIngredient: (
    e: React.SyntheticEvent,
    prevIngredient: Ingredient
  ) => void;
  deleteIngredient: (
    e: React.SyntheticEvent,
    prevIngredient: Ingredient
  ) => void;
};

const IngredientsList = ({
  ingredients,
  updateIngredient,
  deleteIngredient,
}: Props) => (
  <List>
    {ingredients ? (
      ingredients.map((i) => (
        <IngredientListItem
          ingredient={i}
          updateIngredient={updateIngredient}
          deleteIngredient={deleteIngredient}
        />
      ))
    ) : (
      <div>Loading</div>
    )}
  </List>
);

export default IngredientsList;
