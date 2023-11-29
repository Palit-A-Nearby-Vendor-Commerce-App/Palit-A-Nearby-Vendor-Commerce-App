package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.ConversationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<ConversationEntity, Integer> {

    List<ConversationEntity> findByIsDeletedFalse();

    Optional<ConversationEntity> findByConversationIdAndIsDeletedFalse(int conversationId);
}
