package com.nearbyvendor.palit.repository;

import com.nearbyvendor.palit.entity.ConversationEntity;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConversationRepository extends JpaRepository<ConversationEntity, Integer> {

  List<ConversationEntity> findByIsDeletedFalse();

  Optional<ConversationEntity> findByIdAndIsDeletedFalse(int id);
}
