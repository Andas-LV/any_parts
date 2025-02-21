import styles from "./createFeedBack.module.css";
import { Button } from "@components/ui/button";
import ModalsLayout from "@/layouts/modalLayout/layout";
import React, { useState } from "react";
import { useItemsStore } from "@/entities/items/useItemsStore";
import { useToast } from "@/hooks/use-toast";
import Loading from "@components/Loading";
import { Textarea } from "@components/ui/textarea";
import { Icons } from "@/assets/svg";
import ReviewStars from "@components/stars/ReviewStars";

interface FeedbackProps {
    onClose: () => void;
    itemId: number;
    feedbackType: "Новый" | "Дополнительный";
}

export default function CreateFeedback({ onClose, itemId, feedbackType }: FeedbackProps) {
    const { currentItem, isLoading } = useItemsStore();
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const { toast } = useToast();

    if (!currentItem) {
        return <Loading />;
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            if (uploadedFiles.length + filesArray.length > 10) {
                alert("Можно загрузить максимум 10 фото.");
                return;
            }
            setUploadedFiles((prev) => [...prev, ...filesArray]);
        }
    };

    const removePhoto = (index: number) => {
        setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    };

    const submitFeedback = async () => {
        try {
            if (feedbackType === "Новый"){
                // await createFeedback(itemId);
            } else {
                // await additionalFeedback(itemId);
            }

            console.log({
                description,
                rating,
                uploadedFiles,
            });
            toast({
                done: true,
                variant: "deleted",
                description: `Ваш ${feedbackType} отзыв опубликован`,
            });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ModalsLayout title={`${feedbackType} отзыв`} onClose={onClose}>
            <div className={styles.feedbackModelWrapper}>
                {/* Item Details */}
                <div className={styles.itemCard}>
                    <img src={currentItem.images[0]} alt={currentItem.name} className={styles.itemImage} />
                    <div className={styles.itemInfo}>
                        <div className={styles.itemNamePrice}>
                            <span>{currentItem.marketName} / {currentItem.name}</span>
                            <span className={styles.itemPrice}>{currentItem.price.toLocaleString("ru-RU")} ₸</span>
                        </div>
                        <span>Order configuration</span>
                    </div>
                </div>

                <div className={styles.contentScrollSection}>
                    <ReviewStars
                        initialRating={rating}
                        width={30}
                        height={30}
                        onChange={(value) => setRating(value)}
                    />

                    {/* Review Section */}
                    <div className={styles.section}>
                        <h3>Как вам товар?</h3>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={styles.textarea}
                            placeholder="Что понравилось? Что могло быть лучше?"
                        />
                    </div>

                    <div className={styles.section}>
                        <h3>Фото отчёт</h3>
                        <p className={styles.photoDescription}>
                            Добавьте до 10 фото, так отзыв станет нагляднее и полезнее
                        </p>

                        <div
                            className={styles.photoGrid}
                            style={{
                                gridTemplateColumns:
                                    uploadedFiles.length > 0 ? "repeat(4, 1fr)" : "1fr",
                            }}
                        >
                            {uploadedFiles.map((file, index) => (
                                <div key={index} className={styles.uploadedWrapper}>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="preview"
                                        className={styles.uploadedMedia}
                                    />
                                    <button
                                        type="button"
                                        className={styles.deletePhotoBtn}
                                        onClick={() => removePhoto(index)}
                                    >
                                        <Icons.BlackClose />
                                    </button>
                                </div>
                            ))}

                            {uploadedFiles.length < 10 && (
                                <label className={styles.photoUpload}>
                                    <Icons.CameraPlus width={40} height={40} />
                                    <span>Загрузить фото</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className={styles.fileInput}
                                        onChange={handleFileUpload}
                                        multiple
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.actionButtons}>
                    <Button variant="secondary" className={styles.cancelBtn} onClick={onClose} disabled={isLoading}>
                        Отменить
                    </Button>

                    <Button className={styles.submitButton} onClick={submitFeedback} disabled={isLoading}>
                        Опубликовать
                    </Button>
                </div>
            </div>
        </ModalsLayout>
    );
}
