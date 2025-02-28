import styles from "./topHeader.module.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CurrencyModal from "@/widgets/modals/currency/currencyModal";
import { useUserStore } from "@/entities/user/useUserStore";
import { countryCodes } from "@/constants/countryCodes";

export default function TopHeader() {
  const [isModalOpen, setModalOpen] = useState(false);
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
          onClick={() => setModalOpen(true)}
        >
          <Image
            className={styles.currencyImg}
            src={selectedCountry.flag}
            alt={selectedCountry.name}
            width={23}
            height={23}
          />
          {selectedCountry.currencyDesc} • {userCurrency}
        </Button>

        <Button className={styles.address} variant="secondary">
          <Image
            src={"/header/location.svg"}
            alt="location"
            width={23}
            height={23}
          />
          г. Алматы. Уточнить адрес
        </Button>
      </div>

      <Button variant={"secondary"} className={styles.getSeller}>
        Стать продавцом
      </Button>

      {isModalOpen && <CurrencyModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
