package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.ConversationEntity;
import com.nearbyvendor.palit.repository.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConversationService {

    @Autowired
    private ConversationRepository conversationRepository;

    // Get all conversations where isDeleted is false
    public List<ConversationEntity> getAllConversations() {
        return conversationRepository.findByIsDeletedFalse();
    }

    // Get a conversation by id where isDeleted is false
    public ConversationEntity getConversationById(int id) {
        Optional<ConversationEntity> conversation = conversationRepository.findByIdAndIsDeletedFalse(id);
        if (conversation.isPresent()) {
            return conversation.get();
        } else {
            throw new RuntimeException("ConversationEntity not found with id: " + id);
        }
    }

    // Create a new conversation
    public ConversationEntity createConversation(ConversationEntity conversation) {
        return conversationRepository.save(conversation);
    }

    // Update an existing conversation by id where isDeleted is false
    public ConversationEntity updateConversationById(int id, ConversationEntity conversation) {
        Optional<ConversationEntity> existingConversation = conversationRepository.findByIdAndIsDeletedFalse(id);
        if (existingConversation.isPresent()) {
            existingConversation.get().setSenderId(conversation.getSenderId());
            existingConversation.get().setReceiverId(conversation.getReceiverId());
            return conversationRepository.save(existingConversation.get());
        } else {
            throw new RuntimeException("ConversationEntity not found with id: " + id);
        }
    }

    // Delete a conversation by id by setting isDeleted to true
    public void deleteConversationById(int id) {
        Optional<ConversationEntity> conversation = conversationRepository.findByIdAndIsDeletedFalse(id);
        if (conversation.isPresent()) {
            conversation.get().setIsDeleted(true);
            conversationRepository.save(conversation.get());
        } else {
            throw new RuntimeException("ConversationEntity not found with id: " + id);
        }
    }
}
