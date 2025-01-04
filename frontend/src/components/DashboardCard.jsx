import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function DashboardCard({ title, value, icon: Icon, className }) {
  return (
    <Card className={`bg-white border border-gray-400 shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:brightness-105 ${className} h-32`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium text-gray-800">{title}</CardTitle>
        <Icon className="h-6 w-6 text-gray-600" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-700">{value}</div>
      </CardContent>
    </Card>
  )
}

export default DashboardCard;