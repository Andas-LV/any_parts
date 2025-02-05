import styles from './itemPage.module.css';
import { items } from '@components/Items/exampleItems';
import HeaderWrapper from "@/providers/HeaderProvider";

export default async function ItemPage({ params }: { params: { id: number } }) {
    const { id } = await params;
    const item = items[id - 1];

    if (!item){
        return <div>Item not found</div>;
    }

    return (
        <div className="container px-28">
            <HeaderWrapper>
                <div className={styles.wrapper}>
                    <h1>{item.name}</h1>
                    <p>{item.price}</p>
                </div>
            </HeaderWrapper>
        </div>
    );
}