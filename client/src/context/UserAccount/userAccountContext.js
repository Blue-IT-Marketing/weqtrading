import React,{Component,useReducer,createContext} from 'react';
import {firebase,auth} from '../../firebase';
import userAccountReducer, {
  UserAccountInitState
} from '../../reducers/profileReducers/accountDetailsReducer';

import {
  loginUser
} from './actions';

export const UserAccountContext = createContext();
export default class UserAccountContextProvider extends Component {
    state = {user_account_state: {...UserAccountInitState}};

    doLogin = async (username,password) => {
      let user_account_state = await loginUser(username,password);
      this.setState({user_account_state})
    }

    onChange = (user) => {
      let {
        user_account
      } = this.state.user_account_state;

      let user_account_state = Object.assign({},this.state.user_account_state)
      user_account_state.user_account = {
        ...user
      };

      this.setState({
        user_account_state
      })
    }

  componentWillMount = () => {
    // const unsubscribe = firebase.auth().onAuthStateChanged(this.onChange);    
    const dounsubscribe = firebase.firebase.auth().onAuthStateChanged(this.onChange)
  }  

  render() {
    return (
      <UserAccountContext.Provider value = {{...this.state,doLogin:this.doLogin}}>
                {this.props.children}
      </UserAccountContext.Provider>              
    )
  }
}
