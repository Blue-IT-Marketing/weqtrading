


import React, { Component, useContext, createContext,useState,useEffect} from "react";
import axios from 'axios';
import moment from 'moment';
import {myStore} from '../../localstorage';
import {UserAccountContext} from '../../context/UserAccount/userAccountContext';

const blog_server = "https://mobius-articles.herokuapp.com/";

export const BlogContext = createContext();

const BlogContextProvider = props => {
    // consider storing articles in localstorage using category as key
    const [category, setCategory] = useState("entertainment");
    const [posts, setPosts] = useState([]);

    const {user_account_state} = useContext(UserAccountContext);

      const refineSearch = async () => {
            const uid = user_account_state.user_account.uid;
            const api_routes = blog_server + `refine/${category}`;
            const today = moment().format("YYYY-MM-DD");
            const stateKey = category + uid + "weqtrading" + today;

            const fetchAPI = async () => {
                    await axios.get(api_routes).then(results => {
                        console.log("Results", results);
                        if (results.status === 200) {
                            return results.data;
                        }
                    }).then(articles => {
                        console.log("articles", articles);
                        setPosts(articles);
                        
                        myStore.setState(uid,stateKey,articles).then(results => {

                        });

                    }).catch(error => {
                        console.log('error occured',error);
                        setPosts([]);
                    });
            };
            

            myStore.getState(uid,stateKey).then(results => {
                if (results === undefined){
                    fetchAPI().then(result => console.log('fetched from back end'));
                }else{
                    setPosts(results);
                }
            });


            return true;
      };

    useEffect(() => {          
        refineSearch().then(result => {
            console.log('Initial search performed ',posts);
        });

        return () => {
            setPosts([]);
        };

    },[]);

    useEffect( () => {
      // here search will be performed everytime category changes  
      refineSearch().then(result => {
        console.log('Search Refined',result);
      });

      return () => {
        setPosts([]);
      };
    }, [category]);

    return(
        <BlogContext.Provider value={{
            posts:posts,
            setCategory:setCategory,
            category:category
        }}>
        {props.children}
        </BlogContext.Provider>
    )
};


export default BlogContextProvider;