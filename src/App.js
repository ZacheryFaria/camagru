import React from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import AppNav from "./components/AppNav"
import Camera from "./components/Camera";
import Settings from "./components/Settings";
import NotFoundPage from "./components/NotFoundPage";

function App() {
	const [cookies, setCookie] = useCookies(['token']);

	return (
		<CookiesProvider>
			<div className="App" >
				<Router>
					<div className="App">
						<AppNav />
						<Switch>
							<Route exact path="/" component={LandingPage}/>
							<Route exact path="/login" component={Login}/>
							<Route exact path="/camera" component={Camera}/>
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
