import { Icons } from "@/assets/svg";

export default function RatingStars({ rating }: { rating: number }) {
    const decimal = rating % 1;
    let roundedRating: number;

    if (decimal < 0.3) {
        roundedRating = Math.floor(rating);
    } else if (decimal >= 0.8) {
        roundedRating = Math.ceil(rating);
    } else {
        roundedRating = Math.floor(rating) + 0.5;
    }

    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div>
            <div style={{ display: "flex", gap: "2px" }}>
                {Array(fullStars).fill(0).map(
                    (_, i) => <Icons.StarEmpty key={i} filled width={16} height={16}/>
                )}

                {hasHalfStar &&
                    <Icons.StarEmpty halfFilled width={16} height={16}/>
                }

                {Array(emptyStars).fill(0).map(
                    (_, i) => <Icons.StarEmpty key={i + 5} width={16} height={16}/>
                )}
            </div>
        </div>
    );
}