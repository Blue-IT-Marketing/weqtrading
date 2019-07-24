
import React, { Component } from 'react'

export default class InlineError extends Component {
    constructor(props){
        super(props);
        this.state= {message : this.props.message}
    }
  render() {
    return (
            <div className={'box box-danger'}>
                <div className={'box box-header pull-right'}>
                    <h3 className={'box-title'}><em><small>{this.state.message}</small></em></h3>
                </div>
            </div>
            )
  }
}
