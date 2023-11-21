package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.ConversationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConversationRepository extends JpaRepository<ConversationEntity, Integer> {
}
