# 👑 Reyna - Aplicación Web Segura

**Reyna** es una aplicación web que combina un frontend desarrollado con **React** y un backend robusto con **Spring Boot**. Esta solución integra autenticación de usuarios mediante **JWT (JSON Web Token)** y se conecta a una base de datos **PostgreSQL** alojada en la nube a través de **Neon Tech**.

---

## ⚙️ Funcionalidades Principales

- 📝 Registro e inicio de sesión de usuarios  
- 🔐 Autenticación basada en **JWT**  
- 🛡️ Control de acceso basado en roles (**ADMIN** y **USER**)  
- 🌐 Endpoints REST seguros  

---

## 🧠 Backend - Spring Boot

El backend está construido con **Spring Boot** e incluye los siguientes componentes:

- 🔐 **Sistema de Autenticación:** Basado en JWT y Spring Security  
- 👤 **Gestión de Usuarios:** Entidad `User` con permisos según roles  
- 🛣️ **Controladores REST:** Endpoints para registro e inicio de sesión  
- 💾 **Capa de Acceso a Datos:** Repositorios JPA para operaciones en la base de datos  

---

## 💻 Frontend - React

El frontend está desarrollado con **React** e incluye:

- 🔑 **Formularios de Login/Registro:** Interfaz de autenticación  
- 💼 **Gestión de Almacenamiento Local:** Guarda tokens JWT e información del usuario  
- 🧭 **Componentes de Navegación:** Enrutamiento dentro de la aplicación  

---

## 🗃️ Modelo de Datos

La entidad principal es `User` y contiene los siguientes campos:

| Campo           | Tipo     | Descripción                                |
|------------------|----------|--------------------------------------------|
| `id_usuario`     | Integer  | Clave primaria para identificación         |
| `nombreCompleto` | String   | Nombre completo del usuario                |
| `correo`         | String   | Correo electrónico (nombre de usuario)     |
| `password`       | String   | Contraseña encriptada                      |
| `telefono`       | String   | Número de teléfono                         |
| `direccion`      | String   | Dirección del usuario                      |
| `estado`         | String   | Estado del usuario (activo/inactivo)       |
| `id_rol`         | Integer  | ID del rol asignado                        |
| `role`           | Enum     | Rol del usuario (`ADMIN` o `USER`)         |

---

## 🧰 Stack Tecnológico

### 🛠️ Backend

- ☕ Java 17  
- 🚀 Spring Boot 3.3.3  
- 🛡️ Spring Security  
- 🗃️ Spring Data JPA  
- 🔐 JWT (JSON Web Token)  
- 🐘 PostgreSQL 42.7.3  

### 🎨 Frontend

- ⚛️ React  
- 🚦 React Router  
- 🎨 CSS para estilos  

---

## ☁️ Infraestructura

- 🐘 Base de datos **PostgreSQL** alojada en **Neon Tech**

---

## 🛠️ Configuración de Desarrollo

- 🔙 Servidor backend: `http://localhost:8090`  
- 💾 Base de datos: **PostgreSQL en Neon Tech**

---

¿Listo para sumergirte en el código? ¡Reyna te da la bienvenida! 👑🚀
