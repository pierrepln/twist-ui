import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

type Props = {
  handleSubmit: (e: React.FormEvent) => void;
};

const AddIngredient = ({ handleSubmit }: Props) => {
  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center" m={2}>
        <TextField
          variant="outlined"
          size="small"
          required
          id="title"
          label="Title"
          name="title"
          autoFocus
        />
        <TextField
          variant="outlined"
          size="small"
          id="unit"
          label="Unit"
          name="unit"
        />
        <Box m={1}>
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="primary"
          >
            Add
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default AddIngredient;
