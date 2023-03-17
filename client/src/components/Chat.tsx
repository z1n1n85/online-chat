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
        <div>
            <div>{params.room}</div>
            <div> {usersCount} users in this room </div>
            <button onClick={leftRoom}>
                Left the room
            </button>
            <Messages messages={stateMessages} name={params.name}></Messages>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="message"
                    placeholder="What do you want to say?"
                    value={message}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
                <input
                    type="submit"
                    value="Say a message"
                    onSubmit={handleSubmit}
                />
            </form>
        </div>
    );
};
