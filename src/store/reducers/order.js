import * as ActionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, { type, orders, orderId, orderData }) => {
    switch (type) {

        case ActionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false })

        case ActionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { loading: true })

        case ActionTypes.PURCHASE_BURGER_SUCCESS:
            const order = updateObject(orderData, { id: orderId })
            return updateObject(state, { loading: false, purchased: true, orders: state.orders.concat(order) })

        case ActionTypes.PURCHASE_BURGER_FAILED:
            return updateObject(state, { loading: false })


        case ActionTypes.FETCH_ORDERS_START:
            return updateObject(state, { loading: true })

        case ActionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, { loading: false, orders })


        case ActionTypes.FETCH_ORDERS_FAILED:
            return updateObject(state, { loading: false })

        default:
            return state;
    }
}


export default reducer;