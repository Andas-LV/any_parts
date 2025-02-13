import { Icons } from "@/assets/svg";
import styles from "./paymentCard.module.css";
import { usePaymentStore } from "@/store/usePaymentStore";
import type { PaymentCard as PaymentCardType } from "@/types/PaymentCard";

interface PaymentCardProps {
    onDeleteCard: (card: PaymentCardType) => void;
}

export default function PaymentCard({ onDeleteCard }: PaymentCardProps) {
    const { cards } = usePaymentStore();

    if (!cards || cards.length === 0) return null;

    return (
        <div className={styles.cardsWrapper}>
            {cards.map((card) => (
                <div className={styles.card} key={card.id}>
                    {/* Логотип карты */}
                    <img
                        src={`/payment/${card.type.toLowerCase()}.svg`}
                        alt={card.type}
                        className={styles.cardLogo}
                    />

                    <div className={styles.cardInfo}>
                        <p className={styles.cardNumber}>
                            <strong>{card.type}</strong> ·· {card.cardId.toString().slice(-4)}
                        </p>

                        <p className={styles.status}>
                            {card.isActive ? "Активный" : "Неактивный"}
                        </p>
                    </div>

                    <button
                        className={styles.deleteButton}
                        onClick={() => onDeleteCard(card)}
                    >
                        <Icons.BlackClose />
                    </button>
                </div>
            ))}
        </div>
    );
}
