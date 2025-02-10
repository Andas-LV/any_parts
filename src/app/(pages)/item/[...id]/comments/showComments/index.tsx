"use client"

import { ItemInfoType } from "@/types/Item";
import styles from './showComments.module.css';
import {CommentsSection} from "@/app/(pages)/item/[...id]/comments/showComments/leftSide";
import {PhotosSection} from "@/app/(pages)/item/[...id]/comments/showComments/photos";

export function ShowComments({ ...item }: ItemInfoType) {
    return (
        <div className={styles.wrapper}>
            <CommentsSection { ...item }/>
            <PhotosSection { ...item }/>
        </div>
    );
}