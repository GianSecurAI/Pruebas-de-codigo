package com.example.Reyna.Auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    String nombre_completo;
    String correo;
    String contraseña;
    String telefono;
    String direccion; 
    String Estado;
}