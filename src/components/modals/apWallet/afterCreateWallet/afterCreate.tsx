import { Icons } from "@/assets/svg";
import styles from "./afterCreate.module.css";
import ModalsLayout from "@components/modals/layout";
import React, {useState} from "react";
import InstructionModal from "@components/modals/apWallet/instruction/instructionModal";

export default function AfterCreate({ onClose }: { onClose: () => void }) {
    const [showInstruction, setShowInstruction] = useState(false);

    if (showInstruction) {
        return <InstructionModal onClose={onClose} />;
    }

    return (
        <ModalsLayout title="" back={false} onClose={onClose}>
            <div className={styles.modalContent}>
                <Icons.Done width={80} height={80} />

                <h2>
                    AP Кошелёк готов
                </h2>

                <p>Теперь его можно пополнять и оплачивать с него со скидкой</p>

                <button type="submit" className={styles.submitButton} onClick={() => setShowInstruction(true)}>
                    Как пополнить
                </button>
            </div>
        </ModalsLayout>
    )
}