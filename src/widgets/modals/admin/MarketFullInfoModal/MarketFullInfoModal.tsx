import React from "react";
import styles from "./MarketFullInfoModal.module.css";
import SideModalLayout from "@/layouts/SideModalLayout/SideModalLayout";
import { TMarketFullInfo } from "@/types/admin/Markets";
import { formatDateWithDuration } from "@/utils/formatDate";
import { marketStatuses } from "@/constants/status";
import { Icons } from "@/assets/svg/svg";

interface MarketFullInfoModalProps {
	onClose: () => void;
	market: TMarketFullInfo;
}

export default function MarketFullInfoModal({
	onClose,
	market,
}: MarketFullInfoModalProps) {
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
									{marketStatuses
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
								<div className={styles.value}>
									{market.country}
								</div>
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
				</div>
			</div>
		</SideModalLayout>
	);
}
