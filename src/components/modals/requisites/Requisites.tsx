"use client";

import React, { useState } from "react";
import styles from "./requisites.module.css";
import { Icons } from "@/assets/svg";

import Image from "next/image";
import ModalsLayout from "@components/modals/layout";
import RequisiteCard from "./RequisiteCards";
import CreateReq from "@components/modals/requisites/create/CreateReq";

const Requisites = ({onClose, onCreate}: { onClose: () => void, onCreate: () => void }) => {
    return (
        <ModalsLayout title="Реквизиты" onClose={onClose}>
            <RequisiteCard />

            <button className={styles.navItem} onClick={onCreate}>
                <div className={styles.navHeader}>
                    <Image
                        className={styles.navImage}
                        src={"/profile/FileText.png"}
                        alt="navImage"
                        fill
                        sizes={"20px"}
                    />
                    <p>Добавить реквизиты</p>
                </div>
                <Icons.ArrowRight />
            </button>
        </ModalsLayout>
    );
};

export default Requisites;
