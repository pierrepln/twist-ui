import React, { useEffect } from "react";
import Divider from "@material-ui/core/Divider";
// import AddIngredient from "./AddRecipe";
// import IngredientsList from "./RecipesList";
import { useRecipes } from "../hooks/useRecipes";

const Recipes = () => {
  const {
    recipes,
    fetchRecipes,
    // createRecipe,
    // updateRecipe,
    // deleteRecipe,
  } = useRecipes();

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <>
      <p>{JSON.stringify(recipes)}</p>
      <Divider variant="middle" />
      {/* <IngredientsList
        ingredients={ingredients}
        updateIngredient={updateIngredient}
        deleteIngredient={deleteIngredient}
      /> */}
    </>
  );
};

export default Recipes;
