"use client";

import styles from "./devices.module.css";
import DeviceCards from "./DeviceCards";
import ModalsLayout from "@/layouts/modalLayout/layout";
import {Button} from "@components/ui/button";
import {useSessionsStore} from "@/entities/sessions/useSessionsStore";

const Devices = ({ onClose }: { onClose: () => void; }) => {
    const { currentSession, deleteOtherSessions, isLoading } = useSessionsStore();

    const handleDeleteOtherSessions = async () => {
        if(currentSession){
            await deleteOtherSessions(currentSession?.id)
            console.log("currentSession.id: ",currentSession?.id)
        }
    }

    return (
        <ModalsLayout title="Ваши устройства" onClose={onClose}>
            <div className={styles.wrapper}>
                <p>На них вы входили в этот профиль Any Parts</p>

                <DeviceCards />

                <Button onClick={handleDeleteOtherSessions} className={styles.submitButton}>
                    {isLoading ? "Загрузка..." : "Выйти на всех, кроме этого"}
                </Button>
            </div>
        </ModalsLayout>
    );
};

export default Devices;
