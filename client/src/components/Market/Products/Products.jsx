import React ,{useState}from 'react';
import { useCart } from "react-ecommerce-hook";
import {products_init} from '../market-constants';
import './Products.css';


export default function Products({product}) {
  
    const {
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity
    } = useCart();

    const { id, product_name, description,product_img, price, currency } = product;         

    return (
      <div className="box box-info">
        <div className="box box-header">
          <h3 className="box-title">
            {product_name || "Website Developer"}
          </h3>
        </div>
        {/* if item is unique, its maximum quantity is 1 */}
        <div className="box box-footer">
          <blockquote>
            {description ||
              `Building web applications for small to medium sized businesses`}
          </blockquote>
          <blockquote>
            <img
              src={product_img || "static/img/volunteer.jpg"}
              className="product_images"
              title="Ready to volunteer"
            />
          </blockquote>

          <div className="box-tools">
            <button
              className="btn btn-box-tool"
              onClick={() => addToCart({ id, isUnique: true })}
              title="Add Unique Product"
            >
              <i className="fa fa-plus-circle"> </i>
            </button>

            <button
              className="btn btn-box-tool"
              onClick={() => addToCart({ id })}
              title="Add To Cart"
            >
              <i className="fa fa-plus"> </i>
            </button>

            <button
              className="btn btn-box-tool"
              onClick={() => removeFromCart({ id })}
              title="Remove from Cart"
            >
              <i className="fa fa-minus"> </i>
            </button>
            <button
              className="btn btn-box-tool"
              onClick={() => increaseQuantity({ id })}
              title="Increase Quantity"
            >
              <i className="fa fa-plus-square"> </i>
            </button>
            <button
              className="btn btn-box-tool"
              onClick={() => decreaseQuantity({ id })}
              title="Decrease Quantity"
            >
              <i className="fa fa-minus-square-o"> </i>
            </button>
          </div>
        </div>
      </div>
    );
}
