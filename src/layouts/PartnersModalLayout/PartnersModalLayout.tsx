import React from "react";
import styles from "./PartnersModalLayout.module.css";
import { Icons } from "@/assets/svg/svg";

interface PartnersModalLayoutProps {
	children: React.ReactNode;
	title: string;
	back?: () => void;
}

const PartnersModalLayout: React.FC<PartnersModalLayoutProps> = ({
	children,
	title,
	back,
}) => {
	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<div className={styles.titleWrapper}>
					{back && (
						<Icons.ArrowLeft className={styles.backButton} onClick={back} />
					)}
					<h2>{title}</h2>
				</div>
				<div className={styles.children}>{children}</div>
			</div>
		</div>
	);
};

export default PartnersModalLayout;
