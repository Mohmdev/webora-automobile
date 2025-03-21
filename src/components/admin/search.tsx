"use client"
import { usePathname } from "next/navigation"
import { SearchInput } from "../shared/search-input"

export const AdminSearch = () => {
  const pathname = usePathname()
  return (
    <SearchInput
      placeholder={`Search ${pathname.split("/")[2]}...`}
      className="w-full appearance-none border border-primary-800 bg-primary-800 pl-8 text-muted placeholder:text-muted focus-visible:ring-0"
    />
  )
}
