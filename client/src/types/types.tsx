export interface IParams {
    room: string;
    name: string;
}

export interface IMessage {
    user: {
        name: string;
    },
    message: string;
}

export interface ClientToServerEvents {
    join: (p: IParams) => void;
    leftRoom: (p: IParams) => void;
    sendMessage: ({message, params} : {message: string; params: IParams}) => void;
}

export interface ServerToClientEvents {
    message: (m: IMessage) => void;
    updateCountUser: (c: number) => void ;
}