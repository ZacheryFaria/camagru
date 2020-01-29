import React from 'react';
import { CookiesProvider } from 'react-cookie';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import AppNav from "./components/AppNav"
import Camera from "./components/Camera";
import Settings from "./components/Settings";
import NotFoundPage from "./components/NotFoundPage";
import RegisterComplete from "./components/RegisterComplete";
import Gallery from "./components/Gallery";
import Post from "./components/Post";

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
							<Route exact path="/post/:id" component={Post}/>
							<Route exact path="/register" component={Register}/>
							<Route exact path="/camera" component={Camera}/>
							<Route exact path="/settings" component={Settings}/>
							<Route exact path="/registercomplete" component={RegisterComplete}/>
							<Route exact path="/gallery/:id?/:page?" component={Gallery}/>							<Route component={NotFoundPage}/>
						</Switch>
					</div>
				</Router>
			</div>
		</CookiesProvider>
	);
}

export default App;
