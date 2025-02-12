package org.example.serviceplatform.Mappers;

import org.example.serviceplatform.DTO.NotificationDTO;
import org.example.serviceplatform.Entities.Notification;

public class NotificationMapper {
    public static NotificationDTO toNotificationDTO(Notification notification) {
        return  NotificationDTO.builder()
                .id(notification.getId())
                .subject(notification.getSubject())
                .message(notification.getMessage())
                .date(notification.getDate())
                .isRead(notification.isRead())
                .build();
    }
}
