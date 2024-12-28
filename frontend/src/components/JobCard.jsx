import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

 function JobCard({ title, description, budget, deadline, skills }) {
  return (
    <Card className="border-stone-200 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-105">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Badge variant="secondary">${budget}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-stone-500">Deadline:</span>
            <span className="font-medium">{deadline}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="outline">{skill}</Badge>
            ))}
          </div>
          <Button className="w-full mt-4 bg-cyan-950 hover:bg-stone-800 text-white transition-colors">Apply for Job</Button>
        </div>
      </CardContent>
    </Card>
  )
}
export default JobCard;

