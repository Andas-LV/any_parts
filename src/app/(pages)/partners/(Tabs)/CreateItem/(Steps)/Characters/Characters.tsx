import React from "react";
import styles from "./Characters.module.css";
import CharacteristicsForm from "@/forms/CharacteristicsForm/CharacteristicsForm";

interface CharactersProps {
	nextStep?: () => void;
	previousStep?: () => void;
}

export default function Characters({
	nextStep,
	previousStep,
}: CharactersProps) {
	return (
		<div className={styles.Characters}>
			<h1>Характеристика</h1>
			<CharacteristicsForm nextStep={nextStep} previousStep={previousStep} />
		</div>
	);
}
