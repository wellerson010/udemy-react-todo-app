import 'modules/bootstrap/dist/css/bootstrap.min.css';
import 'modules/font-awesome/css/font-awesome.min.css';

import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Menu from '../template/menu';
import Todo from '../todo/todo';
import About from '../about/about';

export default props => (
    <div className='container'>
        <Menu />
        <Switch>
            <Route path="/todos" component={Todo}/>
            <Route path="/about" component={About}/>
            <Redirect from="*" to="/todos" />
        </Switch>
    </div>
)