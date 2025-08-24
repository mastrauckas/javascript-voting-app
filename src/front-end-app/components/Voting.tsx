// components/Voting.tsx
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Colors from "./Colors"
import Rating from "./Rating"

export interface Framework {
  id: string
  name: string
  avgRating: number
}

interface VotingProps {
  frameworks: Framework[]
  onVote?: (id: string, rating: number) => void
}

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
`

interface TrProps {
  even?: boolean
}

const Tr = styled.tr<TrProps>`
  color: ${Colors.blackColor};
  height: 4rem;
  background-color: ${({ even }) =>
    even
      ? Colors.secondPrimaryColor70PercentLighter
      : Colors.secondPrimaryColor90PercentLighter};
`

const Thead = styled.thead`
  background-color: ${Colors.secondPrimaryColor};
  color: ${Colors.whiteColor};
`

const Th = styled.th`
  width: 33%;
  padding: 0.5rem 0 0.5rem 0.5rem;
  border: 2px solid ${Colors.primaryColor};
  text-align: left;
  font-size: 1.4rem;
`

const Td = styled.td`
  width: 33%;
  padding: 1rem 0 0.2rem 1rem;
  font-size: 1.2rem;
`

export default function Voting({ frameworks: initialFrameworks, onVote }: VotingProps) {
  const [frameworks, setFrameworks] = useState<Framework[]>(initialFrameworks)

  // Optional: fetch updated frameworks from API
  useEffect(() => {
    const fetchFrameworks = async () => {
      try {
        const res = await fetch("/api/voting")
        const data: Framework[] = await res.json()
        setFrameworks(data)
      } catch (err) {
        console.error("Failed to fetch frameworks:", err)
      }
    }
    fetchFrameworks()
  }, [])

  const handleVote = async (id: string, rating: number) => {
    try {
      const res = await fetch("/api/voting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, rating }),
      })
      const updatedFramework: Framework = await res.json()
      setFrameworks(prev =>
        prev.map(fw => (fw.id === id ? updatedFramework : fw))
      )
      if (onVote) onVote(id, rating)
    } catch (err) {
      console.error("Failed to submit vote:", err)
    }
  }

  let isOdd = true

  return (
    <Table>
      <Thead>
        <tr>
          <Th>JavaScript Library</Th>
          <Th>Rate</Th>
          <Th>Average Rating</Th>
        </tr>
      </Thead>
      <tbody>
        {frameworks.map(fw => {
          isOdd = !isOdd
          return (
            <Tr key={fw.id} even={!isOdd}>
              <Td>{fw.name}</Td>
              <Td>
                <Rating
                  numberRating={0}
                  totalRating={5}
                  isStatic={false}
                  onVote={starRating => handleVote(fw.id, starRating)}
                />
              </Td>
              <Td>
                <Rating
                  numberRating={fw.avgRating}
                  totalRating={5}
                  isStatic={true}
                />
              </Td>
            </Tr>
          )
        })}
      </tbody>
    </Table>
  )
}
