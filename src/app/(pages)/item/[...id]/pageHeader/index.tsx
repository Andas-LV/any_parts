"use client"

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import { ChevronRight, Heart, Share2 } from 'lucide-react';
import styles from './pageHeader.module.css';

interface ItemHeader {
    label: string;
    href: string;
}

interface ItemHeaderProps {
    routes: ItemHeader[];
}

const ItemHeader: React.FC<ItemHeaderProps> = ({ routes }) => {
    const [isFixed, setIsFixed] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const tabsElement = document.getElementById('itemsTabs');
            const headerElement = document.querySelector('header');

            if (tabsElement && headerElement) {
                const headerHeight = headerElement.getBoundingClientRect().height;
                setHeaderHeight(headerHeight);

                const tabsTop = tabsElement.getBoundingClientRect().top;
                setIsFixed(tabsTop <= headerHeight);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`${styles.itemHeaderContainer} ${isFixed ? styles.fixed : ''}`}
            style={{
                position: isFixed ? 'fixed' : 'static',
                top: isFixed ? `${headerHeight}px` : 'auto',
                zIndex: 10
            }}
        >
            {routes.map((item, index) => (
                <React.Fragment key={item.href}>
                    {index > 0 && (
                        <ChevronRight
                            className={styles.separatorIcon}
                            size={16}
                            strokeWidth={1.5}
                        />
                    )}
                    <Link
                        href={item.href}
                        className={`${styles.itemHeaderLink} ${
                            index === routes.length - 1 ? styles.active : ''
                        }`}
                    >
                        {item.label}
                    </Link>
                </React.Fragment>
            ))}

            <div className={styles.actionButtons}>
                <button className={styles.favorite}>
                    <Heart
                        className={styles.favoriteIcon}
                        size={20}
                        strokeWidth={1.5}
                    />
                    В избранное
                </button>
                <button className={styles.share}>
                    <Share2
                        className={styles.shareIcon}
                        size={20}
                        strokeWidth={1.5}
                    />
                    Поделиться
                </button>
            </div>
        </div>
    );
};

export default ItemHeader;