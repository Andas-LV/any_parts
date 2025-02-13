import { Icons } from "@/assets/svg";
import styles from "./deviceCard.module.css";
import { useUserStore } from "@/store/useUserStore";

// id: 1,
//     device: "Desktop Window",
//     browser: "Chrome 131.0",
//     ip: "88.204.136.105",
//     location: "Казахстан, Алматы",
//     timestamp: "2025-01-27T12:34:00Z",
//     isCurrent: true,

export default function DeviceCard() {
    const { sessions, deleteSession } = useUserStore();

    if (!sessions || sessions.length === 0) return null;

    return (
        <div className={styles.cardsWrapper}>
            {sessions.map((session) => (
                <div
                    key={session.id}
                    className={`${styles.card} ${session.isCurrent ? styles.active : styles.inactive}`}
                >
                    <div className={styles.info}>
                        <strong>{session.device}</strong>
                        <span>{session.browser} • {session.ip}</span>
                        {session.isCurrent ?
                            <span className={styles.sessionTime}>
                                <p>Текущий сеанс</p> • {session.location}
                            </span>
                            :
                            <span className={styles.sessionTime}>
                                {session.timestamp} • {session.location}
                            </span>
                        }
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
            ))}
        </div>
    );
}
