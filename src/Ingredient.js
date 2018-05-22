import React, { Component } from 'react';

class Ingredient extends Component {
	constructor(props) {
	    super(props);
		this.state = {
			inputName: this.props.slug + '.quantity'
		}
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		const id = this.props.id;
		const name = this.props.name;
		const quantity = e.target.value;
		let price = parseInt(this.props.price, 10);
		switch ( quantity ) {
			case "none":
				price = 0;
				break;
			case "normal":
				break;
			case "extra":
				price = price * 1.5;
				break;
			default:
				break;
		}
		this.props.onChange({price, id, name, quantity});
	}
	render() {
		return (
			<div className="Ingredient">
				<div className="Ingredient__name">{ this.props.name }</div>
				<div className="pill-radio-group">
					<label>
						<input type="radio" name={this.state.inputName} value="none"
							checked={this.props.quantity === 'none'}
							onChange={this.handleChange} /> 
						<span className="inner">None</span>
					</label>
					
					<label>
						<input type="radio" name={this.state.inputName} value="normal"
							checked={this.props.quantity === 'normal'}
							onChange={this.handleChange} />
						 <span className="inner">Normal</span>
					</label>
					
					<label>
						<input type="radio" name={this.state.inputName} value="extra"
							checked={this.props.quantity === 'extra'}
							onChange={this.handleChange} /> 
						<span className="inner">Extra</span>
					</label>
				</div>
			</div>
		)
	}
}

export default Ingredient;