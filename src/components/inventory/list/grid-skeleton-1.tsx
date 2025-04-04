import { Record } from '@/components/inventory/record'

export const GridSkeleton1 = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => index + 1).map((id) => (
        <Record key={id} template="skeleton-1" />
      ))}
    </div>
  )
}
