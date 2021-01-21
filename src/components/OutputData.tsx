import React from "react";
import { ReactComponent as EyeSpinner } from "../eye.svg";

interface OutputDataProps {
	imgSrc: string;
	focalLength: string;
	diopters: string;
	isLoadingFL: boolean;
	isLoadingD: boolean;
}

const OutputData = ({
	imgSrc,
	focalLength,
	diopters,
	isLoadingFL,
	isLoadingD,
}: OutputDataProps) => {
	return (
		<div>
			<p>Focal Length: {isLoadingFL ? <EyeSpinner id='eye' /> : focalLength}</p>
			<p>
				Estimated Diopters: {isLoadingD ? <EyeSpinner id='eye' /> : diopters}
			</p>
			{imgSrc && <img src={imgSrc} alt='You' />}
		</div>
	);
};

export default OutputData;
