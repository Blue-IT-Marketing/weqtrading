
import React, { Fragment,useState,useContext,useEffect } from 'react';
import useSocket from "use-socket.io-client";
import { UserAccountContext } from "../../context/UserAccount/userAccountContext";
import * as chat_constants from './chat-constants';
import {extended_user} from '../Auth/auth-constants';
import * as authAPI from '../Auth/auth-api';



const DisplayMessage = ({message}) => {
  const[author,setAuthor] = useState(extended_user);
  
  const retrieveAuthor = async uid => {
      await authAPI.fetchUser(uid).then(results => {
        if(results.status){
          setAuthor(results.payload);
        }else{

        }
      }).catch(error => {
        console.log(error);
      });
      return true;
  };

  const onOpenAttachment = async e => {

  };

  const returnDate = ({timestamp}) => {
    return Date(parseInt(timestamp) * 1000);
  }

  useEffect(() => {

    let uid = message.author;
    
    retrieveAuthor(uid).then(result => {});
    
    return () => {      
    };
  }, []);

  return(
                  
        <div className="box-comments">
              {/* <img src={} alt="user image" className="online" /> */}

        <p className="box-comment">
        
        <a href="#">
          <small  className="text-muted pull-right" title={ returnDate(message.timestamp)}> <i className="fa fa-clock-o"></i>  </small>
            {author.names}{' '}
        </a>
          {message.message}
        </p>

          {
            message.attachments ? 
              <div className="attachment">
                <h4>Attachments:</h4>

                <p className="filename">
                    {message.attachments}
                </p>

                <div className="pull-right">
                <button 
                  type="button" 
                  className="btn btn-primary btn-sm btn-flat"
                  onClick={e => onOpenAttachment(e)}
                  >Open</button>
                </div>
              </div>
            : null
          }        
        </div>
  )
};

const Chat = () => {  

  const [messages,setMessages] = useState([]);  
  const [message,setMessage] = useState(chat_constants.chat_message_init);  
  const [feedback, setFeedBack] = useState(chat_constants.feedback_init);

  const [writer,setWriter] = useState(extended_user);
  let server_url = '';

  if (document.URL.includes('localhost') || document.URL.includes('127.0.0.1')){
    server_url = chat_constants.chat_server;
  }else{
    server_url = chat_constants.chat_server_online;
  }
  
  const [socket] = useSocket(server_url, {transports: ["websocket"]});
  socket.connect();

  const { user_account_state } = useContext(UserAccountContext);  
  const uid = user_account_state.user_account.uid;
  const retrieveFeedbackUser = async uid => {
      await authAPI.fetchUser(uid).then(results => {
        if(results.status){
          setWriter(results.payload);
        }
      }).catch(error => {
        console.log(error);
      })
  };

  const updateMessages = async new_message => {      
      console.log('Returned Message',new_message);
      
      await setMessages(new_message);
      console.log("Messages ", new_message);
      return true;
  };

  useEffect(() => {  

    socket.on("chat", data => {
      
      const new_message = [...data];
      
      updateMessages(new_message).then(result => {
        setFeedBack({ author: "", message: "" });
        setWriter(extended_user);
        setMessage({ ...message, message: "" });
      });

    });

    socket.on("typing", data => {
      const uid = data.author;
      retrieveFeedbackUser(uid).then(result => {
        setFeedBack({
          author: data.author,
          message: data.message
        });
      });
    });

    socket.on("populate", data => {
      // this allows my app to populate itself with the most recent messages on entry
      // the data field carries an array which includes messages            
      setMessages(data);
    });

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

  const onSendMessage = e => {
    let data = message;
    data.author = user_account_state.user_account.uid;
    data.chat_id = chat_constants.chat_room_init.chat_id;
    socket.emit('chat',data);
  };

  const onTyping = e => {
    let data = message;
    data.author = user_account_state.user_account.uid;
    socket.emit('typing',data);
  };

  const onPopulate = () => {
    
    const uid = user_account_state.user_account.uid;
    const populate_message = chat_constants.chat_user_init;
    populate_message.author = uid;
    populate_message.chat_id = chat_constants.chat_room_init.chat_id;

    return populate_message;
  };

  const onClearMessages = (e) => {      
    let data = chat_constants.chat_room_init;
    socket.emit('clear', data);      
  };

  useEffect(() => {    
    socket.emit("populate", onPopulate());
    return () => {      
    };
  }, []);

  return (
    <Fragment>
      <div className="box box-success">
        <div className="box box-header">
          <i className="fa fa-comments-o"></i>

          <h3 className="box-title">Chat</h3>

            <div
              className="box-tools pull-right"
              data-toggle="tooltip"
              title="Status">

            <div className="btn-group" data-toggle="btn-toggle">
              <button type="button" className="btn btn-default btn-sm active">
                <i className="fa fa-square text-green"></i>
              </button>
              <button type="button" className="btn btn-default btn-sm" onClick={e => onClearMessages(e)}>
                <i className="fa fa-square text-red"> {' '} </i>
              </button>

            </div>


          </div>
        </div>

        <div className="box-body chat" id="chat-box">
          {messages.map((message) => {
            console.log('message',message);
            return <DisplayMessage message={message} key={message.message_id} />;
          })}
        </div>

        {/* <!-- /.chat --> */}
        <div className="box-footer">
          <div className="input-group">
            <input
              className="form-control"
              placeholder="Type message..."
              name="message"
              value={message.message}
              onKeyPress={e => onTyping(e)}
              onChange={e =>
                setMessage({ ...message, [e.target.name]: e.target.value })
              }
            />

            <div className="input-group-btn">
              <button
                type="button"
                className="btn btn-success"
                onClick={e => onSendMessage(e)}
              >
                <i className="fa fa-plus"></i> send
              </button>
            </div>
          </div>
        </div>
        <div className="box-footer">
          <div className="box-tools">
            {writer.uid ? (
              <strong> {writer.names} - - is typing a message...</strong>
            ) : null}
          </div>
        </div>
      </div>
      {/* <!-- /.box (chat box) --> */}
    </Fragment>
  );
}


export default Chat;