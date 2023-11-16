package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {

    // Find all chats by conversation id
    List<Chat> findByConversationId(int conversationId);
}
