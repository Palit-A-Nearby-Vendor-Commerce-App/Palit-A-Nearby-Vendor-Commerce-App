package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.Conversation;
import com.nearbyvendor.palit.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/conversations")
public class ConversationController {

    @Autowired
    private ConversationService conversationService;

    // Get all conversations
    @GetMapping
    public ResponseEntity<List<Conversation>> getAllConversations() {
        List<Conversation> conversations = conversationService.getAllConversations();
        return new ResponseEntity<>(conversations, HttpStatus.OK);
    }

    // Get a conversation by id
    @GetMapping("/{id}")
    public ResponseEntity<Conversation> getConversationById(@PathVariable("id") int id) {
        Conversation conversation = conversationService.getConversationById(id);
        return new ResponseEntity<>(conversation, HttpStatus.OK);
    }

    // Create a new conversation
    @PostMapping
    public ResponseEntity<Conversation> createConversation(@RequestBody Conversation conversation) {
        Conversation newConversation = conversationService.createConversation(conversation);
        return new ResponseEntity<>(newConversation, HttpStatus.CREATED);
    }

    // Update an existing conversation
    @PutMapping("/{id}")
    public ResponseEntity<Conversation> updateConversation(@PathVariable("id") int id, @RequestBody Conversation conversation) {
        Conversation updatedConversation = conversationService.updateConversation(id, conversation);
        return new ResponseEntity<>(updatedConversation, HttpStatus.OK);
    }

    // Delete a conversation by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConversation(@PathVariable("id") int id) {
        conversationService.deleteConversation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
