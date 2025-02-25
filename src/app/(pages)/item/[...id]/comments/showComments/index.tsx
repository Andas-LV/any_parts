"use client"

import styles from './showComments.module.css';
import {CommentsSection} from "@/app/(pages)/item/[...id]/comments/showComments/leftSide";
import {PhotosSection} from "@/app/(pages)/item/[...id]/comments/showComments/photos";

export function ShowComments() {
    return (
        <div className={styles.wrapper}>
            <CommentsSection/>
            <PhotosSection/>
        </div>
    );
}