import styles from "./topHeader.module.css"
import Image from "next/image"
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import CurrencyModal from "@/widgets/modals/currency/currencyModal";

export default function TopHeader() {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className={styles.wrapper}>
            <div className={styles.leftSide}>
                <Button className={styles.currency} variant="secondary" onClick={() => setModalOpen(true)}>
                    <Image
                        className={styles.currencyImg}
                        src={'/countries/russian.svg'}
                        alt="flag"
                        width={23}
                        height={23}
                    />
                    Русский•RUB
                </Button>

                <Button className={styles.address} variant="secondary">
                    <Image
                        src={'/header/location.svg'}
                        alt="location"
                        width={23}
                        height={23}
                    />
                    г. Алматы. Уточнить адрес
                </Button>
            </div>

            <Button className={styles.getSeller}>
                Стать продавцом
            </Button>

            {isModalOpen && <CurrencyModal onClose={() => setModalOpen(false)} />}
        </div>
    )
}