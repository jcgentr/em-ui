import React from "react";

interface OutputDataProps {
	imgSrc: string;
	focalLength: string;
	diopters: string;
}

const OutputData = ({ imgSrc, focalLength, diopters }: OutputDataProps) => {
	return (
		<div>
			<p>Focal Length: {focalLength}</p>
			<p>Estimated Diopters: {diopters}</p>
			{imgSrc && <img src={imgSrc} alt='You' />}
		</div>
	);
};

export default OutputData;
