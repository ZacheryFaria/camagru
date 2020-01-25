import React, { useState, useEffect } from "react";
import { withCookies } from 'react-cookie';
import AppCamera from "./AppCamera";
import "./Camera.css"

function Camera(props) {
	const [tookPicture, setTookPicture] = useState(false);

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
		var canv = document.getElementById("videocanvas");
		canv.style.display = "none";
		var ctx = canv.getContext("2d");
		ctx.clearRect(0, 0, canv.width, canv.height);

		var vid = document.getElementById("video");
		vid.style.display = "block";
	}

	function uploadPicture() {
		console.log("upload...");
	}

	useEffect(() => {
		console.log("updated");
	});

	const takeButton = <button className="CameraButton" onClick={takePicture}>Take Picture</button>
	const retakeButton = <button className="CameraButton" onClick={retakePicture}>Retake Picture</button>
	const uploadButton = <button className="CameraButton" onClick={uploadPicture}>Upload Picture</button>

	return(
		<div className="Camera">
			<canvas className="CameraCanvas" id="videocanvas"/>
			<AppCamera />
			{!tookPicture ? takeButton : null}
			{tookPicture ? retakeButton : null}
			{tookPicture ? uploadButton : null}
		</div>
	)
}

export default withCookies(Camera);