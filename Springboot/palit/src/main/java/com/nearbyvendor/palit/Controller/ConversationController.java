package com.nearbyvendor.palit.controller;

import com.nearbyvendor.palit.entity.ConversationEntity;
import com.nearbyvendor.palit.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ConversationController {

    @Autowired
    private ConversationService conversationService;

    // Get all conversations
    @GetMapping
    public List<ConversationEntity> getAllConversations() {
        return conversationService.getAllConversations();
    }

    // Get a conversation by id
    @GetMapping("/getConversationById/{id}")
    public ConversationEntity getConversationById(@PathVariable("id") int id) {
        return conversationService.getConversationById(id);
    }

    // Create a new conversation
    @PostMapping("/createConversation")
    public ConversationEntity createConversation(@RequestBody ConversationEntity conversation) {
        return conversationService.createConversation(conversation);
    }

    // Update an existing conversation
    @PutMapping("/updateConversationById/{id}")
    public ConversationEntity updateConversationById(@PathVariable("id") int id, @RequestBody ConversationEntity conversation) {
        return conversationService.updateConversationById(id, conversation);
    }

    // Delete a conversation by id
    @DeleteMapping("/deleteConversationById/{id}")
    public void deleteConversationById(@PathVariable("id") int id) {
        conversationService.deleteConversationById(id);
    }
}
