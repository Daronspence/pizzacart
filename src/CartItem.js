import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from './helpers';
import PizzaCartItem from './PizzaCartItem';
import EntreeCartItem from './EntreeCartItem';

class CartItem extends Component {
	constructor(props){
		super(props);
		this.removeItem = this.removeItem.bind(this);
		this.editItem = this.editItem.bind(this);
	}
	displayPrice() {
		return formatPrice( parseInt(this.props.item.price, 10) );
	}
	editItem() {
		this.props.editItem(this.props.item);
	}
	removeItem() {
		this.props.removeItem(this.props.item);
	}
	render() {
		let cartItem, cartItemEdit;
		switch (this.props.item.type) {
			case 'pizza':
				cartItem = <PizzaCartItem item={this.props.item} />
				cartItemEdit = <Link to={`/edit/pizza-builder/${this.props.item.id}`} className="edit">Edit</Link>
				break;
			default:
				cartItem = <EntreeCartItem item={this.props.item} />
				break;
		}
		return (
			<div className="CartItem">
				<div className="CartItem__details">
					{cartItem}
				</div>
				<div className="CartItem__actions">
					{cartItemEdit}
					<button className="remove" onClick={this.removeItem} ><span className="screen-reader-text">Remove</span></button>
				</div>
			</div>
		);
	}
}

export default CartItem;
