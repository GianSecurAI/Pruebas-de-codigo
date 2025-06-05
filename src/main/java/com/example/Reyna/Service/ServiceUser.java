package com.example.Reyna.Service;

import com.example.Reyna.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.Reyna.model.User;

@Service
public class ServiceUser {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User login(String correo, String password) {
        User user = userRepository.findByCorreo(correo);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        } else {
            return null; // or throw an exception
        }
    }

    public User saveUser(User user) {
        // Encriptamos la contraseña antes de guardarla
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
}
