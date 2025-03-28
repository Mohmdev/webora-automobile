import { formatPrice } from '@/lib/utils'
import type { ClassifiedData } from '@/types'
import { getKeyClassifiedInfo } from '../classified/getKeyClassifiedInfo'

export function useRecordData(classified: ClassifiedData | undefined) {
  if (!classified) {
    return {
      formattedPrice: '0',
      classifiedInfo: [],
    }
  }

  const formattedPrice = formatPrice({
    price: classified.price,
    currency: classified.currency,
  })

  return {
    formattedPrice,
    classifiedInfo: getKeyClassifiedInfo(classified),
  }
}
