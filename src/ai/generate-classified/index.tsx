'use server'

import {
  GenerativeStream,
  type GenerativeStreamProps,
} from '@/components/admin/classifieds/generative-stream'
import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import type { ClientMessage } from '..'
import { processDetails } from './process-details'
import { processTaxonomy } from './process-taxonomy'

/**
 * Generates a classified vehicle listing using AI analysis of an image
 *
 * This server action coordinates the AI-powered vehicle classification process:
 * 1. Creates streamable UI and value components for real-time updates
 * 2. Processes the vehicle taxonomy (make, model, year) from the image
 * 3. Processes detailed vehicle information (color, doors, etc.) from the image
 * 4. Returns a complete classified listing with all vehicle information
 *
 * Used in the admin interface for quickly generating vehicle listings
 * from uploaded images with AI assistance.
 *
 * @param image - Base64 encoded image data of the vehicle
 * @returns A ClientMessage object containing the display, role and classified data
 */
export async function generateClassified(
  image: string
): Promise<ClientMessage | null> {
  const uiStream = createStreamableUI()
  const valueStream = createStreamableValue<GenerativeStreamProps>()

  let classified = { image } as GenerativeStreamProps

  uiStream.update(<GenerativeStream {...classified} />)

  async function processEvents() {
    // Process taxonomy data (make, model, year, etc.)
    classified = await processTaxonomy(image, classified, uiStream)

    // Process detailed vehicle information
    classified = await processDetails(image, classified, uiStream, valueStream)

    // Complete the streams
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
