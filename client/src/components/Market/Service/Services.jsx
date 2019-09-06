import React, { useState, Fragment } from "react";
import {Link} from 'react-router-dom';
import {service_init} from '../market-constants';
import {routes} from '../../../constants';


const Service = ({service}) => {
  return(
    <Fragment>
        Service...
    </Fragment>
  )
}


export default function Services({services}) {

  console.log('services.....',services);
  return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">Services</h3>

          <div className="box-tools">
            <Link to={routes.check_out_page}>
              {" "}
              <button
                type="button"
                className="btn btn-box-tool btn-outline-dark"
                name="check_out"
              >
                <i className="fa fa-shopping-cart"> </i> Check Out
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
