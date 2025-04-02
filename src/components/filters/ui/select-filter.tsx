import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectFilterProps {
  label: string
  name: string
  value: string
  options: { label: string; value: string }[]
  disabled?: boolean
  handleSelectChange: (name: string, value: string) => void
}

export function SelectFilter({
  label,
  name,
  value,
  options,
  disabled = false,
  handleSelectChange,
}: SelectFilterProps) {
  return (
    <div className="flex-1 space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Select
        name={name}
        value={value || '_empty'}
        disabled={disabled}
        onValueChange={(value) =>
          handleSelectChange(name, value === '_empty' ? '' : value)
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_empty">Select</SelectItem>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
