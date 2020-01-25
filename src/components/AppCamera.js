import React, { useEffect } from "react";

function AppCamera() {
	useEffect(() => {
		async function setupCamera() {
			var video = document.getElementById("video");
			var stream = await navigator.mediaDevices.getUserMedia({video: true});
			video.srcObject = stream;
			video.play();
		}
		setupCamera();
	}, []
	);

	return(
		<video className="CameraVideo" id="video" autoPlay/>
	)
}

export default AppCamera;