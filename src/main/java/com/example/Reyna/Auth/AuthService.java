package com.example.Reyna.Auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Reyna.Jwt.JwtService;
import com.example.Reyna.User.Role;
import com.example.Reyna.User.User;
import com.example.Reyna.User.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        // Autentica el usuario usando Spring Security (verifica nickname y contraseña)
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getNombre_completo(), request.getContraseña()));
        UserDetails user = userRepository.findByNombreCompleto(request.getNombre_completo()).orElseThrow();
        String token=jwtService.getToken(user);
        return AuthResponse.builder()
            .token(token)
            .build();
    }

    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
            .nombreCompleto(request.getNombre_completo())
            .contraseña(passwordEncoder.encode( request.getContraseña()))
            .correo(request.getCorreo())
            .telefono(request.telefono)
            .direccion(request.getDireccion())
            .Estado(request.getEstado())
            .role(Role.USER)
            .build();

        userRepository.save(user);

        return AuthResponse.builder()
            .token(jwtService.getToken(user))
            .build();
        
    }

}