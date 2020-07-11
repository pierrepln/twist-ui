import { useReducer, useCallback } from "react";
import { fetchApi } from "../utils/fetchApi";

type Recipe = any;

type State = {
  recipes: Recipe[];
};

type Action =
  | {
      type: "set";
      payload: Recipe[];
    }
  | {
      type: "create" | "update" | "delete";
      payload: Recipe;
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "set":
      return { ...state, recipes: action.payload };
    case "create":
      return { ...state, recipes: [action.payload, ...state.recipes] };
    case "update":
      return {
        ...state,
        recipes: [
          ...state.recipes.map((recipe) =>
            recipe === action.payload ? action.payload : recipe
          ),
        ],
      };
    case "delete":
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe) => recipe !== action.payload
        ),
      };
    default:
      return state;
  }
};

const initialState: State = {
  recipes: [],
};

export const useRecipes = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { recipes } = state;

  const fetchRecipes = useCallback(() => {
    fetchApi("/recipes").then((payload) =>
      dispatch({ type: "set", payload: payload })
    );
  }, []);

  const createRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    const candidate = new FormData(e.target as HTMLFormElement);
    fetchApi(`/recipes`, {
      method: "POST",
      body: candidate,
    })
      .then((recipe) => {
        dispatch({ type: "create", payload: recipe });
      })
      .catch((err) => console.error(err));
  };

  const updateRecipe = async (
    e: React.SyntheticEvent,
    prevRecipe: Recipe
  ) => {
    e.preventDefault();
    const { id } = prevRecipe;
    const candidate = new FormData(e.target as HTMLFormElement);
    await fetchApi(`/recipes/${id}`, {
      method: "PUT",
      body: candidate,
    })
      .then(({ recipe }) => {
        dispatch({ type: "update", payload: recipe });
      })
      .catch((e) => console.error(e));
  };

  const deleteRecipe = async (
    e: React.SyntheticEvent,
    prevRecipe: Recipe
  ) => {
    e.preventDefault();
    const { id } = prevRecipe;
    await fetchApi(`/recipes/${id}`, {
      method: "DELETE",
    }).then(() => {
      dispatch({ type: "delete", payload: prevRecipe });
    });
  };

  return {
    recipes,
    fetchRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  };
};
