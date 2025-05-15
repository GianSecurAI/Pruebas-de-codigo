package com.example.Reyna.Service;

import com.example.Reyna.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Reyna.User.User;

@Service
public class ServiceUser {
    @Autowired
    private UserRepository userRepository;

    public User login(String correo, String password) {
        User user = userRepository.findByCorreo(correo);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        } else {
            return null; // or throw an exception
        }
    }

    public User saveUser(User user) {
        return  userRepository.save(user);
    }
}
