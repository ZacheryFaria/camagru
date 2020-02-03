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
import Profile from "./components/Profile";
import Post from "./components/Post";
import Gallery from "./components/Gallery";
import Footer from './components/Footer';
import Verify from "./components/Verify";
import EmailResend from './components/EmailResend';

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
							<Route exact path="/gallery" component={Gallery}/>
							<Route exact path="/registercomplete" component={RegisterComplete}/>
							<Route exact path="/profile/:id?" component={Profile}/>
							<Route exact path="/verify/:id" component={Verify}/>
							<Route exact path="/emailresend/:email" component={EmailResend}/>
							<Route component={NotFoundPage}/>
						</Switch>
						<Footer/>
					</div>
				</Router>
			</div>
		</CookiesProvider>
	);
}

export default App;
