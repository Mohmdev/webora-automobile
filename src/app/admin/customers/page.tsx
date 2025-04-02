import { fetchCustomers } from '@/_data/customer'
import { AdminCustomersHeader } from '@/components/customers/customers-header'
import { CustomersTableHeader } from '@/components/customers/customers-table-header'
import { CustomerTableRow } from '@/components/customers/customers-table-row'
import { AdminTableFooter } from '@/components/shared/admin-table-footer'
import { Table, TableBody } from '@/components/ui/table'
import { routes } from '@/config/routes'
import {
  CustomersTableSortSchema,
  type CustomersTableSortType,
  validateSortOrder,
} from '@/schemas/table-sort.schema'
import type { CustomerKeys, ParamsPromisedProps } from '@/types'

export default async function CustomersPage(props: ParamsPromisedProps) {
  const searchParams = await props.searchParams

  const { customers, pagination } = await fetchCustomers(searchParams)

  // Get sort and order for the table header
  const { sort, order } = validateSortOrder<CustomersTableSortType>({
    sort: searchParams?.sort as CustomerKeys,
    order: searchParams?.order as 'asc' | 'desc',
    schema: CustomersTableSortSchema,
  })

  return (
    <>
      <AdminCustomersHeader searchParams={searchParams} />
      <Table>
        <CustomersTableHeader
          sort={sort as CustomerKeys}
          order={order as 'asc' | 'desc'}
        />
        <TableBody>
          {customers.map((customer) => (
            <CustomerTableRow key={customer.id} {...customer} />
          ))}
        </TableBody>
        <AdminTableFooter
          baseURL={routes.admin.customers}
          searchParams={searchParams}
          disabled={!customers.length}
          totalPages={pagination.totalPages}
          cols={10}
        />
      </Table>
    </>
  )
}
