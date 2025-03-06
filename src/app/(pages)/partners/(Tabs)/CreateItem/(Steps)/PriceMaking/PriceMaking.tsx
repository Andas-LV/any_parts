import React from "react";
import styles from "./PriceMaking.module.css";
import { Button } from "@components/ui/button";

interface PriceMakingProps {
  nextStep?: () => void;
  previousStep?: () => void;
}

export default function PriceMaking({
  nextStep,
  previousStep,
}: PriceMakingProps) {
  return (
    <div className={styles.PriceMaking}>
      <h1>PriceMaking component</h1>
      <Button onClick={previousStep}>Назад</Button>
      <Button onClick={nextStep}>Далее</Button>
    </div>
  );
}
