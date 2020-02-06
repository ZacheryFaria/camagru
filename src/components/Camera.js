import React, { useState, useRef, useEffect } from "react";
import { withCookies, useCookies } from 'react-cookie';
import AppCamera from "./AppCamera";
import "./Camera.css"
import FilterBar from "./FilterBar";
import {upload} from "../actions/ContentAction"
import CameraCanvas from "./CameraCanvas";
import ImageUpload from "./ImageUpload";

function Camera() {
	const [tookPicture, setTookPicture] = useState(false);
	const [resetFilter, setResetFilter] = useState(false);
	const [cookies] = useCookies(['token']);
	const uri = useRef(null);
	const filter = useRef(null);
	const [width, setWidth] = useState(640);
	const [height, setHeight] = useState(480);

	function takePicture() {
		var canv = document.getElementById("videocanvas");
		var vid = document.getElementById("video");
		canv.style.display = "block";
		canv.width = vid.videoWidth;
		canv.height = vid.videoHeight;
		setHeight(vid.videoHeight);
		setWidth(vid.videoWidth);
		var ctx = canv.getContext("2d");
		vid.style.display = "none";
		ctx.drawImage(vid, 0, 0, canv.width, canv.height);
		setTookPicture(true);
		let img = new Image();
		img.src = canv.toDataURL("image/png");
		uri.current = img;
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

		upload(req).then(res => {
			//console.log(res);
		});

		retakePicture();
	}

	function savePicture() {
		let canv = document.getElementById("videocanvas");
		uri.current.src = canv.toDataURL("image/png");
		filter.current = null;
		setResetFilter(true);
	}

	function uploadNewPicture(url) {
		var canv = document.getElementById("videocanvas");
		var vid = document.getElementById("video");
		canv.style.display = "block";
		vid.style.display = "none";
		setTookPicture(true);
		let img = new Image();
		img.src = url;
		uri.current = img;
		img.onload = () => {
			canv.width = img.width;
			canv.height = img.height;
			setWidth(canv.width);
			setHeight(canv.height);
			var ctx = canv.getContext("2d");
			ctx.drawImage(img, 0, 0, img.width, img.height);
		}
	}

	function drawFilter(img) {
		filter.current = img;
		redraw(640 / 2, 480 / 2, 1.0);
	}

	function redraw(x, y, scale) {
		var canv = document.getElementById("videocanvas");
		var ctx = canv.getContext("2d");
		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.drawImage(uri.current, 0, 0, canv.width, canv.height);
		if (filter.current !== null) {
			let size = 100 * scale;
			ctx.drawImage(filter.current, x - size / 2, y - size / 2, size, size);
		}
	}

	useEffect(() => {
		if (resetFilter) {
			setResetFilter(false);
		}
	}, [resetFilter]);

	const takeButton = <button className="CameraButton" onClick={takePicture}>Take Picture</button>;
	const uploadNewButton = <input type="file"  accept="image/png"/>
	const retakeButton = <button className="CameraButton" onClick={retakePicture}>Retake Picture</button>;
	const uploadButton = <button className="CameraButton" onClick={uploadPicture}>Upload Picture</button>;
	const saveButton = <button className="CameraButton" onClick={savePicture}>Save Filter</button>;

	return(
		<div className="Camera">
			{tookPicture ? <FilterBar reset={resetFilter} draw={drawFilter} /> : null}
			<CameraCanvas width={width} height={height} redraw={redraw}/>
			<AppCamera />
			{!tookPicture ? takeButton : null}
			{!tookPicture ? <ImageUpload upload={uploadNewPicture}/> : null}
			{tookPicture ? retakeButton : null}
			{tookPicture ? uploadButton : null}
			{tookPicture ? saveButton : null}
		</div>
	)
}

export default withCookies(Camera);