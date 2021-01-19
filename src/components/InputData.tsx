import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
	width: 600,
	height: 400,
	facingMode: "user",
};

interface InputDataProps {
	setImgSrc: (imgSrc: string) => void;
}

const InputData = ({ setImgSrc }: InputDataProps) => {
	const [file, setFile] = React.useState<string>("");

	const webcamRef = React.useRef<Webcam>(null);

	const captureWebcamPhoto = React.useCallback(
		(handlerFxn, event) => {
			const imageSrc = webcamRef?.current?.getScreenshot();
			setImgSrc(imageSrc ? imageSrc : "");
			setFile(imageSrc ? imageSrc : "");
			handlerFxn(imageSrc, event);
		},
		[webcamRef, setImgSrc]
	);

	const handleCalibration = (imageSrc: string, event: any) => {
		const elementsArray = [...event.target.elements];
		const formDataObj = elementsArray.reduce((acc, elem) => {
			if (elem.id) {
				acc[elem.id] = elem.value;
			}
			return acc;
		}, {});
		const formData = new FormData();
		formData.append("distance", formDataObj.distance.toString());
		formData.append("width", formDataObj.pd.toString());
		formData.append("file", imageSrc);
		fetch("http://localhost:5000/api/calibrate", {
			method: "POST",
			mode: "cors",
			body: formData,
		})
			.then((response) => response.json())
			.then((result) => {
				console.log("Success:", result);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleEstimation = (imageSrc: string, event: any) => {
		const formData = new FormData();
		formData.append("file", imageSrc);

		fetch("http://localhost:5000/api/estimate", {
			method: "POST",
			mode: "cors",
			body: formData,
		})
			.then((response) => response.json())
			.then((result) => {
				console.log("Success:", result);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleInputFormSubmit = (event: any) => {
		event.preventDefault();
		const action = event.nativeEvent.submitter.name;
		// caputure photo and ...
		// if calibrate; post to calibrate
		if (action === "calibrate") {
			captureWebcamPhoto(handleCalibration, event);
		}
		// otherwise skip calibrate and post to estimate
		else if (action === "estimate") {
			captureWebcamPhoto(handleEstimation, event);
		}
	};

	return (
		<div>
			<form onSubmit={handleInputFormSubmit} id='inputDataForm'>
				<label htmlFor='distance'>Known distance:</label>{" "}
				<input
					type='number'
					id='distance'
					name='distance'
					defaultValue={0}
					min={0}
				/>{" "}
				cm
				<br />
				<br />
				<label htmlFor='pd'>Pupillary distance (PD):</label>{" "}
				<input
					type='number'
					id='pd'
					name='pd'
					step='0.1'
					defaultValue={0.0}
					min={0}
				/>{" "}
				cm
				<br />
				<br />
				<Webcam
					height={videoConstraints.height}
					width={videoConstraints.width}
					audio={false}
					ref={webcamRef}
					screenshotFormat='image/jpeg'
					videoConstraints={videoConstraints}
				/>
				<br />
				<input
					type='submit'
					name='calibrate'
					value='Calibrate Focal Length'
				/>{" "}
				<input type='submit' name='estimate' value='Estimate Diopters' />
			</form>
		</div>
	);
};

export default InputData;
