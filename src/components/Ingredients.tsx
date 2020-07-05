import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { fetchApi } from "../utils/fetchApi";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchApi("/ingredients").then(setIngredients);
  }, []);

  return (
    <List>
      {ingredients ? (
        ingredients.map(({ id, title }) => (
          <ListItem key={id}>{title}</ListItem>
        ))
      ) : (
        <div>My ingredients</div>
      )}
    </List>
  );
};

export default Ingredients;
