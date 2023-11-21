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

    // Get all conversations
    public List<ConversationEntity> getAllConversations() {
        return conversationRepository.findAll();
    }

    // Get a conversation by id
    public ConversationEntity getConversationById(int id) {
        Optional<ConversationEntity> conversation = conversationRepository.findById(id);
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

    // Update an existing conversation
    public ConversationEntity updateConversationById(int id, ConversationEntity conversation) {
        Optional<ConversationEntity> existingConversation = conversationRepository.findById(id);
        if (existingConversation.isPresent()) {
            existingConversation.get().setSenderId(conversation.getSenderId());
            existingConversation.get().setReceiverId(conversation.getReceiverId());
            return conversationRepository.save(existingConversation.get());
        } else {
            throw new RuntimeException("ConversationEntity not found with id: " + id);
        }
    }

    // Delete a conversation by id
    public void deleteConversationById(int id) {
        Optional<ConversationEntity> conversation = conversationRepository.findById(id);
        if (conversation.isPresent()) {
            conversationRepository.delete(conversation.get());
        } else {
            throw new RuntimeException("ConversationEntity not found with id: " + id);
        }
    }
}
