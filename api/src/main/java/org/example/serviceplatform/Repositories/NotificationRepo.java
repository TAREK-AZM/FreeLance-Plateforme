package org.example.serviceplatform.Repositories;

import org.example.serviceplatform.Entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepo extends JpaRepository<Notification, Integer> {
List<Notification> findByReceiverIdOrderByDateDesc(int receiverId);
}
