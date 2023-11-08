export interface Review {
    _id: string,
    userId: string,
    stars: number;
    productId: string;
    like: boolean;
}