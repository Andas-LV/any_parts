"use client";

import React, { useState } from "react";
import styles from "./PartnerAuth.module.css";
import PartnerLoginModal from "@/widgets/modals/auth/partners/login/login";
import { Icons } from "@/assets/svg";
import PartnerConfirmEmailModal from "@/widgets/modals/auth/partners/confirmEmail";
import PartnerRegisterModal from "@/widgets/modals/auth/partners/register";
import ChooseCompany from "@/widgets/modals/auth/partners/chooseCompany/chooseCompany";
import CreateCompany from "@/widgets/modals/auth/partners/createCompany/createCompany";

export type TModal =
  | "login"
  | "confirmEmail"
  | "register"
  | "chooseCompany"
  | "createCompany";

export default function PartnerAuth() {
  const [activeModal, setActiveModal] = useState<TModal>("login");

  return (
    <div className={styles.PartnerAuth}>
      <div className={styles.logo}>
        <Icons.Logo width={45} height={35} />
        <h1>Any Parts</h1>
        <span>Partners</span>
      </div>

      {activeModal === "login" && (
        <PartnerLoginModal onNext={() => setActiveModal("confirmEmail")} />
      )}

      {activeModal === "confirmEmail" && (
        <PartnerConfirmEmailModal
          onPrev={() => setActiveModal("login")}
          onNext={() => setActiveModal("register")}
        />
      )}

      {activeModal === "register" && (
        <PartnerRegisterModal
          onChangeEmail={() => setActiveModal("login")}
          onNext={() => setActiveModal("chooseCompany")}
        />
      )}

      {activeModal === "chooseCompany" && (
        <ChooseCompany
          onPrev={() => setActiveModal("register")}
          onNext={() => setActiveModal("createCompany")}
        />
      )}

      {activeModal === "createCompany" && (
        <CreateCompany onNext={() => setActiveModal("chooseCompany")} />
      )}
    </div>
  );
}
