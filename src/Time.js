import React, { useState, useEffect } from 'react';
function Time(props) {
    let time = props.time;
    let formatSeconds = (value) => {
        let result = parseInt(value / 1000);
        let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
        let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
        let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
        return `${h}:${m}:${s}`;
    }
    let getH = (value) => {
        let result = parseInt(value / 1000);
        let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
        return h;
    }
    let getM = (value) => {
        let result = parseInt(value / 1000);
        let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
        return m;
    }
    let getS = (value) => {
        let result = parseInt(value / 1000);
        let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
        return s;
    }
    return (
        <div>
            <h2>{props.title}</h2>
            <div className="timeBox">
                <div className="time">
                    {getH(time)}
                </div>
                <div className="timeGap">
                    :
                </div>
                <div className="time">
                    {getM(time)}
                </div>
                <div className="timeGap">
                    :
                </div>
                <div className="time">
                    {getS(time)}
                </div>
            </div>
            <style jsx="true">
                {
                    `
                    .timeBox{
                        display:flex;
                        width: 300px;
                        justify-content: center;
                        font-size:60px;
                    }
                    .timeGap{
                        width:50px;
                    }
                    .time{
                        width:100px;
                    }
                    `
                }
            </style>
        </div>
    )
}
export default Time;
