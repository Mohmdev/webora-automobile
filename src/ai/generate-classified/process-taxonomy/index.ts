import { openai } from '@/ai/openai'
import type { GenerativeStreamProps } from '@/components/admin/classifieds/generative-stream'
import { GenerativeStream } from '@/components/admin/classifieds/generative-stream'
import { ClassifiedTaxonomyAISchema } from '@/schemas/classified-ai.schema'
import { type CoreMessage, generateObject } from 'ai'
import type { createStreamableUI } from 'ai/rsc'
import { createElement } from 'react'
import { generateClassifiedTitleWithTaxonomy } from './generate-classified-title-with-taxonomy'
import { updateClassifiedWithTaxonomy } from './update-classified-with-taxonomy'

/**
 * Processes the vehicle taxonomy from an image using AI
 *
 * This function:
 * 1. Sends the vehicle image to OpenAI for taxonomy analysis (year, make, model, variant)
 * 2. Generates a title for the vehicle based on the taxonomy data
 * 3. Updates the classified data with the taxonomy information from the database
 * 4. Updates the UI stream with the latest information
 *
 * Part of the vehicle classification workflow, responsible for identifying
 * the basic vehicle information and connecting it to existing taxonomy records.
 *
 * @param image - Base64 encoded image data of the vehicle
 * @param classified - Current classified data object
 * @param uiStream - Stream for UI updates
 * @returns Updated classified data with taxonomy information
 */
export async function processTaxonomy(
  image: string,
  classified: GenerativeStreamProps,
  uiStream: ReturnType<typeof createStreamableUI>
): Promise<GenerativeStreamProps> {
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

  // Update the title
  const updatedClassified = {
    ...classified,
    title: generateClassifiedTitleWithTaxonomy(taxonomy, classified),
  }

  // Update with taxonomy data
  const processedClassifiedTaxonomy = await updateClassifiedWithTaxonomy(
    taxonomy,
    updatedClassified
  )

  // Update the UI stream
  uiStream.update(createElement(GenerativeStream, processedClassifiedTaxonomy))

  return processedClassifiedTaxonomy
}
