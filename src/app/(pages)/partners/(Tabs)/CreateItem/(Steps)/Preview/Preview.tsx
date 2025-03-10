import React, { useEffect } from "react";
import styles from "./Preview.module.css";
import { Button } from "@components/ui/button";
import { useCreateItemStore } from "@/entities/items/useCreateItemStore";
import PreviewItem from "@/widgets/PreviewItem/PreviewItem";

interface PreviewProps {
	previousStep?: () => void;
	isActive: boolean;
}

export default function Preview({ previousStep, isActive }: PreviewProps) {
	const { setFullInfo } = useCreateItemStore();

	useEffect(() => {
		if (isActive) setFullInfo();
	}, [isActive]);

	return (
		<div className={styles.Preview}>
			<h1>Preview component</h1>
			<PreviewItem />
			<Button onClick={previousStep}>Назад</Button>
		</div>
	);
}
