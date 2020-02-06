import React, { useEffect, useState, useRef } from "react";
import { getAllPosts } from "../actions/ContentAction";
import GalleryBlock from "./GalleryBlock";
import "./Gallery.css";

function Gallery(props) {
	const [ blocks, setBlocks ] = useState([]);
	const [ bottom, setBottom ] = useState(true);
	const last = useRef(Date.now());

	useEffect(() => {
		window.scrollTo(0, 0);
		document.addEventListener("scroll", trackScrolling);
		return () => {
			document.removeEventListener("scroll", trackScrolling);
		};
	}, []);

	function trackScrolling() {
		if (document.body.scrollHeight - window.scrollY <= window.innerHeight) {
			setBottom(true);
		}
	}

	useEffect(() => {
		if (!bottom) {
			return;
		}
		setBottom(false);
		getAllPosts({last: last.current}).then((res) => {
			let tmp = res.data.map((e) => <GalleryBlock key={e._id} postId={e._id}/>);
			tmp = blocks.concat(tmp);
			setBlocks(tmp);
			if (res.data.length > 0) {
				last.current = res.data[res.data.length - 1].created;
			}
		});
	}, [bottom, blocks]);


	return (
		<div className="GalleryContainer">
			{blocks}
		</div>
	);
}

export default Gallery;