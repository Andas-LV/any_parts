import React, { useState } from "react";
import styles from "./PartnersTreatment.module.css";
import { exampleTreatment } from "@/exampleData/partners/exampleTreatment";
import { Button } from "@components/ui/button";
import TreatmentCancellationModal from "@/widgets/modals/partners/TreatmentCancellationModal/TreatmentCancellationModal";

export default function PartnersTreatment() {
	const [cancelModal, setCancelModal] = useState(false);

	return (
		<div className={styles.PartnersTreatment}>
			<h2>Договор ({exampleTreatment.treatmentName})</h2>

			<div className={styles.infoContent}>
				<div className={styles.marketName}>
					<div className={styles.param}>Название магазина</div>
					<div className={styles.value}>{exampleTreatment.marketName}</div>
				</div>

				<div className={styles.treatmentDate}>
					<div className={styles.param}>Договор заключен с</div>
					<div className={styles.value}>{exampleTreatment.treatmentDate}</div>
				</div>
				<div className={styles.companyAccount}>
					<div className={styles.param}>Расчётный счёт компании</div>
					<div className={styles.value}>{exampleTreatment.companyAccount}</div>
				</div>
				<div className={styles.bankBIC}>
					<div className={styles.param}>БИК банка</div>
					<div className={styles.value}>{exampleTreatment.bankBIC}</div>
				</div>
				<div className={styles.bankName}>
					<div className={styles.param}>Название банка</div>
					<div className={styles.value}>{exampleTreatment.bankName}</div>
				</div>
				<div className={styles.bankAddress}>
					<div className={styles.param}>Адрес банка</div>
					<div className={styles.value}>{exampleTreatment.bankAddress}</div>
				</div>
			</div>

			<Button
				onClick={() => setCancelModal(true)}
				className={styles.btn}
				variant={"secondary"}
			>
				Расторгнуть договор
			</Button>

			{cancelModal && (
				<TreatmentCancellationModal onClose={() => setCancelModal(false)} />
			)}
		</div>
	);
}
