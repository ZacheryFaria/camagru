import React, { useEffect, useRef } from "react";

function CameraCanvas(props) {
	const down = useRef(false);
	const pos = useRef([0, 0]);
	const scale = useRef(1.0);

	useEffect(() => {
		function mouseDown(e) {
			down.current = true;
		}

		function mouseMove(e) {
			if (down.current) {
				let canv = document.getElementById("videocanvas");
				let h = canv.scrollHeight;
				let w = canv.scrollWidth;

				let x = props.width / w * e.offsetX;
				let y = props.height / h * e.offsetY;

				pos.current[0] = x;
				pos.current[1] = y;
				props.redraw(x, y, scale.current);
			}
		}

		function mouseUp(e) {
			down.current = false;
		}

		function keyDown(e) {
			if (e.key === '-') {
				scale.current -= .1;
				props.redraw(pos.current[0], pos.current[1], scale.current);
			} else if (e.key === '=') {
				scale.current += .1;
				props.redraw(pos.current[0], pos.current[1], scale.current);
			}
		}

		let canv = document.getElementById("videocanvas");
		canv.addEventListener("mousedown", mouseDown);
		canv.addEventListener("mousemove", mouseMove);
		canv.addEventListener("mouseup", mouseUp);
		canv.addEventListener("touchstart", mouseDown);
		canv.addEventListener("touchend", mouseMove);
		canv.addEventListener("touchmove", mouseUp);
		window.addEventListener("keydown", keyDown);

		return (() => {
			canv.removeEventListener("mousedown", mouseDown);
			canv.removeEventListener("mousemove", mouseMove);
			canv.removeEventListener("mouseup", mouseUp);
			canv.removeEventListener("touchstart", mouseDown);
			canv.removeEventListener("touchend", mouseMove);
			canv.removeEventListener("touchmove", mouseUp);
			window.removeEventListener("keydown", keyDown);
		});
	}, [props]);

	return (
		<canvas className="CameraCanvas" id="videocanvas"/>
	);
}

export default CameraCanvas;