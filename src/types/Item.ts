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

export type ItemInfoType = {
    id: number,
    name: string,
    price: number,
    apPrice: number,
    currentPrice: number | null,
    discount: number | null,
    rating: number,
    comments: number,
    images: string[],

    marketName: string,
    article: number,
    sold: number | null,
    options: string[],
    type: string[]
    brand: string,
    material: string,
}