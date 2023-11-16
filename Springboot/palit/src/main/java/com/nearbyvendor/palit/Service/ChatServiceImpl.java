package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.Chat;
import com.nearbyvendor.palit.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Override
    public List<Chat> getChatsByConversationId(int conversationId) {
        return chatRepository.findByConversationId(conversationId);
    }

    @Override
    public Chat createChat(Chat chat) {
        return chatRepository.save(chat);
    }

    @Override
    public Chat updateChat(int chatId, Chat chat) {
        Optional<Chat> chatOptional = chatRepository.findById(chatId);
        if (chatOptional.isPresent()) {
            Chat existingChat = chatOptional.get();
            existingChat.setSenderId(chat.getSenderId());
            existingChat.setReceiverId(chat.getReceiverId());
            existingChat.setMessageContent(chat.getMessageContent());
            existingChat.setTimestamp(chat.getTimestamp());
            existingChat.setConversationId(chat.getConversationId());
            return chatRepository.save(existingChat);
        } else {
            throw new RuntimeException("Chat not found with id: " + chatId);
        }
    }

    @Override
    public void deleteChat(int chatId) {
        chatRepository.deleteById(chatId);
    }
}
