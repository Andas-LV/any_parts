import React from "react";
import styles from "./createCompany.module.css";
import { countryCodes } from "@/constants/countryCodes";
import { Icons } from "@/assets/svg";
import { organizationTypes } from "@/types/Auth";
import { AddCompany } from "@/types/Company";
import { Button } from "@components/ui/button";
import PartnersModalLayout from "@/layouts/PartnersModalLayout/PartnersModalLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerCompanySchema } from "@/schemas/partners";
import { useCompanyStore } from "@/entities/partners/company/useCompanyStore";

interface CreateCompanyProps {
  onNext: () => void;
}

export default function CreateCompany({ onNext }: CreateCompanyProps) {
  const { addCompany, isLoading } = useCompanyStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCompany>({
    resolver: zodResolver(registerCompanySchema),
  });

  const onSubmit = async (data: AddCompany) => {
    try {
      // await addCompany(data);
      onNext();
      console.log("Registration data:", data);
    } catch (err) {
      console.error("Error registering:", err);
    }
  };

  return (
    <PartnersModalLayout title={"+ Новая компания"}>
      <p className={styles.instruction}>
        Для регистрации новой компании введите следующие данные
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
      </form>

      <Button
        className={styles.submitButton}
        type="submit"
        form="partner-register-form"
        disabled={isLoading}
      >
        Добавить
      </Button>
    </PartnersModalLayout>
  );
}
