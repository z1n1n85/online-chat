import React, { FC } from "react";
import { IMessage } from "../types/types";

interface IListMessages{
    messages: Array<IMessage>;
    name: string;
}

export const Messages: FC<IListMessages> = ({messages, name}) => {
    return(
        <div>
            {messages.map(({user, message}, i) => {
                const itsMe =
                    user.name.trim().toLowerCase() === name.trim().toLowerCase();
                const className = itsMe ? 'me' : 'user';
                return (
                    <div key={i} className={`${className}`}>
                        <span>{user.name}</span>
                        <div>{message}</div>
                    </div>
                );
            })}
        </div>
    );
}