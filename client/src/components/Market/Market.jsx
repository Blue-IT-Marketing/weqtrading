import React, { Fragment, useState, useEffect,useContext } from "react";

import Products from "./Products/Products";
import Services from "./Service/Services";
import { Link } from "react-router-dom";
import axios from "axios";
import { routes } from "../../constants";
import * as apiRequests from './api-requests';
import {firebase} from '../../firebase';

import {UserAccountContext} from '../../context/UserAccount/userAccountContext';


export default function Market() {

  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [display,setDisplay] = useState('products');
  const {user_account_state,doLogin } = useContext(UserAccountContext);
  
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

        <div className="box box-footer">
          <div className="box box-header">
            <h3 className="box-title">
              <strong>
                <i className="fa fa-bookmark-o"> </i> Weq Trading &amp; Projects
              </strong>
            </h3>
            <div className="box-tools">
              <button
                type="button"
                className="btn btn-box-tool btn-outline-dark"
                name="products"
                onClick={e => setDisplay("products")}
              >
                <i className="fa fa-product-hunt"> </i> Products
              </button>
              <button
                type="button"
                className="btn btn-box-tool btn-outline-dark"
                name="services"
                onClick={e => setDisplay("services")}
              >
                <i className="fa fa-server"> </i> Services
              </button>
              {user_account_state.user_account.uid ? (
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
              ) : (
                <Link to={routes.login_page}>
                  {" "}
                  <button
                    type="button"
                    className="btn btn-box-tool btn-outline-dark"
                    name="check_out"
                  >
                    <i className="fa fa-sign-in"> </i> Login
                  </button>
                </Link>
              )}
            </div>
          </div>

          {display === "products" ? <Products products={products} /> : ""}

          {display === "services" ? <Services services={services} /> : ""}
        </div>
      </div>
    </Fragment>
  );
}
