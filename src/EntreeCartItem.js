import React from 'react';
import { formatPrice } from './helpers';

const EntreeCartItem = (props) => {
	return (
		<div>
			<div>{ props.item.name } - { formatPrice(props.item.price) }</div>
		</div>
	);
}

export default EntreeCartItem;