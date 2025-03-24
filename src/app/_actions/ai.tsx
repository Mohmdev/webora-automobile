'use server'

import {
  StreamableSkeleton,
  type StreamableSkeletonProps,
} from '@/components/admin/classifieds/streamable-skeleton'
import { env } from '@/env'
import { mapToTaxonomyOrCreate } from '@/lib/ai-utils'
import { prisma } from '@/lib/prisma'
import { createOpenAI } from '@ai-sdk/openai'
import { type CoreMessage, type UserContent, generateObject } from 'ai'
import {
  type StreamableValue,
  createAI,
  createStreamableUI,
  createStreamableValue,
} from 'ai/rsc'
import type { ReactNode } from 'react'
import {
  ClassifiedDetailsAISchema,
  ClassifiedTaxonomyAISchema,
} from '../schemas/classified-ai.schema'

const openai = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
  compatibility: 'strict',
})

export async function generateClassified(
  image: string
): Promise<ClientMessage | null> {
  const uiStream = createStreamableUI()
  const valueStream = createStreamableValue<StreamableSkeletonProps>()

  let classified = { image } as StreamableSkeletonProps

  uiStream.update(<StreamableSkeleton {...classified} />)

  async function processEvents() {
    const { object: taxonomy } = await generateObject({
      model: openai('gpt-4o-mini-2024-07-18', { structuredOutputs: true }),
      schema: ClassifiedTaxonomyAISchema,
      system:
        'You are an expert at analysing images of vehicles and responding with a structured JSON object based on the schema provided',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', image },
            {
              type: 'text',
              text: 'You are tasked with returning the structured data for the vehicle in the image attached.',
            },
          ],
        },
      ] as CoreMessage[],
    })

    const year = taxonomy.year ? taxonomy.year : null
    const make = taxonomy.make ? taxonomy.make : null
    const model = taxonomy.model ? taxonomy.model : null
    const modelVariant = taxonomy.modelVariant ? taxonomy.modelVariant : null

    // Create a filtered array of title parts, excluding null/undefined/empty values and invalid year (-1)
    const titleParts = [
      year && year > 0 ? year.toString() : null,
      make || null,
      model || null,
      // Filter out '-' values from modelVariant
      modelVariant && modelVariant !== '-' ? modelVariant : null,
    ].filter((part) => part && part.trim().length > 0)

    // Join the valid parts with spaces
    classified.title = titleParts.join(' ').trim()

    const foundTaxonomy = await mapToTaxonomyOrCreate({
      year: taxonomy.year,
      make: taxonomy.make,
      model: taxonomy.model,
      modelVariant: taxonomy.modelVariant,
    })

    if (foundTaxonomy) {
      const make = await prisma.make.findUnique({
        where: { id: foundTaxonomy.makeId },
      })

      if (make) {
        classified = {
          ...classified,
          ...foundTaxonomy,
          make,
          makeId: make.id,
        }
      }
    } else {
      // If we couldn't map to a taxonomy, try to find UNKNOWN entries as fallback
      try {
        const unknownMake = await prisma.make.findFirst({
          where: { name: 'UNKNOWN' },
        })

        if (unknownMake) {
          const unknownModel = await prisma.model.findFirst({
            where: {
              makeId: unknownMake.id,
              name: 'UNKNOWN',
            },
          })

          if (unknownModel) {
            // Just update the make/model parts of classified
            classified.make = unknownMake
            classified.makeId = unknownMake.id
            classified.modelId = unknownModel.id
          }
        }
      } catch (_error) {
        // console.error('Error finding UNKNOWN make/model:', error)
      }
    }

    uiStream.update(<StreamableSkeleton {...classified} />)

    const { object: details } = await generateObject({
      model: openai('gpt-4o-mini-2024-07-18', { structuredOutputs: true }),
      schema: ClassifiedDetailsAISchema,
      system:
        'You are an expert at writing vehicle descriptions and generating structured data',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', image },
            {
              type: 'text',
              text: `Based on the image provided, you are tasked with determining the odometer reading, doors, seats, ULEZ compliance, transmission, colour, fuel type, body type, drive type, VRM and any addition details in the schema provided for the ${classified.title}. You must be accurate when determining the values for these properties even if the image is not clear.`,
            },
          ],
        },
      ] as CoreMessage[],
    })

    classified = {
      ...classified,
      ...details,
    }

    uiStream.update(<StreamableSkeleton done={true} {...classified} />)
    valueStream.update(classified)
    uiStream.done()
    valueStream.done()
  }

  await processEvents()

  return {
    id: Date.now(),
    display: uiStream.value,
    role: 'assistant' as const,
    classified: valueStream.value,
  }
}

type ServerMessage = {
  id?: number
  name?: string | undefined
  role: 'user' | 'assistant' | 'system'
  content: UserContent
}

export type ClientMessage = {
  id: number
  role: 'user' | 'assistant'
  display: ReactNode
  classified: StreamableValue<StreamableSkeletonProps>
}

export const AI = createAI({
  initialUIState: [] as ClientMessage[],
  initialAIState: [] as ServerMessage[],
  actions: {
    generateClassified,
  },
})
