import React, { FC } from "react";
import { Link } from 'react-router-dom';

import { Chat } from './Chat';

import style from '../styles/Page.module.css';
const s = style;

export const Room: FC = () => {
    return (
        <div
            className={s.background}
        >
            <div 
                className={s.content_container}
            >
                <Chat />
            </div>
        </div>
    )
};
