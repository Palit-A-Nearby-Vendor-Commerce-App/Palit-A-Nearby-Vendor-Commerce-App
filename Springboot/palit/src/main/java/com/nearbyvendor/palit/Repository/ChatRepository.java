package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.ChatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<ChatEntity, Integer> {

    List<ChatEntity> findAllByIsDeletedFalse();

    List<ChatEntity> findByConversation_ConversationId(int conversationId);

    List<ChatEntity> findByConversation_ConversationIdAndIsDeletedFalse(int conversationId);

    Optional<ChatEntity> findByChatIdAndIsDeletedFalse(int chatId);
}
