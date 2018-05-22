import React from 'react';
import { Link } from 'react-router-dom';

const BackToMenu = () => {
	return (
		<div className="BackToMenu">
			<Link to="/menu">Back to Menu</Link>
		</div>
	);
}

export default BackToMenu;