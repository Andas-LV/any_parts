import styles from "./page.module.css"
import Menu from './menu'
import Image from 'next/image'

export default function Main() {
    return (
        <div className={styles.wrapper}>
            <Menu/>

            <div className={styles.actionCards}>
                <div className={styles.actionCard}>
                    <div className={styles.itemName}>
                        <h2>0 ₸</h2>
                        <p>Баланс</p>
                    </div>

                    <button className={styles.createWalletButton}>
                        <Image
                            className={styles.walletImg}
                            src={'/profile/APwallet.png'}
                            alt={'wallet'}
                            fill
                            sizes={'20px'}
                        />

                        <p>Открыть AP Кошелёк</p>
                    </button>
                </div>

                <div className={styles.actionCard}>
                    <div className={styles.itemName}>
                        <h2>Избранное</h2>
                        <p>0 товаров</p>
                    </div>

                    <button className={styles.favoriteButton}>
                        <Image
                            className={styles.likedImg}
                            src={'/profile/liked.png'}
                            alt={'liked'}
                            fill
                            sizes={'30px'}
                        />
                    </button>
                </div>

                <div className={styles.actionCard}>
                    <div className={styles.itemName}>
                        <h2>Покупки</h2>
                        <p>Пока пусто</p>
                    </div>

                    <button className={styles.bagButton}>
                        <Image
                            className={styles.bagImg}
                            src={'/profile/Bag.png'}
                            alt={'bag'}
                            fill
                            sizes={'30px'}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}