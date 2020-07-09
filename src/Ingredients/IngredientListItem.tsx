import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

type Ingredient = {
  id: number;
  title: string;
  unit?: string;
};

type Props = {
  ingredient: Ingredient;
  updateIngredient: (
    e: React.SyntheticEvent,
    prevIngredient: Ingredient
  ) => void;
  deleteIngredient: (
    e: React.SyntheticEvent,
    prevIngredient: Ingredient
  ) => void;
};

const IngredientListItem = ({
  ingredient,
  updateIngredient,
  deleteIngredient,
}: Props) => (
  <ListItem key={ingredient.id}>
    <form onSubmit={(e) => updateIngredient(e, ingredient)}>
      <Box m={1} display="flex" alignItems="center">
        <TextField
          variant="outlined"
          size="small"
          id={`title-${ingredient.id}`}
          label="Title"
          name="title"
          defaultValue={ingredient.title}
        />
        <TextField
          variant="outlined"
          size="small"
          id={`unit-${ingredient.id}`}
          label="Unit"
          name="unit"
          defaultValue={ingredient.unit}
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
            onClick={(e) => deleteIngredient(e, ingredient)}
          />
        </Box>
      </Box>
    </form>
  </ListItem>
);

export default IngredientListItem;
