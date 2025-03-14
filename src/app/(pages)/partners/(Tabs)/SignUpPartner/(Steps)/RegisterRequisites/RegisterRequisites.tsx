import React from "react";
import styles from "./RegisterRequisites.module.css";
import RegisterRequisitesForm from "@/forms/SignUpPartner/RegisterRequisitesForm/RegisterRequisitesForm";

interface RegisterRequisitesProps {
	nextStep?: () => void;
	previousStep?: () => void;
}

export default function RegisterRequisites({
	nextStep,
	previousStep,
}: RegisterRequisitesProps) {
	return (
		<div className={styles.RegisterRequisites}>
			<h1>Добавьте платёжные реквизиты</h1>
			<RegisterRequisitesForm nextStep={nextStep} previousStep={previousStep} />
		</div>
	);
}
