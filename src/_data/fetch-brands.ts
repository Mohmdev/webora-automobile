import { prisma } from '@/lib/prisma'

/**
 * Fetches a curated list of premium vehicle brands
 *
 * This function retrieves a specific set of luxury and popular vehicle makes from the database.
 * Used in the brands slider component to showcase featured manufacturers on the website.
 * The brands are filtered case-insensitively by name to ensure consistent results.
 *
 * @returns {Promise<Array<import('@prisma/client').Make>>} A promise that resolves to an array of Make objects, each containing id, image, and name.
 */
export async function fetchBrands() {
  const brands = await prisma.make.findMany({
    where: {
      name: {
        in: [
          'Rolls-Royce',
          'Aston Martin',
          'Porsche',
          'Lamborghini',
          'Audi',
          'Jaguar',
          'Land Rover',
          'Mercedes-Benz',
          'Ferrari',
          'Bentley',
          'Toyota',
          'Ford',
          'Volkswagen',
          'Maserati',
          'Lexus',
          'Volvo',
          'Hyundai',
          'Kia',
          'Peugeot',
          'Renault',
          'Skoda',
        ],
        mode: 'insensitive',
      },
    },
  })

  return brands
}
