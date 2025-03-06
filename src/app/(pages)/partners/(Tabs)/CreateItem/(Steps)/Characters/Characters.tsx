import React from "react";
import styles from "./Characters.module.css";
import { Button } from "@components/ui/button";

interface CharactersProps {
  nextStep?: () => void;
  previousStep?: () => void;
}

export default function Characters({
  nextStep,
  previousStep,
}: CharactersProps) {
  return (
    <div className={styles.Characters}>
      <h1>Characters component</h1>

      <Button variant={"secondary"} onClick={previousStep}>
        Назад
      </Button>
      <Button onClick={nextStep}>Далее</Button>
    </div>
  );
}
