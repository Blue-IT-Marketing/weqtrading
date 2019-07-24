
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InlineMessage extends Component {
	constructor(props){
		super(props);
		this.state = {message : this.props.message,
			message_type : this.props.message_type};
	}
	render() {
		return (
			<div className={'box-info'}>
				<div className={'box box-header'}>
					<h3 className={'box-title btn-outline-info'}><small><strong> <i className={'fa fa-server'}> </i> Response </strong></small></h3>
					<div className={'box-tools pull-left'}>
						<button
							type={'button'}
							className={'box-title btn-outline-info btn-lg'}
						><em><i className='fa fa-check-circle'> </i> <small> {this.state.message} </small></em>
						</button>
					</div>
				</div>
			</div>
		);
	}
}



InlineMessage.propTypes = {
	message: PropTypes.string.isRequired,
	message_type : PropTypes.string
};

export default InlineMessage;