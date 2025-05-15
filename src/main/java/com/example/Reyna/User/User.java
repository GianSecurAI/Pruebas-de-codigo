package com.example.Reyna.User;

import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuario", uniqueConstraints = {@UniqueConstraint(columnNames = {"nombre_completo", "correo"})})
public class User implements UserDetails {

    @Id
    @Column(name = "id_usuario")
    Integer id_usuario;

    @Column(name = "nombre_completo", nullable = false) // Mapeando correctamente con el nombre de columna en la base de datos
    String nombreCompleto; // Usamos el nombre en camelCase para la variable
    @Column(name="correo", nullable = false)
    String correo;
    @Column(name="password", nullable = false)
    String password;
    @Column(name="telefono", nullable = false)
    String telefono;
    @Column(name="direccion", nullable = false)
    String direccion;
    @Column(name="estado", nullable = false)
    String estado;
    @Column(name="id_rol", nullable = false)
    String id_rol;
    @Enumerated(EnumType.STRING)
    @Column(name="role", nullable = false)
    Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.nombreCompleto; // Retorna el nombre completo
    }
}
