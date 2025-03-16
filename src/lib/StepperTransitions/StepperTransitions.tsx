import styles from "./StepperTransitions.module.css";

export const transitions = {
	enterRight: `${styles["step-transition"]} ${styles.enterRight}`,
	enterLeft: `${styles["step-transition"]} ${styles.enterLeft}`,
	exitRight: `${styles["step-transition"]} ${styles.exitRight}`,
	exitLeft: `${styles["step-transition"]} ${styles.exitLeft}`,
	intro: `${styles["step-transition"]} ${styles.intro}`,
};
