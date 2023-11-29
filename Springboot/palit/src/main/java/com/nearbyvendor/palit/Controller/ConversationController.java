package com.nearbyvendor.palit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nearbyvendor.palit.entity.ConversationEntity;
import com.nearbyvendor.palit.service.ConversationService;

@RestController
@RequestMapping("/api")
public class ConversationController {

    @Autowired
    private ConversationService conversationService;

    @GetMapping("/getAllConversations")
    public ResponseEntity<List<ConversationEntity>> getAllConversations() {
        List<ConversationEntity> conversations = conversationService.getAllConversations();
        return new ResponseEntity<>(conversations, HttpStatus.OK);
    }

    @GetMapping("/getConversationById/{id}")
    public ResponseEntity<ConversationEntity> getConversationById(@PathVariable("id") int id) {
        ConversationEntity conversation = conversationService.getConversationById(id);
        if (conversation != null) {
            return new ResponseEntity<>(conversation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/createConversation")
    public ResponseEntity<ConversationEntity> createConversation(@RequestBody ConversationEntity conversation) {
        ConversationEntity newConversation = conversationService.createConversation(conversation);
        return new ResponseEntity<>(newConversation, HttpStatus.CREATED);
    }

    @PutMapping("/updateConversationById/{id}")
    public ResponseEntity<ConversationEntity> updateConversationById(@PathVariable("id") int id,
            @RequestBody ConversationEntity conversation) {
        ConversationEntity updatedConversation = conversationService.updateConversationById(id, conversation);
        if (updatedConversation != null) {
            return new ResponseEntity<>(updatedConversation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteConversationById/{id}")
    public ResponseEntity<Void> deleteConversationById(@PathVariable("id") int id) {
        boolean deleted = conversationService.deleteConversationById(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
