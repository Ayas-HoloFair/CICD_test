// src/IframeComponent.js
import React, { useEffect,useState } from 'react';

const IframeComponent = () => {
  const [msg,setMsg] = useState()
  useEffect(() => {
    // Function to handle messages from the iframe
    const handleMessage = (event) => {
      // Check if the message is coming from your iframe's origin
      if (event.origin !== 'http://localhost:3000') {
        return;
      }
// https://gdrfa.enterprise.holofair.io/api/amer/document/get?center=center1&service=service1
      // Handle the received message
      console.log('Message received from HoloFair iFrame:', event.data);
      setMsg(event.data.unityEventData)
    };

    // Add event listener for message events
    window.addEventListener('message', handleMessage);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  // We will test this project

  return (
    <>
    <center><h1>Ticket System</h1></center>
    {msg &&
    <p style={{"padding":"15px"}}>Message received from HoloFair iFrame <br/> {msg} </p>
    }
    <iframe
      src="http://localhost:3000"
      title="Your Iframe"
      style={{ width: '100%', height: '500px', border: 'none' }}
    />
    </>
  );
};

export default IframeComponent;
