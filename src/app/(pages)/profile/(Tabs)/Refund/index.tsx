"use client"
import styles from "./page.module.css"
import {useItemsStore} from "@/store/useItemsStore";
import {Button} from "@components/ui/button";
import {Search as SearchIcon} from "lucide-react";
import React, {useEffect, useMemo, useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Icons } from "@/assets/svg";
import {RefundItem, StatusTypes} from "@/types/Refund";
import DeleteRefund from "@components/modals/refund/deleteRefund/DeleteRefund";
import CreateRefund from "@components/modals/refund/create/CreateRefund";
import RefundFullInfo from "@components/modals/refund/create/refundFullInfo";
import AfterCreateRefund from "@components/modals/refund/create/afterCreate/afterCreateRefund";
import {getStatusStyle} from './getStatusStyle'

type TModal = "itemChooseModal" | "itemFullInfoModal" | "onSuccessModal" | null

export default function Refund() {
    const { getRefundItems, refunds } = useItemsStore();
    const [search, setSearch] = useState("");

    const [activeModal, setActiveModal] = useState<TModal>(null);
    const [showDeleteRefund, setShowDeleteRefund] = useState(false);

    useEffect(() => {
        getRefundItems();
    }, []);

    const filteredItems = useMemo(() => {
        return refunds?.filter(item =>
            item.id.toString().includes(search) ||
            item.price.toString().includes(search)
        ) || [];
    }, [search, refunds]);

    const renderStatusAction = (item: RefundItem) => {
        const { id, status, comment } = item

        if (status === 'На рассмотрении') {
            return (
                <div>
                    {showDeleteRefund && <DeleteRefund itemId={id} onClose={() => setShowDeleteRefund(false)} />}
                    <Icons.BlackClose className={styles.deleteButton} onClick={() => setShowDeleteRefund(true)} />
                </div>
            );
        }

        return (
            <DropdownMenu>
                <DropdownMenuTrigger className={styles.commentButton}>Комментарии</DropdownMenuTrigger>
                <DropdownMenuContent className={styles.commentContent}>
                    <DropdownMenuItem>{ comment }</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Возврат</h2>
            <div className={styles.noContentWrapper}>
                <div className={styles.noContentTitle}>
                    Чтобы вернуть товар по браку, оформите заявку на его проверку.
                </div>
                <p>
                    <Icons.Info width={16} height={16} />
                    Рассмотрение заявки занимает до 7 рабочих дней.
                </p>
                <Button onClick={() => setActiveModal("itemChooseModal")} variant={"outline"} className={styles.createBtn}>
                    Создать заявку
                </Button>
            </div>
            <div className={styles.content}>
                <div className={styles.searchWrapper}>
                    <SearchIcon className={styles.searchIcon}/>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Поиск..."
                        className={styles.searchInput}
                    />
                </div>
                <div className={styles.tableWrapper}>
                    {refunds && refunds.length > 0 && (
                        <Table className={styles.table}>
                            <TableHeader className={styles.tableHeader}>
                                <TableRow className={styles.tableRow}>
                                    <TableHead className={styles.tableHead}>№ претензии</TableHead>
                                    <TableHead className={styles.tableHead}>Дата</TableHead>
                                    <TableHead className={styles.tableHead}>Цена ₸</TableHead>
                                    <TableHead className={styles.tableHead}>Статус</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredItems.map((item) => (
                                    <TableRow key={item.id} className={styles.tableRow}>
                                        <TableCell className={styles.tableCell}>{item.id}</TableCell>
                                        <TableCell className={styles.tableCell}>
                                            {item.createdAt.toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className={styles.tableCell}>
                                            {item.price.toLocaleString("ru-RU")}
                                        </TableCell>
                                        <TableCell className={styles.tableCell}>
                                            <span className={getStatusStyle(item.status as StatusTypes)}>
                                                {item.status}
                                            </span>
                                            {renderStatusAction(item)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>

                <Button className={styles.deliveryPoint}>
                    Пункт выдачи
                </Button>
            </div>

            {activeModal === "itemChooseModal" && (<CreateRefund onClose={() => setActiveModal(null)} onNext={() => setActiveModal("itemFullInfoModal")} />)}
            {activeModal === "itemFullInfoModal" && (
                <RefundFullInfo
                    onClose={() => setActiveModal(null)}
                    onPrev={() => setActiveModal("itemChooseModal")}
                    onNext={() => setActiveModal("onSuccessModal")}
                />)
            }
            {activeModal === "onSuccessModal" && (<AfterCreateRefund onClose={() => setActiveModal(null)} />)}
        </div>
    )
}