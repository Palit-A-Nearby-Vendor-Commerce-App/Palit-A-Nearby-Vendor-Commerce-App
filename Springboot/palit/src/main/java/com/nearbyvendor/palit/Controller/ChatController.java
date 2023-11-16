package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.Chat;
import com.nearbyvendor.palit.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    // Get all chats by conversation id
    @GetMapping("/{conversationId}")
    public ResponseEntity<List<Chat>> getChatsByConversationId(@PathVariable int conversationId) {
        List<Chat> chats = chatService.getChatsByConversationId(conversationId);
        return new ResponseEntity<>(chats, HttpStatus.OK);
    }

    // Create a new chat
    @PostMapping
    public ResponseEntity<Chat> createChat(@RequestBody Chat chat) {
        Chat newChat = chatService.createChat(chat);
        return new ResponseEntity<>(newChat, HttpStatus.CREATED);
    }

    // Update an existing chat
    @PutMapping("/{chatId}")
    public ResponseEntity<Chat> updateChat(@PathVariable int chatId, @RequestBody Chat chat) {
        Chat updatedChat = chatService.updateChat(chatId, chat);
        return new ResponseEntity<>(updatedChat, HttpStatus.OK);
    }

    // Delete an existing chat
    @DeleteMapping("/{chatId}")
    public ResponseEntity<Void> deleteChat(@PathVariable int chatId) {
        chatService.deleteChat(chatId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
