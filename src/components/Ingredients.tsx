import React, { useEffect, useReducer } from "react";
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
import { fetchApi } from "../utils/fetchApi";

type Ingredient = {
  id: number;
  title: string;
  unit?: string;
};

type Action =
  | {
      type: "set";
      payload: Ingredient[];
    }
  | {
      type: "create" | "update";
      payload: Ingredient;
    }
  | {
      type: "delete";
      payload: number;
    };

type State = {
  ingredients: Ingredient[];
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "set":
      return { ...state, ingredients: action.payload };
    case "create":
      return { ...state, ingredients: [action.payload, ...state.ingredients] };
    case "update":
      return {
        ...state,
        ingredients: [
          ...state.ingredients.map((ingredient) =>
            ingredient === action.payload ? action.payload : ingredient
          ),
        ],
      };
    case "delete":
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const initialState = {
  ingredients: [],
};

const Ingredients = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { ingredients } = state;

  useEffect(() => {
    fetchApi("/ingredients").then((payload) =>
      dispatch({ type: "set", payload: payload })
    );
  }, []);

  const createIngredient = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    fetchApi(`/ingredients`, {
      method: "POST",
      body: data,
    }).then((ingredient) => {
      dispatch({ type: "create", payload: ingredient });
    });
  };

  const updateIngredient = async (e: React.SyntheticEvent, id: number) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    await fetchApi(`/ingredients/${id}`, {
      method: "PUT",
      body: data,
    })
      .then(({ ingredient }) => {
        dispatch({ type: "update", payload: ingredient });
      })
      .catch((e) => console.error(e));
  };

  const deleteIngredient = async (e: React.SyntheticEvent, id: number) => {
    e.preventDefault();
    await fetchApi(`/ingredients/${id}`, {
      method: "DELETE",
    }).then(() => {
      console.log(id);
      dispatch({ type: "delete", payload: id });
    });
  };

  return (
    <Card variant="outlined">
      <Typography variant="h2" align="center">
        Ingredients
      </Typography>

      <form onSubmit={createIngredient}>
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
