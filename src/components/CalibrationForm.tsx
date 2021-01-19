import React from "react";

interface CalibrationFormProps {
	handleCalibration: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CalibrationForm = ({ handleCalibration }: CalibrationFormProps) => {
	return (
		<div>
			<form onSubmit={handleCalibration} id='calibrationForm'>
				<label htmlFor='distance'>Known distance:</label>{" "}
				<input type='number' id='distance' name='distance' defaultValue={0} />{" "}
				cm
				<br />
				<br />
				<label htmlFor='pd'>Pupillary distance (PD):</label>{" "}
				<input type='number' id='pd' name='pd' step='0.1' defaultValue={0.0} />{" "}
				cm
				<br />
				<br />
				<input type='submit' value='Calibrate' />
			</form>
		</div>
	);
};

export default CalibrationForm;
