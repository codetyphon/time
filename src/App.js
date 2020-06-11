import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Ling from './Ling';
import Time from './Time';
import Set from './Set';


function App() {
  const [time, setTime] = useState(null);
  const [timeoutid, setTimeoutid] = useState(null);
  const [title, setTitle] = useState('');
  let up = () => {
    if (time != null) {
      if (time >= 1000) {
        setTime(time - 1000);
      }
    }
    console.log('up');
  }
  let test = () => {
    setTime(1000 * 10);
  }
  let set = (title, value) => {
    if(!title){
      setTitle('未命名倒计时');
    }else{
      setTitle(title);
    }
    setTime(value);
  }
  let stop = () => {
    setTime(null);
    clearTimeout(timeoutid);
  }
  let clearTime = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    stop();
  }
  useEffect(() => {
    // if(db.has('times').value()){
    //   setTimes(db.get('times').value());
    // }else{
    //   db.set('times', []).write()
    // }
    // setInterval(up,1000);
    setTimeoutid(setTimeout(up, 1000));
  }, [time]);
  return (
    <div className="App">
      <header className="App-header">
        {(() => {
          switch (time) {
            case null: return (<Set set={set} />);
            case 0: return (
              <div>
                <Ling stop={stop} />
              </div>
            );
            default: return (<div>
              <Time title={title} time={time} />
              <p><button onClick={clearTime}>取消倒计时</button></p>
            </div>);
          }
        })()}
      </header>
    </div>
  );
}

export default App;
