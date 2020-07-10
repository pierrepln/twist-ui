import React, { useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
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
      <Typography variant="h2" align="center">
        Ingredients
      </Typography>

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
