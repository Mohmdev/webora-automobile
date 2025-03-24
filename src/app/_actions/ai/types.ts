import type { GenerativeStreamProps } from '@/components/admin/classifieds/generative-stream'
import type { UserContent } from 'ai'
import type { StreamableValue } from 'ai/rsc'
import type { ReactNode } from 'react'

export type ServerMessage = {
  id?: number
  name?: string | undefined
  role: 'user' | 'assistant' | 'system'
  content: UserContent
}

export type ClientMessage = {
  id: number
  role: 'user' | 'assistant'
  display: ReactNode
  classified: StreamableValue<GenerativeStreamProps>
}
