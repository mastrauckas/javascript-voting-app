import React from "react"
import styled from "styled-components"
import Colors from "./Colors"
import Typography from "./Typography"

interface RatingProps {
  numberRating: number
  totalRating: number
  isStatic?: boolean
  onVote?: (rating: number) => void
}

interface PartialStarProps {
  partialStarPercent: number
}

interface StarProps {
  hasColorStar?: boolean
  isStatic?: boolean
  onClick?: () => void
}

// Partial star with gradient overlay
const PartialStar = styled.span<PartialStarProps>`
  display: inline-block;
  position: relative;
  font-size: ${Typography.cellItemTextSize};
  color: ${Colors.blackColor}; /* base black star */

  &::before {
    content: '★';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ partialStarPercent }) => partialStarPercent}%;
    overflow: hidden;
    color: ${Colors.goldColor};
  }
`

// Full star
const Star = styled.span<StarProps>`
  display: inline-block;
  font-size: ${Typography.cellItemTextSize};
  letter-spacing: 0.5rem;
  color: ${({ hasColorStar }) => (hasColorStar ? Colors.goldColor : Colors.blackColor)};
  transition: font-size 0.3s linear;

  ${({ hasColorStar, isStatic }) =>
    !hasColorStar &&
    !isStatic &&
    `
    &:hover {
      font-size: calc(${Typography.cellItemTextSize} + 0.5rem);
      cursor: pointer;
      color: ${Colors.goldColor};
    }
    &:hover ~ span {
      color: ${Colors.goldColor};
    }
  `}
`

export default function Rating({
  numberRating,
  totalRating,
  isStatic = true,
  onVote,
}: RatingProps) {
  const stars: React.ReactElement[] = []
  const fullStars = Math.floor(numberRating)
  const hasPartial = numberRating % 1 !== 0
  const partialPercent = Math.round((numberRating % 1) * 100)

  for (let i = 0; i < totalRating; i++) {
    if (i < fullStars) {
      stars.push(
        <Star key={i} hasColorStar>
          ★
        </Star>
      )
    } else if (i === fullStars && hasPartial) {
      stars.push(
        <PartialStar key={i} partialStarPercent={partialPercent}>
          ★
        </PartialStar>
      )
    } else {
      stars.push(
        <Star
          key={i}
          isStatic={isStatic}
          onClick={() => !isStatic && onVote?.(i + 1)}
        >
          ★
        </Star>
      )
    }
  }

  return <div>{stars}</div>
}
