package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.Conversation;
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
    public List<Conversation> getAllConversations() {
        return conversationRepository.findAll();
    }

    // Get a conversation by id
    public Conversation getConversationById(int id) {
        Optional<Conversation> conversation = conversationRepository.findById(id);
        if (conversation.isPresent()) {
            return conversation.get();
        } else {
            throw new RuntimeException("Conversation not found with id: " + id);
        }
    }

    // Create a new conversation
    public Conversation createConversation(Conversation conversation) {
        return conversationRepository.save(conversation);
    }

    // Update an existing conversation
    public Conversation updateConversation(int id, Conversation conversation) {
        Optional<Conversation> existingConversation = conversationRepository.findById(id);
        if (existingConversation.isPresent()) {
            existingConversation.get().setSenderId(conversation.getSenderId());
            existingConversation.get().setReceiverId(conversation.getReceiverId());
            return conversationRepository.save(existingConversation.get());
        } else {
            throw new RuntimeException("Conversation not found with id: " + id);
        }
    }

    // Delete a conversation by id
    public void deleteConversation(int id) {
        Optional<Conversation> conversation = conversationRepository.findById(id);
        if (conversation.isPresent()) {
            conversationRepository.delete(conversation.get());
        } else {
            throw new RuntimeException("Conversation not found with id: " + id);
        }
    }
}
