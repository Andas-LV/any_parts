"use client"

import { Icons } from "@/assets/svg";
import {useState} from "react";

interface ReviewStarsProps {
    initialRating?: number;
    width?: number;
    height?: number;
    gap?: number;
    onChange?: (rating: number) => void;
}

export default function ReviewStars({initialRating = 0, width = 16, height = 16, gap = 2, onChange,}: ReviewStarsProps) {
    const [rating, setRating] = useState(initialRating);

    const handleClick = (star: number) => {
        setRating(star);
        if (onChange) {
            onChange(star);
        }
    };

    return (
        <div style={{ display: "flex", gap: `${gap}px` }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <div
                    key={star}
                    onClick={() => handleClick(star)}
                    style={{ cursor: "pointer" }}
                >
                    {star <= rating ? (
                        <Icons.Star width={width} height={height} />
                    ) : (
                        <Icons.StarEmpty width={width} height={height} />
                    )}
                </div>
            ))}
        </div>
    );
}