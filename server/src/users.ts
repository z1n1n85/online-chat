import { IParams } from "./types/types";

let users: Array<IParams> = [];

export const findUser = (user: IParams): boolean => {
    const userName: string = user.name.trim().toLowerCase();
    const userRoom: string = user.room.trim().toLowerCase();
    return (users.filter(u => {
        return u.name.trim().toLocaleLowerCase() === userName
        && u.room.trim().toLocaleLowerCase() === userRoom
    }).length) > 0;
}

export const addUser = (user: IParams): {isExist: boolean; user: IParams} => {
    const isExist: boolean = findUser(user);
    if (!isExist) users.push(user);
    return { isExist: isExist, user: user};
};

export const countUserRoom = (room: string): number => {
    return users.filter(u => u.room === room).length;
}

export const leftUser = (user: IParams): void => {
    const found = findUser(user);
    if (found) {
        users = users.filter(u => !(u.room === user.room && u.name === user.name));
    }
}