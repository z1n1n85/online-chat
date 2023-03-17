import React, { FC } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { Main } from './components/Main';
import { Room } from './components/Room';

export const AppRoutes: FC = () => (
    <Routes>
        <Route path="/main" element={<Main/>}/>
        <Route path="/room" element={<Room/>}/>
        <Route path="/" element={<Navigate replace to="/main" />} />
    </Routes>
);
