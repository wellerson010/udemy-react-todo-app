import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

export default props => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)