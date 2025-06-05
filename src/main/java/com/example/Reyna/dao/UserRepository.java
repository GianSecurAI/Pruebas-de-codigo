package com.example.Reyna.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Reyna.model.User;

public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByNombreCompleto(String nombre_completo);

    User findByCorreo(String correo);
}
