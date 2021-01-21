import React from "react";

import "./App.css";

import InputData from "./components/InputData";
import OutputData from "./components/OutputData";

function App() {
	const [imgSrc, setImgSrc] = React.useState<string>("");
	const [focalLength, setFocalLength] = React.useState<string>("");
	const [diopters, setDiopters] = React.useState<string>("");
	const [isLoadingFL, setIsLoadingFL] = React.useState<boolean>(false);
	const [isLoadingD, setIsLoadingD] = React.useState<boolean>(false);

	return (
		<div className='App'>
			<h1>Diopter Calculator</h1>
			<p>Capture image from camera and upload to Python app</p>
			<InputData
				setImgSrc={setImgSrc}
				setFocalLength={setFocalLength}
				setDiopters={setDiopters}
				setIsLoadingFL={setIsLoadingFL}
				setIsLoadingD={setIsLoadingD}
			/>
			<OutputData
				imgSrc={imgSrc}
				focalLength={focalLength}
				diopters={diopters}
				isLoadingFL={isLoadingFL}
				isLoadingD={isLoadingD}
			/>
		</div>
	);
}

export default App;
