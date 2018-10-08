import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const orders = [];
                for (let key in res.data) {
                    orders.push({
                        ...res.data[key],
                        id: key
                    });
                }

                this.setState({ orders, loading: false })
            })
            .catch(err => {
                this.setState({ loading: false })
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.orders.map(order => {
                        return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                    })
                }
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);