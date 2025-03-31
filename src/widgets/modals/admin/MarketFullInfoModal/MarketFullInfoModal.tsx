import React from "react";
import styles from "./MarketFullInfoModal.module.css";
import SideModalLayout from "@/layouts/SideModalLayout/SideModalLayout";
import { ModalType, TMarketFullInfo } from "@/types/admin/Markets";
import { formatDateWithDuration } from "@/utils/formatDate";
import { marketStatuses, marketRequestStatuses } from "@/constants/status";
import { Icons } from "@/assets/svg/svg";
import { Button } from "@components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AdminTreatmentCancellationModal from "@/widgets/modals/admin/AdminTreatmentCancellationModal/AdminTreatmentCancellationModal";
import { useModal } from "@/hooks/useModal";

type ModalState = {
	type: ModalType;
	data: TMarketFullInfo;
};

interface MarketFullInfoModalProps {
	onClose: () => void;
	market: TMarketFullInfo;
	actions?: boolean;
}

export default function MarketFullInfoModal({
	onClose,
	market,
	actions = false,
}: MarketFullInfoModalProps) {
	const { toast } = useToast();
	const { modalData, openModal, closeModal } = useModal<ModalState>();

	const handleAction = (action: string, id: number) => {
		switch (action) {
			case "return":
				toast({
					done: true,
					description: "Отправлен на доработку!",
				});
				console.log("Запрос: Вернуть на доработку для id:", id);
				// запрос
				break;
			case "terminate":
				toast({
					variant: "destructive",
					description: "Договор аннулирован.",
				});
				console.log("Запрос: Расторгнуть договор для id:", id);
				// запрос
				break;
			case "conclude":
				toast({
					done: true,
					description: "Договор заключен!",
				});
				console.log("Запрос: Заключить договор для id:", id);
				// запрос
				break;
			default:
				console.warn("Неизвестное действие");
		}
		onClose();
	};

	return (
		<SideModalLayout title="Полная информация" onClose={onClose}>
			<div className={styles.scrollContainer}>
				<div className={styles.MarketFullInfoModal}>
					<section>
						<h3>Общая информация</h3>
						<div className={styles.infoSection}>
							<div className={styles.row}>
								<div className={styles.param}>Название магазина</div>
								<div className={styles.value}>{market.marketName}</div>
							</div>

							<div className={styles.row}>
								<div className={styles.param}>Статус</div>
								<div className={styles.value}>
									{actions
										? marketRequestStatuses
												.filter((s) => s.name === market.status)
												.map((status) => (
													<div
														key={status.name}
														style={{ backgroundColor: status.backgroundColor }}
														className={styles.status}
													>
														{status.name}
													</div>
												))
										: marketStatuses
												.filter((s) => s.name === market.status)
												.map((status) => (
													<div
														key={status.name}
														style={{ backgroundColor: status.backgroundColor }}
														className={styles.status}
													>
														{status.name}
													</div>
												))}
								</div>
							</div>

							<div className={styles.row}>
								<div className={styles.param}>Дата регистрации</div>
								<div className={styles.value}>
									{formatDateWithDuration(market.registrationDate)}
								</div>
							</div>

							<div className={styles.row}>
								<div className={styles.param}>Страна регистрации</div>
								<div className={styles.value}>{market.country}</div>
							</div>

							<div className={styles.row}>
								<div className={styles.param}>Контактный номер</div>
								<div className={styles.contact}>{market.contactNumber}</div>
							</div>
						</div>
					</section>

					<section>
						<h3>Данные юр. организации</h3>
						<div className={styles.infoSection}>
							<div className={styles.row}>
								<div className={styles.param}>Налоговый номер</div>
								<div className={styles.value}>{market.taxNumber}</div>
							</div>
							<div className={styles.row}>
								<div className={styles.param}>Тип организации</div>
								<div className={styles.value}>{market.organizationType}</div>
							</div>
							<div className={styles.row}>
								<div className={styles.param}>Город регистрации</div>
								<div className={styles.value}>{market.city}</div>
							</div>
							<div className={styles.row}>
								<div className={styles.param}>Адрес регистрации</div>
								<div className={styles.value}>{market.address}</div>
							</div>
							<div className={styles.row}>
								<div className={styles.param}>Документ юр. организации</div>
								<div className={styles.value}>
									<div className={styles.textIconWrapper}>
										<Icons.TextFile width={24} height={24} />
									</div>
									<div className={styles.docInfo}>
										{market.document.name}
										<span className={styles.docSize}>
											{market.document.size} Мб
										</span>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section>
						<h3>Платёжные реквизиты</h3>
						<div className={styles.infoSection}>
							<div className={styles.row}>
								<div className={styles.param}>Расчетный счёт</div>
								<div className={styles.value}>{market.account}</div>
							</div>
							<div className={styles.row}>
								<div className={styles.param}>Валюта</div>
								<div className={styles.value}>{market.currency}</div>
							</div>
							<div className={styles.row}>
								<div className={styles.param}>SWIFT</div>
								<div className={styles.value}>{market.swift}</div>
							</div>
							<div className={styles.row}>
								<div className={styles.param}>Название банка</div>
								<div className={styles.value}>{market.bankName}</div>
							</div>
							<div className={styles.row}>
								<div className={styles.param}>Город банка</div>
								<div className={styles.value}>{market.bankCity}</div>
							</div>
							<div className={styles.row}>
								<div className={styles.param}>Адрес банка</div>
								<div className={styles.value}>{market.bankAddress}</div>
							</div>
						</div>
					</section>

					{actions && (
						<div className={styles.actions}>
							<Button
								onClick={() => handleAction("return", market.id)}
								className={styles.btn}
								variant={"secondary"}
							>
								Вернуть на доработку
							</Button>
							{market.status === "Партнер" ? (
								<Button
									onClick={() => handleAction("terminate", market.id)}
									className={styles.btn}
									variant={"destructive"}
								>
									Расторгнуть договор
								</Button>
							) : (
								<Button
									onClick={() => handleAction("conclude", market.id)}
									className={styles.btn}
								>
									Заключить договор
								</Button>
							)}
						</div>
					)}
				</div>
			</div>

			{modalData?.type === "cancel" && (
				<AdminTreatmentCancellationModal
					market={modalData.data}
					onClose={closeModal}
				/>
			)}
		</SideModalLayout>
	);
}
