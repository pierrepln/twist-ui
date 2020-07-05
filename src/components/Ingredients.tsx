import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { fetchApi } from "../utils/fetchApi";

type Ingredients = {
  id: number;
  title: string;
  unit: string;
};
const Ingredients = () => {
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);

  useEffect(() => {
    fetchApi("/ingredients").then(setIngredients);
  }, []);

  const deleteIngredient = async (e: React.SyntheticEvent, id: number) => {
    setIngredients(ingredients.filter((item) => item.id !== id));
    await fetchApi(`/ingredients/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <>
      <Typography variant="h2">Ingredients</Typography>
      <List>
        {ingredients ? (
          ingredients.map(({ id, title, unit }) => (
            <ListItem key={id}>
              <Typography>{title}</Typography>
              <Typography>...</Typography>
              <Typography>{unit}</Typography>
              <Button
                variant="contained"
                color="secondary"
                startIcon={
                  <DeleteIcon onClick={(e) => deleteIngredient(e, id)} />
                }
                onClick={(e) => deleteIngredient(e, id)}
              >
                Delete
              </Button>
            </ListItem>
          ))
        ) : (
          <div>My ingredients</div>
        )}
      </List>
    </>
  );
};

export default Ingredients;
