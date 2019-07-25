import React,{useReducer,createContext} from 'react';

const userAccountContext = createContext();




export default class userAccountContextProvider extends Component {
    
        state = {
            user : {}
        }
    
    


  render() {
    return (
    
            <userAccountContextProvider>
                this.props.child
            </userAccountContextProvider>              
    )
  }
}
