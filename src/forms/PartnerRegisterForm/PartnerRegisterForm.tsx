import React from "react";
import styles from "./PartnerRegisterForm.module.css";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { countryCodes } from "@/constants/countryCodes";
import { organizationTypes, PartnerRegister } from "@/types/Auth";
import { Button } from "@components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerPartnerSchema } from "@/schemas/partners";
import { usePartnerAuthStore } from "@/entities/partners/auth/usePartnersAuthStore";

interface PartnerRegisterFormProps {
  onNext: () => void;
}

export default function PartnerRegisterForm({
  onNext,
}: PartnerRegisterFormProps) {
  const { email, isLoading } = usePartnerAuthStore();
  const {
    register,
    handleSubmit,
    control,
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
    <div className={styles.PartnerRegisterForm}>
      <form
        id="partner-register-form"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
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
          <Controller
            name="country"
            control={control}
            defaultValue={undefined}
            render={({ field: { onChange, value } }) => (
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger className={styles.nameInput}>
                  <SelectValue placeholder="Страна регистрации" />
                </SelectTrigger>
                <SelectContent className={styles.selectContent}>
                  {countryCodes.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <p>
          Поменять страну после регистрации не получится. Чтобы открыть магазин
          в другой стране, создайте новый аккаунт.
        </p>
        {errors.country && (
          <span className={styles.error}>{errors.country.message}</span>
        )}

        <div className={styles.selectWrapper}>
          <Controller
            name="organizationType"
            control={control}
            defaultValue={undefined}
            render={({ field: { onChange, value } }) => (
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger className={styles.nameInput}>
                  <SelectValue placeholder="Тип организации" />
                </SelectTrigger>
                <SelectContent className={styles.selectContent}>
                  {organizationTypes.map((org) => (
                    <SelectItem key={org.value} value={org.value}>
                      {org.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
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
    </div>
  );
}
