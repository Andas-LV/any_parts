export type Item = {
    id: number,
    name: string,
    price: number,
    currentPrice: number | null,
    discount: number | null,
    rating: number,
    comments: number,
    images: string[],
}