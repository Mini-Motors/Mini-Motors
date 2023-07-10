import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components';
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import './style/index.css';
import { BrowserRouter as Router } from 'react-router-dom';


// ReactDOM.render(<App />, document.getElementById('root'));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);