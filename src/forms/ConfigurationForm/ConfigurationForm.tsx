import React from "react";
import styles from "./ConfigurationForm.module.css";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TConfigurationSchema } from "@/types/CreateItem";
import { configurationSchema } from "@/schemas/createItem";
import { useCreateItemStore } from "@/entities/items/useCreateItemStore";
import { Button } from "@components/ui/button";

import ConfigCard from "@components/cards/ConfigCard/ConfigCard";
import { Plus } from "lucide-react";

interface ConfigurationFormProps {
  nextStep?: () => void;
  previousStep?: () => void;
}

export default function ConfigurationForm({
  nextStep,
  previousStep,
}: ConfigurationFormProps) {
  const { setConfig } = useCreateItemStore();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<TConfigurationSchema>({
    resolver: zodResolver(configurationSchema),
    defaultValues: {
      colors: [{ colorName: "" }],
      sizes: [{ sizeName: "" }],
    },
  });

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: "colors",
  });

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: "sizes",
  });

  const onFormSubmit = (data: TConfigurationSchema) => {
    console.log("Форма config отправлена:", data);
    setConfig(data);

    if (nextStep) {
      nextStep();
    }
  };

  const onError = (formErrors: any) => {
    console.log("Ошибки от zod:", formErrors);
  };

  return (
    <div className={styles.ConfigurationForm}>
      <form
        id="create-item-config"
        className={styles.form}
        onSubmit={handleSubmit(onFormSubmit, onError)}
      >
        <div className={styles.section}>
          <h3>Цвет</h3>

          {colorFields.map((field, index) => (
            <div key={field.id} className={styles.colorRow}>
              <ConfigCard
                config={`colors.${index}`}
                placeholder="Название цвета"
                register={register}
                setValue={setValue}
                removeCard={() => removeColor(index)}
              />
            </div>
          ))}

          {errors.colors && (
            <span className={styles.error}>{errors.colors.message}</span>
          )}

          <Button
            type="button"
            variant="secondary"
            className={styles.addBtn}
            onClick={() => appendColor({ colorName: "" })}
          >
            <Plus /> Добавить ещё
          </Button>
        </div>

        <div className={styles.section}>
          <h3>Размер</h3>

          {sizeFields.map((field, index) => (
            <div key={field.id} className={styles.sizeRow}>
              <ConfigCard
                config={`sizes.${index}`}
                placeholder="Размер товара"
                register={register}
                removeCard={() => removeSize(index)}
              />
            </div>
          ))}

          {errors.sizes && (
            <span className={styles.error}>{errors.sizes.message}</span>
          )}

          <Button
            type="button"
            variant="secondary"
            className={styles.addBtn}
            onClick={() => appendSize({ sizeName: "" })}
          >
            <Plus /> Добавить ещё
          </Button>
        </div>
      </form>

      <div className={styles.actions}>
        <Button variant="secondary" onClick={() => reset()}>
          Очистить
        </Button>
        <div className={styles.stepsButtons}>
          <Button variant={"secondary"} onClick={previousStep}>
            Назад
          </Button>
          <Button form={"create-item-config"} type="submit">
            Далее
          </Button>
        </div>
      </div>
    </div>
  );
}
