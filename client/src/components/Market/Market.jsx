import React, {Fragment, Component } from 'react'

export default class Market extends Component {
	render() {
		return (
      <Fragment>
        <div className="box box-body">
          <div className="box box-header">
            <h3 className="box-title">
              <strong>
                {" "}
                <i className="fa fa-shopping-basket"> </i> Market Place{" "}
              </strong>{" "}
            </h3>

            <div className="box-tools">
              <div className="input-group">
                <input
                  type="text"
                  name="q"
                  className="form-control"
                  placeholder="Search Market..."
                />
                <span className="input-group-btn">
                  <button
                    type="submit"
                    name="search"
                    id="search-btn"
                    className="btn btn-flat"
                  >
                    <i className="fa fa-search" />
                  </button>
                </span>
              </div>
            
			</div>
          </div>
        </div>
      </Fragment>
    );
	}
}
