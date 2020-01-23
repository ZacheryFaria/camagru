import React, {useState} from 'react';
import { CookiesProvider } from 'react-cookie';

import {BrowserRouter as Router, Route} from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import AppNav from "./components/AppNav"
import NotFoundPage from "./components/NotFoundPage";

function App() {
	return (
		<CookiesProvider>
			<div className="App" >
				<Router>
					<div className="App">
						<AppNav />
						<Route exact path="/" component={LandingPage}/>
						<Route exact path="/login" component={Login}/>
						<Route path="*" component={NotFoundPage}/>
					</div>
				</Router>
			</div>
		</CookiesProvider>
	);
}

export default App;
