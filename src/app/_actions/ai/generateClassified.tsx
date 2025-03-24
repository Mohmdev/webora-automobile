'use server'

import {
  GenerativeStream,
  type GenerativeStreamProps,
} from '@/components/admin/classifieds/generative-stream'
import { env } from '@/env'
import { mapToTaxonomyOrCreate } from '@/lib/ai-utils'
import { prisma } from '@/lib/prisma'
import { createOpenAI } from '@ai-sdk/openai'
import { type CoreMessage, generateObject } from 'ai'
import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import type { z } from 'zod'
import {
  ClassifiedDetailsAISchema,
  ClassifiedTaxonomyAISchema,
} from '../../schemas/classified-ai.schema'
import type { ClientMessage } from './types'

const openai = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
  compatibility: 'strict',
})

export async function generateClassified(
  image: string
): Promise<ClientMessage | null> {
  const uiStream = createStreamableUI()
  const valueStream = createStreamableValue<GenerativeStreamProps>()

  let classified = { image } as GenerativeStreamProps

  uiStream.update(<GenerativeStream {...classified} />)

  async function processEvents() {
    await processTaxonomy()
    await processDetails()

    // Complete the streams
    uiStream.done()
    valueStream.done()
  }

  async function processTaxonomy() {
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

    generateTitle(taxonomy)
    await updateClassifiedWithTaxonomy(taxonomy)
    uiStream.update(<GenerativeStream {...classified} />)
  }

  function generateTitle(taxonomy: z.infer<typeof ClassifiedTaxonomyAISchema>) {
    const parts = getTitleParts(taxonomy)
    classified.title = parts.join(' ').trim()
  }

  function getTitleParts(taxonomy: z.infer<typeof ClassifiedTaxonomyAISchema>) {
    const parts: string[] = []

    // Add year if valid
    if (taxonomy.year && taxonomy.year > 0) {
      parts.push(taxonomy.year.toString())
    }

    // Add make if present
    if (taxonomy.make) {
      parts.push(taxonomy.make)
    }

    // Add model if present
    if (taxonomy.model) {
      parts.push(taxonomy.model)
    }

    // Add modelVariant if valid
    if (taxonomy.modelVariant && taxonomy.modelVariant !== '-') {
      parts.push(taxonomy.modelVariant)
    }

    return parts
  }

  async function updateClassifiedWithTaxonomy(
    taxonomy: z.infer<typeof ClassifiedTaxonomyAISchema>
  ) {
    const foundTaxonomy = await mapToTaxonomyOrCreate({
      year: taxonomy.year,
      make: taxonomy.make,
      model: taxonomy.model,
      modelVariant: taxonomy.modelVariant,
    })

    if (foundTaxonomy) {
      await updateWithFoundTaxonomy(foundTaxonomy)
    } else {
      await fallbackToUnknownTaxonomy()
    }
  }

  async function updateWithFoundTaxonomy(
    foundTaxonomy: NonNullable<
      Awaited<ReturnType<typeof mapToTaxonomyOrCreate>>
    >
  ) {
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
  }

  async function fallbackToUnknownTaxonomy() {
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

  async function processDetails() {
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

    uiStream.update(<GenerativeStream done={true} {...classified} />)
    valueStream.update(classified)
  }

  await processEvents()

  return {
    id: Date.now(),
    display: uiStream.value,
    role: 'assistant' as const,
    classified: valueStream.value,
  }
}
