import React from "react";

import "./App.css";

import InputData from "./components/InputData";
import OutputData from "./components/OutputData";

function App() {
	const [imgSrc, setImgSrc] = React.useState<string>("");

	return (
		<div className='App'>
			<h1>Diopter Calculator</h1>
			<p>Capture image from camera and upload to Python app</p>
			<InputData setImgSrc={setImgSrc} />
			<OutputData imgSrc={imgSrc} />
		</div>
	);
}

export default App;
