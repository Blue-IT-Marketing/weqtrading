
import React, { Component } from 'react'
import {Capitalize} from 'react-lodash'

export default class InlineError extends Component {
	constructor(props){
		super(props);
		this.state= {message : this.props.message}
	}
	render() {
		return (
			<div className={'box box-danger'}>
				<div className={'box box-header pull-right'}>
					<h3 className={'box-title'}><em><small>{<Capitalize string={this.state.message} /> }</small></em></h3>
				</div>
			</div>
		)
	}
}
