import React from "react";
import { ReactComponent as EyeSpinner } from "../eye.svg";

interface OutputDataProps {
	imgSrc: string;
	focalLength: string;
	diopters: string;
	isLoading: boolean;
}

const OutputData = ({
	imgSrc,
	focalLength,
	diopters,
	isLoading,
}: OutputDataProps) => {
	return (
		<div>
			<p>Focal Length: {isLoading ? <EyeSpinner id='eye' /> : focalLength}</p>
			<p>
				Estimated Diopters: {isLoading ? <EyeSpinner id='eye' /> : diopters}
			</p>
			{imgSrc && <img src={imgSrc} alt='You' />}
		</div>
	);
};

export default OutputData;
