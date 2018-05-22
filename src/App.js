import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import logo from './logo.svg';
import PizzaBuilder from './PizzaBuilder';
import PizzaEditor from './PizzaEditor';
import products from "./data/products";
import CartDisplay from './CartDisplay';
import CartMiniDisplay from './CartMiniDisplay';
import MenuList from './MenuList';
import MenuItem from './MenuItem';
import { formatPrice } from './helpers'
import './App.css';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			cart: [],
			products: products
		}
		this.addToCart = this.addToCart.bind(this);
		this.updateCart = this.updateCart.bind(this);
		this.onRemoveItem = this.onRemoveItem.bind(this);
	}
	addToCart( item ) {
		let cart = this.state.cart.concat(item);
		this.setState({ cart });
	}
	updateCart( item ) {
		let cart = this.state.cart;
		// @Todo grab cart[i] and update directly instead of remove/add
		// remove the changed ingredient
		cart = cart.filter( i => i.id !== item.id );
		cart.push(item);
		this.setState({ cart });
	}
	onRemoveItem( item ) {
		this.setState({
			cart: this.state.cart.filter( i => i !== item )
		});
	}
	totalPrice() {
		let total = 0;
		for ( var i = 0; i < this.state.cart.length; i++ ){
			total += this.state.cart[i].price;
		}
		return formatPrice(total);
	}
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Link to="/">
						<img src={logo} className="App-logo" alt="logo" />
						<h1 className="App-title">Pizza Cart</h1>
					</Link>
				</header>
				<div id="content">
					<Route path="/" exact 
						render={props => {
							return (<MenuList products={this.state.products} />)
						}
					} />
					<Route path="/menu" exact 
						render={props => {
							return (<MenuList products={this.state.products} />)
						}
					} />
					<Switch>
						<Route path="/menu/pizza-builder" exact>
							<PizzaBuilder addToCart={this.addToCart} />
						</Route>
						<Route path="/edit/pizza-builder/:cartId" render={props => {
							return (<PizzaEditor cart={this.state.cart} match={props.match} updateCart={this.updateCart} />)	
						}} />
						<Route 
							path="/menu/:menuItemSlug"
							render={({ match }) => {
								return <MenuItem products={this.state.products} match={ match } addToCart={this.addToCart} />
							}}
						/>		
					</Switch>
					<Switch>
						<Route path="/checkout" exact component={() => <h1>Checkout</h1>} />
						<Route path="/cart" render={() => {
							return (<CartDisplay cart={this.state.cart} totalPrice={this.totalPrice()} onRemoveItem={this.onRemoveItem} />)
						}} />
						<Route><CartMiniDisplay cart={this.state.cart} totalPrice={this.totalPrice()} /></Route>
					</Switch>
				</div>
			</div>
		)
	}
}

export default App;