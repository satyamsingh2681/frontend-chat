import React,{useEffect,useState} from 'react';
import Sidebar from './Sidebar';
import './App.css';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';


const App =()=> {
  const [messages, setMessages]= useState([]);

  useEffect(()=>{
    axios.get('/messages/sync')
    .then(response=>{
      console.log(response.data)
      setMessages(response.data);
    });

  },
     [messages]);


  useEffect(() => {
    const pusher = new Pusher('d7c5d1ca39d7d66a58b7', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessages)=> {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessages])
    });
    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        
      <Sidebar/>
      <Chat messages={messages} />
      </div>
     
    </div>
  );
}
  
export default App;
