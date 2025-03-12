"use client"

import { usePathname } from "next/navigation"
import { Suspense } from "react"
import { SearchInput } from "../shared/search-input"

export const AdminSearch = () => {
  const pathname = usePathname()
  return (
    <Suspense
      fallback={
        <div className="w-full h-9 bg-primary-800 rounded-md animate-pulse" />
      }
    >
      <SearchInput
        placeholder={`Search ${pathname.split("/")[2]}...`}
        className="w-full focus-visible:ring-0 placeholder:text-muted text-muted appearance-none bg-primary-800 border border-primary-800 pl-8"
      />
    </Suspense>
  )
}
