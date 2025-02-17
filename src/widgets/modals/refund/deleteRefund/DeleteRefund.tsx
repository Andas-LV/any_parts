"use client";

import ModalsLayout from "@/layouts/modalLayout/layout";
import styles from './deleteRefund.module.css'
import {Button} from "@components/ui/button";
import React from "react";
import {useToast} from "@/hooks/use-toast";
import {useItemsStore} from "@/entities/items/useItemsStore";

const DeleteRefund = ({ onClose, itemId }: { onClose: () => void, itemId: number }) => {
    const { deleteRefundItem, isLoading, error } = useItemsStore();
    const { toast } = useToast();

    const handleDelete = async () => {
        try{
            await deleteRefundItem(itemId);
            toast({
                done: true,
                variant: "deleted",
                description: "Выбранный возврат успешно удалён",
            })
            console.log(itemId)
            onClose()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ModalsLayout title={"Отменить заявку на возврат?"} onClose={onClose}>
            <div className={styles.deleteModelWrapper}>
                <p>Если вы отмените заявку, вернуть товар позже будет невозможно. Уверены, что хотите продолжить?</p>

                <div className={styles.actionButtons}>
                    <Button
                        variant="ghost"
                        className={styles.cancelBtn}
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Оставить заявку
                    </Button>

                    <Button
                        className={styles.submitButton}
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        Да, отменить
                    </Button>
                </div>
            </div>
        </ModalsLayout>
    );
};

export default DeleteRefund;