import { openai } from '@/ai/openai'
import type { GenerativeStreamProps } from '@/components/admin/classifieds/generative-stream'
import { GenerativeStream } from '@/components/admin/classifieds/generative-stream'
import { ClassifiedDetailsAISchema } from '@/schemas/classified-ai.schema'
import { type CoreMessage, generateObject } from 'ai'
import type { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { createElement } from 'react'

/**
 * Processes detailed vehicle information from an image using AI
 *
 * This function:
 * 1. Sends the vehicle image to OpenAI for detailed analysis
 * 2. Extracts specific vehicle details like color, doors, seats, transmission, etc.
 * 3. Updates the classified data with the detailed information
 * 4. Updates both UI and value streams with the complete classified data
 *
 * This runs after taxonomy processing to add additional vehicle details
 * that complete the vehicle listing information.
 *
 * @param image - Base64 encoded image data of the vehicle
 * @param classified - Current classified data with taxonomy information
 * @param uiStream - Stream for UI updates
 * @param valueStream - Stream for the classified data value
 * @returns Updated classified data with all vehicle details
 */
export async function processDetails(
  image: string,
  classified: GenerativeStreamProps,
  uiStream: ReturnType<typeof createStreamableUI>,
  valueStream: ReturnType<typeof createStreamableValue<GenerativeStreamProps>>
): Promise<GenerativeStreamProps> {
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

  const updatedClassified = {
    ...classified,
    ...details,
  }

  uiStream.update(
    createElement(GenerativeStream, { done: true, ...updatedClassified })
  )
  valueStream.update(updatedClassified)

  return updatedClassified
}
