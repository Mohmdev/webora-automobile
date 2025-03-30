import { formatPrice } from '@/lib/utils'
import type { ClassifiedData } from '@/types'
import { getKeyClassifiedInfo } from '../classified/getKeyClassifiedInfo'

export function useRecordData(record: ClassifiedData | undefined) {
  if (!record) {
    return {
      formattedPrice: '0',
      recordInfo: [],
    }
  }

  const formattedPrice = formatPrice({
    price: record.price,
    currency: record.currency,
  })

  return {
    formattedPrice,
    recordInfo: getKeyClassifiedInfo(record),
  }
}
