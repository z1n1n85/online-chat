import React, { useState, FC } from "react";
import { Link } from 'react-router-dom';

import { Join } from './Join';

import style from '../styles/Page.module.css';
const s = style;

export const Main: FC = () => {
    return (
        <div
            className={s.background}
        >
            <div
                className={s.content_container}
            >
                <Join />
            </div>
        </div>
    )
};
