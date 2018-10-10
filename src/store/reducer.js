import * as Actions from '../actions/actions';

const initialState = {
    ingredients: {
        bacon: 0,
        cheese: 0,
        lettuce: 0,
        meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
}

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, { type, ingredient }) => {
    console.log(type, state)
    switch (type) {
        case Actions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingredient]: state.ingredients[ingredient] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredient]
            }

        case Actions.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingredient]: state.ingredients[ingredient] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredient]
            }

        default:
            return state;
    }
}

export default reducer;