import { LoaderCircle } from "lucide-react";
import styles from "./loading.module.css";

const Loading = () => {
	return (
		<div className={styles.container}>
			<div className={styles.spinner}>
				<LoaderCircle size={40} color="white" />
			</div>
		</div>
	);
};

export default Loading;
