import React, {useRef} from 'react';
// import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as hand from '@tensorflow-models/handpose';
import Webcam from 'react-webcam'
import { drawHand } from './utilities';

function App() {
  const webcamRef=useRef(null);
  const canvasRef=useRef(null);

  const runHandpose=async ()=>{
    const net=await hand.load();
    console.log('handpose model loaded');
    setInterval(()=>{
      detect(net);
    },100);
  }
 runHandpose();
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
  
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
  
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
  
      const hand = await net.estimateHands(video);
      console.log(hand);

      const ctx=canvasRef.current.getContext('2d');
      drawHand(hand,ctx);
    }
  };
  runHandpose();


  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref={webcamRef}
        style={{
          position:'absolute',
          marginLeft:'auto',
          marginRight:'auto',
          left:0,
          right:0,
          textAlign:'center',
          zIndex:9,
          width:640,
          height:480
        }}
        />
        <canvas ref={canvasRef}
        style={{
          position:'absolute',
          marginLeft:'auto',
          marginRight:'auto',
          left:0,
          right:0,
          textAlign:'center',
          zIndex:9,
          width:640,
          height:480
        }}
        />
      </header>
    </div>
  );
}

export default App;