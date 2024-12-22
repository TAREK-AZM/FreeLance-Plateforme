import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function RequestCard({ title, description, status }) {
  return (
    <Card className="border-stone-200 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-105">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Badge>{status}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button variant="default" className="bg-emerald-800 hover:bg-emerald-950 text-white transition-colors">Accept</Button>
          <Button variant="outline" className="hover:bg-stone-100 transition-colors">Decline</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default RequestCard;