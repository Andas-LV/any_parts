import React from "react";
import styles from "./GeneralData.module.css";
import GeneralDataForm from "@/forms/SignUpPartner/GeneralDataForm/GeneralDataForm";

interface GeneralDataProps {
	nextStep?: () => void;
}

export default function GeneralData({ nextStep }: GeneralDataProps) {
	return (
		<div className={styles.GeneralData}>
			<h1>Проверьте данные</h1>
			<GeneralDataForm nextStep={nextStep} />
		</div>
	);
}
