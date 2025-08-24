// components/Rating.tsx
import React from "react"
import styled from "styled-components"
import Colors from "./Colors"
import Typography from "./Typography"

interface PartialStarProps {
  percent: number // use a short, simple name
}

const PartialStar = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "percent",
})<PartialStarProps>`
  font-size: ${Typography.cellItemTextSize};
  display: inline-block;
  position: relative;
  color: ${Colors.blackColor};

  &::before {
    content: "★";
    position: absolute;
    left: 0;
    top: 0;
    width: ${({ percent }) => percent}%;
    overflow: hidden;
    white-space: nowrap;
    color: ${Colors.goldColor};
  }
`

interface StarProps {
  filled?: boolean
  isStatic?: boolean
  onClick?: () => void
}

const Star = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "filled" && prop !== "isStatic",
})<StarProps>`
  font-size: ${Typography.cellItemTextSize};
  display: inline-block;
  color: ${({ filled }) => (filled ? Colors.goldColor : Colors.blackColor)};
  cursor: ${({ isStatic }) => (isStatic ? "default" : "pointer")};
  transition: transform 0.2s;
  &:hover {
    transform: ${({ isStatic }) => (isStatic ? "none" : "scale(1.2)")};
  }
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
  const stars: React.ReactElement[] = []

  for (let i = 0; i < totalRating; i++) {
    if (i < Math.floor(numberRating)) {
      stars.push(
        <Star key={i} filled isStatic={isStatic} onClick={() => !isStatic && onVote && onVote(i + 1)}>
          ★
        </Star>
      )
    } else if (i === Math.floor(numberRating) && numberRating % 1 !== 0) {
      const percent = (numberRating % 1) * 100
      stars.push(<PartialStar key={i} percent={percent}>★</PartialStar>)
    } else {
      stars.push(
        <Star key={i} isStatic={isStatic} onClick={() => !isStatic && onVote && onVote(i + 1)}>
          ★
        </Star>
      )
    }
  }

  return <div>{stars}</div>
}
