import React from 'react';
import { formatPrice } from './helpers';

const PizzaCartItem = (props) => {
	return (
		<div>
			<div>{ props.item.name } - { props.item.chosenSize.toUpperCase() } - { formatPrice(props.item.price) }</div>
			<ul className="PizzaCartItem__ingredients-list">
				<li>Sauce: { props.item.chosenSauce }</li>
				{ props.item.chosenIngredients.map(ing => {
					return (
						<li key={ing.id}>
							{ ing.name } {ing.quantity === 'extra' ? '- Extra' : ''}
						</li>)
				})}
			</ul>
		</div>
	);
}

export default PizzaCartItem;