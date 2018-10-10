import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions/index'


class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false
        }
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            })
            .reduce((sum, elem) => {
                return sum + elem
            }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false });
    }

    placeOrderHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = { ...this.props.ingreds };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummery = null;
        let burger = this.props.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />
        if (this.props.ingreds) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingreds} />
                    <BuildControls
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ingreds)}
                        order={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummery = <OrderSummary
                ingredients={this.props.ingreds}
                cancelOrder={this.cancelPurchaseHandler}
                placeOrder={this.placeOrderHandler}
                price={this.props.price} />;
        }

        // if (this.state.loading) {
        //     orderSummery = <Spinner />;
        // }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummery}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingreds: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredient) => dispatch(Actions.addIngredient(ingredient)),
        onIngredientRemoved: (ingredient) => dispatch(Actions.removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(Actions.initIngredients()),
        onInitPurchase: () => dispatch(Actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
