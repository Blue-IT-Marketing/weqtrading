import axios from "axios"
import {routes} from '../../constants';


export const fetchPayments = async uid => {

    let results = {status:true,payload:{},error:{}};

    await axios.get(routes.api_dashboard_endpoint+`/payments/${uid}`).then(results => {
        if(results.status === 200){
            return results.data;
        }else{
            throw new Error('there was an error fetching transactions');
        }
    }).then(transactions => {
        results.status = true;
        results.payload = [...transactions];
        results.error ={};
    }).catch(error => {
        results.status = false;
        results.payload = [];
        results.error = {...error};
    });

    return results;
};


export const approvePayment = async (processing,uid) => {
    let results = {status : true,payload:{},error:{}};

    await axios.put(routes.api_dashboard_endpoint + `/payments/approve/${uid}`,processing).then(results => {
        if(results.status === 200){
            return results.data;
        }else{
            throw new Error('there was an error approving payment');
        }
    }).then(payment => {
        results.payload = {...payment};
        results.error = {};
        results.status = true;
    }).catch(error => {
        results.error = {...error};
        results.payload = {};
        results.status  = false;
    });
    return results;
};

export const rejectPayment = async (processing,uid) => {
    let results = {status : true,payload:{},error:{}};

    await axios.put(routes.api_dashboard_endpoint + `/payments/reject/${uid}`,processing).then(results => {
        if(results.status === 200){
            return results.data;
        }else{
            throw new Error('there was an error rejecting payment');
        }      
    }).then(payment => {
        results.payload = {...payment};
        results.error = {};
        results.status = true;
    }).catch(error => {
        results.error = {...error};
        results.payload = {};
        results.status = false;
    });
    return true;
}