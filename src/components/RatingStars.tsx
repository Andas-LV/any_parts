import { Icons } from "@/assets/svg";

export default function RatingStars({ rating, width = 16, height = 16 }: { rating: number, width?: number, height?: number }) {
  const roundedRating = Math.round(rating * 2) / 2;

    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div>
            <div style={{ display: "flex", gap: "2px" }}>
                {Array(fullStars).fill(0).map((_, i) => (
                    <Icons.Star key={i} width={width} height={height} />
                ))}

                {hasHalfStar && <Icons.HalfStar width={width} height={height} />}

                {Array(emptyStars).fill(0).map((_, i) => (
                    <Icons.StarEmpty key={i + 5} width={width} height={height} />
                ))}
            </div>
        </div>
    );
}
