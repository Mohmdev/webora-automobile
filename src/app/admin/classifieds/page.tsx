import { fetchAdminClassifieds } from '@/_data'
import { AdminClassifiedsHeader } from '@/components/admin/classifieds/classifeds-header'
import { ClassifiedsTableRow } from '@/components/classified/classified-table-row'
import { ClassifiedsTableHeader } from '@/components/classified/classifieds-table-header'
import { AdminTableFooter } from '@/components/shared/admin-table-footer'
import { Table, TableBody } from '@/components/ui/table'
import { routes } from '@/config/routes'
import type { ClassifiedKeys, PromisedParams } from '@/types'

export default async function ClassifiedsPage(props: PromisedParams) {
  const searchParams = await props.searchParams

  const { classifieds, totalPages, sort, order } =
    await fetchAdminClassifieds(searchParams)

  return (
    <>
      <AdminClassifiedsHeader searchParams={searchParams} />
      <Table>
        <ClassifiedsTableHeader
          sort={sort as ClassifiedKeys}
          order={order as 'asc' | 'desc'}
        />
        <TableBody>
          {classifieds.map((classified) => (
            <ClassifiedsTableRow key={classified.id} {...classified} />
          ))}
        </TableBody>
        <AdminTableFooter
          baseURL={routes.admin.classifieds}
          searchParams={searchParams}
          disabled={!classifieds.length}
          totalPages={totalPages}
          cols={10}
        />
      </Table>
    </>
  )
}
