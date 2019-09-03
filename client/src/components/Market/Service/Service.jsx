import React, { useState } from "react";
import { useCart } from "react-ecommerce-hook";
import {service_init} from '../market-constants';

export default function Products() {
  const[service,setService] = useState(service_init);
    

  const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();
    const { id, product_name, description, price, currency } = service; 

  return (
    <div>
      <h1>Awesome Service</h1>
      {/* if item is unique, its maximum quantity is 1 */}
      <button onClick={() => addToCart({ id, isUnique: true })}>
        Add To Cart Unique Product
      </button>
      <button onClick={() => addToCart({ id })}>Add To Cart</button>
      <button onClick={() => removeFromCart({ id })}>Remove From Cart</button>
      <button onClick={() => increaseQuantity({ id })}>
        Increase Quantity
      </button>
      <button onClick={() => decreaseQuantity({ id })}>
        Decrease Quantity
      </button>
    </div>
  );
}
