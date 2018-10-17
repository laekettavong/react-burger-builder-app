import React from 'react'
import reducer from './auth'
import * as ActionTypes from '../actions/actionTypes'
import { isIterable } from 'core-js';
import { isatty } from 'tty';

describe('auth reducer', () => {
    it('should return ther initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
                type: ActionTypes.AUTH_SUCCESS,
                idToken: 'some-token',
                userId: 'some-userid'
            })).toEqual({
                token: 'some-token',
                userId: 'some-userid',
                error: null,
                loading: false,
                authRedirectPath: '/'
            })
    })
})