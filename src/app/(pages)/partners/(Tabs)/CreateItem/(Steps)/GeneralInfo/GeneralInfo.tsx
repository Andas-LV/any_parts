import React from "react";
import styles from "./GeneralInfo.module.css";
import GeneralInfoForm from "@/forms/CreateItem/GeneralInfoForm/GeneralInfoForm";

interface GeneralInfoProps {
	nextStep?: () => void;
}

export default function GeneralInfo({ nextStep }: GeneralInfoProps) {
	return (
		<div className={styles.GeneralInfo}>
			<h1>Основная информация</h1>
			<GeneralInfoForm nextStep={nextStep} />
		</div>
	);
}
