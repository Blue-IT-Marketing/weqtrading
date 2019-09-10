import axios from 'axios';
import * as routes from "../../constants/routes";

export const addUser =async (sent_user) => {
    let results = {status : false,payload:{},error : {}}

    await axios.post(routes.api_user_endpoint,sent_user).then(results => {
        if (results.status === 200){
            return results.data
        }else{
            throw new Error('there was an error saving user');
        }
    }).then(user => {
        results.status = true;
        results.payload = {...user};
        results.error = {};
    }).catch(error => {
        results.status = false;
        results.payload = {};
        results.error = {...error}

    });

    return results;
};


export const updateUser = async (sent_user) => {
    let results = { status: false, payload: {}, error: {} };

    await axios.put(routes.api_user_endpoint, sent_user).then(results => {
        if (results.status === 200) {
          return results.data;
        } else {
          throw new Error("there was an error saving user");
        }
      }).then(user => {
        results.status = true;
        results.payload = { ...user };
        results.error = {};
      }).catch(error => {
        results.status = false;
        results.payload = {};
        results.error = { ...error };
      });

    return results;    
};


export const fetchUser = async (uid) => {
    let results = { status: false, payload: {}, error: {} };

    await axios.get(routes.api_user_endpoint + `/${uid}`).then(results => {
        if(results.status === 200){
            return results.data;
        }else{
            throw new Error('error fetching user');
        }
    }).then(user_details => {
        results.status = true;
        results.payload = {...user_details};
        results.error = {}
    }).catch(error => {
        results.status = false;
        results.payload = {};
        results.error = {...error};
    });

    return results;
}