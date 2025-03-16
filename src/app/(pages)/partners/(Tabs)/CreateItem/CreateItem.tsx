"use client";

import React, { useState } from "react";
import styles from "./CreateItem.module.css";
import StepWizard from "react-step-wizard";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import GeneralInfo from "@/app/(pages)/partners/(Tabs)/CreateItem/(Steps)/GeneralInfo/GeneralInfo";
import Characters from "@/app/(pages)/partners/(Tabs)/CreateItem/(Steps)/Characters/Characters";
import Configuration from "@/app/(pages)/partners/(Tabs)/CreateItem/(Steps)/Configuration/Configuration";
import PriceMaking from "@/app/(pages)/partners/(Tabs)/CreateItem/(Steps)/PriceMaking/PriceMaking";
import Preview from "@/app/(pages)/partners/(Tabs)/CreateItem/(Steps)/Preview/Preview";
import CustomStepIcon, { CustomConnector } from "@components/ui/CustomStepIcon";
import { transitions } from "@/lib/StepperTransitions/StepperTransitions";

const steps = [
	{ title: "Основная информация" },
	{ title: "Характеристика" },
	{ title: "Конфигурация" },
	{ title: "Ценообразование" },
	{ title: "Предварительный просмотр" },
];

export default function CreateItem() {
	const [currentStep, setCurrentStep] = useState(0);

	const onStepChange = (stats: any) => {
		setCurrentStep(stats.activeStep - 1);
	};

	return (
		<div className={styles.CreateItem}>
			<h1>Создание товара</h1>
			<Box sx={{ width: "100%", my: 3 }}>
				<Stepper activeStep={currentStep} connector={<CustomConnector />}>
					{steps.map((step, index) => (
						<Step key={index} sx={{ p: 0 }}>
							<StepLabel
								slots={{ stepIcon: CustomStepIcon }}
								slotProps={{
									stepIcon: {
										active: currentStep === index,
									},
								}}
								sx={{
									"& .MuiStepLabel-label": {
										color:
											currentStep === index ? "#000" : "var(--text-secondary)",
									},
								}}
							>
								{step.title}
							</StepLabel>
						</Step>
					))}
				</Stepper>
			</Box>

			<StepWizard
				onStepChange={onStepChange}
				transitions={transitions}
				isLazyMount
			>
				<GeneralInfo />
				<Characters />
				<Configuration />
				<PriceMaking />
				<Preview />
			</StepWizard>
		</div>
	);
}
