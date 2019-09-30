
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

  useEffect(() => {
    let uid = message.author;
    retrieveAuthor(uid).then(result => console.log(result))  
    return () => {
      setAuthor(extended_user);
    };
  }, [message]);

  return(
                  
        <div className="box-comments">
              {/* <img src={} alt="user image" className="online" /> */}

        <p className="box-comment">
        
        <a href="#">
          <small  className="text-muted pull-right"> <i className="fa fa-clock-o"></i> {message.timestamp} </small>
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

  
  const [socket] = useSocket(chat_constants.chat_server);
  socket.connect();

  const { user_account_state } = useContext(UserAccountContext);
  

  

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
      
      let new_messages = [];

      await messages.forEach(item => {
          new_messages.push(item);
      });

      new_messages.push(new_message);

      await setMessages(new_messages);
      console.log("Messages ", new_messages);
      return true;
  };

  useEffect(() => {

    const uid = user_account_state.user_account.uid;

    socket.on("chat", data => {
      
      const new_message = {...data};
      
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
          {messages.map((message,index) => {
            return <DisplayMessage message={message} key={index} />;
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
              onKeyPress={e => socket.emit("typing", message)}
              onChange={e =>
                setMessage({ ...message, [e.target.name]: e.target.value })
              }
            />

            <div className="input-group-btn">
              <button
                type="button"
                className="btn btn-success"
                onClick={e => socket.emit("chat", message)}
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