import React, { useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import AddIngredient from "./AddIngredient";
import IngredientsList from "./IngredientsList";
import { useIngredients } from "../hooks/useIngredients";

const Ingredients = () => {
  const {
    ingredients,
    fetchIngredients,
    createIngredient,
    updateIngredient,
    deleteIngredient,
  } = useIngredients();

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  return (
    <>
      <AddIngredient handleSubmit={createIngredient} />
      <Divider variant="middle" />
      <IngredientsList
        ingredients={ingredients}
        updateIngredient={updateIngredient}
        deleteIngredient={deleteIngredient}
      />
    </>
  );
};

export default Ingredients;
