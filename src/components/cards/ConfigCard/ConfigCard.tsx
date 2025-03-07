import React, { useState } from "react";
import styles from "./ConfigCard.module.css";
import { Checkbox } from "@components/ui/checkbox";
import { UseFormRegister } from "react-hook-form";
import { TConfigurationSchema } from "@/types/CreateItem";
import { Icons } from "@/assets/svg";
import { Button } from "@components/ui/button";

type TBaseConfigPath = `colors.${number}` | `sizes.${number}`;
type ColorNamePath = `colors.${number}.colorName`;
type SizeNamePath = `sizes.${number}.sizeName`;
type TPhotoPath = `colors.${number}.photo`;

interface ConfigCardProps {
  config: TBaseConfigPath;
  placeholder: string;
  register: UseFormRegister<TConfigurationSchema>;
  removeCard?: () => void;
}

export default function ConfigCard({
  config,
  placeholder,
  register,
  removeCard,
}: ConfigCardProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isSelected, setIsSelected] = useState(true);

  const isColor = config.startsWith("colors");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.ConfigCard}>
      <Checkbox
        className={styles.checkbox}
        checked={isSelected}
        onCheckedChange={(checked) => setIsSelected(!!checked)}
      />

      <div className={styles.cardContent}>
        {isColor ? (
          <input
            type="text"
            placeholder={placeholder}
            className={styles.nameInput}
            {...register(`${config}.colorName` as ColorNamePath)}
          />
        ) : (
          <input
            type="text"
            placeholder={placeholder}
            className={styles.nameInput}
            {...register(`${config}.sizeName` as SizeNamePath)}
          />
        )}

        {isColor && (
          <>
            {preview ? (
              <div className={styles.uploadedImageBlock}>
                <img
                  src={preview}
                  alt="preview"
                  className={styles.uploadedMedia}
                />
                <Button
                  type="button"
                  variant={"link"}
                  className={styles.actionImageBtn}
                  onClick={() => setPreview(null)}
                >
                  Удалить фото
                </Button>
              </div>
            ) : (
              <Button
                variant={"link"}
                type="button"
                className={styles.actionImageBtn}
              >
                <label>
                  Загрузить фото
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className={styles.fileInput}
                    {...register(`${config}.photo` as TPhotoPath)}
                    onChange={handleFileChange}
                  />
                </label>
              </Button>
            )}
          </>
        )}
      </div>

      {removeCard && (
        <Button
          type="button"
          className={styles.deleteRowBtn}
          onClick={removeCard}
        >
          <Icons.BlackClose />
        </Button>
      )}
    </div>
  );
}
