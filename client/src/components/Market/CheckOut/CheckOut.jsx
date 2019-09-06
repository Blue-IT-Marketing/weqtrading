import React,{Fragment,useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
  physical_address_init,
  physical_address_errors_init
} from "../market-constants";

const PhysicalAddress = () => {
    const [physical,setPhysical] = useState(physical_address_init);
    const [errors,setErrors] = useState(physical_address_errors_init);
    const [inline,setInline] = useState({message: '',message_type:'info'});


    return(
        <Fragment>
            <div className='box box-body'>
                <div className='box box-header'>
                    <h3 
                        className='box-title' 
                        title={'an address where your service should be rendered or where you are located if a service is virtual'}
                    >
                        <i className='fa fa-map-marker'> </i> {' '}
                        Delivery Address
                    </h3>
                </div>

                <form className='form-horizontal'>
                    <div className='form-group'>
                        <input 
                            type='text'
                            className='form-control'
                            name='stand'
                            value={physical.stand}
                            onChange={e => setPhysical({...physical,[e.target.name]:e.target.value})}
                        />
                    </div>
                </form>
            </div>
        </Fragment>
    )
};

const PaymentDetails = () => {

};


const CheckOut = () => {
    const [display,setDisplay] = useState('physical_address');
    return (
        <Fragment>
            <div className='box box-body'>
                <div className='box box-header'>
                    <h3 className='box-title'>
                        <i className='fa fa-shopping-cart'> </i>{' '}
                        Check Out
                    </h3>
                    <div className='box-tools'>
                        <button
                            type='button'
                            className='btn btn-box-tool btn-outline-dark'
                            name='physical_address'
                            onClick={e => setDisplay(e.target.name)}
                        >
                            <i className='fa fa-map-pin'> </i> {' '}
                            Physical Address

                        </button>
                    </div>
                </div>
            </div>
        </Fragment>                    
    );
}

export default CheckOut;
