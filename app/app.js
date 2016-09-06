'use strict';


const React = require('react');
const ReactDOM = require('react-dom');
const {createStore, combineReducers} = require('redux');
const {Provider} = require('react-redux');
const {App, attacks, controls} = require('@nkbt/geovis');

const el = React.createElement;

const store = createStore(combineReducers({attacks, controls}));

const appRoot = document.createElement('div');
appRoot.id = 'app';
document.body.appendChild(appRoot);
ReactDOM.render(el(Provider, {store}, el(App)), appRoot);
