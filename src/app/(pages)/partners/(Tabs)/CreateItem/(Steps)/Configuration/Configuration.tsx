import React from "react";
import styles from "./Configuration.module.css";
import ConfigurationForm from "@/forms/CreateItem/ConfigurationForm/ConfigurationForm";

interface ConfigurationProps {
	nextStep?: () => void;
	previousStep?: () => void;
}

export default function Configuration({
	nextStep,
	previousStep,
}: ConfigurationProps) {
	return (
		<div className={styles.Configuration}>
			<h1>Конфигурация</h1>

			<ConfigurationForm nextStep={nextStep} previousStep={previousStep} />
		</div>
	);
}
