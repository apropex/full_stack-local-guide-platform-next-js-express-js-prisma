import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingInputProps {
  value: number; // Current rating value
  onChange: (rating: number) => void; // Function to update the rating
  maxRating?: number; // Maximum number of stars (default: 5)
}

/**
 * A premium, luxury-designed star rating input component.
 * @param {StarRatingInputProps} props - Component properties.
 */
export default function StarRatingInput({
  value,
  onChange,
  maxRating = 5,
}: StarRatingInputProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const stars = Array.from({ length: maxRating }, (_, index) => index + 1);

  const currentRating = hoveredRating || value;

  return (
    <div className="flex space-x-1">
      {stars.map((starValue) => (
        <Star
          key={starValue}
          size={32}
          className={cn(
            "cursor-pointer transition-colors duration-200",
            // Highlight stars based on hover or current value
            starValue <= currentRating
              ? "fill-amber-400 text-amber-400" // Premium Gold/Amber color
              : "fill-gray-300/50 text-gray-400/50",
            // Optional: Add a subtle shadow on hover for a lift effect
            "hover:drop-shadow-lg",
          )}
          onClick={() => onChange(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
        />
      ))}
    </div>
  );
}
