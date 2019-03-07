import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/index.css';
import App from './Components/App/App';


ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

