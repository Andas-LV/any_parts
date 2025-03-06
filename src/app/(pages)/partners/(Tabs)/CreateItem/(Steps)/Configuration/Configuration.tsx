import React from "react";
import styles from "./Configuration.module.css";
import { Button } from "@components/ui/button";

interface ConfigurationProps {
  nextStep?: () => void;
  previousStep?: () => void;
}

export default function Configuration({
  nextStep,
  previousStep,
}: ConfigurationProps) {
  return (
    <div className={styles.Configuration}>
      <h1>Configuration component</h1>
      <Button onClick={previousStep}>Назад</Button>
      <Button onClick={nextStep}>Далее</Button>
    </div>
  );
}
