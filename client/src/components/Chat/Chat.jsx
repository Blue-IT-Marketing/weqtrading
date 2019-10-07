
import React, { Fragment,useState,useContext,useEffect } from 'react';
import {extended_user} from '../Auth/auth-constants';
import * as authAPI from '../Auth/auth-api';
import {SocketContext} from '../../context/socketsio';


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

  const returnDate = timestamp => {
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
  const {
    messages,
    message,
    setMessage,
    writer,
    typing,
    sendMessage,
    clearMessages
  } = useContext(SocketContext);

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
              <button type="button" className="btn btn-default btn-sm" onClick={e => clearMessages(e)}>
                <i className="fa fa-square text-red"> {' '} </i>
              </button>

            </div>

          </div>
        </div>

        <div className="box-body chat" id="chat-box">
          {messages.map((message) => {  
            if (message.message_id){
            return <DisplayMessage message={message} key={message.message_id} />;
            }          
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
              onKeyPress={e => typing(e)}
              onChange={e =>
                setMessage({ ...message, [e.target.name]: e.target.value })
              }
            />

            <div className="input-group-btn">
              <button
                type="button"
                className="btn btn-success"
                onClick={e => sendMessage(e)}
              >
                <i className="fa fa-plus"></i> send
              </button>
            </div>
          </div>
        </div>
        <div className="box-footer">
          <div className="box-tools">
            {writer.uid ? (
              <a href='#'><small><strong><em> {writer.names} - - is typing a message... </em></strong></small></a>
            ) : null}
          </div>
        </div>
      </div>
      {/* <!-- /.box (chat box) --> */}
    </Fragment>
  );
}


export default Chat;