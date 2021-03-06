import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
	width: 600,
	height: 400,
	facingMode: "user",
};

interface InputDataProps {
	setImgSrc: (imgSrc: string) => void;
	setFocalLength: (focalLength: string) => void;
	setDiopters: (diopters: string) => void;
	setIsLoadingFL: (isLoading: boolean) => void;
	setIsLoadingD: (isLoading: boolean) => void;
}

const InputData = ({
	setImgSrc,
	setFocalLength,
	setDiopters,
	setIsLoadingFL,
	setIsLoadingD,
}: InputDataProps) => {
	const [isCalibrated, setIsCalibrated] = React.useState<boolean>(false);
	const [distance, setDistance] = React.useState<string>("0");
	const [width, setWidth] = React.useState<string>("0.0");
	const [calibratedData, setCalibratedData] = React.useState({
		distance: "",
		width: "",
		focalLength: "",
	});

	// grab local storage of calibrated data if it exists
	React.useEffect(() => {
		if (localStorage.getItem("distance")) {
			setCalibratedData((state) => ({
				...state,
				distance: localStorage.getItem("distance")!,
			}));
			setDistance(localStorage.getItem("distance")!);
		}
		if (localStorage.getItem("width")) {
			setCalibratedData((state) => ({
				...state,
				width: localStorage.getItem("width")!,
			}));
			setWidth(localStorage.getItem("width")!);
		}
		if (localStorage.getItem("focalLength")) {
			setCalibratedData((state) => ({
				...state,
				focalLength: localStorage.getItem("focalLength")!,
			}));
			setFocalLength(
				parseFloat(localStorage.getItem("focalLength")!).toFixed(2)
			);
		}
		// eslint-disable-next-line
	}, []);

	React.useEffect(() => {
		if (
			calibratedData.distance &&
			calibratedData.focalLength &&
			calibratedData.width
		)
			setIsCalibrated(true);
	}, [calibratedData]);

	const webcamRef = React.useRef<Webcam>(null);

	const captureWebcamPhoto = React.useCallback(
		(handlerFxn) => {
			const imageSrc = webcamRef?.current?.getScreenshot();
			setImgSrc(imageSrc ? imageSrc : "");
			handlerFxn(imageSrc);
		},
		[webcamRef, setImgSrc]
	);

	const handleCalibration = (imageSrc: string) => {
		const formData = new FormData();
		formData.append("distance", distance);
		formData.append("width", width);
		formData.append("file", imageSrc);
		const prodEndpoint = "https://endmyopia-api.herokuapp.com/api/calibrate";
		const devEndpoint = "http://localhost:5000/api/calibrate";
		const endpoint =
			process.env.NODE_ENV === "development" ? devEndpoint : prodEndpoint;
		setIsLoadingFL(true);
		fetch(endpoint, {
			method: "POST",
			mode: "cors",
			body: formData,
		})
			.then((response) => response.json())
			.then((result) => {
				setIsLoadingFL(false);
				setDiopters("");
				setFocalLength(result.focal_length.toFixed(2));
				setCalibratedData({
					distance: result.distance,
					width: result.width,
					focalLength: result.focal_length,
				});
				localStorage.setItem("distance", result.distance);
				localStorage.setItem("width", result.width);
				localStorage.setItem("focalLength", result.focal_length);
				setIsCalibrated(true);
			})
			.catch((error) => {
				setIsLoadingFL(false);
				console.error("Error:", error);
			});
	};

	const handleEstimation = (imageSrc: string) => {
		const formData = new FormData();
		formData.append("focalLength", calibratedData.focalLength);
		formData.append("distance", calibratedData.distance);
		formData.append("width", calibratedData.width);
		formData.append("file", imageSrc);
		const prodEndpoint = "https://endmyopia-api.herokuapp.com/api/estimate";
		const devEndpoint = "http://localhost:5000/api/estimate";
		const endpoint =
			process.env.NODE_ENV === "development" ? devEndpoint : prodEndpoint;
		setIsLoadingD(true);
		fetch(endpoint, {
			method: "POST",
			mode: "cors",
			body: formData,
		})
			.then((response) => response.json())
			.then((result) => {
				setIsLoadingD(false);
				// console.log("D Success:", result);
				const diopters = -1 * result.diopters;
				setDiopters(diopters.toFixed(2));
			})
			.catch((error) => {
				setIsLoadingD(false);
				console.error("Error:", error);
			});
	};

	const handleInputFormSubmit = (event: any) => {
		event.preventDefault();
		const action = event.nativeEvent.submitter.name;
		if (action === "calibrate") {
			captureWebcamPhoto(handleCalibration);
		} else if (action === "estimate") {
			captureWebcamPhoto(handleEstimation);
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
					value={distance}
					min={0}
					onChange={(e) => setDistance(e.target.value)}
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
					value={width}
					min={0}
					onChange={(e) => setWidth(e.target.value)}
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
					mirrored={true}
				/>
				<br />
				<input
					type='submit'
					name='calibrate'
					value='Calibrate Focal Length'
				/>{" "}
				<input
					type='submit'
					name='estimate'
					value='Estimate Diopters'
					disabled={!isCalibrated}
				/>
			</form>
		</div>
	);
};

export default InputData;
