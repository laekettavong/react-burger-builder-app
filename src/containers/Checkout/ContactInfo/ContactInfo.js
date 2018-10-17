import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactInfo.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as Actions from '../../../store/actions/index'
import { updateObject, checkValidity } from '../../../shared/utility'

class ContactInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderForm: {
                firstName: {
                    elementType: 'input',
                    value: '',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'First name'
                    },
                    valid: false,
                    touched: false,
                    validation: {
                        required: true
                    }
                },
                lastName: {
                    elementType: 'input',
                    value: '',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Last name'
                    },
                    valid: false,
                    touched: false,
                    validation: {
                        required: true
                    }
                },
                email: {
                    elementType: 'input',
                    value: '',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email'
                    },
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        isEmail: true
                    }
                },
                street: {
                    elementType: 'input',
                    value: '',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    valid: false,
                    touched: false,
                    validation: {
                        required: true
                    }
                },
                city: {
                    elementType: 'input',
                    value: '',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'City'
                    },
                    valid: false,
                    touched: false,
                    validation: {
                        required: true
                    }
                },
                state: {
                    elementType: 'input',
                    value: '',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'State'
                    },
                    valid: false,
                    touched: false,
                    validation: {
                        required: true
                    }
                },
                Zip: {
                    elementType: 'input',
                    value: '',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip'
                    },
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5,
                        isNumeric: true
                    }
                },
                deliveryMethod: {
                    elementType: 'select',
                    value: 'standard',
                    valid: true,
                    validation: {},
                    elementConfig: {
                        options: [
                            { value: 'Standard', displayValue: 'Standard' },
                            { value: 'Fastest', displayValue: 'Fastest' }
                        ]
                    }
                },
            },
            formIsValid: false
        }
    }

    submitOrderHandler = (event) => {
        event.preventDefault();

        const formData = {}
        for (let elemId in this.state.orderForm) {
            formData[elemId] = this.state.orderForm[elemId].value;
        }

        const order = {
            ingredients: this.props.ingreds,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token)
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],
            {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
                touched: true
            })

        const updatedOrderForm = updateObject(this.state.orderForm, { [inputIdentifier]: updatedFormElement })

        let formIsValid = true;
        for (let inputElem in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputElem].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.submitOrderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactInfo}>
                <h4>Enter your contact info</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingreds: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(Actions.purchaseBurger(orderData, token))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactInfo, axios));