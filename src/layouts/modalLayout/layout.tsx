import React from "react";
import { Icons } from "@/assets/svg";
import styles from './layout.module.css';

interface ModalsLayoutProps {
    children: React.ReactNode;
    title: string;
    onClose: () => void;
    back?: () => void;
}

const ModalsLayout: React.FC<ModalsLayoutProps> = ({ children, title, onClose, back }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <Icons.Close className={styles.closeButton} onClick={onClose} />
                <div className={styles.titleWrapper}>
                    {back && <Icons.ArrowLeft className={styles.backButton} onClick={back} /> }
                    <h2>{title}</h2>
                </div>
                <div className={styles.children}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalsLayout;
