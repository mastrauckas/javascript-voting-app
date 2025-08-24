// components/Rating.tsx
import React from "react"
import styled from "styled-components"
import Colors from "./Colors"
import Typography from "./Typography"

interface PartialStarProps {
  partialStarPercent: number
  hasColorStar?: boolean
}

// Filter out props that should not go to DOM
const PartialStar = styled.i.withConfig({
  shouldForwardProp: (prop) => prop !== "partialStarPercent" && prop !== "hasColorStar",
})<PartialStarProps>`
  letter-spacing: 0.5rem;
  font-style: normal;
  display: inline;
  font-size: ${Typography.cellItemTextSize};

  background: linear-gradient(
    to right,
    ${Colors.goldColor} 0%,
    ${Colors.goldColor} ${({ partialStarPercent }) => partialStarPercent}%,
    ${Colors.blackColor} ${({ partialStarPercent }) => partialStarPercent}%,
    ${Colors.blackColor} 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

interface StarProps {
  hasColorStar?: boolean
  isStatic?: boolean
  onClick?: () => void
}

// Filter out props for styling only
const Star = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "hasColorStar" && prop !== "isStatic",
})<StarProps>`
  letter-spacing: 0.5rem;
  display: inline-block;
  font-size: ${Typography.cellItemTextSize};
  transition: font-size 0.3s linear;
  color: ${({ hasColorStar }) => (hasColorStar ? Colors.goldColor : Colors.blackColor)};

  ${({ hasColorStar, isStatic }) =>
    !hasColorStar &&
    !isStatic &&
    `
    &:hover {
      font-size: calc(${Typography.cellItemTextSize} + 0.5rem);
      cursor: pointer;
    }

    &:hover,
    &:hover ~ span {
      color: ${Colors.goldColor};
    }
  `};
`

interface RatingProps {
  numberRating: number
  totalRating: number
  isStatic?: boolean
  onVote?: (rating: number) => void
}

export default function Rating({
  numberRating,
  totalRating,
  isStatic = true,
  onVote,
}: RatingProps) {
  const buildRating = (avgRating: number, totalRating: number): React.ReactElement[] => {
    const stars: React.ReactElement[] = []
    const hasPartial = avgRating % 1 !== 0
    const partialPercent = Math.round((avgRating % 1) * 100)

    for (let i = 0; i < totalRating; i++) {
      if (i < Math.floor(avgRating)) {
        stars.push(
          <Star hasColorStar key={i}>
            ★
          </Star>
        )
      } else if (i === Math.floor(avgRating) && hasPartial) {
        stars.push(
          <PartialStar
            hasColorStar
            key={i}
            partialStarPercent={partialPercent}
          >
            ★
          </PartialStar>
        )
      } else {
        stars.push(
          <Star
            key={i}
            isStatic={isStatic}
            onClick={() => !isStatic && onVote && onVote(i + 1)}
          >
            ★
          </Star>
        )
      }
    }

    return stars
  }

  return <div>{buildRating(numberRating, totalRating)}</div>
}
