import React ,{useState, Fragment}from 'react';
import { Link } from "react-router-dom";

import {products_init} from '../market-constants';
import './Products.css';
import { routes } from '../../../constants';


export default function Products({products}) {

    console.log('products.....',products);
    return (
      <Fragment>
        <div className="box box-body">
          <div className="box box-header">
            <h3 className="box-title">Products</h3>

            <div className="box-tools">
              <Link to={routes.check_out_page}>
                {" "}
                <button
                  type="button"
                  className="btn btn-box-tool btn-outline-dark"
                  name="check_out"
                >
                  <i className='fa fa-shopping-cart'> </i> {' '}
                  Check Out
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
}
