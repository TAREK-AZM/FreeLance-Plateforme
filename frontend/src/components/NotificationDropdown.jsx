import { useState, useEffect } from "react";
import axios from "axios";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const API_URL = `http://localhost:8000/notifications`;

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(API_URL);
      setNotifications(response.data);
      calculateUnreadCount(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Mark a notification as read
  const handleNotificationClick = async (id) => {
    try {
      await axios.patch(`${API_URL}/${id}`, { read: true });
      const updatedNotifications = notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
      );
      setNotifications(updatedNotifications);
      calculateUnreadCount(updatedNotifications);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((n) => !n.read);
      await Promise.all(
          unreadNotifications.map((notification) =>
              axios.patch(`${API_URL}/${notification.id}`, { read: true })
          )
      );
      const updatedNotifications = notifications.map((n) => ({
        ...n,
        read: true,
      }));
      setNotifications(updatedNotifications);
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  // Calculate unread notifications
  const calculateUnreadCount = (notifications) => {
    const count = notifications.filter((n) => !n.read).length;
    setUnreadCount(count);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
              variant="outline"
              size="icon"
              className="relative bg-white text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-800"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                  {unreadCount}
                </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80">
          <DropdownMenuLabel className="flex justify-between items-center">
            <span>Notifications</span>
            {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications.map((notification) => (
              <DropdownMenuItem
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  className={`cursor-pointer ${
                      notification.read ? "opacity-50" : "font-semibold"
                  }`}
              >
                <div className="flex flex-col space-y-1">
                  <p className={`${notification.read ? "" : "font-semibold"}`}>
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {notification.description}
                  </p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
                {!notification.read && (
                    <Badge className="ml-auto" variant="secondary">
                      New
                    </Badge>
                )}
              </DropdownMenuItem>
          ))}
          {notifications.length === 0 && (
              <DropdownMenuItem disabled>No notifications</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
  );
}
