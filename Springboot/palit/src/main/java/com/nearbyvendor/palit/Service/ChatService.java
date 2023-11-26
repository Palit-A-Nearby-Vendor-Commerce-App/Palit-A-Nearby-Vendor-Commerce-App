package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.ChatEntity;
import com.nearbyvendor.palit.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public List<ChatEntity> getChatsByConversationId(int conversationId) {
        return chatRepository.findByConversationIdAndIsDeletedFalse(conversationId);
    }

    public ChatEntity createChat(ChatEntity chat) {
        return chatRepository.save(chat);
    }

    public ChatEntity updateChatById(int chatId, ChatEntity chat) {
        Optional<ChatEntity> chatOptional = chatRepository.findByChatIdAndIsDeletedFalse(chatId);
        if (chatOptional.isPresent()) {
            ChatEntity existingChat = chatOptional.get();
            existingChat.setSenderId(chat.getSenderId());
            existingChat.setReceiverId(chat.getReceiverId());
            existingChat.setMessageContent(chat.getMessageContent());
            existingChat.setTimestamp(chat.getTimestamp());
            existingChat.setConversationId(chat.getConversationId());
            return chatRepository.save(existingChat);
        } else {
            // Log an error message for debugging
            System.err.println("ChatEntity not found with id: " + chatId);
            throw new RuntimeException("ChatEntity not found with id: " + chatId);
        }
    }

    public boolean deleteChatById(int chatId) {
        Optional<ChatEntity> chatOptional = chatRepository.findByChatIdAndIsDeletedFalse(chatId);
        if (chatOptional.isPresent()) {
            ChatEntity chat = chatOptional.get();
            chat.setIsDeleted(true);
            chatRepository.save(chat);
            return true; // Deletion was successful
        } else {
            // Log an error message for debugging
            System.err.println("ChatEntity not found with id: " + chatId);
            throw new RuntimeException("ChatEntity not found with id: " + chatId);
        }
    }    
}
