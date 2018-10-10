import * as ActionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: ActionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    }
}

export const purcheBurgerFailed = (error) => {
    return {
        type: ActionTypes.PURCHASE_BURGER_FAILED,
        error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: ActionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purcheBurgerFailed(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: ActionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: ActionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: ActionTypes.FETCH_ORDERS_FAILED,
        error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: ActionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('/orders.json')
            .then(res => {
                const orders = [];
                for (let key in res.data) {
                    orders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(orders))
            })
            .catch(error => {
                dispatch(fetchOrdersFailed(error))
            })
    }
}