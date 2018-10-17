import * as ActionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state = initialState, { idToken, userId, type, error, path }) => {
    switch (type) {
        case ActionTypes.AUTH_START:
            return updateObject(state, { error: null, loading: true })

        case ActionTypes.AUTH_SUCCESS:
            return updateObject(state, { token: idToken, userId, error: null, loading: false })

        case ActionTypes.AUTH_FAILED:
            return updateObject(state, { error, loading: false })

        case ActionTypes.AUTH_LOGOUT:
            return updateObject(state, { token: null, userId: null })

        case ActionTypes.SET_AUTH_REDIRECT_PATH:
            return updateObject(state, { authRedirectPath: path })

        default:
            return state
    }
}

export default reducer