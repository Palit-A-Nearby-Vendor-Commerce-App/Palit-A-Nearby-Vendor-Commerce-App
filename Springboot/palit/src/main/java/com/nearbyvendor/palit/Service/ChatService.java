package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.Chat;

import java.util.List;

public interface ChatService {

    // Get all chats by conversation id
    List<Chat> getChatsByConversationId(int conversationId);

    // Create a new chat
    Chat createChat(Chat chat);

    // Update an existing chat
    Chat updateChat(int chatId, Chat chat);

    // Delete an existing chat
    void deleteChat(int chatId);
}
