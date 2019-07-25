import React, { Fragment } from 'react';
import {Link } from 'react-router-dom';
import { routes } from '../../constants';


export default function Home (){
	return (
		<Fragment>
			<div className='box box-body'>
				<div className='box-header'>
					<h3 className='box-title'><strong> <i className='fa fa-home'> </i> Weq Trading </strong> </h3>

					<div className='box-tools'>

            <button className='btn btn-box-tool'><Link to={routes.market_page}><strong> <i className='fa fa-shopping-bag'> </i> Market Place </strong> </Link></button>
					</div>

				</div>
            
			</div>  
		</Fragment>    
	)
}
