import React from 'react'
import ReactDOM from 'react-dom'
import Router from './common/router.jsx';
import 'babel-polyfill';
import 'isomorphic-fetch';

ReactDOM.render(
    Router,
    document.getElementById('app')
);
