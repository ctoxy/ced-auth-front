import React from 'react';
import { hydrate, render } from 'react-dom';
import Routes from './Routes';
import 'jquery';
import 'popper.js/dist/umd/popper';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
    hydrate(<Routes />, rootElement);
} else {
    render(<Routes />, rootElement);
}
