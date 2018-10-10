import * as ActionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = ingredient => {
    return {
        type: ActionTypes.ADD_INGREDIENT,
        ingredient
    }
}

export const removeIngredient = ingredient => {
    return {
        type: ActionTypes.REMOVE_INGREDIENT,
        ingredient
    }
}

export const setIngredients = ingredients => {
    return {
        type: ActionTypes.SET_INGREDIENTS,
        ingredients
    }
}

export const fetIngredientsFailed = () => {
    return {
        type: ActionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetIngredientsFailed());
            })
    }
}