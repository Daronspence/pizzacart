import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuList extends Component {
	render() {
		return (
			<div className="MenuList">
				<h1>Menu</h1>
				<div className="MenuListItem">
					<Link to="/menu/pizza-builder">
						<div className="bg" style={{ backgroundImage: `url(https://img1.etsystatic.com/178/1/8827829/il_570xN.1180203915_pr29.jpg)` }}></div>
						<div className="name">Build Your Own Pizza</div>
					</Link>
				</div>
				{this.props.products.map(product => {
					return <div className="MenuListItem" key={product.id}>
							<Link to={`/menu/`+ product.slug}>
								<div className="bg" style={{backgroundImage: `url(${product.image})`}}></div>
								<div className="name">{product.name}</div>
							</Link>
						</div>
				})}
			</div>
		);
	}
}

export default MenuList;