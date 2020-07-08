import { useReducer, useCallback } from "react";
import { fetchApi } from "../utils/fetchApi";

type Ingredient = {
  id: number;
  title: string;
  unit?: string;
};

type State = {
  ingredients: Ingredient[];
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

const initialState: State = {
  ingredients: [],
};

export const useIngredients = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { ingredients } = state;

  const fetchIngredients = useCallback(() => {
    fetchApi("/ingredients").then((payload) =>
      dispatch({ type: "set", payload: payload })
    );
  }, []);

  const createIngredient = async (e: React.FormEvent) => {
    e.preventDefault();
    const candidate = new FormData(e.target as HTMLFormElement);
    fetchApi(`/ingredients`, {
      method: "POST",
      body: candidate,
    })
      .then((ingredient) => {
        console.log("CREATION");
        dispatch({ type: "create", payload: ingredient });
      })
      .catch((err) => console.log(err));
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

  return {
    ingredients,
    fetchIngredients,
    createIngredient,
    updateIngredient,
    deleteIngredient,
  };
};
