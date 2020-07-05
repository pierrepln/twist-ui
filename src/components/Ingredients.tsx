import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
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

  const createIngredient = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    fetchApi(`/ingredients`, {
      method: "POST",
      body: data,
    }).then((ingredient) => {
      setIngredients([ingredient, ...ingredients]);
    });
  };

  const updateIngredient = async (e: React.SyntheticEvent, id: number) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    await fetchApi(`/ingredients/${id}`, {
      method: "PUT",
      body: data,
    }).then(({ ingredient }) => {
      setIngredients(
        ingredients.map((item) =>
          item.id === id ? { id: id, title: "newTitle", unit: "newUnit" } : item
        )
      );
    });
  };

  const deleteIngredient = async (e: React.SyntheticEvent, id: number) => {
    e.preventDefault();
    await fetchApi(`/ingredients/${id}`, {
      method: "DELETE",
    }).then(({ ingredient }) => {
      setIngredients(ingredients.filter((item) => item.id !== id));
    });
  };

  return (
    <>
      <Typography variant="h2">Ingredients</Typography>

      <form onSubmit={createIngredient}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="title"
          label="Title"
          name="title"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          id="unit"
          label="Unit"
          name="unit"
        />
        <Button type="submit" variant="contained" size="small" color="primary">
          Add
        </Button>
      </form>

      <List>
        {ingredients ? (
          ingredients.map(({ id, title, unit }) => (
            <ListItem key={id}>
              <form onSubmit={(e) => updateIngredient(e, id)}>
                <TextField
                  margin="dense"
                  id="title"
                  label="Title"
                  name="title"
                  defaultValue={title}
                />
                <TextField
                  margin="dense"
                  id="unit"
                  label="Unit"
                  name="unit"
                  defaultValue={unit}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  color="primary"
                  startIcon={<EditIcon />}
                />
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={(e) => deleteIngredient(e, id)}
                >
                  Delete
                </Button>
              </form>
            </ListItem>
          ))
        ) : (
          <div>Loading</div>
        )}
      </List>
    </>
  );
};

export default Ingredients;
