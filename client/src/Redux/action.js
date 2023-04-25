import axios from 'axios';
import { ADD_RECIPE, ALPHABETIC_ORDER, FILTER_BY_DIETS, FILTER_BY_ORIGIN, GET_DETAIL_RECIPE, GET_DIETS, HEALTH_SCORE_ORDER, SET_LOADING, GET_ALL_RECIPES } from './actionsTypes';


export const setLoading = (isLoading) => {
    return{
        type: SET_LOADING,
        payload: isLoading
    };
};

export const addRecipe = (recipe) => {
    return async function (dispatch) {
        try {
            const response = await axios.post("http://localhost:3001/recipe", recipe);
            return dispatch({ type: ADD_RECIPE, payload: response.data })
        } catch (error) {
            console.log(error.message)
            alert("No se pudo crear receta");
        }
    }
};
export const getAllRecipes = () => { 
    return async function (dispatch) {
      try {
        dispatch(setLoading(true));
        const response = await axios.get("http://localhost:3001/recipe");
        dispatch({ type: GET_ALL_RECIPES, payload: response.data });
        dispatch(setLoading(false));
      } catch (error) {
        alert("No se encontraron recetas");
      }
    };
  };
  export const getQueryRecipe = (name) => {
    return async function (dispatch) {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(
          `http://localhost:3001/recipe?name=${name}`
        );
        dispatch({ type: GET_ALL_RECIPES, payload: response.data });
        dispatch(setLoading(false));
      } catch (error) {
        alert("No encontré la receta que estás buscando");
      }
    };
  };

export const getDetail = (id) => {
    return async function(dispatch){
        try {
            dispatch(setLoading(true));
            const response = await axios.get(`http://localhost:3001/recipe/${id}`)
            dispatch({ type: GET_DETAIL_RECIPE, payload: response.data })
            dispatch(setLoading(false))
        } catch (error) {
            alert("No existe la receta con el id indicado")
        }
    }
};

export const getDiets = () => {
    return async function(dispatch){
        try {
            const response = await axios.get("http://localhost:3001/diets");
            dispatch({ type: GET_DIETS, payload: response.data })
        } catch (error) {
            alert("Mi base de datos no tiene las dietas solicitadas")
        }
    }
};
export const filterRecipeByDiets = (dieta) => {
    return {
        type: FILTER_BY_DIETS,
        payload: dieta
    }
};
export const orderRecipeAlphabetic = (option) => {
    return {
        type: ALPHABETIC_ORDER,
        payload: option
    }
}
export const filterByOrigin = (origin) => {
    return {
        type: FILTER_BY_ORIGIN,
        payload: origin
    }
};
export const healthScoreOrder = (score) => {
    return{
        type: HEALTH_SCORE_ORDER,
        payload: score
    }
} 
export const deleteFilters = () => {
    return{
        type: "DELETE_FILTERS"
    }
}