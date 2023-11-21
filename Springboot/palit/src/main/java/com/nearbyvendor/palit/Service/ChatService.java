package com.nearbyvendor.palit.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nearbyvendor.palit.entity.ChatEntity;
import com.nearbyvendor.palit.repository.ChatRepository;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public List<ChatEntity> getChatsByConversationId(int conversationId) {
        return chatRepository.findByConversationId(conversationId);
    }

    public ChatEntity createChat(ChatEntity chat) {
        return chatRepository.save(chat);
    }

    public ChatEntity updateChatById(int chatId, ChatEntity chat) {
        Optional<ChatEntity> chatOptional = chatRepository.findById(chatId);
        if (chatOptional.isPresent()) {
            ChatEntity existingChat = chatOptional.get();
            existingChat.setSenderId(chat.getSenderId());
            existingChat.setReceiverId(chat.getReceiverId());
            existingChat.setMessageContent(chat.getMessageContent());
            existingChat.setTimestamp(chat.getTimestamp());
            existingChat.setConversationId(chat.getConversationId());
            return chatRepository.save(existingChat);
        } else {
            throw new RuntimeException("ChatEntity not found with id: " + chatId);
        }
    }

    public void deleteChatById(int chatId) {
        chatRepository.deleteById(chatId);
    }
}
