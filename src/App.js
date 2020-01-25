import React from 'react';
import { CookiesProvider } from 'react-cookie';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import AppNav from "./components/AppNav"
import AppCamera from "./components/AppCamera";
import Settings from "./components/Settings";
import NotFoundPage from "./components/NotFoundPage";

function App() {
	return (
		<CookiesProvider>
			<div className="App" >
				<Router>
					<div className="App">
						<AppNav />
						<Switch>
							<Route exact path="/" component={LandingPage}/>
							<Route exact path="/login" component={Login}/>
							<Route exact path="/camera" component={AppCamera}/>
							<Route exact path="/settings" component={Settings}/>
							<Route component={NotFoundPage}/>
						</Switch>
					</div>
				</Router>
			</div>
		</CookiesProvider>
	);
}

export default App;
