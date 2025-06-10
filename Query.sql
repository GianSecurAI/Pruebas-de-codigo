-- Tabla de roles
CREATE TABLE Rol (
    id_rol Bigserial PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Tabla de usuarios
CREATE TABLE Usuario (
    id_usuario Bigserial PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(200),
    id_rol INT NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_rol) REFERENCES Rol(id_rol)
);

-- Tabla de categorías de productos
CREATE TABLE Categoria (
    id_categoria Bigserial PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL
);

-- Tabla de productos
CREATE TABLE Producto (
    id_producto Bigserial PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    id_categoria INT NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria)
);

-- Tabla de proveedores
CREATE TABLE Proveedor (
    id_proveedor Bigserial PRIMARY KEY,
    razon_social VARCHAR(150) NOT NULL,
    ruc VARCHAR(15) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    correo VARCHAR(100)
);

-- Relación muchos a muchos entre productos y proveedores
CREATE TABLE Producto_Proveedor (
    id_producto INT,
    id_proveedor INT,
    PRIMARY KEY (id_producto, id_proveedor),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto),
    FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id_proveedor)
);

-- Pedidos realizados por clientes
CREATE TABLE Pedido (
    id_pedido Bigserial PRIMARY KEY,
    id_cliente INT NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT NOW(),
    estado_pedido VARCHAR(50) DEFAULT 'Pendiente',
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Usuario(id_usuario)
);

-- Detalles del pedido
CREATE TABLE Detalle_Pedido (
    id_detalle Bigserial PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);

-- Ventas realizadas
CREATE TABLE Venta (
    id_venta Bigserial PRIMARY KEY,
    id_vendedor INT NOT NULL,
    id_cliente INT NOT NULL,
    fecha_venta TIMESTAMP DEFAULT NOW(),
    total DECIMAL(10, 2) NOT NULL,
    tipo_comprobante VARCHAR(50),
    FOREIGN KEY (id_vendedor) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_cliente) REFERENCES Usuario(id_usuario)
);

-- Detalles de cada venta
CREATE TABLE Detalle_Venta (
    id_detalle Bigserial PRIMARY KEY,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES Venta(id_venta),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);

-- Contactos o reclamos de clientes
CREATE TABLE Contacto (
    id_contacto Bigserial PRIMARY KEY,
    id_cliente INT NOT NULL,
    asunto VARCHAR(100),
    mensaje TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT NOW(),
    estado_respuesta VARCHAR(20) DEFAULT 'Pendiente',
    FOREIGN KEY (id_cliente) REFERENCES Usuario(id_usuario)
);
INSERT INTO Categoria (nombre_categoria) VALUES
('Perfumes'),
('Maquillaje'),
('Cremas'),
('Joyas');
INSERT INTO Producto (nombre_producto, descripcion, precio, stock, id_categoria)
VALUES
('Set Ccori Rosé: Parfum + Loción Perfumada', 'Set de perfume y loción con aroma floral.', 119.00, 10, 1),
('Cielo en Rosa Eau de Parfum', 'Fragancia femenina con notas frescas y florales.', 113.00, 15, 1),
('Set Sauvage Dior: Parfum + Estuche Elegante', 'Set masculino con estuche de regalo.', 105.00, 8, 1),
('Bombshell Seduction Eau de Parfum', 'Perfume seductor y elegante.', 180.00, 5, 1),
('Una Instinct Eau de Parfum', 'Fragancia intensa y duradera.', 165.00, 12, 1),
('Fragancia Intensa para Hombre', 'Perfume masculino de larga duración.', 150.00, 20, 1);