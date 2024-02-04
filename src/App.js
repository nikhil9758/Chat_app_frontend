import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [message,setMessage]= useState('')
  const[data,setData]=useState({})
  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket)
    newSocket.on('connect',()=>{
          console.log("conected.....")
    })

    return () => newSocket.disconnect();
  }, []);

    const handleOnSubmit=()=>{
       socket.emit('sendMessage',message)
       socket.on('message',(item)=>{
            console.log("here is the item.....",item)
            setData(item)
       })
    }
  return (
    <div>
        here
        <input type='text' onChange={(e)=>setMessage(e.target.value)}/>
        <button type='submit' onClick={handleOnSubmit}>send</button>
        {data?.text}
        {data?.user}
    </div>
  );
};

export default App;
