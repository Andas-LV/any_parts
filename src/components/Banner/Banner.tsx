import styles from './banner.module.css'
import {Button} from "@components/ui/button";
import Image from 'next/image'

export default function Banner() {
    return(
        <div className={styles.wrapper}>
            <div className={styles.titles}>
                <h1>Забота о машине – залог её долгой службы</h1>
                <p>Подберите детали и езжайте плавно</p>
                <Button className={styles.button}>
                    Купить сейчас
                </Button>
            </div>

            <div className={styles.cars}>
                <div className={styles.car}>
                    <Image
                        className={styles.bannerImage}
                        src={'/banner/red-car.png'}
                        alt={'banner-car'}
                        fill
                        sizes={'150px'}
                    />
                    <h3>Запчасти для <br/> машины</h3>
                </div>
                <div className={styles.car}>
                    <Image
                        className={styles.bannerImage}
                        src={'/banner/red-motorcycle.png'}
                        alt={'banner-car'}
                        fill
                        sizes={'150px'}
                    />
                    <h3>Запчасти для <br/> мотоцикла</h3>
                </div>
                <div className={styles.car}>
                    <Image
                        className={styles.bannerImage}
                        src={'/banner/red-atv.png'}
                        alt={'banner-car'}
                        fill
                        sizes={'150px'}
                    />
                    <h3>Запчасти для <br/> квадроциклов</h3>
                </div>
            </div>
        </div>
    )
}