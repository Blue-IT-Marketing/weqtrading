import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuItems from '../MenuItems/MenuItems';
import { routes } from '../../../constants';

function Header(props) {

	let SidebarCollapse = () => {

	}

	return (
        
		<Fragment>
			<header className="main-header">                    
				<Link to={routes.home_page} className="logo">                    
					<span className="logo-mini"><b>W</b>-T</span>                    
					<span className="logo-lg"><b>Weq</b> Trading</span>
				</Link>                    
				<nav className="navbar navbar-static-top">                    
					<a to="#" className="sidebar-toggle" data-toggle="offcanvas" data-target="sidebar-menu" role="button" onClick={SidebarCollapse()}>
						<span className="sr-only">W-Trading</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</a>
				</nav>
			</header>                
		</Fragment>
        
	)
}

Header.propTypes = {

}

export default Header

