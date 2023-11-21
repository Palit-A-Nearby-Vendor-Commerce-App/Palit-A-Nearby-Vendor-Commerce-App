package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.ChatEntity;
import com.nearbyvendor.palit.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ChatController {

    @Autowired
    private ChatService chatService;

    // Get all chats by conversation id
    @GetMapping("getChatsByConversationId/{conversationId}")
    public List<ChatEntity> getChatsByConversationId(@PathVariable int conversationId) {
        return chatService.getChatsByConversationId(conversationId);
    }

    // Create a new chat
    @PostMapping("/createChat")
    public ChatEntity createChat(@RequestBody ChatEntity chat) {
        return chatService.createChat(chat);
    }

    // Update an existing chat
    @PutMapping("updateChatById/{chatId}")
    public ChatEntity updateChatById(@PathVariable int chatId, @RequestBody ChatEntity chat) {
        return chatService.updateChatById(chatId, chat);
    }

    // Delete an existing chat
    @DeleteMapping("deleteChatById/{chatId}")
    public void deleteChatById(int chatId) {
        chatService.deleteChatById(chatId);
    }
}
