'use server'

import { createAI } from 'ai/rsc'
import { generateClassified } from '../../app/_actions/ai/generate-classified'
import type { ClientMessage, ServerMessage } from '../../app/_actions/ai/types'

export const AiClient = createAI({
  initialUIState: [] as ClientMessage[],
  initialAIState: [] as ServerMessage[],
  actions: {
    generateClassified,
  },
})
