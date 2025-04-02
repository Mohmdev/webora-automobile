import {
  fetchChartData,
  fetchDashboardData,
} from '@/_data/fetch-dashboard-data'
import { KPICards } from '@/components/admin/dashboard/kpi-cards'
import { SalesChart } from '@/components/admin/dashboard/sales-chart'

export default function AdminDashboardPage() {
  const dashboardData = fetchDashboardData()
  const chartData = fetchChartData()
  return (
    <>
      <KPICards data={dashboardData} />
      <SalesChart data={chartData} />
    </>
  )
}
