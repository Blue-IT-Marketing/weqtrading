import React, { Component, Fragment } from 'react'

export default class Dashboard extends Component {
	render() {
		return (
			<Fragment>
				<div className='box box-body'>
					<div className='box box-header'>
						<h3 className='box-title'><strong> <i className='fa fa-dashboard'> </i> Dashboard </strong></h3>

						<div className='box-tools'>
							<button className='btn btn-box-tool'> <strong> <i className='fa fa-callout-info'> </i> Add Folder </strong> </button>    
						</div>                        
					</div>
				</div>
			</Fragment>            			
		)
	}
}
