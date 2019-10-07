

/**
 * chat context provider encapsulating all the 
 * functions of the socket.io and message que management
 */
import React, { Component, useContext, createContext,useState,useEffect, Children } from "react";
import useSocket from "use-socket.io-client";
import { UserAccountContext } from "../UserAccount/userAccountContext";
import * as chat_constants from "../../components/Chat/chat-constants";
import { extended_user } from "../../components/Auth/auth-constants";
import * as authAPI from "../../components/Auth/auth-api";
export const SocketContext = createContext();

let server_url = '';
// necessary so i can upload the code without modifying chat servers
if (document.URL.includes('localhost') || document.URL.includes('127.0.0.1')){    
    server_url = chat_constants.chat_server;    
}else{
    server_url = chat_constants.chat_server_online;
}

export const SocketContextProvider = (props) => {

    const [messages,setMessages] = useState([]);  
    const [message,setMessage] = useState(chat_constants.chat_message_init);  
    const [feedback, setFeedBack] = useState(chat_constants.feedback_init);


    const [writer,setWriter] = useState(extended_user);

    // initializing socket to use websockets
    const [socket] = useSocket(server_url, {transports: ["websocket"]});

    const {user_account_state} = useContext(UserAccountContext);
    const uid = user_account_state.user_account.uid;
    
  // if there is a feedback being sent user details for that feedback will be retrieved here
  const retrieveFeedbackUser = async uid => {
    await authAPI
      .fetchUser(uid)
      .then(results => {
        if (results.status) {
          setWriter(results.payload);
        }
      })
      .catch(error => {
        // console.log(error);
      });
  };

  // updating user interface with new messages
  const updateMessages = async new_message => {
    // console.log("Returned Message", new_message);
    await setMessages(new_message);
    // console.log("Messages ", new_message);
    return true;
  };

    useEffect(() => {
        socket.connect();    
        return () => {
            socket.disconnect();
        };
    }, [])
    
  useEffect(() => {  

    // reacting to on chat messages
    socket.on("chat", data => {      
      
      const new_message = [...data];
      
      updateMessages(new_message).then(result => {
        setFeedBack({ author: "", message: "" });
        setWriter(extended_user);
        setMessage({ ...message, message: "" });
      });

    });

    // reacting to on typing messages
    socket.on("typing", data => {
      const uid = data.author;
      retrieveFeedbackUser(uid).then(result => {
        setFeedBack({
          author: data.author,
          message: data.message
        });
      });
    });

    // reacting to on populate messages
    socket.on("populate", data => {
      // this allows my app to populate itself with the most recent messages on entry
      // the data field carries an array which includes messages            
      setMessages(data);
    });

    // initializing message so that when a message 
    // is sent it is sent with the user id of the correct user
    setMessage({
      ...message,
      author: uid
    });


    return () => {
      setMessage({
        ...message,
        author: ""
      });
    };
  }, []);

  // function used to send a message
  const onSendMessage = e => {
    let data = message;
    data.author = uid;
    data.chat_id = chat_constants.chat_room_init.chat_id;
    socket.emit('chat',data);
  };

  // function used to indicate that this user is typing
  const onTyping = e => {
    setFeedBack(chat_constants.feedback_init);
    let data = message;
    data.author = uid;
    socket.emit('typing',data);
  };

  //  try calling this method to let the user join the chat room then call onPopulate
  const userJoinChat = () => {

  };

  // this function is called on entry to populate with all the messages
  const onPopulate = () => {    
    
    const populate_message = chat_constants.chat_user_init;
    console.log('UID',uid);
    populate_message.author = uid;
    populate_message.chat_id = chat_constants.chat_room_init.chat_id;

    return populate_message;
  };


  // called in order to clear messages
  const onClearMessages = (e) => {      
    let data = chat_constants.chat_room_init;
    socket.emit('clear', data);      
  };

  // creating the onPupulate entry message
  useEffect(() => {    
    socket.emit("populate", onPopulate());
    return () => {      
    };
  }, []);


    return(
            <SocketContext.Provider value = {{
                messages:messages,
                message:message,
                setMessage:setMessage,
                writer:writer,
                typing:onTyping,
                sendMessage:onSendMessage,
                clearMessages : onClearMessages
            }}>                
                {props.children}
            </SocketContext.Provider>            
    )

};



export default SocketContextProvider;