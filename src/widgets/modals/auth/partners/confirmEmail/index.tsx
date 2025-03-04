"use client";

import React, { useState } from "react";
import styles from "./confirmEmail.module.css";
import { Button } from "@components/ui/button";
import { usePartnerAuthStore } from "@/entities/partners/auth/usePartnersAuthStore";
import { renderError } from "@/utils/renderError";
import Timer, { useTimer } from "@/hooks/useTimer";
import { formatTime } from "@/utils/formatTime";
import PartnersModalLayout from "@/layouts/PartnersModalLayout/PartnersModalLayout";

interface PartnerConfirmEmailModalProps {
  onPrev: () => void;
  onNext: () => void;
}

const PartnerConfirmEmailModal = ({
  onPrev,
  onNext,
}: PartnerConfirmEmailModalProps) => {
  const { email, isLoading, error } = usePartnerAuthStore();
  const [code, setCode] = useState("");
  const [canResend, setCanResend] = useState(false);
  const { reset: resetTimer } = useTimer(120, () => setCanResend(true));

  const handleResend = () => {
    setCanResend(false);
    resetTimer();
    // Add your resend logic here
  };

  const handleSubmit = async () => {
    // await confirmEmail(code);
    onNext();
  };

  return (
    <PartnersModalLayout title={"Подтвердите почту"}>
      <p className={styles.instruction}>
        Укажите проверочный код - он придёт на <span>{email}</span> <br />в
        течение 2 минут.
      </p>

      <input
        type="text"
        className={styles.codeInput}
        placeholder="Код из смс"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      {!canResend ? (
        <Timer
          initialTime={120}
          onComplete={() => setCanResend(true)}
          render={(timeLeft) => (
            <p className={styles.timerText}>
              Получить новый код можно через {formatTime(timeLeft)}
            </p>
          )}
        />
      ) : (
        <button className={styles.resendButton} onClick={handleResend}>
          Отправить код заново
        </button>
      )}

      {renderError(error, "code")}

      <div className={styles.buttonGroup}>
        <Button
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Подтвердить
        </Button>

        <Button
          variant="ghost"
          className={styles.changeEmailButton}
          onClick={onPrev}
          disabled={isLoading}
        >
          Изменить почту
        </Button>
      </div>
    </PartnersModalLayout>
  );
};

export default PartnerConfirmEmailModal;
