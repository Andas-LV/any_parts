"use client";


import { usePaymentStore } from "@/store/usePaymentStore";
import ModalsLayout from "@components/modals/layout";
import {PaymentCard} from "@/types/PaymentCard";
import styles from './deleteCard.module.css'
import {Button} from "@components/ui/button";
import React from "react";

const DeleteCard = ({ onClose, card }: { onClose: () => void, card: PaymentCard }) => {
    const { deleteCard, isLoading, error } = usePaymentStore();

    const handleDelete = async () => {
        try{
            await deleteCard(card.id);
            console.log(card)
            onClose()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ModalsLayout title={`Удалим Visa ·· ${card.cardId.toString().slice(-4)} через 30 дней`} back onClose={onClose}>
            <div className={styles.deleteModelWrapper}>
                <p>А пока скроем из способов оплаты</p>

                <div className={styles.actionButtons}>
                    <Button
                        variant="ghost"
                        className={styles.cancelBtn}
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Оставить
                    </Button>

                    <Button
                        className={styles.submitButton}
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        Удалить
                    </Button>
                </div>
            </div>
        </ModalsLayout>
    );
};

export default DeleteCard;