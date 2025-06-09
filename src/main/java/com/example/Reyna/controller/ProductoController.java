package com.example.Reyna.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Reyna.model.Producto;
import com.example.Reyna.Service.ProductoService;
import com.example.Reyna.util.ExcelExporter;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @GetMapping
    public List<Producto> getAllProductos() {
        return productoService.obtenerTodos();
    }

    @Autowired
    private ProductoService productoService;

    @GetMapping("/excel")
    public ResponseEntity<byte[]> exportarProductosExcel() throws IOException {
        List<Producto> productos = productoService.obtenerTodos(); // Ajusta según tu servicio
        ByteArrayInputStream in = ExcelExporter.productosToExcel(productos);
        byte[] bytes = in.readAllBytes();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=productos.xlsx");

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(bytes);
    }
}