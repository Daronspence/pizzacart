import React from 'react';
import { Link } from 'react-router-dom';

const CartMiniDisplay = (props) => {
	const total = props.cart.length ? `(${props.cart.length})` : '';
	return (
		<div className="CartMiniDisplay">
			<h2><Link to="/cart"><span className="fa fa-shopping-cart"></span> Cart {total} - { props.totalPrice }</Link></h2>
		</div>
	);
}

export default CartMiniDisplay;
