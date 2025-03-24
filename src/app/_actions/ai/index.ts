'use server'

import { createAI } from 'ai/rsc'
import { generateClassified } from './generate-classified'
import type { ClientMessage, ServerMessage } from './types'

export const AI = createAI({
  initialUIState: [] as ClientMessage[],
  initialAIState: [] as ServerMessage[],
  actions: {
    generateClassified,
  },
})
