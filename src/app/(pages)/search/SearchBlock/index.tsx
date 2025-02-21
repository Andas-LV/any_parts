"use client";

import React, { useState } from "react";
import { Button } from "@components/ui/button"; // ваш компонент кнопки
import styles from "./searchBlock.module.css";

export default function SearchBlock() {
    const [step, setStep] = useState(1);

    const [mark, setMark] = useState("");
    const [model, setModel] = useState("");
    const [generation, setGeneration] = useState("");

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            console.log("Поиск по:", { mark, model, generation });
        }
    };

    return (
        <div className={styles.wrapper}>
            <h2>Поиск запчастей для авто</h2>

            <div className={styles.inputRow}>
                {step >= 1 && (
                    <input
                        type="text"
                        placeholder="Марка"
                        value={mark}
                        onChange={(e) => setMark(e.target.value)}
                        className={styles.input}
                    />
                )}

                {step >= 2 && (
                    <input
                        type="text"
                        placeholder="Модель"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className={styles.input}
                    />
                )}

                {step >= 3 && (
                    <input
                        type="text"
                        placeholder="Поколение"
                        value={generation}
                        onChange={(e) => setGeneration(e.target.value)}
                        className={styles.input}
                    />
                )}
            </div>

            <Button onClick={handleNext} className={styles.button}>
                {step < 3 ? "Следующий шаг" : "Показать больше 1 тыс. объявлений"}
            </Button>
        </div>
    );
}
