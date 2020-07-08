import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import AddIngredient from "./AddIngredient";
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

  console.log(ingredients);

  return (
    <Card variant="outlined">
      <Typography variant="h2" align="center">
        Ingredients
      </Typography>

      <AddIngredient handleSubmit={createIngredient} />

      <Divider variant="middle" />

      <List>
        {ingredients ? (
          ingredients.map(({ id, title, unit }) => (
            <ListItem key={id}>
              <form onSubmit={(e) => updateIngredient(e, id)}>
                <Box m={1} display="flex" alignItems="center">
                  <TextField
                    variant="outlined"
                    size="small"
                    id={`title-${id}`}
                    label="Title"
                    name="title"
                    defaultValue={title}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    id={`unit-${id}`}
                    label="Unit"
                    name="unit"
                    defaultValue={unit}
                  />

                  <Box m={1}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      color="primary"
                      startIcon={<EditIcon />}
                    />
                  </Box>

                  <Box m={1}>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={(e) => deleteIngredient(e, id)}
                    />
                  </Box>
                </Box>
              </form>
            </ListItem>
          ))
        ) : (
          <div>Loading</div>
        )}
      </List>
    </Card>
  );
};

export default Ingredients;
