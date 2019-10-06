


import React, { Component, useContext, createContext,useState,useEffect, Children } from "react";
import useSocket from "use-socket.io-client";
import Blog from "../../components/Blog/Blog";

export const BlogContext = createContext();

const blog_server = "https://mobius-articles.herokuapp.com/";

const BlogContextProvider = (props) => {
    const [category, setCategory] = useState("entertainment");
    const [posts, setPosts] = useState([]);

    const [socket] = useSocket(blog_server, { transports: ["websocket"] });
    

    useEffect(() => {
      socket.connect();
      return () => {
        socket.disconnect();
      };
    }, []);

    useEffect(() => {  

        // reacting to on chat messages
        socket.on("search", data => {                  
        setPosts([...data]);
        });

        // reacting to on typing messages
        socket.on("refine", data => {
            setPosts([...data]);
        });

        return () => {
            setPosts([]);
        };

    },[]);


    useEffect(() => {
      socket.emit('refine',category);  
      return () => {

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