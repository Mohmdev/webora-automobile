import { formatPrice } from '@/lib/utils'
import type { ClassifiedWithImages } from '@/types'
import { getKeyClassifiedInfo } from '../classified/getKeyClassifiedInfo'

export function useRecordData(classified: ClassifiedWithImages) {
  const formattedPrice = formatPrice({
    price: classified.price,
    currency: classified.currency,
  })

  return {
    formattedPrice,
    classifiedInfo: getKeyClassifiedInfo(classified),
  }
}
