import React, { useState, useEffect } from "react";
import { withCookies, useCookies } from 'react-cookie';
import AppCamera from "./AppCamera";
import "./Camera.css"
import FilterBar from "./FilterBar";
import {upload} from "../actions/ContentAction"

function Camera() {
	const [tookPicture, setTookPicture] = useState(false);
	const [cookies] = useCookies(['token']);

	function takePicture() {
		console.log("hello");
		var canv = document.getElementById("videocanvas");
		canv.style.display = "block";
		canv.width = 1920;
		canv.height = 1080;
		var ctx = canv.getContext("2d");
		var vid = document.getElementById("video");
		vid.style.display = "none";
		ctx.drawImage(vid, 0, 0, canv.width, canv.height);
		setTookPicture(true);
	}

	function retakePicture() {
		setTookPicture(false);
		let canv = document.getElementById("videocanvas");
		canv.style.display = "none";
		let ctx = canv.getContext("2d");
		ctx.clearRect(0, 0, canv.width, canv.height);

		let vid = document.getElementById("video");
		vid.style.display = "block";
	}

	function uploadPicture() {
		let canv = document.getElementById("videocanvas");
		let uri = canv.toDataURL("image/png");

		let req = {
			data: uri,
			token: cookies.token,
		};

		console.log(req);
		upload(req).then(res => {
			console.log(res);
		});
	}

	function savePicture() {
		console.log("save");
	}

	useEffect(() => {
		console.log("updated");
	});

	const takeButton = <button className="CameraButton" onClick={takePicture}>Take Picture</button>;
	const retakeButton = <button className="CameraButton" onClick={retakePicture}>Retake Picture</button>;
	const uploadButton = <button className="CameraButton" onClick={uploadPicture}>Upload Picture</button>;
	const saveButton = <button className="CameraButton" onClick={savePicture}>Save Picture</button>;

	return(
		<div className="Camera">
			<FilterBar/>
			<canvas className="CameraCanvas" id="videocanvas"/>
			<AppCamera />
			{!tookPicture ? takeButton : null}
			{tookPicture ? retakeButton : null}
			{tookPicture ? uploadButton : null}
			{tookPicture ? saveButton : null}
		</div>
	)
}

export default withCookies(Camera);