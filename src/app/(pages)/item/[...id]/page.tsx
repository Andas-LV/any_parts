import styles from './itemPage.module.css';
import {itemInfo} from '@components/Items/exampleItems';
import HeaderWrapper from "@/providers/HeaderProvider";
import ItemHeader from "./pageHeader/index";
import MainContent from "./mainContent";
import Details from "./details";
import RecommendedCarousel from "@/components/Items/(Carousel)/Recommended";
import PurchasedCarousel from "@/components/Items/(Carousel)/Purchased";
import {Comments} from "@/app/(pages)/item/[...id]/comments";


export type paramsType = Promise<{ id: number }>;

export default async function ItemPage(props: { params: paramsType }) {
    const { id } = await props.params;
    const item = itemInfo[id - 1];

    const breadcrumbItems = [
        { label: 'Главная', href: '/' },
        { label: 'Транспорт', href: '/transport' },
        { label: 'Запчасти и аксессуары', href: '/transport/accessories' },
        { label: 'Аксессуары', href: '/transport/accessories/details' },
        { label: 'Для салона', href: '/transport/accessories/details/salon' }
    ];

    if (!item){
        return <div>Item not found</div>;
    }

    return (
        <div>
            <HeaderWrapper>
                <div className={styles.wrapper}>
                    <ItemHeader routes={breadcrumbItems}/>
                    <MainContent {...item} />
                    <RecommendedCarousel/>
                    <PurchasedCarousel/>
                    <Details {...item} />
                    <Comments {...item}/>
                </div>
            </HeaderWrapper>
        </div>
    );
}