"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerPartnerSchema } from "@/schemas/partners";
import styles from "./register.module.css";
import { Button } from "@components/ui/button";
import PartnersModalLayout from "@/layouts/PartnersModalLayout/PartnersModalLayout";
import { PartnerRegister, organizationTypes } from "@/types/Auth";
import { usePartnerAuthStore } from "@/entities/partners/auth/usePartnersAuthStore";
import { countryCodes } from "@/constants/countryCodes";
import { Icons } from "@/assets/svg";

interface PartnerRegisterModalProps {
  onChangeEmail: () => void;
  onNext: () => void;
}

const PartnerRegisterModal = ({
  onChangeEmail,
  onNext,
}: PartnerRegisterModalProps) => {
  const { email, isLoading } = usePartnerAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerRegister>({
    resolver: zodResolver(registerPartnerSchema),
  });

  const onSubmit = async (data: PartnerRegister) => {
    if (!email) return;
    try {
      // await partnerRegister(data);
      onNext();
      console.log("Registration data:", data);
    } catch (err) {
      console.error("Error registering:", err);
    }
  };

  return (
    <PartnersModalLayout title={"Регистрация"}>
      <p className={styles.instruction}>
        Мы не нашли аккаунт, зарегистрированный на почту <br />
        <span className={styles.email}>{email}</span>
        <button
          type="button"
          className={styles.changeNumberBtn}
          onClick={onChangeEmail}
        >
          Изменить
        </button>
      </p>

      <p className={styles.instruction}>
        Чтобы создать новый аккаунт, заполните форму и нажмите <br />
        кнопку «Зарегистрироваться»
      </p>

      <form
        id="partner-register-form"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.scrollableContent}
      >
        <input
          type="text"
          placeholder="Название магазина"
          className={styles.nameInput}
          {...register("marketName")}
        />
        {errors.marketName && (
          <span className={styles.error}>{errors.marketName.message}</span>
        )}

        <div className={styles.selectWrapper}>
          <select className={styles.nameInput} {...register("country")}>
            <option>Страна регистрации</option>
            {countryCodes.map((country) => (
              <option key={country.value} value={country.value}>
                {country.name}
              </option>
            ))}
          </select>
          <div className={styles.selectArrow}>
            <Icons.ArrowDown />
          </div>
        </div>
        <p>
          Поменять страну после регистрации не получится. Чтобы открыть магазин
          в другой стране, создайте новый аккаунт.
        </p>
        {errors.country && (
          <span className={styles.error}>{errors.country.message}</span>
        )}

        <div className={styles.selectWrapper}>
          <select
            className={styles.nameInput}
            {...register("organizationType")}
          >
            <option>Тип организации</option>
            {organizationTypes.map((org) => (
              <option key={org.value} value={org.value}>
                {org.label}
              </option>
            ))}
          </select>
          <div className={styles.selectArrow}>
            <Icons.ArrowDown />
          </div>
        </div>
        {errors.organizationType && (
          <span className={styles.error}>
            {errors.organizationType.message}
          </span>
        )}

        <input
          type="text"
          placeholder="Контактный номер телефона"
          className={styles.nameInput}
          {...register("contactNumber")}
        />
        {errors.contactNumber && (
          <span className={styles.error}>{errors.contactNumber.message}</span>
        )}
      </form>

      <Button
        className={styles.submitButton}
        type="submit"
        form="partner-register-form"
        disabled={isLoading}
      >
        Зарегистрироваться
      </Button>
    </PartnersModalLayout>
  );
};

export default PartnerRegisterModal;
