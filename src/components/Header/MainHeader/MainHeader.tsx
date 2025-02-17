"use client"

import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Search from "./Search/Search";
import styles from './mainHeader.module.css';
import LoginModal from "@/widgets/modals/auth/login";
import CategoryFilter from "@components/Header/MainHeader/Category/CategoryFilter";
import {useAuthStore} from "@/entities/auth/useAuthStore";
import { Icons } from '@/assets/svg';

const MainHeader = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { isAuthenticated } = useAuthStore();

    return (
        <div className={styles.container}>
            <Link href="/" className={styles.logo}>
                <Image
                    src="/logo.png"
                    alt="Any Parts Logo"
                    width={45}
                    height={35}
                />
                <h1>Any Parts</h1>
            </Link>

            <CategoryFilter/>

            <Search/>

            <nav className={styles.navigationSection}>
                {isAuthenticated ?
                    <Link href="/profile" className={styles.navItem}>
                        <Icons.User width={24} height={24} />
                        <span>Профиль</span>
                    </Link>
                    :
                    <div className={styles.navItem} onClick={() => setModalOpen(true)}>
                        <Icons.User width={24} height={24} />
                        <span>Войти</span>
                    </div>
                }

                <Link href="/" className={styles.navItem}>
                    <Image
                        src="/header/order.svg"
                        alt="Orders"
                        width={24}
                        height={24}
                    />
                    <span>Заказы</span>
                </Link>

                <Link href="/" className={styles.navItem}>
                    <Image
                        src="/header/favorite.svg"
                        alt="Favorites"
                        width={24}
                        height={24}
                    />
                    <span>Избранное</span>
                </Link>

                <Link href="/" className={styles.navItem}>
                    <Image
                        src="/header/basket.svg"
                        alt="Cart"
                        width={24}
                        height={24}
                    />
                    <span>Корзина</span>
                </Link>
            </nav>

            {isModalOpen && <LoginModal onClose={() => setModalOpen(false)} />}
        </div>
    );
};

export default MainHeader;