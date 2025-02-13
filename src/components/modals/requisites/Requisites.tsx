"use client";

import React, { useState } from "react";
import styles from "./requisites.module.css";
import { Icons } from "@/assets/svg";

import Image from "next/image";
import ModalsLayout from "@components/modals/layout";
import RequisiteCard from "./RequisiteCards";
import CreateReq from "@components/modals/requisites/create/CreateReq";

const Requisites = ({ onClose }: { onClose: () => void; }) => {
    const [showCreateReq, setShowCreateReq] = useState(false);

    if (showCreateReq) {
        return <CreateReq onClose={() => setShowCreateReq(false)} />;
    }

    return (
        <ModalsLayout title="Реквизиты" back={false} onClose={onClose}>
            <RequisiteCard />

            <button className={styles.navItem} onClick={() => setShowCreateReq(true)}>
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
