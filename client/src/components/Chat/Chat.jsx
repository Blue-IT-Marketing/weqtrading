
import React, { Fragment,useState,useContext,useEffect } from 'react';
import socketIOClient from "socket.io-client";
import { UserAccountContext } from "../../context/UserAccount/userAccountContext";
import * as chat_constants from './chat-constants';
import {extended_user} from '../Auth/auth-constants';
import * as authAPI from '../Auth/auth-api';
import { write } from 'fs';


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

  useEffect(() => {
    let uid = message.author;
    retrieveAuthor(uid).then(result => console.log(result))  
    return () => {
      
    };
  }, [message]);

  return(
                  
        <div className="item">
              {/* <img src={} alt="user image" className="online" /> */}

        <p className="message"><a href="#" className="name">
          <small 
            className="text-muted pull-right">
              <i className="fa fa-clock-o"></i> {message.timestamp}
            </small>
            {author.names}
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
  const [message,setMessage] = useState({author:'',message:'',timestamp:'',attachments : ''});  
  const [feedback,setFeedBack] = useState({author:'',message:''});
  const [writer,setWriter] = useState(extended_user);
  const {user_account_state} = useContext(UserAccountContext);

  let socket = socketIOClient(chat_constants.chat_server);

  const onSendMessage = () => {
    const {uid} = user_account_state.user_account;
    // emit events
    if(uid === message.uid) { socket.emit("chat", message) }
  };

  const retrieveFeedbackUser = async uid => {
      await authAPI.fetchUser(uid).then(results => {
        if(results.status){
          setWriter(results.payload);
        }
      }).catch(error => {
        console.log(error);
      })
  };

  const onTyping = async e => {
    socket.emit("typing", message);
    return {...message};
  };


  useEffect(() => {      
      const uid = user_account_state.user_account.uid;  

      socket.on("chat", data => {
        let new_messages = [...messages];
        
        new_messages.push(data);
        
        setMessages(new_messages);

        setFeedBack({author:'',message:''});
        setWriter(extended_user);
      });

      socket.on("typing", data => {
        setFeedBack({
          author: data.author,
          message: data.message
        });
      });

      setMessage({
        ...message,
        author: uid,
      });

      return () => {
        setMessage({
          ...message,
          author: ''
        });        
      };

  }, []);

  useEffect(() => {
    let uid = feedback.author;

    retrieveFeedbackUser(uid).then(result => console.log(result));

    return () => {
      
    };
  }, [feedback])

    
  
  return (
    <Fragment>
      <div className="box box-success">
        <div className="box box-header">
          <i className="fa fa-comments-o"></i>

          <h3 className="box-title">Chat</h3>

          <div
            className="box-tools pull-right"
            data-toggle="tooltip"
            title="Status"
          >
            <div className="btn-group" data-toggle="btn-toggle">
              <button type="button" className="btn btn-default btn-sm active">
                <i className="fa fa-square text-green"></i>
              </button>
              <button type="button" className="btn btn-default btn-sm">
                <i className="fa fa-square text-red"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="box-body chat" id="chat-box">
          {
            writer.uid ?
              <div className="item">
                <h3 className="message"> {writer.names} :  {feedback.message} </h3>
              </div>
            :null
          }

          {messages.map(message => {
            return <DisplayMessage message={message} />;
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
              onKeyPress={e => onTyping(e).then(result => console.log(result))}
              onChange={e =>setMessage({ ...message, [e.target.name]: e.target.value })}
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
      </div>
      {/* <!-- /.box (chat box) --> */}
    </Fragment>
  );
}


export default Chat;