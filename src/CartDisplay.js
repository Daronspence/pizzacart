import React, { Component } from 'react';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import BackToMenu from './BackToMenu';

class CartDisplay extends Component {
	render() {
		const button = this.props.cart.length ? <Link to="/checkout" className="place-order">Place Order</Link> : '';
		return (
			<div className="CartDisplay">
				<BackToMenu />
				<h2>Cart</h2>
				{ this.props.cart.map( item => {
					return <CartItem item={item} key={item.timestamp} removeItem={this.props.onRemoveItem} />	
				})}
				<h3>Total</h3>
				{ this.props.totalPrice }
				<br/>
				{ button }
			</div>
		);
	}
}

export default CartDisplay;
