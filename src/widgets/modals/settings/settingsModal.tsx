"use client";

import styles from "./settingsModal.module.css";
import { Button } from "@components/ui/button";
import {useUserStore} from "@/entities/user/useUserStore";
import ModalsLayout from "@/layouts/modalLayout/layout";
import {Switch} from "@components/ui/switch";
import { Label } from "@components/ui/label"
import {useState} from "react";

const SettingsModal = ({ onClose }: { onClose: () => void; }) => {
    const { user, isLoading, error } = useUserStore();

    const [mailing, setMailing] = useState(false);
    const [searchParams, setSearchParams] = useState(false);

    const handleSubmit = async() => {
        console.log(mailing, searchParams);
        onClose()
    };

    return (
        <ModalsLayout title={'Настройки'} onClose={onClose}>
            <div className={styles.wrapper}>
                <div className={styles.param}>
                    <Label htmlFor="mailing">
                        Получать рассылки
                        <p>{user?.email}</p>
                    </Label>
                    <Switch
                        id="mailing"
                        checked={mailing}
                        onCheckedChange={setMailing}
                    />
                </div>

                <div className={styles.param}>
                    <Label htmlFor="search-params">Учитывать предпочтения в результатах поиска</Label>
                    <Switch
                        id="search-params"
                        checked={searchParams}
                        onCheckedChange={setSearchParams}
                    />
                </div>

                <Button className={styles.submitButton} onClick={handleSubmit}>
                    {isLoading ? "Загрузка..." : "Сохранить"}
                </Button>
            </div>
        </ModalsLayout>
    );
};

export default SettingsModal;