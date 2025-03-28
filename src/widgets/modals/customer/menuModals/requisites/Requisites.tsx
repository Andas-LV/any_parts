"use client";

import React, { useState } from "react";
import styles from "./requisites.module.css";
import { Icons } from "@/assets/svg";

import ModalsLayout from "@/layouts/modalLayout/layout";
import RequisiteCard from "@/components/cards/RequisiteCards";
import CreateReq from "@/widgets/modals/customer/menuModals/requisites/create/CreateReq";

const Requisites = ({
	onClose,
	onCreate,
}: {
	onClose: () => void;
	onCreate: () => void;
}) => {
	return (
		<ModalsLayout title="Реквизиты" onClose={onClose}>
			<RequisiteCard />

			<button className={styles.navItem} onClick={onCreate}>
				<div className={styles.navHeader}>
					<Icons.TextFile width={20} height={20} color={"black"} />
					<p>Добавить реквизиты</p>
				</div>
				<Icons.ArrowRight />
			</button>
		</ModalsLayout>
	);
};

export default Requisites;
