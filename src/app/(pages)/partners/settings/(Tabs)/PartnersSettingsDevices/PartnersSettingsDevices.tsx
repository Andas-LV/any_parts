import React from "react";
import styles from "./PartnersSettingsDevices.module.css";
import { useSessionsStore } from "@/entities/sessions/useSessionsStore";
import { Icons } from "@/assets/svg";
import { Button } from "@components/ui/button";

export default function PartnersSettingsDevices() {
	const {
		sessions,
		currentSession,
		deleteOtherSessions,
		deleteSession,
		isLoading,
	} = useSessionsStore();

	if (!sessions || sessions.length === 0) return null;

	const handleDeleteOtherSessions = async () => {
		if (currentSession) {
			await deleteOtherSessions(currentSession.id);
		}
	};

	return (
		<div className={styles.PartnersSettingsDevices}>
			<p>Вы входили в этот профиль Any Parts Partnerts</p>

			<div className={styles.cardsWrapper}>
				{sessions.map((session) => (
					<React.Fragment key={session.id}>
						<div
							className={`${styles.card} ${session.isCurrent ? styles.active : styles.inactive}`}
						>
							<div className={styles.info}>
								<strong>{session.device}</strong>
								<span>
									{session.browser} • {session.ip}
								</span>
								{session.isCurrent ? (
									<span className={styles.sessionTime}>
										<p>Текущий сеанс</p> • {session.location}
									</span>
								) : (
									<span className={styles.sessionTime}>
										{session.timestamp} • {session.location}
									</span>
								)}
							</div>

							{!session.isCurrent && (
								<button
									className={styles.deleteButton}
									onClick={() => deleteSession(session.id)}
								>
									<Icons.BlackClose />
								</button>
							)}
						</div>
						{session.isCurrent && (
							<Button
								className="p-0 w-fit"
								onClick={handleDeleteOtherSessions}
								variant="link"
							>
								{isLoading ? "Загрузка..." : "Выйти на всех, кроме этого"}
							</Button>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	);
}
