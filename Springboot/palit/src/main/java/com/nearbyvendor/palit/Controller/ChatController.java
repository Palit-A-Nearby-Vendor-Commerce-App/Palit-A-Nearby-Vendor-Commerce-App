package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.ChatEntity;
import com.nearbyvendor.palit.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @GetMapping("/getAllChats")
    public ResponseEntity<List<ChatEntity>> getAllChats() {
        List<ChatEntity> chats = chatService.getAllChats();
        return new ResponseEntity<>(chats, HttpStatus.OK);
    }

    @GetMapping("getChatsByConversationId/{conversationId}")
    public ResponseEntity<List<ChatEntity>> getChatsByConversationId(@PathVariable int conversationId) {
        List<ChatEntity> chats = chatService.getChatsByConversationId(conversationId);
        return new ResponseEntity<>(chats, HttpStatus.OK);
    }

    @PostMapping("/createChat")
    public ResponseEntity<Object> createChat(@RequestBody ChatEntity chat) {

        if (chat.getAccount() == null) {
            return new ResponseEntity<>("Account information is required for creating a chat.", HttpStatus.BAD_REQUEST);
        }

        ChatEntity createdChat = chatService.createChat(chat);
        return new ResponseEntity<>(createdChat, HttpStatus.CREATED);
    }

    @PutMapping("updateChatById/{chatId}")
    public ResponseEntity<ChatEntity> updateChatById(@PathVariable int chatId, @RequestBody ChatEntity chat) {
        ChatEntity updatedChat = chatService.updateChatById(chatId, chat);
        if (updatedChat != null) {
            return new ResponseEntity<>(updatedChat, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("deleteChatById/{chatId}")
    public ResponseEntity<Void> deleteChatById(@PathVariable int chatId) {
        boolean deleted = chatService.deleteChatById(chatId);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
