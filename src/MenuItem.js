import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { formatPrice } from './helpers'

class MenuItem extends Component {
	constructor( props ){
		super(props);
		this.state = {
			redirect: false,
			item: this.props.products.filter(item => this.props.match.params.menuItemSlug === item.slug).shift()
		}
		this.onAddToCart = this.onAddToCart.bind(this)
	}
	onAddToCart() {
		let item = {...this.state.item}; // copy item
		item.timestamp = Date.now();
		this.props.addToCart(item);
		this.setState({ redirect: true });
	}
	render() {
		let redirect = this.state.redirect ? <Redirect to="/"/> : '';
		return (
			<div className="MenuItem">
				{ redirect }
				<h1>{this.state.item.name}</h1>
				<p>{this.state.item.description}</p>
				<p>{formatPrice(this.state.item.price)}</p>
				<p><button onClick={this.onAddToCart}>Add to Cart</button></p>
				<Link to="/menu">Back to Menu</Link>
			</div>
		);
	}
}

export default MenuItem;