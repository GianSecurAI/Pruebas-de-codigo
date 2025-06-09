package com.example.Reyna.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "producto")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Long id_producto;

    @Column(name = "nombre_producto")
    private String nombre_producto;

    @Column(name = "precio")
    private Double precio;

    @Column(name = "categoria")
    private Integer categoria;

}