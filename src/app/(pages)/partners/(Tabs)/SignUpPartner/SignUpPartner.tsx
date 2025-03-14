"use client";

import React, { useState } from "react";
import styles from "./SignUpPartner.module.css";
import StepWizard from "react-step-wizard";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import CustomStepIcon, { CustomConnector } from "@components/ui/CustomStepIcon";
import Document from "@/app/(pages)/partners/(Tabs)/SignUpPartner/(Steps)/Document/Document";
import Request from "@/app/(pages)/partners/(Tabs)/SignUpPartner/(Steps)/Request/Request";
import GeneralData from "@/app/(pages)/partners/(Tabs)/SignUpPartner/(Steps)/GeneralData/GeneralData";
import RegisterAddress from "@/app/(pages)/partners/(Tabs)/SignUpPartner/(Steps)/RegisterAddress/RegisterAddress";
import RegisterRequisites from "@/app/(pages)/partners/(Tabs)/SignUpPartner/(Steps)/RegisterRequisites/RegisterRequisites";

const steps = [
	{ title: "Проверка данных" },
	{ title: "Адрес регистрации" },
	{ title: "Документы" },
	{ title: "Платёжные реквизиты" },
	{ title: "Заключение договора" },
];

const custom = {
	enterRight: "step-transition enterRight",
	enterLeft: "step-transition enterLeft",
	exitRight: "step-transition exitRight",
	exitLeft: "step-transition exitLeft",
	intro: "step-transition intro",
};

export default function SignUpPartner() {
	const [currentStep, setCurrentStep] = useState(0);

	const onStepChange = (stats: any) => {
		setCurrentStep(stats.activeStep - 1);
	};

	return (
		<div className={styles.SignUpPartner}>
			<div className={styles.stepperBar}>
				<h3>Добро пожаловать в Any Parts Partners</h3>
				<Box sx={{ width: "100%", my: 3 }}>
					<Stepper
						orientation="vertical"
						activeStep={currentStep}
						connector={<CustomConnector />}
					>
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
												currentStep === index
													? "#000"
													: "var(--text-secondary)",
										},
									}}
								>
									{step.title}
								</StepLabel>
							</Step>
						))}
					</Stepper>
				</Box>
			</div>

			<div className={styles.stepWrapper}>
				<StepWizard
					onStepChange={onStepChange}
					transitions={custom}
					isLazyMount
				>
					<GeneralData />
					<RegisterAddress />
					<Document />
					<RegisterRequisites />
					<Request />
				</StepWizard>
			</div>
		</div>
	);
}
