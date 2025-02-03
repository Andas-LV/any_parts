import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Search from "./Search/Search";
import styles from './mainHeader.module.css';

const MainHeader = () => {
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

            <Search/>

            <nav className={styles.navigationSection}>
                <Link href="/" className={styles.navItem}>
                    <Image
                        src="/header/user.svg"
                        alt="Login"
                        width={24}
                        height={24}
                    />
                    <span>Войти</span>
                </Link>

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
        </div>
    );
};

export default MainHeader;