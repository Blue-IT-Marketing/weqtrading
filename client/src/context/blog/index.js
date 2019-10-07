


import React, { Component, useContext, createContext,useState,useEffect} from "react";

import axios from 'axios';

const blog_server = "https://mobius-articles.herokuapp.com/";

export const BlogContext = createContext();

const BlogContextProvider = props => {
    
    const [category, setCategory] = useState("entertainment");
    const [posts, setPosts] = useState([]);

      const refineSearch = async () => {

            const api_routes = blog_server + `refine/${category}`;

            await axios.get(api_routes).then(results => {
                console.log("Results", results);
                if (results.status === 200) {
                    return results.data;
                }
            }).then(articles => {
                console.log("articles", articles);
                setPosts(articles);
            }).catch(error => {
                console.log('error occured',error);
                setPosts([]);
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