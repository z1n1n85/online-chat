import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App'

import "./reset/reset.css";
import "./styles/global.css"

const container = document.getElementById('root')!;
const root = createRoot(container);


root.render(
    <div>
        <div>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </div>
    </div>
);