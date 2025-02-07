import styles from './itemPage.module.css';
import { items } from '@components/Items/exampleItems';
import HeaderWrapper from "@/providers/HeaderProvider";
import ItemHeader from "./pageHeader/index";

export type paramsType = Promise<{ id: number }>;

export default async function ItemPage(props: { params: paramsType }) {
    const { id } = await props.params;
    const item = items[id - 1];

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
        <div className="container px-28">
            <HeaderWrapper>
                <div className={styles.wrapper}>
                    <ItemHeader routes={breadcrumbItems} />
                    <h1>{item.name}</h1>
                    <p>{item.price}</p>
                </div>
            </HeaderWrapper>
        </div>
    );
}