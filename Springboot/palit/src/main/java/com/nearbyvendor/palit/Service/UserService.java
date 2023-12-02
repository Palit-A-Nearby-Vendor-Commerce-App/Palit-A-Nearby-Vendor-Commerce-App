package com.nearbyvendor.palit.service;

import com.nearbyvendor.palit.entity.AccountEntity;
import com.nearbyvendor.palit.entity.UserEntity;
import com.nearbyvendor.palit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import com.nearbyvendor.palit.repository.AccountRepository;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    public List<UserEntity> getAllUsers() {
        return userRepository.findByIsDeletedFalse();
    }

    public UserEntity getUserById(int id) {
        UserEntity user = userRepository.findByUserIdAndIsDeletedFalse(id);
        if (user != null) {
            return user;
        } else {

            System.err.println("UserEntity not found with id: " + id);
            throw new RuntimeException("UserEntity not found with id: " + id);
        }
    }

    public UserEntity createUser(UserEntity newUserEntity) {
        return userRepository.save(newUserEntity);
    }

    public UserEntity updateUserById(int id, UserEntity updatedUserEntity) {

        UserEntity user = userRepository.findByUserIdAndIsDeletedFalse(id);
        if (user != null) {

            user.setFirstName(updatedUserEntity.getFirstName());
            user.setLastName(updatedUserEntity.getLastName());
            user.setBirthDate(updatedUserEntity.getBirthDate());
            user.setImage(updatedUserEntity.getImage());

            AccountEntity account = accountRepository.findById(updatedUserEntity.getAccount().getAccountId())
                    .orElse(null);
            if (account == null) {
                throw new RuntimeException(
                        "Account not found for ID: " + updatedUserEntity.getAccount().getAccountId());
            }
            user.setAccount(account);

            userRepository.save(user);
            return user;
        } else {

            System.err.println("Invalid user ID for update: " + id);
            throw new IllegalArgumentException("Invalid user ID");
        }
    }

    public boolean deleteUserById(int id) {
        UserEntity user = userRepository.findByUserIdAndIsDeletedFalse(id);
        if (user != null) {
            user.setIsDeleted(true);
            userRepository.save(user);
            return true;
        } else {

            System.err.println("Invalid user ID for deletion: " + id);
            throw new IllegalArgumentException("Invalid user ID");
        }
    }
}
