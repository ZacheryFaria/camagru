import React, { useState, useEffect } from "react";
import Filter from "./Filter";

import banana from "./resources/banana.png";

function FilterBar(props) {
	let [selected, setSelected] = useState(null);

	useEffect(() => {
		if (props.reset) {
			setSelected(null);
		}
	}, [props.reset]);



	function clicked(i, uri) {
		if (selected === i) {
			setSelected(null);
			props.draw(null);
		} else {
			setSelected(i);
			props.draw(uri);
		}
	}

	const filters = [
		<Filter key={0} index={0} cb={clicked} src={banana} selected={selected === 0}/>,
		<Filter key={1} index={1} cb={clicked} src={banana} selected={selected === 1}/>
	]

    return (
      <div className="FilterContainer">
          {filters}
      </div>
    );
}

export default FilterBar;