import React from "react";


function Filter(props) {
	function click(e) {
		props.cb(props.index, document.getElementById(props.src));
	}

	let color = props.selected ? "#00d600" : "black";

	return (
		<img alt='' id={props.src} style={{borderColor: color}} className="FilterImg" src={props.src} onClick={click}/>
	);
}

export default Filter;