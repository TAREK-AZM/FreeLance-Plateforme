import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function ServiceCard({ title, description, price, status }) {
  return (
    <Card className="border-stone-200 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-105">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-stone-500">Price:</span>
            <span className="font-medium">${price}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-stone-500">Status:</span>
            <Badge variant={status ? "default" : "secondary"}>
              {status ? "Active" : "Inactive"}
            </Badge>
          </div>
          <Button className="w-full mt-4 bg-cyan-950 hover:bg-stone-800 text-white transition-colors">Edit Service</Button>
        </div>
      </CardContent>
    </Card>
  )
}
export default ServiceCard;
