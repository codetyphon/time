import React, { useState, useEffect } from 'react';
import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
const adapter = new LocalStorage('db')
let formatSeconds = (value) => {
    let result = parseInt(value / 1000);
    let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    return `${h}:${m}:${s}`;
}
function Set(props) {
    const [ui, setUi] = useState('list');
    const [h, setH] = useState(0);
    const [m, setM] = useState(0);
    const [s, setS] = useState(0);
    const [times, setTimes] = useState([]);
    const [title, setTitle] = useState(null);
    let conn = () => {
        return low(adapter);
    }
    let unset = () => {
        setUi('list');
    }
    let set = () => {
        let time = (h * 1000 * 60 * 60 + m * 1000 * 60 + s * 1000);
        if (!title || title == '') {
            setTitle('未命名倒计时')
        }
        let id = conn().get('id').value() + 1;
        conn().get('times')
            .push({ id: id, title: title, time: time })
            .write()
        conn().set('id', id).write()
        getTimes();
        setUi('list');
    }
    let set_time = (e) => {
        props.set(e.target.title, e.target.value);
    }
    let changeTitle = (e) => {
        setTitle(e.target.value);
    }
    let add = () => {
        setUi('add');
    }
    let changeH = (e) => {
        setH(e.target.value);
    }
    let changeM = (e) => {
        setM(e.target.value);
    }
    let changeS = (e) => {
        setS(e.target.value);
    }
    let manage = () => {
        setUi('manage');
    }
    let unmanage = () => {
        setUi('list');
    }
    let delTime = (e) => {
        conn().get('times')
            .remove({ id: parseInt(e.target.id) })
            .write();
        getTimes();
    }
    let getTimes = () => {
        setTimes(conn().get('times').value());
    }
    useEffect(() => {
        if (conn().has('times').value()) {
            getTimes();
        } else {
            conn().set('times', [
                {
                    id: 1,
                    title: '煮蛋',
                    time: 1000 * 60 * 5
                },
                {
                    id: 2,
                    title: '午睡',
                    time: 1000 * 60 * 60
                }
            ]).write()
            getTimes();
        }
        if (conn().has('id').value()) {

        } else {
            conn().set('id', 3).write()
        }
    }, []);
    return (
        <div>
            {(() => {
                switch (ui) {
                    case 'list': return (
                        <div>
                            <h2>选择一个倒计时</h2>
                            
                            {
                                (() => {
                                    if (times.length > 0) {
                                        return (
                                            <p>
                                                <button onClick={manage}>管理</button>
                                            </p>
                                        )
                                    }
                                })()
                            }
                            {
                                times.map((time, i) => {
                                    return (
                                        <p key={time.id}>
                                            <button value={time.time} title={time.title} onClick={set_time}>{time.title}（{formatSeconds(time.time)}）</button>
                                        </p>
                                    )
                                })
                            }
                            <button onClick={add}>新增</button>
                        </div>
                    );
                    case 'manage': return (
                        <div>
                            <h2>管理</h2>
                            <p>
                                <button onClick={unmanage}>返回</button>
                            </p>
                            {
                                times.map((time, i) => {
                                    return (
                                        <p key={time.id}>
                                            <button value={time.time} title={time.title} onClick={set_time}>{time.title}（{formatSeconds(time.time)}）</button>
                                            {' '}
                                            <button id={time.id} onClick={delTime}>删除</button>
                                        </p>
                                    )
                                })
                            }
                        </div>
                    );
                    case 'add': return (
                        <div>
                            <h2>新增倒计时</h2>
                            <p><input placeholder={"输入倒计时名称"} type="text" onChange={changeTitle} /></p>
                            <p>时:<input placeholder={"输入时"} type="text" value={h} onChange={changeH} /></p>
                            <p>分:<input placeholder={"输入分"} type="text" value={m} onChange={changeM} /></p>
                            <p>秒:<input placeholder={"输入秒"} type="text" value={s} onChange={changeS} /></p>
                            <p>
                                <button onClick={set}>确定</button>
                                {' '}
                                <button onClick={unset}>取消</button>
                            </p>
                        </div>
                    )
                }
            })()}
        </div>
    )
}
export default Set;
