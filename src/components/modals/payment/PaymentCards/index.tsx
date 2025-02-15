import {Icons} from "@/assets/svg";
import styles from "./paymentCard.module.css";
import {usePaymentStore} from "@/store/usePaymentStore";
import type { PaymentCard as PaymentCardType } from "@/types/PaymentCard";

export default function PaymentCard({onDelete}: {onDelete: () => void}) {
    const {cards, setCurrentCard} = usePaymentStore();

    if (!cards || cards.length === 0) return null;

    const handleDelete = async (card: PaymentCardType) => {
        setCurrentCard(card)
        onDelete()
    }

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
                        onClick={() => handleDelete(card)}
                    >
                        <Icons.BlackClose/>
                    </button>
                </div>
            ))}
        </div>
    );
}
