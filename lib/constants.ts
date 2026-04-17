// export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api";

export const TONES = [
  'professional', 'Casual', 'Formal', 'Creative',
  'Humorous', 'Inspirational', 'Technical', 'Storytelling',
  'Cinematic', 'Academic',
]

export const LENGTHS = [
  { id: 'short', label: 'Short', words: '300w', icon: '⚡' },
  { id: 'medium', label: 'Medium', words: '600w', icon: '📝' },
  { id: 'long', label: 'Long', words: '1200w', icon: '📖' },
]

export const EXAMPLE_TOPICS = [
  'The Future of AI in Healthcare',
  'Space Exploration in 2030',
  'The Future of Remote Work',
  'Sustainable Energy Revolution',
  'Rise of AI-Powered Creativity',
]
