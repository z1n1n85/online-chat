import React, { FC } from "react";
import { IMessage } from "../types/types";

import style from "../styles/Messages.module.css";
const s = style;

interface IListMessages{
    messages: Array<IMessage>;
    name: string;
}

export const Messages: FC<IListMessages> = ({messages, name}) => {
    return(
        <div className={s.container}>
            {messages.map(({user, message}, i) => {
                const itsMe =
                    user.name.trim().toLowerCase() === name.trim().toLowerCase();
                const className = itsMe ? s.me : s.user;
                return (
                    <div key={i} className={`${className} ${s.message}`}>
                        <span>{user.name}</span>
                        <div>{message}</div>
                    </div>
                );
            })}
        </div>
    );
}