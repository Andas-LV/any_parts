import React, { useState, useEffect } from "react";

export const useTimer = (initialTime: number, onComplete?: () => void) => {
	const [timeLeft, setTimeLeft] = useState(initialTime);
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		if (timeLeft > 0 && isActive) {
			const timer = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(timer);
		} else if (timeLeft === 0 && onComplete) {
			onComplete();
		}
	}, [timeLeft, isActive, onComplete]);

	const reset = () => {
		setTimeLeft(initialTime);
		setIsActive(true);
	};

	const pause = () => setIsActive(false);
	const resume = () => setIsActive(true);

	return {
		timeLeft,
		isActive,
		reset,
		pause,
		resume,
	};
};

const Timer = ({
	initialTime,
	onComplete,
	render,
	className,
}: {
	initialTime: number;
	onComplete?: () => void;
	render?: (timeLeft: number) => React.ReactNode;
	className?: string;
}) => {
	const { timeLeft } = useTimer(initialTime, onComplete);

	if (render) {
		return <>{render(timeLeft)}</>;
	}

	return (
		<span className={className}>
			{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
		</span>
	);
};

export default Timer;
