// import axios from 'axios'
// import { API_BASE } from './constants'

// const api = axios.create({ baseURL: API_BASE, timeout: 60000 })

// export interface GeneratePayload {
//   topic: string
//   tone: string
//   length: 'short' | 'medium' | 'long'
//   cinematicMode: boolean
// }

// export interface GenerateResult {
//   content: string
//   wordCount: number
//   readingTime: number
//   tone: string
//   topic: string
// }

// export interface BlogEntry {
//   _id: string
//   topic: string
//   tone: string
//   length: string
//   content: string
//   wordCount: number
//   readingTime: number
//   cinematicMode: boolean
//   createdAt: string
// }

// export async function generateContent(payload: GeneratePayload): Promise<GenerateResult> {
//   const { data } = await api.post('/generate', payload)
//   return data.data
// }

// export async function fetchHistory(page = 1, limit = 20): Promise<{ blogs: BlogEntry[]; total: number }> {
//   const { data } = await api.get(`/history?page=${page}&limit=${limit}`)
//   return data
// }

// export async function saveToHistory(payload: Omit<BlogEntry, '_id' | 'createdAt'>): Promise<BlogEntry> {
//   const { data } = await api.post('/history', payload)
//   return data.blog
// }

// export async function deleteFromHistory(id: string): Promise<void> {
//   await api.delete(`/history/${id}`)
// }


import axios from 'axios'
import { API_BASE } from './constants'

const api = axios.create({ baseURL: API_BASE, timeout: 60000 })

export interface GeneratePayload {
  topic: string
  tone: string
  length: 'short' | 'medium' | 'long'
  cinematicMode: boolean
  language: string
}

export interface GenerateResult {
  content: string
  wordCount: number
  readingTime: number
  tone: string
  topic: string
}

export interface BlogEntry {
  _id: string
  topic: string
  tone: string
  length: string
  content: string
  wordCount: number
  readingTime: number
  cinematicMode: boolean
  createdAt: string
}

export async function generateContent(payload: GeneratePayload): Promise<GenerateResult> {
  const { data } = await api.post('/generate', payload)
  return data.data
}

export async function fetchHistory(page = 1, limit = 20): Promise<{ blogs: BlogEntry[]; total: number }> {
  const { data } = await api.get(`/history?page=${page}&limit=${limit}`)
  return data
}

export async function saveToHistory(payload: Omit<BlogEntry, '_id' | 'createdAt'>): Promise<BlogEntry> {
  const { data } = await api.post('/history', payload)
  return data.blog
}

export async function deleteFromHistory(id: string): Promise<void> {
  await api.delete(`/history/${id}`)
}