import React, {useState} from 'react'
import "./Chat.css"
import {Avatar, IconButton} from "@material-ui/core"
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons'
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import SendIcon from '@material-ui/icons/Send';
import axios from './axios';

function Chat({messages}) { 

   const [input, setInput] =useState("")

   const sendMessage = async (e)=>{
      e.preventDefault();

      await axios.post('/messages/new',
      {
         message: input,
         name: "Aditi",
         timestamp: "just now!",
         received:true,
      });
      setInput('');
   };
    return (
        <div className="chat">
           <div className="chat__header">
               <Avatar/>
               <h3>Team Manager</h3>
               <div class name ="chat__headerInfo">
               <div className= "chat__headerRight">
                        <IconButton>
                           <SearchOutlined/>
                        </IconButton>
                        <IconButton>
                           <AttachFile/>
                        </IconButton>
                        <IconButton>
                           <MoreVert/>
                        </IconButton>
                  </div>
               </div>
             </div>
               <div className ="chat__body">
                  {messages.map((message)=>(
                     <p className ={`chat__message ${message.received && 'chat__reciever'}`}>
                     <span className= "chat__name">{message.name}</span>
                     {message.message}
                      <span className= "chat__timestamp">{message.timestamp}</span> 
                     </p>
                  ))}

                  </div>
               <div className="chat__footer">
                  <InsertEmoticonIcon/>
                  <form>
                     <input value={input} onChange={e=>setInput(e.target.value)}
                        placeholder = "Type a message"
                        type="text"/>
                     <button onClick= {sendMessage} type = "submit">
                     <SendIcon/>
                     </button>
                  </form>
                  <MicIcon/>
               </div>

            </div>
    )
}

export default Chat