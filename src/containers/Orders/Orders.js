import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as Actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'


class Orders extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         orders: [],
    //         loading: true
    //     }
    // }

    componentDidMount() {
        this.props.onFetchOrders();
        // axios.get('/orders.json')
        //     .then(res => {
        //         const orders = [];
        //         for (let key in res.data) {
        //             orders.push({
        //                 ...res.data[key],
        //                 id: key
        //             });
        //         }

        //         this.setState({ orders, loading: false })
        //     })
        //     .catch(err => {
        //         this.setState({ loading: false })
        //     })
    }

    render() {

        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
            })
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(Actions.fetchOrders())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));