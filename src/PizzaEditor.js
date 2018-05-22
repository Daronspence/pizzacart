import React, { Component } from 'react';
import Ingredient from './Ingredient';
import { Redirect } from 'react-router-dom';
import defaultIngredients from './data/ingredients';
import { formatPrice } from './helpers';
import BackToMenu from './BackToMenu';

class PizzaEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pizzaSize: 'lg',
			basePrice: 1200,
			chosenSauce: 'Red',
			ingredients: defaultIngredients,
			chosenIngredients: [],
			redirect: false,
			sauces: [
				{
					id: 1,
					name: "Red",
					slug: "red"
				},
				{
					id: 2,
					name: "White",
					slug: "white"
				},
				{
					id: 3,
					name: "BBQ",
					slug: "bbq"
				},
				{
					id: 4,
					name: "No Sauce",
					slug: 'no-sauce'
				}
			]
		}
		this.changePizzaSize = this.changePizzaSize.bind(this);
		this.changeSauce = this.changeSauce.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.ingredientChange = this.ingredientChange.bind(this);
	}
	componentWillMount() {
		const pizza = this.props.cart.filter(item => {
			return item.id !== this.props.match.params.cartId;
		})[0];
		let redirect = false;
		if ( pizza === undefined ){
			redirect = true;
			this.setState({ redirect });
			return;
		}
		this.setState({
			chosenIngredients: pizza.chosenIngredients,
			chosenSauce: pizza.chosenSauce,
			chosenSize: pizza.chosenSize,
			oldPizza: pizza,
			redirect
		});
	}
	changePizzaSize(e) {
		this.setState({
			pizzaSize: e.target.value,
			basePrice: parseInt(e.target.getAttribute('price'), 10)
		});
	}
	changeSauce(e) {
		this.setState({
			chosenSauce: e.target.value
		})
	}
	totalPrice() {
		let ingredientsPrice = 0;
		for ( var i = 0; i < this.state.chosenIngredients.length; i++ ){
			ingredientsPrice += this.state.chosenIngredients[i].price;
		}
		return this.state.basePrice + ingredientsPrice;
	}
	handleSubmit(e) {
		e.preventDefault();
		let pizza = {
			id: this.state.oldPizza.id,
			timestamp: this.state.oldPizza.timestamp,
			name: 'Pizza',
			price: this.totalPrice(),
			type: 'pizza',
			chosenSauce: this.state.chosenSauce,
			chosenSize: this.state.pizzaSize,
			chosenIngredients: this.state.chosenIngredients,
		}
		this.props.updateCart(pizza);
		this.setState({
			redirect: true
		});
	}
	ingredientChange( ing ) {
		let ingredients = this.state.chosenIngredients;
		// remove the changed ingredient
		ingredients = ingredients.filter( item => item.id !== ing.id );
		if ( ing.quantity !== "none" ){
			// add changed ingredient back if quantity != none
			ingredients.push(ing);
		}
		this.setState({
			chosenIngredients: ingredients
		});
	}
	render() {
		let redirect = this.state.redirect ? <Redirect to="/cart"/> : '';
		return (
			<div className="Pizza">
				{ redirect }
				<BackToMenu />
				<form onSubmit={this.handleSubmit}>
					<div className="Pizza__size">
						<h2>Size</h2>
						<div className="pill-radio-group">
							<label className="Pizza__size--control">
								<input type="radio" name="pizzaSize" value="sm" price={800}
									checked={this.state.pizzaSize === 'sm'}
									onChange={this.changePizzaSize}
								/> <span className="inner">Small</span>
							</label>
							<label className="Pizza__size--control">
								<input type="radio" name="pizzaSize" value="med" price={1000}
									checked={this.state.pizzaSize === 'med'}
									onChange={this.changePizzaSize}
								/> <span className="inner">Medium</span>
							</label>
							<label className="Pizza__size--control">
								<input type="radio" name="pizzaSize" value="lg" price={1200}
									checked={this.state.pizzaSize === 'lg'}
									onChange={this.changePizzaSize}
								/> <span className="inner">Large</span>
							</label>
							<label className="Pizza__size--control">
								<input type="radio" name="pizzaSize" value="xlg" price={1400}
									checked={this.state.pizzaSize === 'xlg'}
									onChange={this.changePizzaSize}
								/> <span className="inner">X-Large</span>
							</label>
						</div>
					</div>
					<div className="PizzaSauces">
						<h2>Sauce</h2>
						<div className="pill-radio-group">
							{ this.state.sauces.map( sauce => {
								return (
									<label key={sauce.id} className="Pizza__sauce--control">
										<input type="radio" name="pizzaSauce" value={sauce.name}
											checked={this.state.chosenSauce === sauce.name }
											onChange={this.changeSauce}
										/> 
										<span className="inner">{sauce.name}</span>
									</label>
								)
							})}
						</div>
						
					</div>
					<div className="PizzaIngredients">
						<h2>Toppings</h2>
						{this.state.ingredients.map( ing => {
							let quantity = 'none';
							const chosen = this.state.chosenIngredients.filter(item => ing.id === item.id );
							// if the ingredient is on the pizza, use it's quantity
							if ( chosen.length === 1 ) {
								quantity = chosen[0].quantity;
							}
							return (
								<Ingredient name={ing.name} id={ing.id} 
									slug={ing.slug} key={ing.id} 
									price={ing.price} onChange={this.ingredientChange} 
									quantity={quantity} />
							)
						})}
					</div>
					<div className="Cart">
					<table border="1px">
						<tbody>
						<tr>
							<td>{ this.state.pizzaSize.toUpperCase() } Pizza</td>
							<td>{ formatPrice(this.state.basePrice) }</td>
						</tr>
						<tr>
							<td>Sauce: { this.state.chosenSauce }</td>
							<td>$0</td>
						</tr>
						{ this.state.chosenIngredients.length > 0 &&
							<tr>
								<td colSpan="2">Toppings:</td>
							</tr>
						}
						{this.state.chosenIngredients.map( ing => {
							return ( <tr key={ing.id}><td>{ing.name}</td><td>{formatPrice(ing.price)}</td></tr> )
						})}
						<tr>
							<td>Total Pizza Price</td><td>{formatPrice(this.totalPrice())}</td>
						</tr>
						</tbody>
					</table>
					</div>
					<button type="submit">Update Order</button>
				</form>
				<BackToMenu />
			</div>
		);
	}
}

export default PizzaEditor;