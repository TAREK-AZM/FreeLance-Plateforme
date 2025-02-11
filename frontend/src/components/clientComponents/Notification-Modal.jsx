
import { useState, useEffect } from "react"
import { useParams ,Link} from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "../ui/button"




// This would typically come from an API or database
const getNotificationById = (id) => ({
  id: Number.parseInt(id),
  title: "New job application",
  description:
    "John Doe applied for the Front-end Developer position. Review their application and respond within 3 days.",
  time: "2 hours ago",
})

export default function NotificationModal() {
  const params = useParams()
  const notificationId = params.id 
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    setNotification(getNotificationById(notificationId))
  }, [notificationId])

  if (!notification) return null

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/client/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{notification.title}</h1>
      </div>
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm mb-2">{notification.description}</p>
        <p className="text-xs text-muted-foreground">{notification.time}</p>
      </div>
      <div className="flex gap-2">
        <Button className="bg-[#12AE65] hover:bg-[#0d8d52]">Mark as Read</Button>
        <Button variant="outline">Delete</Button>
      </div>
    </div>
  )
}

