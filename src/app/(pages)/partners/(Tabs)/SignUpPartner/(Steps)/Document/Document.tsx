import React from "react";
import styles from "./Document.module.css";
import DocumentForm from "@/forms/SignUpPartner/DocumentForm/DocumentForm";

interface DocumentProps {
	nextStep?: () => void;
	previousStep?: () => void;
}

export default function Document({ nextStep, previousStep }: DocumentProps) {
	return (
		<div className={styles.Document}>
			<h1>Документы</h1>
			<DocumentForm nextStep={nextStep} previousStep={previousStep} />
		</div>
	);
}
