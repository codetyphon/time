import React, { useState, useEffect } from 'react';

function Ling(props) {
  useEffect(() => {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.play()
  },[]);
  let stop = () => {
    props.stop();
  }
  return (
    <div>
      <p>Ling,Ling</p>
      <audio loop className="audio-element">
        <source src={process.env.PUBLIC_URL + '/ling.mp3'}></source>
      </audio>
      <p><button onClick={stop}>stop</button></p>
    </div>
  )
}
export default Ling;
