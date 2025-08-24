// pages/api/voting.ts
import type { NextApiRequest, NextApiResponse } from 'next'

interface Framework {
  id: string
  name: string
  avgRating: number
}

// Mock data - replace with real DB/API logic
let frameworks: Framework[] = [
  { id: '1', name: 'React', avgRating: 4.5 },
  { id: '2', name: 'Vue.js', avgRating: 4.2 },
  { id: '3', name: 'Angular', avgRating: 3.8 },
  { id: '4', name: 'Svelte', avgRating: 4.1 },
  { id: '5', name: 'Next.js', avgRating: 4.6 },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Framework | Framework[] | { error: string }>
) {
  if (req.method === 'GET') {
    // Return all frameworks
    res.status(200).json(frameworks)
  } else if (req.method === 'POST') {
    const { id, rating } = req.body as { id: string; rating: number }

    if (!id || rating === undefined) {
      return res.status(400).json({ error: 'ID and rating are required' })
    }

    const framework = frameworks.find(fw => fw.id === id)
    if (!framework) {
      return res.status(404).json({ error: 'Framework not found' })
    }

    // Simple average calculation (mock)
    framework.avgRating = parseFloat(
      ((framework.avgRating + rating) / 2).toFixed(1)
    )

    res.status(200).json(framework)
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
