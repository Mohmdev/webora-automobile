# AI Vehicle Classification System

This directory contains a modular, AI-powered system for generating classified vehicle listings from images. The system analyzes vehicle images using OpenAI's vision capabilities to extract taxonomy information (make, model, year) and detailed vehicle specifications.

## Architecture

The system follows a modular architecture with clear separation of concerns:

```
generate-classified/
├── index.tsx                    # Main entry point
├── process-taxonomy/            # Handling vehicle taxonomy extraction
│   ├── index.ts                 # Taxonomy processing coordinator
│   ├── generate-classified-title-with-taxonomy/
│   │   └── index.ts             # Title generation from taxonomy data
│   └── update-classified-with-taxonomy/
│       ├── index.ts             # Taxonomy database update coordinator
│       ├── find-or-create-taxonomy.ts   # Database taxonomy matching/creation
│       ├── update-with-found-taxonomy.ts # Updating with found taxonomy
│       └── fallback-to-unknown-taxonomy.ts # Handling unknown vehicles
└── process-details/
    └── index.ts                 # Detailed vehicle information extraction
```

## Process Flow

1. **Image Submission**: The process begins when an image is submitted to the `generateClassified` function.
2. **Stream Initialization**: Streamable UI and value instances are created to provide real-time feedback.
3. **Taxonomy Processing**:
   - The image is analyzed by OpenAI to extract make, model, year, and variant.
   - A title is generated from the extracted taxonomy data.
   - The system attempts to match or create corresponding taxonomy records in the database.
   - If matching fails, the system falls back to using "UNKNOWN" taxonomy records.
4. **Details Processing**:
   - The image is analyzed again to extract detailed vehicle information.
   - Details include color, doors, seats, transmission, fuel type, etc.
5. **Stream Completion**: All UI and value streams are finalized.
6. **Result Return**: A complete `ClientMessage` object with all vehicle data is returned.

## Key Components

### Main Coordinator (`index.tsx`)
The entry point that orchestrates the overall classification process, managing streams and coordinating the taxonomy and details processing.

### Taxonomy Processing (`process-taxonomy/`)
Handles the extraction and database integration of vehicle taxonomy information:
- Extracts basic vehicle information (make, model, year, variant)
- Generates standardized vehicle titles
- Maps AI-detected information to database taxonomy records
- Provides fallback mechanisms for unknown vehicles

### Details Processing (`process-details/`)
Extracts detailed vehicle specifications:
- Analyzes the image for physical and technical attributes
- Determines vehicle features like color, doors, seats, transmission
- Updates the classified data with complete vehicle details

## Usage

```typescript
import { generateClassified } from '@/ai/generate-classified';

// Base64-encoded image data
const imageData = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAA...";

// Generate a classified listing
const result = await generateClassified(imageData);

// The result contains a complete ClientMessage with:
// - UI display elements with real-time updates
// - Complete vehicle information (taxonomy and details)
// - Ready-to-use classified listing data
```

## Implementation Notes

1. **AI Models**: The system uses OpenAI's `gpt-4o-mini-2024-07-18` model with structured outputs for both taxonomy and details extraction.

2. **Error Handling**: The system includes robust error handling with fallback mechanisms to ensure that even if AI detection or database operations fail, a usable vehicle listing can still be created.

3. **Database Integration**: The system intelligently integrates with the database, attempting to match detected taxonomy to existing records before creating new ones, maintaining data consistency.

4. **Stream-Based UI**: Real-time feedback is provided through streamable UI components, allowing for progressive display of the classification process.

5. **Type Safety**: The entire system is built with TypeScript and uses Zod schemas for validation, ensuring type safety throughout.

## Extending the System

To extend or modify the classification system:

1. **Add New Vehicle Attributes**: Extend the `ClassifiedDetailsAISchema` to include additional vehicle attributes.

2. **Improve AI Prompts**: Enhance AI detection by refining the system and user prompts in the `generateObject` calls.

3. **Add Processing Steps**: New processing steps can be added by creating new modules and integrating them in the main `processEvents` function.

4. **Custom Taxonomy Handling**: The taxonomy matching and creation logic can be modified in `find-or-create-taxonomy.ts` to accommodate special cases or different database structures.
