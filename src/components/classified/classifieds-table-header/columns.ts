import type { ClassifiedKeys } from '@/types'

export interface ColumnConfig {
  key: ClassifiedKeys
  title: string
  width?: string
  hiddenOnMobile?: boolean
  isImage?: boolean
}

export const columns: ColumnConfig[] = [
  {
    key: 'id',
    title: 'ID',
    width: 'w-[80px]',
  },
  {
    key: 'title', // Using title as key for image column since it's not sortable
    title: 'Image',
    width: 'w-[80px]',
    isImage: true,
  },
  {
    key: 'title',
    title: 'Title',
    width: 'w-[150px]',
  },
  {
    key: 'price',
    title: 'Price',
    width: 'w-[150px]',
  },
  {
    key: 'vrm',
    title: 'VRM',
    width: 'w-[150px]',
  },
  {
    key: 'colour',
    title: 'Colour',
    width: 'w-[150px]',
  },
  {
    key: 'status',
    title: 'Status',
  },
  {
    key: 'createdAt',
    title: 'Date Created',
    hiddenOnMobile: true,
  },
  {
    key: 'views',
    title: 'Views',
  },
  {
    key: 'id', // Using id as a placeholder key for actions column
    title: 'Actions',
    width: 'w-[100px]',
    isImage: true, // Marking as non-sortable
  },
]
