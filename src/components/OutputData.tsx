import React from "react";

interface OutputDataProps {
	imgSrc: string;
}

const OutputData = ({ imgSrc }: OutputDataProps) => {
	return <div>{imgSrc && <img src={imgSrc} alt='You' />}</div>;
};

export default OutputData;
