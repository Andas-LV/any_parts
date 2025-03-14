import React from "react";
import styles from "./RegisterAddress.module.css";
import RegisterAddressForm from "@/forms/SignUpPartner/RegisterAddressForm/RegisterAddressForm";

interface RegisterAddressProps {
	nextStep?: () => void;
	previousStep?: () => void;
}

export default function RegisterAddress({
	nextStep,
	previousStep,
}: RegisterAddressProps) {
	return (
		<div className={styles.RegisterAddress}>
			<h1>Адрес регистрации</h1>
			<RegisterAddressForm nextStep={nextStep} previousStep={previousStep} />
		</div>
	);
}
