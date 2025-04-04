import styles from "./topHeader.module.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CurrencyModal from "@/widgets/modals/customer/currency/currencyModal";
import { useUserStore } from "@/entities/user/useUserStore";
import { countryCodes } from "@/constants/countryCodes";
import { useRouter } from "next/navigation";
import { routes } from "@/configs/routes";
import { ChooseDeliveryPointModal } from "@/widgets/modals/customer/ChooseDeliveryPointModal/ChooseDeliveryPointModal";

export default function TopHeader() {
	const [currencyModal, setCurrencyModal] = useState(false);
	const [deliveryModal, setDeliveryModal] = useState(false);

	const router = useRouter();
	const { user } = useUserStore();
	const userCurrency = user?.currency || "KZT";
	const selectedCountry =
		countryCodes.find((country) => country.currency === userCurrency) ||
		countryCodes[0];

	return (
		<div className={styles.wrapper}>
			<div className={styles.leftSide}>
				<Button
					className={styles.currency}
					variant="secondary"
					onClick={() => setCurrencyModal(true)}
				>
					<Image
						className={styles.currencyImg}
						src={selectedCountry.flag}
						alt={selectedCountry.name}
						width={25}
						height={25}
					/>
					{selectedCountry.currencyDesc} • {userCurrency}
				</Button>

				<Button onClick={() => setDeliveryModal(true)} className={styles.address} variant="secondary">
					<Image
						src={"/header/location.svg"}
						alt="location"
						width={23}
						height={23}
					/>
					г. Алматы. Уточнить адрес
				</Button>
			</div>

			<Button
				onClick={() => router.push(routes.partnersAuth())}
				variant={"secondary"}
				className={styles.getSeller}
			>
				Стать продавцом
			</Button>

			{currencyModal && <CurrencyModal onClose={() => setCurrencyModal(false)} />}
			{deliveryModal && <ChooseDeliveryPointModal onClose={() => setDeliveryModal(false)} />}
		</div>
	);
}
