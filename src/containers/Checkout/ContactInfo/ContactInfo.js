import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactInfo.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

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
                        type: 'text',
                        placeholder: 'Email'
                    },
                    valid: false,
                    touched: false,
                    validation: {
                        required: true
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
                        maxLength: 5
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
            loading: false,
            formIsValid: false
        }
    }

    submitOrderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const formData = {}
        for (let elemId in this.state.orderForm) {
            formData[elemId] = this.state.orderForm[elemId].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/')
                //console.log(response);
            })
            .catch(err => {
                console.log(err)
                this.setState({ loading: false });

            })
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputElem in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputElem].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid });
    }

    checkValidity(value, rules) {
        let isValid = true;

        //if there are no rules...assume valid by default
        if (!rules) {
            return true
        }

        if (rules.required) {
            isValid = isValid && value.trim() !== '';
        }

        if (rules.minLength) {
            isValid = isValid && value.length >= rules.minLength
        }

        if (rules.maxLength) {
            isValid = isValid && value.length <= rules.minLength
        }


        return isValid;
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
        if (this.state.loading) {
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

export default ContactInfo;