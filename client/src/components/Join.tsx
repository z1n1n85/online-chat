import React, { useState, FC } from "react";
import { Link } from 'react-router-dom';

import style from '../styles/Join.module.css';
const s = style;

const FIELDS = {
    USERNAME: 'username',
    ROOM: 'room',
}

export const Join: FC = () => {
    const { USERNAME, ROOM } = FIELDS;
    const [values, setValues] = useState({ [USERNAME]: '', [ROOM]: '', });
    const handleChange = ({ target: { value, name } }: { target: { value: string; name: string}}) => {
        setValues({ ...values, [name]: value });
    }
    const handleClick = (e: React.FormEvent<HTMLElement>) => {
        const idDisbled = Object.values(values).some((v) => !v);
        if (idDisbled) e.preventDefault();
    }
    return (
        <div>
            <h1
                className={s.h1}
            >join:</h1>
            <form
                className={s.form}
            >
                <input 
                    className={s.input}
                    type="text"
                    name="username"
                    placeholder="Your name"
                    value={values[USERNAME]}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
                <input 
                    className={s.input}
                    type="text"
                    name="room"
                    placeholder="Room name"
                    value={values[ROOM]}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
                <Link
                    className={s.button_container} 
                    to={`/room?name=${values[USERNAME]}&room=${values[ROOM]}`}
                    onClick={handleClick}
                >
                    <button
                        className={s.button}
                        type="submit"
                    >
                        Enter room!
                    </button>
                </Link>
            </form>
        </div>
    )
};
