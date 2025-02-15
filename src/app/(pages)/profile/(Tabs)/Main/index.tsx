"use client"

import styles from "./page.module.css"
import Menu from './menu'
import Image from 'next/image'
import React, {useState} from "react";
import ApCreateModal from "@components/modals/apWallet/apCreateModal";
import {useUserStore} from "@/store/useUserStore";
import AfterCreate from "@components/modals/apWallet/afterCreateWallet/afterCreate";
import InstructionModal from "@components/modals/apWallet/instruction/instructionModal";

export type TModal = "createWallet" | "onSuccessModal" | "instructionModal" | null

export default function Main() {
    const {user} = useUserStore()

    const [activeModal, setActiveModal] = useState<TModal>(null);

    return (
        <div className={styles.wrapper}>
            <Menu/>

            <div className={styles.actionCards}>
                <div className={styles.actionCard}>
                    <div className={styles.itemName}>
                        <h2>0 ₸</h2>
                        <p>Баланс</p>
                    </div>

                    {user?.apWallet ?
                        <button className={styles.createWalletButton}>
                            <Image
                                className={styles.walletImg}
                                src={'/profile/APwallet.png'}
                                alt={'wallet'}
                                fill
                                sizes={'20px'}
                            />

                            <p>Пополнить</p>
                        </button>
                        :
                        <button className={styles.createWalletButton} onClick={() => setActiveModal("createWallet")}>
                            <Image
                                className={styles.walletImg}
                                src={'/profile/APwallet.png'}
                                alt={'wallet'}
                                fill
                                sizes={'20px'}
                            />

                            <p>Открыть AP Кошелёк</p>
                        </button>
                    }
                </div>

                <div className={styles.actionCard}>
                    <div className={styles.itemName}>
                        <h2>Избранное</h2>
                        <p>0 товаров</p>
                    </div>

                    <button className={styles.favoriteButton}>
                        <Image
                            className={styles.likedImg}
                            src={'/profile/liked.png'}
                            alt={'liked'}
                            fill
                            sizes={'30px'}
                        />
                    </button>
                </div>

                <div className={styles.actionCard}>
                    <div className={styles.itemName}>
                        <h2>Покупки</h2>
                        <p>Пока пусто</p>
                    </div>

                    <button className={styles.bagButton}>
                        <Image
                            className={styles.bagImg}
                            src={'/profile/Bag.png'}
                            alt={'bag'}
                            fill
                            sizes={'30px'}
                        />
                    </button>
                </div>
            </div>

            {activeModal && <ApCreateModal onClose={() => setActiveModal(null)} onNext={() => setActiveModal("onSuccessModal")}/>}
            {activeModal && <AfterCreate onClose={() => setActiveModal(null)} onNext={() => setActiveModal("instructionModal")}/>}
            {activeModal && <InstructionModal onClose={() => setActiveModal(null)}/>}
        </div>
    )
}