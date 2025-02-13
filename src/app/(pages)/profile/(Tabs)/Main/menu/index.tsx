"use client"

import Image from "next/image"
import styles from "./page.module.css"
import {useUserStore} from "@/store/useUserStore";
import React, {useState} from "react";
import Payment from "@components/modals/payment/Payment";
import Requisites from "@components/modals/requisites/Requisites";
import SettingsModal from "@components/modals/settings/settingsModal";
import Devices from "@components/modals/devices/Devices";

export default function Menu() {
    const { user } = useUserStore()
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [isReqOpen, setIsReqOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isDevicesOpen, setIsDevicesOpen] = useState(false);

    return (
        <div className={styles.wrapper}>
            <div className={styles.userInfo}>
                <Image
                    className={styles.avatarUrl}
                    src={user?.avatarUrl || '/header/user.svg'}
                    alt="avatar"
                    fill
                    sizes={'48px'}
                />

                <h2>{user?.username}</h2>
            </div>

            <div className={styles.navs}>
                <p>Финансы</p>
                <button className={styles.navItem} onClick={() => setIsPaymentOpen(true)}>
                    <Image
                        className={styles.navImage}
                        src={'/profile/CreditCard.png'}
                        alt="navImage"
                        fill
                        sizes={'20px'}
                    />

                    <p>Способы оплаты</p>
                </button>
                <button className={styles.navItem} onClick={() => setIsReqOpen(true)}>
                    <Image
                        className={styles.navImage}
                        src={'/profile/FileText.png'}
                        alt="navImage"
                        fill
                        sizes={'20px'}
                    />

                    <p>Реквизиты</p>
                </button>

                <p>Управление</p>
                <button className={styles.navItem} onClick={() => setIsSettingsOpen(true)}>
                    <Image
                        className={styles.navImage}
                        src={'/profile/Settings.png'}
                        alt="navImage"
                        fill
                        sizes={'20px'}
                    />

                    <p>Настройки</p>
                </button>
                <button className={styles.navItem} onClick={() => setIsDevicesOpen(true)}>
                    <Image
                        className={styles.navImage}
                        src={'/profile/Devices.png'}
                        alt="navImage"
                        fill
                        sizes={'20px'}
                    />

                    <p>Ваши устройства</p>
                </button>
            </div>

            {isPaymentOpen && <Payment onClose={() => setIsPaymentOpen(false)} />}
            {isReqOpen && <Requisites onClose={() => setIsReqOpen(false)} />}
            {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
            {isDevicesOpen && <Devices onClose={() => setIsDevicesOpen(false)} />}
        </div>
    )
}