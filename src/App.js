import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route} from "react-router-dom";

import LandingPage from "./LandingPage";
import Login from "./Login";

function App() {
  return (
    <div className="landing">
      <Router>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/login" component={Login}/>
      </Router>
    </div>
  );
}

export default App;
