import React,{Fragment} from 'react';
import {useCart} from 'react-ecommerce-hook';

export default function Shopping () {
    const {
        state:{
            addedIds,
            quantityById,
        },
    } = useCart();

  return (
    <Fragment>
        <div className='box box-body'>
            <div className='box-header'>
                <h3 className='box-title'>
                    <strong> 
                        <i className='fa fa-shopping-cart'> </i>
                        {" "}
                        Shopping Cart
                        
                    </strong>
                </h3>
            </div>

            {addedIds.map(id => (
                <div key={id}>
                    <h3>Product #{id}</h3>
                    <span>Quantity: {quantityById[id]}</span>
                </div>
            ))}


        </div>
    </Fragment>
      
    
  )
}
