import React, { Component } from 'react';
import { connect } from 'react-redux'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import * as Actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import { updateObject, checkValidity } from '../../shared/utility'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            controls: {
                email: {
                    elementType: 'input',
                    value: '',
                    valid: false,
                    touched: false,
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email'
                    },
                    validation: {
                        required: true,
                        isEmail: true
                    }
                },
                password: {
                    elementType: 'input',
                    value: '',
                    valid: false,
                    touched: false,
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    validation: {
                        required: true,
                        minLength: 6
                    }
                }
            }
        }
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = ({ target }, controlName) => {
        const controls = updateObject(this.state.controls,
            {
                [controlName]: updateObject(this.state.controls[controlName],
                    {
                        value: target.value,
                        touched: true,
                        valid: checkValidity(target.value, this.state.controls[controlName].validation),
                    })
            })
        this.setState({ controls })
    }


    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />

        ))

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }


        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <p>{!this.state.isSignup ? 'REGISTER' : 'LOGIN'}</p>
                <form onClick={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType='Danger'>CLICK TO {!this.state.isSignup ? 'LOGIN' : 'REGISTER'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(Actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(Actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);