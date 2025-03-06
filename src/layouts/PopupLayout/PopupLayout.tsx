import React from "react";
import styles from "./PopupLayout.module.css";
import { Icons } from "@/assets/svg";

interface PopupLayoutProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

export default function PopupLayout({
  children,
  title,
  onClose,
}: PopupLayoutProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Icons.Close className={styles.closeButton} onClick={onClose} />
        <div className={styles.titleWrapper}>
          <h2>{title}</h2>
        </div>
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
}
