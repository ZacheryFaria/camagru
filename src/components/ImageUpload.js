import React from "react";

function ImageUpload(props) {
	function upload(e) {
		e.preventDefault();
		//console.log(e.target.upload.files[0]);
		let x = URL.createObjectURL(e.target.upload.files[0]);
		props.upload(x);
	}

	return (
		<form onSubmit={upload}>
			<input id="upload" type="file" accept="image/png"/>
			<input type="submit"/>
		</form>
	)
}

export default ImageUpload;