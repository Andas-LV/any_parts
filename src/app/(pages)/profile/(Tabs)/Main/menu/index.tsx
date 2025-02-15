"use client"

import Image from "next/image"
import styles from "./page.module.css"
import {useUserStore} from "@/store/useUserStore";
import React, {useState} from "react";
import Payment from "@components/modals/payment/Payment";
import Requisites from "@components/modals/requisites/Requisites";
import SettingsModal from "@components/modals/settings/settingsModal";
import Devices from "@components/modals/devices/Devices";
import CreateCard from "@components/modals/payment/create/CreateCard";
import DeleteCard from "@components/modals/payment/delete/DeleteCard";
import CreateReq from "@components/modals/requisites/create/CreateReq";
import ConfirmCodeModal from "@components/modals/requisites/create/confirm";
import LogOutModal from "@components//modals/auth/logout/LogOut"
import EditModal from "@components/modals/auth/edit/Edit";

type TPaymentModal = "paymentModal" | "createPaymentModal" | "deletePaymentModal" |  null
type TReqModal = "reqModal" | "createReqModal" | "confirmReqModal" |  null

export default function Menu() {
    const { user } = useUserStore()

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isDevicesOpen, setIsDevicesOpen] = useState(false);
    const [isLogOutOpen, setIsLogOutOpen] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);

    const [activePaymentModal, setActivePaymentModal] = useState<TPaymentModal>(null);
    const [activeReqModal, setActiveReqModal] = useState<TReqModal>(null);

    return (
        <div className={styles.wrapper}>
            <div className={styles.userInfo} onClick={() => {setIsEditModal(true)}} title="Редактировать">
                <Image
                    className={styles.avatarUrl}
                    src={'/header/user.svg'}
                    alt="avatar"
                    fill
                    sizes={'48px'}
                />

                <h2>{user?.username}</h2>
            </div>

            <div className={styles.navs}>
                <p>Финансы</p>
                <button className={styles.navItem} onClick={() => setActivePaymentModal("paymentModal")}>
                    <Image
                        className={styles.navImage}
                        src={'/profile/CreditCard.png'}
                        alt="navImage"
                        fill
                        sizes={'20px'}
                    />

                    <p>Способы оплаты</p>
                </button>
                <button className={styles.navItem} onClick={() => setActiveReqModal("reqModal")}>
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
                <button className={styles.navItem} onClick={() => setIsLogOutOpen(true)}>
                    <Image
                        className={styles.navImage}
                        src={'/profile/SignOut.png'}
                        alt="navImage"
                        fill
                        sizes={'20px'}
                    />

                    <p>Выйти</p>
                </button>
            </div>


            {activePaymentModal === "paymentModal" && (
                <Payment
                    onClose={() => setActivePaymentModal(null)}
                    onCreate={() => setActivePaymentModal("createPaymentModal")}
                    onDelete={() => setActivePaymentModal("deletePaymentModal")}
                />)
            }

            {activePaymentModal === "createPaymentModal" && (
                <CreateCard
                    onClose={() => setActivePaymentModal(null)}
                    onPrev={() => setActivePaymentModal("paymentModal")}
                />)
            }

            {activePaymentModal === "deletePaymentModal" && (
                <DeleteCard
                    onClose={() => setActivePaymentModal(null)}
                    onPrev={() => setActivePaymentModal("paymentModal")}
                />)
            }
            {/*REQISITES*/}
            {activeReqModal === "reqModal" && (
                <Requisites
                    onClose={() => setActiveReqModal(null)}
                    onCreate={() => setActiveReqModal("createReqModal")}
                />)
            }

            {activeReqModal === "createReqModal" && (
                <CreateReq
                    onClose={() => setActiveReqModal(null)}
                    onPrev={() => setActiveReqModal("reqModal")}
                    onNext={() => setActiveReqModal("confirmReqModal")}
                />)
            }

            {activeReqModal === "confirmReqModal" && (
                <ConfirmCodeModal
                    onClose={() => setActiveReqModal(null)}
                    onPrev={() => setActiveReqModal("createReqModal")}
                />)
            }

            {/*SETTINGS && DEVICES*/}
            {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
            {isDevicesOpen && <Devices onClose={() => setIsDevicesOpen(false)} />}

            {/*LOGOUT && EDIT*/}
            {isLogOutOpen && <LogOutModal onClose={() => setIsLogOutOpen(false)} />}
            {isEditModal && <EditModal onClose={() => setIsEditModal(false)} />}
        </div>
    )
}