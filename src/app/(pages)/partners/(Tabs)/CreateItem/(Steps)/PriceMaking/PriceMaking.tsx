import React, { useEffect } from "react";
import styles from "./PriceMaking.module.css";
import { Button } from "@components/ui/button";
import { useCreateItemStore } from "@/entities/items/useCreateItemStore";
import PriceMakingForm from "@/forms/PriceMakingForm/PriceMakingForm";

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
      <h1>Ценообразование</h1>
      <PriceMakingForm nextStep={nextStep} previousStep={previousStep} />
    </div>
  );
}
