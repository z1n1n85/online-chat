import React, { useEffect, useState, FC } from "react";
import { io, Socket } from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';

import { Messages } from "./Messages";
import {
    ServerToClientEvents,
    ClientToServerEvents,
    IParams,
    IMessage,
} from "../types/types";

import style from '../styles/Chat.module.css';
const s = style;

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:5000');

export const Chat: FC = () => {
    const { search } = useLocation();
    const [params, setParams] = useState({room: '', name: '',});
    const [stateMessages, setStateMessages] = useState<Array<IMessage>>([]);
    const [message, setMessage] = useState('');
    const [usersCount, setUsersCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = Object.fromEntries(new URLSearchParams(search));
        const searchParams: IParams = {
            room: urlParams.room,
            name: urlParams.name,
        }
        setParams(searchParams);
        socket.emit('join', searchParams);
    }, [search]);
    useEffect(() => {
        socket.on('message', ( message ) => {
            setStateMessages([...stateMessages, message]);
        });
    }, [stateMessages]);
    useEffect(() => {
        socket.on('updateCountUser', (count) => {
            setUsersCount(count);
        })
    }, [usersCount]);

    const leftRoom = () => {
        socket.emit('leftRoom', params);
        navigate('/');
    };
    const handleChange = ({target: {value}} : {target: {value: string}}) => {
        setMessage(value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if(!message) return;
        socket.emit('sendMessage', { message, params });
        setMessage('');
    };

    return (
        <div className={s.container}>
            <div className={s.navbar}>
                <button 
                    onClick={leftRoom}
                    className='button'
                >
                    Go out
                </button>
                <h2 className={s.room_name}>
                    {params.room}
                </h2>
                <div className={s.online}>
                    {usersCount} online
                </div>
            </div>
            <Messages messages={stateMessages} name={params.name}></Messages>
            <form 
                className={s.message_input}
                onSubmit={handleSubmit}
            >
                <input
                    className={`input ${s.input_text}`}
                    type="text"
                    name="message"
                    placeholder="(°▽°)/"
                    value={message}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
                <input
                    className={s.btn_submit}
                    type="submit"
                    value="Say!"
                    onSubmit={handleSubmit}
                />
            </form>
        </div>
    );
};
