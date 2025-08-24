// components/Main.tsx
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Voting from './Voting'

type MainProps = {
  className?: string; // ✅ make optional
};

const FlexMain = styled.main`
  display: flex;
  justify-content: center;
  margin: 2rem;
`

export default function Main({ className }: MainProps) {
  const [frameworks, setFrameworks] = useState<any[]>([])

  const getApiUrl = () => {
    if (typeof window !== 'undefined') {
      const protocol = window.location.protocol
      const host = window.location.host
      return `${protocol}//${host}/api/voting`
    }
    return '/api/voting'
  }

  useEffect(() => {
    const fetchFrameworks = async () => {
      try {
        const response = await fetch(getApiUrl())
        const frameworksData = await response.json()
        setFrameworks(frameworksData)
      } catch (error) {
        console.error('Failed to fetch frameworks:', error)
      }
    }

    fetchFrameworks()
  }, [])

  const handleVote = async (id: string, rating: number) => {
    try {
      const response = await fetch(getApiUrl(), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, rating }),
      })

      const framework = await response.json()
      setFrameworks(prev =>
        prev.map(fw =>
          fw.id === id ? { ...fw, avgRating: framework.avgRating } : fw
        )
      )
    } catch (error) {
      console.error('Failed to submit vote:', error)
    }
  }

  return (
    <FlexMain className={className}>
      <Voting frameworks={frameworks} onVote={handleVote} />
    </FlexMain>
  )
}
