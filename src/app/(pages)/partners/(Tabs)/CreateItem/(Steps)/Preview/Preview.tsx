import React from "react";
import styles from "./Preview.module.css";
import { Button } from "@components/ui/button";

interface PreviewProps {
  previousStep?: () => void;
}

export default function Preview({ previousStep }: PreviewProps) {
  return (
    <div className={styles.Preview}>
      <h1>Preview component</h1>
      <Button onClick={previousStep}>Назад</Button>
    </div>
  );
}
