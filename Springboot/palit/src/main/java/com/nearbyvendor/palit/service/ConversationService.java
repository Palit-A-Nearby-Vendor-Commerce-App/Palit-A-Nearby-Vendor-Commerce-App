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

    public List<ConversationEntity> getAllConversations() {
        return conversationRepository.findByIsDeletedFalse();
    }

    public ConversationEntity getConversationById(int id) {
        Optional<ConversationEntity> conversation = conversationRepository.findByConversationIdAndIsDeletedFalse(id);
        if (conversation.isPresent()) {
            return conversation.get();
        } else {

            System.err.println("ConversationEntity not found with id: " + id);
            throw new RuntimeException("ConversationEntity not found with id: " + id);
        }
    }

    public ConversationEntity createConversation(ConversationEntity conversation) {
        return conversationRepository.save(conversation);
    }

    public ConversationEntity updateConversationById(int id, ConversationEntity conversation) {
        Optional<ConversationEntity> existingConversation = conversationRepository
                .findByConversationIdAndIsDeletedFalse(id);
        if (existingConversation.isPresent()) {
            existingConversation.get().setVendor(conversation.getVendor());
            existingConversation.get().setCustomer(conversation.getCustomer());
            return conversationRepository.save(existingConversation.get());
        } else {

            System.err.println("ConversationEntity not found with id: " + id);
            throw new RuntimeException("ConversationEntity not found with id: " + id);
        }
    }

    public boolean deleteConversationById(int id) {
        Optional<ConversationEntity> conversation = conversationRepository.findByConversationIdAndIsDeletedFalse(id);
        if (conversation.isPresent()) {
            conversation.get().setIsDeleted(true);
            conversationRepository.save(conversation.get());
            return true;
        } else {

            System.err.println("ConversationEntity not found with id: " + id);
            throw new RuntimeException("ConversationEntity not found with id: " + id);
        }
    }
}
