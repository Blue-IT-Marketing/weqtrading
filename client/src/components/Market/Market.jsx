import React, { Fragment, useState, useEffect } from "react";
import Products from "./Products/Products";
import Service from "./Service/Service";
import axios from "axios";
import { routes } from "../../constants";
import * as apiRequests from './api-requests';


export default function Market() {
  const [products, setProducts] = useState([]);

  const [services, setServices] = useState([]);

  useEffect(() => {

    apiRequests.fetchProductsAPI().then(result => {
      setProducts(result);
    });

    apiRequests.fetchServicesAPI().then(result => {
      setServices(result);
    });

    return () => {
      setProducts([]);
      setServices([]);
    };
  }, []);


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

        <div className="row">
          <div className="col-lg-3">
            {products.map(product => {
              return <Products product={product} />;
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
