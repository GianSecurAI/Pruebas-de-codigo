package com.lareyna.pages;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Clase de ejemplo con múltiples implementaciones, algoritmos y estructuras
 * Este archivo es solo para demostraciones y no afecta al funcionamiento del sistema.
 * Contiene implementaciones de algoritmos clásicos, estructuras de datos y patrones de diseño
 * pero no tiene ninguna relación con el resto del proyecto.
 * 
 * @author Demostración
 * @version 1.0
 * @since 2025-06-10
 */
public class Contacto {
    // Atributos básicos
    private String nombre;
    private String email;
    private String telefono;
    private String mensaje;
    private String tipoConsulta;
    private static final int MAX_INTENTOS = 10;
    private static final String EMPRESA = "LA REYNA";
    private static final Random random = new Random(System.currentTimeMillis());
    
    // Variables para demostración
    private static AtomicInteger contadorInstancias = new AtomicInteger(0);
    private final int idInstancia;
    private LocalDateTime fechaCreacion;
    private Map<String, Object> metadatos;
    private List<HistorialContacto> historial;
    
    /**
     * Constructor por defecto
     */
    public Contacto() {
        this.idInstancia = contadorInstancias.incrementAndGet();
        this.fechaCreacion = LocalDateTime.now();
        this.metadatos = new HashMap<>();
        this.historial = new ArrayList<>();
        registrarCreacion();
    }
    
    /**
     * Constructor con todos los campos básicos
     * 
     * @param nombre Nombre del usuario
     * @param email Correo electrónico del usuario
     * @param telefono Número de teléfono del usuario
     * @param mensaje Contenido del mensaje o consulta
     * @param tipoConsulta Tipo de consulta (pedido, información, etc.)
     */
    public Contacto(String nombre, String email, String telefono, String mensaje, String tipoConsulta) {
        this();
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.mensaje = mensaje;
        this.tipoConsulta = tipoConsulta;
    }
    
    /**
     * Constructor completo con metadatos
     * 
     * @param nombre Nombre del usuario
     * @param email Correo electrónico del usuario
     * @param telefono Número de teléfono del usuario
     * @param mensaje Contenido del mensaje o consulta
     * @param tipoConsulta Tipo de consulta
     * @param metadatos Información adicional del contacto
     */
    public Contacto(String nombre, String email, String telefono, String mensaje, String tipoConsulta, Map<String, Object> metadatos) {
        this(nombre, email, telefono, mensaje, tipoConsulta);
        if (metadatos != null) {
            this.metadatos.putAll(metadatos);
        }
    }

    /**
     * Registra la creación de la instancia en el historial
     */
    private void registrarCreacion() {
        HistorialContacto evento = new HistorialContacto(
            "CREACION",
            "Se ha creado una nueva instancia de contacto",
            LocalDateTime.now()
        );
        this.historial.add(evento);
        
        // Simulación de operación costosa
        try {
            Thread.sleep(5); // Simular una pequeña latencia
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
    
    // Getters y setters básicos
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        String nombreAnterior = this.nombre;
        this.nombre = nombre;
        registrarCambio("NOMBRE", "Cambio de nombre: " + nombreAnterior + " -> " + nombre);
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        if (email != null && isValidEmail(email)) {
            String emailAnterior = this.email;
            this.email = email;
            registrarCambio("EMAIL", "Cambio de email: " + emailAnterior + " -> " + email);
        } else {
            throw new IllegalArgumentException("Formato de email inválido");
        }
    }
    
    public String getTelefono() {
        return telefono;
    }
    
    public void setTelefono(String telefono) {
        if (telefono != null && isValidPhone(telefono)) {
            String telefonoAnterior = this.telefono;
            this.telefono = telefono;
            registrarCambio("TELEFONO", "Cambio de teléfono: " + telefonoAnterior + " -> " + telefono);
        } else {
            throw new IllegalArgumentException("Formato de teléfono inválido");
        }
    }
    
    public String getMensaje() {
        return mensaje;
    }
    
    public void setMensaje(String mensaje) {
        String mensajeAnterior = this.mensaje;
        this.mensaje = mensaje;
        registrarCambio("MENSAJE", "Mensaje actualizado");
    }
    
    public String getTipoConsulta() {
        return tipoConsulta;
    }
    
    public void setTipoConsulta(String tipoConsulta) {
        String tipoAnterior = this.tipoConsulta;
        this.tipoConsulta = tipoConsulta;
        registrarCambio("TIPO_CONSULTA", "Cambio de tipo: " + tipoAnterior + " -> " + tipoConsulta);
    }
    
    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }
    
    public int getIdInstancia() {
        return idInstancia;
    }
    
    public Map<String, Object> getMetadatos() {
        return Collections.unmodifiableMap(metadatos);
    }
    
    public void agregarMetadato(String clave, Object valor) {
        this.metadatos.put(clave, valor);
        registrarCambio("METADATO", "Agregado metadato: " + clave);
    }
    
    public List<HistorialContacto> getHistorial() {
        return Collections.unmodifiableList(historial);
    }
    
    /**
     * Registra un cambio en el historial
     * 
     * @param tipo Tipo de cambio
     * @param descripcion Descripción del cambio
     */
    private void registrarCambio(String tipo, String descripcion) {
        HistorialContacto evento = new HistorialContacto(
            tipo,
            descripcion,
            LocalDateTime.now()
        );
        this.historial.add(evento);
    }
    
    /**
     * Valida formato de email básico
     * 
     * @param email Email a validar
     * @return true si el formato es válido
     */
    public static boolean isValidEmail(String email) {
        if (email == null || email.isEmpty()) {
            return false;
        }
        // Validación básica de email
        return email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }
    
    /**
     * Valida formato de teléfono básico
     * 
     * @param phone Teléfono a validar
     * @return true si el formato es válido
     */
    public static boolean isValidPhone(String phone) {
        if (phone == null || phone.isEmpty()) {
            return false;
        }
        // Validación básica de teléfono
        return phone.matches("^[+]?[(]?[0-9]{1,4}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$");
    }
    
    /**
     * Obtiene una representación en texto del contacto
     * 
     * @return Representación en texto
     */
    @Override
    public String toString() {
        return "Contacto{" +
                "id=" + idInstancia +
                ", nombre='" + nombre + '\'' +
                ", email='" + email + '\'' +
                ", telefono='" + telefono + '\'' +
                ", mensaje='" + (mensaje != null ? mensaje.substring(0, Math.min(mensaje.length(), 20)) + "..." : "null") + '\'' +
                ", tipoConsulta='" + tipoConsulta + '\'' +
                ", fechaCreacion=" + fechaCreacion.format(DateTimeFormatter.ISO_DATE_TIME) +
                ", metadatos=" + metadatos.size() +
                ", historial=" + historial.size() +
                '}';
    }
    
    /**
     * Genera un hash code basado en los campos principales
     * 
     * @return Hash code
     */
    @Override
    public int hashCode() {
        return Objects.hash(idInstancia, nombre, email, telefono, tipoConsulta);
    }
    
    /**
     * Compara esta instancia con otra
     * 
     * @param obj Objeto a comparar
     * @return true si son iguales
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Contacto contacto = (Contacto) obj;
        return idInstancia == contacto.idInstancia &&
               Objects.equals(nombre, contacto.nombre) &&
               Objects.equals(email, contacto.email) &&
               Objects.equals(telefono, contacto.telefono) &&
               Objects.equals(tipoConsulta, contacto.tipoConsulta);
    }
    
    /**
     * Crea una copia de esta instancia
     * 
     * @return Copia de esta instancia
     */
    public Contacto copiar() {
        Contacto copia = new Contacto();
        copia.nombre = this.nombre;
        copia.email = this.email;
        copia.telefono = this.telefono;
        copia.mensaje = this.mensaje;
        copia.tipoConsulta = this.tipoConsulta;
        copia.metadatos = new HashMap<>(this.metadatos);
        // No copiamos el historial intencionalmente
        copia.registrarCambio("COPIA", "Creada copia de contacto con ID " + this.idInstancia);
        return copia;
    }
    
    /**
     * Crear un ejemplo de contacto con datos aleatorios
     * 
     * @return Contacto con datos aleatorios
     */
    public static Contacto crearEjemplo() {
        String[] nombres = {"Ana García", "Juan Pérez", "María López", "Carlos Rodríguez", "Laura Martínez"};
        String[] dominios = {"gmail.com", "hotmail.com", "yahoo.com", "outlook.com", "empresa.com"};
        String[] tipos = {"Información", "Pedido", "Reclamo", "Consulta", "Sugerencia"};
        String[] mensajes = {
            "Me gustaría obtener más información sobre sus productos.",
            "Quiero realizar un pedido especial para un evento.",
            "Tengo un problema con mi último pedido.",
            "¿Podrían decirme si tienen disponible este producto?",
            "Me encantaría sugerir una mejora para su sitio web."
        };
        
        String nombre = nombres[random.nextInt(nombres.length)];
        String email = nombre.toLowerCase().replace(" ", ".") + "@" + dominios[random.nextInt(dominios.length)];
        String telefono = "+34 " + (600 + random.nextInt(300)) + " " + (100000 + random.nextInt(900000));
        String mensaje = mensajes[random.nextInt(mensajes.length)];
        String tipo = tipos[random.nextInt(tipos.length)];
        
        return new Contacto(nombre, email, telefono, mensaje, tipo);
    }
    
    /**
     * Método principal para ejemplos
     * 
     * @param args Argumentos de línea de comandos
     */
    public static void main(String[] args) {
        System.out.println("Ejemplo de uso de la clase Contacto");
        
        // Crear instancias de ejemplo
        Contacto c1 = new Contacto("Juan Pérez", "juan@ejemplo.com", "+34 612345678", "Consulta sobre productos", "Información");
        Contacto c2 = crearEjemplo();
        
        System.out.println("Contacto 1: " + c1);
        System.out.println("Contacto 2: " + c2);
        
        // Demostración de operaciones
        c1.agregarMetadato("navegador", "Chrome");
        c1.agregarMetadato("dispositivo", "Móvil");
        c1.setNombre("Juan Antonio Pérez");
        
        System.out.println("Contacto 1 modificado: " + c1);
        System.out.println("Historial de cambios: ");
        c1.getHistorial().forEach(System.out::println);
        
        // Ejemplo de uso de la clase interna
        DemoAlgoritmos.ejecutarDemostraciones();
    }
    
    /**
     * Clase interna para registrar el historial de cambios en un contacto
     */
    public static class HistorialContacto {
        private final String tipo;
        private final String descripcion;
        private final LocalDateTime fecha;
        
        public HistorialContacto(String tipo, String descripcion, LocalDateTime fecha) {
            this.tipo = tipo;
            this.descripcion = descripcion;
            this.fecha = fecha;
        }
        
        public String getTipo() {
            return tipo;
        }
        
        public String getDescripcion() {
            return descripcion;
        }
        
        public LocalDateTime getFecha() {
            return fecha;
        }
        
        @Override
        public String toString() {
            return fecha.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + " - " + 
                   tipo + ": " + descripcion;
        }
    }
    
    /**
     * Clase interna para demostrar distintos algoritmos
     */
    public static class DemoAlgoritmos {
        
        /**
         * Ejecuta varias demostraciones de algoritmos
         */
        public static void ejecutarDemostraciones() {
            System.out.println("\n=== DEMOSTRACIONES DE ALGORITMOS ===");
            
            // Generar datos de prueba
            int[] numeros = generarArrayAleatorio(20, 1, 100);
            System.out.println("Array original: " + Arrays.toString(numeros));
            
            // Ordenamiento
            int[] ordenado = ordenamientoBurbuja(numeros.clone());
            System.out.println("Ordenado con burbuja: " + Arrays.toString(ordenado));
            
            // Búsqueda
            int buscar = numeros[random.nextInt(numeros.length)];
            int indice = busquedaBinaria(ordenado, buscar);
            System.out.println("Búsqueda binaria de " + buscar + ": encontrado en índice " + indice);
            
            // Fibonacci
            System.out.println("Fibonacci(10): " + fibonacci(10));
            
            // Factorial
            System.out.println("Factorial(5): " + factorial(5));
            
            // Verificar número primo
            int numPrimo = 17;
            System.out.println(numPrimo + " es primo: " + esPrimo(numPrimo));
            
            // Ejemplo de programación funcional
            List<Integer> listaNumeros = Arrays.stream(numeros).boxed().collect(Collectors.toList());
            List<Integer> pares = listaNumeros.stream()
                .filter(n -> n % 2 == 0)
                .sorted()
                .collect(Collectors.toList());
            System.out.println("Números pares ordenados: " + pares);
            
            // Demostración de memoización
            long inicio = System.nanoTime();
            long fibResult = fibonacciMemoizado(30);
            long fin = System.nanoTime();
            System.out.println("Fibonacci memoizado(30) = " + fibResult + " (calculado en " + (fin - inicio) / 1_000_000.0 + " ms)");
            
            // Demostración de árboles binarios
            DemoEstructurasDatos.ejecutarDemostracionArboles();
        }
        
        /**
         * Genera un array de enteros aleatorios
         * 
         * @param tamano Tamaño del array
         * @param min Valor mínimo (inclusive)
         * @param max Valor máximo (exclusive)
         * @return Array de enteros aleatorios
         */
        private static int[] generarArrayAleatorio(int tamano, int min, int max) {
            return random.ints(tamano, min, max).toArray();
        }
        
        /**
         * Implementación del algoritmo de ordenamiento burbuja
         * 
         * @param arr Array a ordenar
         * @return Array ordenado
         */
        private static int[] ordenamientoBurbuja(int[] arr) {
            int n = arr.length;
            for (int i = 0; i < n - 1; i++) {
                for (int j = 0; j < n - i - 1; j++) {
                    if (arr[j] > arr[j + 1]) {
                        // Intercambiar arr[j] y arr[j+1]
                        int temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
            return arr;
        }
        
        /**
         * Implementación del algoritmo de ordenamiento Quick Sort
         * 
         * @param arr Array a ordenar
         * @param low Índice inferior
         * @param high Índice superior
         */
        private static void quickSort(int[] arr, int low, int high) {
            if (low < high) {
                int pi = partition(arr, low, high);
                
                quickSort(arr, low, pi - 1);
                quickSort(arr, pi + 1, high);
            }
        }
        
        /**
         * Método auxiliar para Quick Sort
         */
        private static int partition(int[] arr, int low, int high) {
            int pivot = arr[high];
            int i = (low - 1);
            
            for (int j = low; j < high; j++) {
                if (arr[j] <= pivot) {
                    i++;
                    
                    int temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
            
            int temp = arr[i + 1];
            arr[i + 1] = arr[high];
            arr[high] = temp;
            
            return i + 1;
        }
        
        /**
         * Implementación de búsqueda binaria
         * 
         * @param arr Array ordenado donde buscar
         * @param x Elemento a buscar
         * @return Índice del elemento o -1 si no se encuentra
         */
        private static int busquedaBinaria(int[] arr, int x) {
            int l = 0, r = arr.length - 1;
            while (l <= r) {
                int m = l + (r - l) / 2;
                
                if (arr[m] == x)
                    return m;
                
                if (arr[m] < x)
                    l = m + 1;
                else
                    r = m - 1;
            }
            
            return -1;
        }
        
        /**
         * Calcula el enésimo número de Fibonacci (implementación recursiva)
         * 
         * @param n Posición en la secuencia
         * @return Valor de Fibonacci
         */
        private static long fibonacci(int n) {
            if (n <= 1)
                return n;
            return fibonacci(n - 1) + fibonacci(n - 2);
        }
        
        /**
         * Mapa para memoización de Fibonacci
         */
        private static Map<Integer, Long> fibMemo = new HashMap<>();
        
        /**
         * Calcula el enésimo número de Fibonacci (implementación memoizada)
         * 
         * @param n Posición en la secuencia
         * @return Valor de Fibonacci
         */
        private static long fibonacciMemoizado(int n) {
            if (n <= 1)
                return n;
            
            if (fibMemo.containsKey(n))
                return fibMemo.get(n);
            
            long fib = fibonacciMemoizado(n - 1) + fibonacciMemoizado(n - 2);
            fibMemo.put(n, fib);
            return fib;
        }
        
        /**
         * Calcula el factorial de un número
         * 
         * @param n Número
         * @return Factorial
         */
        private static long factorial(int n) {
            if (n <= 1)
                return 1;
            return n * factorial(n - 1);
        }
        
        /**
         * Verifica si un número es primo
         * 
         * @param n Número a verificar
         * @return true si es primo
         */
        private static boolean esPrimo(int n) {
            if (n <= 1)
                return false;
            if (n <= 3)
                return true;
            if (n % 2 == 0 || n % 3 == 0)
                return false;
            
            for (int i = 5; i * i <= n; i += 6) {
                if (n % i == 0 || n % (i + 2) == 0)
                    return false;
            }
            
            return true;
        }
        
        /**
         * Encuentra el máximo común divisor de dos números
         * 
         * @param a Primer número
         * @param b Segundo número
         * @return MCD
         */
        private static int mcd(int a, int b) {
            while (b != 0) {
                int temp = b;
                b = a % b;
                a = temp;
            }
            return a;
        }
        
        /**
         * Encuentra el mínimo común múltiplo de dos números
         * 
         * @param a Primer número
         * @param b Segundo número
         * @return MCM
         */
        private static int mcm(int a, int b) {
            return (a * b) / mcd(a, b);
        }
    }
    
    /**
     * Clase interna para demostrar estructuras de datos
     */
    public static class DemoEstructurasDatos {
        
        /**
         * Ejecuta demostraciones de estructuras de datos
         */
        public static void ejecutarDemostracionArboles() {
            System.out.println("\n=== DEMOSTRACIÓN DE ÁRBOL BINARIO ===");
            
            // Crear un árbol binario de búsqueda
            NodoBST raiz = null;
            int[] valores = {50, 30, 70, 20, 40, 60, 80};
            
            for (int valor : valores) {
                raiz = insertarBST(raiz, valor);
            }
            
            System.out.println("Recorrido inorden del BST:");
            inordenBST(raiz);
            System.out.println();
            
            System.out.println("Recorrido preorden del BST:");
            preordenBST(raiz);
            System.out.println();
            
            System.out.println("Recorrido postorden del BST:");
            postordenBST(raiz);
            System.out.println();
            
            int buscar = 40;
            System.out.println("Búsqueda de " + buscar + " en el BST: " + 
                (buscarBST(raiz, buscar) != null ? "Encontrado" : "No encontrado"));
            
            // Demostración de grafo
            ejecutarDemostracionGrafos();
        }
        
        /**
         * Ejecuta demostraciones de grafos
         */
        private static void ejecutarDemostracionGrafos() {
            System.out.println("\n=== DEMOSTRACIÓN DE GRAFO ===");
            
            // Crear un grafo simple
            Grafo grafo = new Grafo(6);
            grafo.agregarArista(0, 1);
            grafo.agregarArista(0, 2);
            grafo.agregarArista(1, 3);
            grafo.agregarArista(1, 4);
            grafo.agregarArista(2, 4);
            grafo.agregarArista(3, 5);
            grafo.agregarArista(4, 5);
            
            System.out.println("Recorrido BFS desde el vértice 0:");
            grafo.bfs(0);
            
            System.out.println("\nRecorrido DFS desde el vértice 0:");
            grafo.dfs(0);
            
            // Demostración de algoritmos de ordenamiento
            ejecutarDemostracionOrdenamiento();
        }
        
        /**
         * Ejecuta demostraciones de algoritmos de ordenamiento
         */
        private static void ejecutarDemostracionOrdenamiento() {
            System.out.println("\n=== DEMOSTRACIÓN DE ORDENAMIENTO ===");
            
            int[] arr = {64, 34, 25, 12, 22, 11, 90};
            System.out.println("Array original: " + Arrays.toString(arr));
            
            int[] arrBubble = arr.clone();
            bubbleSort(arrBubble);
            System.out.println("Ordenamiento burbuja: " + Arrays.toString(arrBubble));
            
            int[] arrInsertion = arr.clone();
            insertionSort(arrInsertion);
            System.out.println("Ordenamiento por inserción: " + Arrays.toString(arrInsertion));
            
            int[] arrSelection = arr.clone();
            selectionSort(arrSelection);
            System.out.println("Ordenamiento por selección: " + Arrays.toString(arrSelection));
            
            int[] arrMerge = arr.clone();
            mergeSort(arrMerge, 0, arrMerge.length - 1);
            System.out.println("Ordenamiento por mezcla: " + Arrays.toString(arrMerge));
            
            // Demostrar tablas hash
            ejecutarDemostracionHashTables();
        }
        
        /**
         * Ejecuta demostraciones de tablas hash
         */
        private static void ejecutarDemostracionHashTables() {
            System.out.println("\n=== DEMOSTRACIÓN DE TABLAS HASH ===");
            
            // Crear una tabla hash simple
            Map<String, Integer> hashTable = new HashMap<>();
            hashTable.put("uno", 1);
            hashTable.put("dos", 2);
            hashTable.put("tres", 3);
            hashTable.put("cuatro", 4);
            hashTable.put("cinco", 5);
            
            System.out.println("Tabla hash: " + hashTable);
            System.out.println("Valor de 'tres': " + hashTable.get("tres"));
            
            hashTable.put("tres", 33);  // Actualizar valor
            System.out.println("Valor actualizado de 'tres': " + hashTable.get("tres"));
            
            hashTable.remove("dos");
            System.out.println("Después de eliminar 'dos': " + hashTable);
            
            System.out.println("¿Contiene 'seis'? " + hashTable.containsKey("seis"));
            
            // Recorrer la tabla hash
            System.out.println("Recorrido de la tabla hash:");
            for (Map.Entry<String, Integer> entry : hashTable.entrySet()) {
                System.out.println(entry.getKey() + ": " + entry.getValue());
            }
            
            // Ejemplo con lambdas
            hashTable.forEach((k, v) -> System.out.println("Clave: " + k + ", Valor: " + v));
        }
        
        // Definición de nodo para BST
        static class NodoBST {
            int valor;
            NodoBST izquierdo, derecho;
            
            public NodoBST(int item) {
                valor = item;
                izquierdo = derecho = null;
            }
        }
        
        // Métodos para BST
        
        /**
         * Inserta un valor en un BST
         * 
         * @param raiz Raíz del árbol
         * @param valor Valor a insertar
         * @return Raíz actualizada
         */
        private static NodoBST insertarBST(NodoBST raiz, int valor) {
            if (raiz == null) {
                return new NodoBST(valor);
            }
            
            if (valor < raiz.valor) {
                raiz.izquierdo = insertarBST(raiz.izquierdo, valor);
            } else if (valor > raiz.valor) {
                raiz.derecho = insertarBST(raiz.derecho, valor);
            }
            
            return raiz;
        }
        
        /**
         * Recorrido inorden de un BST
         * 
         * @param raiz Raíz del árbol
         */
        private static void inordenBST(NodoBST raiz) {
            if (raiz != null) {
                inordenBST(raiz.izquierdo);
                System.out.print(raiz.valor + " ");
                inordenBST(raiz.derecho);
            }
        }
        
        /**
         * Recorrido preorden de un BST
         * 
         * @param raiz Raíz del árbol
         */
        private static void preordenBST(NodoBST raiz) {
            if (raiz != null) {
                System.out.print(raiz.valor + " ");
                preordenBST(raiz.izquierdo);
                preordenBST(raiz.derecho);
            }
        }
        
        /**
         * Recorrido postorden de un BST
         * 
         * @param raiz Raíz del árbol
         */
        private static void postordenBST(NodoBST raiz) {
            if (raiz != null) {
                postordenBST(raiz.izquierdo);
                postordenBST(raiz.derecho);
                System.out.print(raiz.valor + " ");
            }
        }
        
        /**
         * Busca un valor en un BST
         * 
         * @param raiz Raíz del árbol
         * @param valor Valor a buscar
         * @return Nodo encontrado o null
         */
        private static NodoBST buscarBST(NodoBST raiz, int valor) {
            if (raiz == null || raiz.valor == valor) {
                return raiz;
            }
            
            if (raiz.valor > valor) {
                return buscarBST(raiz.izquierdo, valor);
            }
            
            return buscarBST(raiz.derecho, valor);
        }
        
        // Clase para representar un grafo
        static class Grafo {
            private int V;  // Número de vértices
            private LinkedList<Integer>[] adyacencia;  // Lista de adyacencia
            
            // Constructor
            @SuppressWarnings("unchecked")
            Grafo(int v) {
                V = v;
                adyacencia = new LinkedList[v];
                for (int i = 0; i < v; ++i) {
                    adyacencia[i] = new LinkedList<>();
                }
            }
            
            // Añade una arista al grafo
            void agregarArista(int v, int w) {
                adyacencia[v].add(w);
            }
            
            // BFS desde un vértice
            void bfs(int s) {
                boolean[] visitado = new boolean[V];
                LinkedList<Integer> cola = new LinkedList<>();
                
                visitado[s] = true;
                cola.add(s);
                
                while (!cola.isEmpty()) {
                    s = cola.poll();
                    System.out.print(s + " ");
                    
                    for (int n : adyacencia[s]) {
                        if (!visitado[n]) {
                            visitado[n] = true;
                            cola.add(n);
                        }
                    }
                }
            }
            
            // DFS desde un vértice
            void dfs(int v) {
                boolean[] visitado = new boolean[V];
                dfsUtil(v, visitado);
            }
            
            // Función recursiva para DFS
            void dfsUtil(int v, boolean[] visitado) {
                visitado[v] = true;
                System.out.print(v + " ");
                
                for (int n : adyacencia[v]) {
                    if (!visitado[n]) {
                        dfsUtil(n, visitado);
                    }
                }
            }
        }
        
        // Algoritmos de ordenamiento
        
        /**
         * Ordenamiento burbuja
         * 
         * @param arr Array a ordenar
         */
        private static void bubbleSort(int[] arr) {
            int n = arr.length;
            for (int i = 0; i < n - 1; i++) {
                for (int j = 0; j < n - i - 1; j++) {
                    if (arr[j] > arr[j + 1]) {
                        // Intercambiar arr[j] y arr[j+1]
                        int temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
        }
        
        /**
         * Ordenamiento por inserción
         * 
         * @param arr Array a ordenar
         */
        private static void insertionSort(int[] arr) {
            int n = arr.length;
            for (int i = 1; i < n; ++i) {
                int key = arr[i];
                int j = i - 1;
                
                /* Mover elementos de arr[0..i-1], que son
                   mayores que key, a una posición adelante
                   de su posición actual */
                while (j >= 0 && arr[j] > key) {
                    arr[j + 1] = arr[j];
                    j = j - 1;
                }
                arr[j + 1] = key;
            }
        }
        
        /**
         * Ordenamiento por selección
         * 
         * @param arr Array a ordenar
         */
        private static void selectionSort(int[] arr) {
            int n = arr.length;
            
            for (int i = 0; i < n - 1; i++) {
                int min_idx = i;
                for (int j = i + 1; j < n; j++) {
                    if (arr[j] < arr[min_idx]) {
                        min_idx = j;
                    }
                }
                
                int temp = arr[min_idx];
                arr[min_idx] = arr[i];
                arr[i] = temp;
            }
        }
        
        /**
         * Ordenamiento por mezcla
         * 
         * @param arr Array a ordenar
         * @param l Índice izquierdo
         * @param r Índice derecho
         */
        private static void mergeSort(int[] arr, int l, int r) {
            if (l < r) {
                int m = l + (r - l) / 2;
                
                mergeSort(arr, l, m);
                mergeSort(arr, m + 1, r);
                
                merge(arr, l, m, r);
            }
        }
        
        /**
         * Combina dos subarrays de arr[]
         * 
         * @param arr Array original
         * @param l Índice izquierdo
         * @param m Índice medio
         * @param r Índice derecho
         */
        private static void merge(int[] arr, int l, int m, int r) {
            int n1 = m - l + 1;
            int n2 = r - m;
            
            int[] L = new int[n1];
            int[] R = new int[n2];
            
            for (int i = 0; i < n1; ++i) {
                L[i] = arr[l + i];
            }
            for (int j = 0; j < n2; ++j) {
                R[j] = arr[m + 1 + j];
            }
            
            int i = 0, j = 0;
            int k = l;
            while (i < n1 && j < n2) {
                if (L[i] <= R[j]) {
                    arr[k] = L[i];
                    i++;
                } else {
                    arr[k] = R[j];
                    j++;
                }
                k++;
            }
            
            while (i < n1) {
                arr[k] = L[i];
                i++;
                k++;
            }
            
            while (j < n2) {
                arr[k] = R[j];
                j++;
                k++;
            }
        }
    }
    
    /**
     * Clase de utilidad para demostrar patrones de diseño
     */
    public static class DemoPatrones {
        
        /**
         * Patrón Singleton para una clase de configuración
         */
        public static class ConfiguracionSingleton {
            private static ConfiguracionSingleton instancia;
            private Map<String, String> propiedades;
            
            private ConfiguracionSingleton() {
                propiedades = new HashMap<>();
                cargarPropiedadesDefecto();
            }
            
            public static synchronized ConfiguracionSingleton getInstancia() {
                if (instancia == null) {
                    instancia = new ConfiguracionSingleton();
                }
                return instancia;
            }
            
            private void cargarPropiedadesDefecto() {
                propiedades.put("idioma", "es");
                propiedades.put("tema", "claro");
                propiedades.put("timeout", "30000");
            }
            
            public String getPropiedad(String clave) {
                return propiedades.get(clave);
            }
            
            public void setPropiedad(String clave, String valor) {
                propiedades.put(clave, valor);
            }
        }
        
        /**
         * Patrón Builder para crear objetos complejos
         */
        public static class ContactoBuilder {
            private String nombre;
            private String email;
            private String telefono;
            private String mensaje;
            private String tipoConsulta;
            private Map<String, Object> metadatos = new HashMap<>();
            
            public ContactoBuilder conNombre(String nombre) {
                this.nombre = nombre;
                return this;
            }
            
            public ContactoBuilder conEmail(String email) {
                this.email = email;
                return this;
            }
            
            public ContactoBuilder conTelefono(String telefono) {
                this.telefono = telefono;
                return this;
            }
            
            public ContactoBuilder conMensaje(String mensaje) {
                this.mensaje = mensaje;
                return this;
            }
            
            public ContactoBuilder conTipoConsulta(String tipoConsulta) {
                this.tipoConsulta = tipoConsulta;
                return this;
            }
            
            public ContactoBuilder conMetadato(String clave, Object valor) {
                this.metadatos.put(clave, valor);
                return this;
            }
            
            public Contacto build() {
                Contacto contacto = new Contacto(nombre, email, telefono, mensaje, tipoConsulta);
                for (Map.Entry<String, Object> entry : metadatos.entrySet()) {
                    contacto.agregarMetadato(entry.getKey(), entry.getValue());
                }
                return contacto;
            }
        }
        
        /**
         * Patrón Estrategia para validación de campos
         */
        public interface EstrategiaValidacion {
            boolean validar(String valor);
            String getMensajeError();
        }
        
        public static class ValidacionEmail implements EstrategiaValidacion {
            @Override
            public boolean validar(String valor) {
                return valor != null && valor.matches("^[A-Za-z0-9+_.-]+@(.+)$");
            }
            
            @Override
            public String getMensajeError() {
                return "Formato de email inválido";
            }
        }
        
        public static class ValidacionTelefono implements EstrategiaValidacion {
            @Override
            public boolean validar(String valor) {
                return valor != null && valor.matches("^[+]?[(]?[0-9]{1,4}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$");
            }
            
            @Override
            public String getMensajeError() {
                return "Formato de teléfono inválido";
            }
        }
        
        public static class Validador {
            private EstrategiaValidacion estrategia;
            
            public Validador(EstrategiaValidacion estrategia) {
                this.estrategia = estrategia;
            }
            
            public boolean validar(String valor) {
                return estrategia.validar(valor);
            }
            
            public String getMensajeError() {
                return estrategia.getMensajeError();
            }
        }
    }
    
    /**
     * Clase que implementa algunos algoritmos de búsqueda de texto
     */
    public static class AlgoritmosBusquedaTexto {
        
        /**
         * Algoritmo de búsqueda ingenua
         * 
         * @param texto Texto donde buscar
         * @param patron Patrón a buscar
         * @return Lista de índices donde se encuentra el patrón
         */
        public static List<Integer> busquedaIngenua(String texto, String patron) {
            List<Integer> indices = new ArrayList<>();
            int m = patron.length();
            int n = texto.length();
            
            for (int i = 0; i <= n - m; i++) {
                int j;
                for (j = 0; j < m; j++) {
                    if (texto.charAt(i + j) != patron.charAt(j)) {
                        break;
                    }
                }
                
                if (j == m) {
                    indices.add(i);
                }
            }
            
            return indices;
        }
        
        /**
         * Algoritmo de búsqueda KMP (Knuth-Morris-Pratt)
         * 
         * @param texto Texto donde buscar
         * @param patron Patrón a buscar
         * @return Lista de índices donde se encuentra el patrón
         */
        public static List<Integer> busquedaKMP(String texto, String patron) {
            List<Integer> indices = new ArrayList<>();
            int m = patron.length();
            int n = texto.length();
            
            if (m == 0) {
                return indices;
            }
            
            // Preprocesar el patrón
            int[] lps = computarLPSArray(patron);
            
            int i = 0; // índice para texto[]
            int j = 0; // índice para patron[]
            
            while (i < n) {
                if (patron.charAt(j) == texto.charAt(i)) {
                    j++;
                    i++;
                }
                
                if (j == m) {
                    indices.add(i - j);
                    j = lps[j - 1];
                } else if (i < n && patron.charAt(j) != texto.charAt(i)) {
                    if (j != 0) {
                        j = lps[j - 1];
                    } else {
                        i++;
                    }
                }
            }
            
            return indices;
        }
        
        /**
         * Preprocesamiento para KMP
         */
        private static int[] computarLPSArray(String patron) {
            int m = patron.length();
            int[] lps = new int[m];
            
            int len = 0;
            int i = 1;
            lps[0] = 0;
            
            while (i < m) {
                if (patron.charAt(i) == patron.charAt(len)) {
                    len++;
                    lps[i] = len;
                    i++;
                } else {
                    if (len != 0) {
                        len = lps[len - 1];
                    } else {
                        lps[i] = 0;
                        i++;
                    }
                }
            }
            
            return lps;
        }
        
        /**
         * Algoritmo de búsqueda de Boyer-Moore
         * 
         * @param texto Texto donde buscar
         * @param patron Patrón a buscar
         * @return Lista de índices donde se encuentra el patrón
         */
        public static List<Integer> busquedaBoyerMoore(String texto, String patron) {
            List<Integer> indices = new ArrayList<>();
            int m = patron.length();
            int n = texto.length();
            
            if (m == 0) {
                return indices;
            }
            
            int[] saltoMalo = new int[256];
            for (int i = 0; i < 256; i++) {
                saltoMalo[i] = m;
            }
            
            for (int i = 0; i < m - 1; i++) {
                saltoMalo[patron.charAt(i)] = m - 1 - i;
            }
            
            int s = 0;
            while (s <= (n - m)) {
                int j = m - 1;
                
                while (j >= 0 && patron.charAt(j) == texto.charAt(s + j)) {
                    j--;
                }
                
                if (j < 0) {
                    indices.add(s);
                    s += 1;
                } else {
                    s += Math.max(1, j - saltoMalo[texto.charAt(s + j)]);
                }
            }
              return indices;
        }
        
        /**
         * Algoritmo de búsqueda Rabin-Karp
         * 
         * @param texto Texto donde buscar
         * @param patron Patrón a buscar
         * @return Lista de índices donde se encuentra el patrón
         */
        public static List<Integer> busquedaRabinKarp(String texto, String patron) {
            List<Integer> indices = new ArrayList<>();
            int m = patron.length();
            int n = texto.length();
            
            if (m == 0 || m > n) {
                return indices;
            }
            
            // Valores para el algoritmo hash
            int d = 256; // Número de caracteres en el alfabeto
            int q = 101; // Un número primo grande
            
            int h = 1;
            for (int i = 0; i < m - 1; i++) {
                h = (h * d) % q;
            }
            
            // Calcular hash para patrón y primera ventana del texto
            int p = 0; // hash para patrón
            int t = 0; // hash para la primera ventana del texto
            
            for (int i = 0; i < m; i++) {
                p = (d * p + patron.charAt(i)) % q;
                t = (d * t + texto.charAt(i)) % q;
            }
            
            // Deslizar el patrón sobre el texto
            for (int i = 0; i <= n - m; i++) {
                // Verificar si los hashes coinciden
                if (p == t) {
                    // Verificar caracteres uno por uno
                    boolean iguales = true;
                    for (int j = 0; j < m; j++) {
                        if (texto.charAt(i + j) != patron.charAt(j)) {
                            iguales = false;
                            break;
                        }
                    }
                    
                    if (iguales) {
                        indices.add(i);
                    }
                }
                
                // Calcular hash para la siguiente ventana
                if (i < n - m) {
                    t = (d * (t - texto.charAt(i) * h) + texto.charAt(i + m)) % q;
                    if (t < 0) {
                        t = (t + q);
                    }
                }
            }
            
            return indices;
        }
    }
    
    /**
     * Clase para demostrar algoritmos de compresión básicos
     */
    public static class AlgoritmosCompresion {
        
        /**
         * Compresión básica Run-Length Encoding (RLE)
         * 
         * @param texto Texto a comprimir
         * @return Texto comprimido
         */
        public static String comprimirRLE(String texto) {
            if (texto == null || texto.isEmpty()) {
                return "";
            }
            
            StringBuilder resultado = new StringBuilder();
            int contador = 1;
            char caracter = texto.charAt(0);
            
            for (int i = 1; i < texto.length(); i++) {
                if (texto.charAt(i) == caracter) {
                    contador++;
                } else {
                    resultado.append(contador).append(caracter);
                    caracter = texto.charAt(i);
                    contador = 1;
                }
            }
            
            resultado.append(contador).append(caracter);
            return resultado.toString();
        }
        
        /**
         * Descompresión de texto comprimido con RLE
         * 
         * @param textoComprimido Texto comprimido
         * @return Texto descomprimido
         */
        public static String descomprimirRLE(String textoComprimido) {
            if (textoComprimido == null || textoComprimido.isEmpty()) {
                return "";
            }
            
            StringBuilder resultado = new StringBuilder();
            int i = 0;
            
            while (i < textoComprimido.length()) {
                StringBuilder contadorStr = new StringBuilder();
                
                // Leer el contador
                while (i < textoComprimido.length() && Character.isDigit(textoComprimido.charAt(i))) {
                    contadorStr.append(textoComprimido.charAt(i));
                    i++;
                }
                
                if (contadorStr.length() > 0 && i < textoComprimido.length()) {
                    int contador = Integer.parseInt(contadorStr.toString());
                    char caracter = textoComprimido.charAt(i);
                    
                    // Repetir el carácter según el contador
                    for (int j = 0; j < contador; j++) {
                        resultado.append(caracter);
                    }
                    
                    i++;
                } else {
                    break;
                }
            }
            
            return resultado.toString();
        }
        
        /**
         * Implementación básica de codificación Huffman
         */
        public static class Huffman {
            // Nodo para el árbol Huffman
            private static class Nodo implements Comparable<Nodo> {
                char caracter;
                int frecuencia;
                Nodo izquierdo, derecho;
                
                public Nodo(char caracter, int frecuencia) {
                    this.caracter = caracter;
                    this.frecuencia = frecuencia;
                }
                
                public Nodo(int frecuencia, Nodo izquierdo, Nodo derecho) {
                    this.frecuencia = frecuencia;
                    this.izquierdo = izquierdo;
                    this.derecho = derecho;
                    this.caracter = '\0'; // Nodo interno
                }
                
                @Override
                public int compareTo(Nodo otro) {
                    return this.frecuencia - otro.frecuencia;
                }
                
                public boolean esHoja() {
                    return izquierdo == null && derecho == null;
                }
            }
            
            /**
             * Construye un árbol de Huffman a partir de un texto
             * 
             * @param texto Texto para construir el árbol
             * @return Raíz del árbol Huffman
             */
            public static Nodo construirArbol(String texto) {
                if (texto == null || texto.isEmpty()) {
                    return null;
                }
                
                // Calcular frecuencias
                Map<Character, Integer> frecuencias = new HashMap<>();
                for (char c : texto.toCharArray()) {
                    frecuencias.put(c, frecuencias.getOrDefault(c, 0) + 1);
                }
                
                // Crear nodos hoja
                PriorityQueue<Nodo> cola = new PriorityQueue<>();
                for (Map.Entry<Character, Integer> entry : frecuencias.entrySet()) {
                    cola.add(new Nodo(entry.getKey(), entry.getValue()));
                }
                
                // Construir árbol
                while (cola.size() > 1) {
                    Nodo izquierdo = cola.poll();
                    Nodo derecho = cola.poll();
                    
                    Nodo padre = new Nodo(izquierdo.frecuencia + derecho.frecuencia, izquierdo, derecho);
                    cola.add(padre);
                }
                
                return cola.poll();
            }
            
            /**
             * Genera códigos Huffman a partir del árbol
             * 
             * @param raiz Raíz del árbol Huffman
             * @return Mapa de caracteres a códigos binarios
             */
            public static Map<Character, String> generarCodigos(Nodo raiz) {
                Map<Character, String> codigos = new HashMap<>();
                generarCodigosRecursivo(raiz, "", codigos);
                return codigos;
            }
            
            private static void generarCodigosRecursivo(Nodo nodo, String codigo, Map<Character, String> codigos) {
                if (nodo == null) {
                    return;
                }
                
                if (nodo.esHoja()) {
                    codigos.put(nodo.caracter, codigo.isEmpty() ? "0" : codigo);
                    return;
                }
                
                generarCodigosRecursivo(nodo.izquierdo, codigo + "0", codigos);
                generarCodigosRecursivo(nodo.derecho, codigo + "1", codigos);
            }
            
            /**
             * Comprime un texto usando codificación Huffman
             * 
             * @param texto Texto a comprimir
             * @return Texto comprimido (representación binaria como string)
             */
            public static String comprimir(String texto) {
                if (texto == null || texto.isEmpty()) {
                    return "";
                }
                
                Nodo raiz = construirArbol(texto);
                Map<Character, String> codigos = generarCodigos(raiz);
                
                StringBuilder resultado = new StringBuilder();
                for (char c : texto.toCharArray()) {
                    resultado.append(codigos.get(c));
                }
                
                return resultado.toString();
            }
        }
    }
    
    /**
     * Clase para demostrar el manejo de expresiones regulares
     */
    public static class DemoRegex {
        
        /**
         * Valida un email usando expresiones regulares
         * 
         * @param email Email a validar
         * @return true si el email es válido
         */
        public static boolean validarEmail(String email) {
            if (email == null) {
                return false;
            }
            String regex = "^[A-Za-z0-9+_.-]+@([A-Za-z0-9.-]+\\.[A-Za-z]{2,})$";
            return email.matches(regex);
        }
        
        /**
         * Valida un número de teléfono español usando expresiones regulares
         * 
         * @param telefono Teléfono a validar
         * @return true si el teléfono es válido
         */
        public static boolean validarTelefonoEspanol(String telefono) {
            if (telefono == null) {
                return false;
            }
            String regex = "^(\\+34|0034|34)?[ -]*(6|7|8|9)[ -]*([0-9][ -]*){8}$";
            return telefono.matches(regex);
        }
        
        /**
         * Extrae todas las URLs de un texto
         * 
         * @param texto Texto donde buscar URLs
         * @return Lista de URLs encontradas
         */
        public static List<String> extraerURLs(String texto) {
            List<String> urls = new ArrayList<>();
            if (texto == null || texto.isEmpty()) {
                return urls;
            }
            
            String regex = "https?://(?:www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)";
            java.util.regex.Pattern pattern = java.util.regex.Pattern.compile(regex);
            java.util.regex.Matcher matcher = pattern.matcher(texto);
            
            while (matcher.find()) {
                urls.add(matcher.group());
            }
            
            return urls;
        }
        
        /**
         * Extrae todas las fechas en formato DD/MM/YYYY de un texto
         * 
         * @param texto Texto donde buscar fechas
         * @return Lista de fechas encontradas
         */
        public static List<String> extraerFechas(String texto) {
            List<String> fechas = new ArrayList<>();
            if (texto == null || texto.isEmpty()) {
                return fechas;
            }
            
            String regex = "(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(19|20)\\d\\d";
            java.util.regex.Pattern pattern = java.util.regex.Pattern.compile(regex);
            java.util.regex.Matcher matcher = pattern.matcher(texto);
            
            while (matcher.find()) {
                fechas.add(matcher.group());
            }
            
            return fechas;
        }
        
        /**
         * Reemplaza todas las ocurrencias de un patrón en un texto
         * 
         * @param texto Texto original
         * @param patron Patrón a buscar
         * @param reemplazo Texto de reemplazo
         * @return Texto con reemplazos
         */
        public static String reemplazar(String texto, String patron, String reemplazo) {
            if (texto == null || patron == null || reemplazo == null) {
                return texto;
            }
            
            return texto.replaceAll(patron, reemplazo);
        }
    }
    
    /**
     * Clase para demostrar algoritmos de machine learning básicos
     */
    public static class AlgoritmosML {
        
        /**
         * Implementación simple de un clasificador K-Nearest Neighbors (KNN)
         */
        public static class KNN {
            private double[][] datos;
            private int[] etiquetas;
            private int k;
            
            /**
             * Constructor para KNN
             * 
             * @param datos Matriz de características (cada fila es una muestra, cada columna una característica)
             * @param etiquetas Vector de etiquetas de clase
             * @param k Número de vecinos a considerar
             */
            public KNN(double[][] datos, int[] etiquetas, int k) {
                this.datos = datos;
                this.etiquetas = etiquetas;
                this.k = k;
            }
            
            /**
             * Calcula la distancia euclidiana entre dos vectores
             * 
             * @param a Primer vector
             * @param b Segundo vector
             * @return Distancia euclidiana
             */
            private double distanciaEuclidiana(double[] a, double[] b) {
                double suma = 0.0;
                for (int i = 0; i < a.length; i++) {
                    suma += Math.pow(a[i] - b[i], 2);
                }
                return Math.sqrt(suma);
            }
            
            /**
             * Predice la clase de una nueva muestra
             * 
             * @param muestra Vector de características de la nueva muestra
             * @return Etiqueta de clase predicha
             */
            public int predecir(double[] muestra) {
                // Calcular distancias a todas las muestras
                double[] distancias = new double[datos.length];
                for (int i = 0; i < datos.length; i++) {
                    distancias[i] = distanciaEuclidiana(datos[i], muestra);
                }
                
                // Encontrar los k vecinos más cercanos
                int[] indices = new int[k];
                for (int i = 0; i < k; i++) {
                    double minDist = Double.MAX_VALUE;
                    int minIdx = -1;
                    
                    for (int j = 0; j < distancias.length; j++) {
                        boolean yaSeleccionado = false;
                        for (int l = 0; l < i; l++) {
                            if (indices[l] == j) {
                                yaSeleccionado = true;
                                break;
                            }
                        }
                        
                        if (!yaSeleccionado && distancias[j] < minDist) {
                            minDist = distancias[j];
                            minIdx = j;
                        }
                    }
                    
                    indices[i] = minIdx;
                }
                
                // Contar votos para cada clase
                Map<Integer, Integer> votos = new HashMap<>();
                for (int i = 0; i < k; i++) {
                    int etiqueta = etiquetas[indices[i]];
                    votos.put(etiqueta, votos.getOrDefault(etiqueta, 0) + 1);
                }
                
                // Encontrar la clase con más votos
                int maxVotos = -1;
                int clasePredicha = -1;
                
                for (Map.Entry<Integer, Integer> entry : votos.entrySet()) {
                    if (entry.getValue() > maxVotos) {
                        maxVotos = entry.getValue();
                        clasePredicha = entry.getKey();
                    }
                }
                
                return clasePredicha;
            }
        }
        
        /**
         * Implementación simple de regresión lineal
         */
        public static class RegresionLineal {
            private double pendiente;
            private double intercepto;
            
            /**
             * Entrena el modelo con datos de entrada
             * 
             * @param x Vector de variables independientes
             * @param y Vector de variables dependientes
             */
            public void entrenar(double[] x, double[] y) {
                if (x.length != y.length || x.length == 0) {
                    throw new IllegalArgumentException("Los vectores deben tener la misma longitud y no estar vacíos");
                }
                
                // Calcular medias
                double mediaX = 0.0;
                double mediaY = 0.0;
                
                for (int i = 0; i < x.length; i++) {
                    mediaX += x[i];
                    mediaY += y[i];
                }
                
                mediaX /= x.length;
                mediaY /= y.length;
                
                // Calcular pendiente
                double numerador = 0.0;
                double denominador = 0.0;
                
                for (int i = 0; i < x.length; i++) {
                    numerador += (x[i] - mediaX) * (y[i] - mediaY);
                    denominador += Math.pow(x[i] - mediaX, 2);
                }
                
                pendiente = numerador / denominador;
                intercepto = mediaY - pendiente * mediaX;
            }
            
            /**
             * Predice valores para nuevas entradas
             * 
             * @param x Valor de entrada
             * @return Valor predicho
             */
            public double predecir(double x) {
                return pendiente * x + intercepto;
            }
            
            /**
             * Calcula el error cuadrático medio del modelo
             * 
             * @param x Vector de variables independientes
             * @param y Vector de variables dependientes reales
             * @return Error cuadrático medio
             */
            public double calcularError(double[] x, double[] y) {
                if (x.length != y.length || x.length == 0) {
                    throw new IllegalArgumentException("Los vectores deben tener la misma longitud y no estar vacíos");
                }
                
                double sumaCuadrados = 0.0;
                
                for (int i = 0; i < x.length; i++) {
                    double prediccion = predecir(x[i]);
                    sumaCuadrados += Math.pow(y[i] - prediccion, 2);
                }
                
                return sumaCuadrados / x.length;
            }
            
            /**
             * Obtiene la pendiente del modelo
             * 
             * @return Pendiente
             */
            public double getPendiente() {
                return pendiente;
            }
            
            /**
             * Obtiene el intercepto del modelo
             * 
             * @return Intercepto
             */
            public double getIntercepto() {
                return intercepto;
            }
            
            @Override
            public String toString() {
                return String.format("y = %.4fx + %.4f", pendiente, intercepto);
            }
        }
    }
    
    /**
     * Clase para demostrar algoritmos de procesamiento de imágenes básicos
     * (Simulación sin usar bibliotecas externas)
     */
    public static class ProcesadoImagenes {
        
        /**
         * Representa una imagen como una matriz de enteros (simulación)
         */
        public static class Imagen {
            private int[][] pixeles;
            private int ancho;
            private int alto;
            
            /**
             * Constructor para crear una imagen en blanco
             * 
             * @param ancho Ancho de la imagen
             * @param alto Alto de la imagen
             */
            public Imagen(int ancho, int alto) {
                this.ancho = ancho;
                this.alto = alto;
                this.pixeles = new int[alto][ancho];
            }
            
            /**
             * Constructor para crear una imagen con datos existentes
             * 
             * @param pixeles Matriz de pixeles
             */
            public Imagen(int[][] pixeles) {
                this.pixeles = pixeles;
                this.alto = pixeles.length;
                this.ancho = pixeles[0].length;
            }
            
            /**
             * Obtiene el valor de un pixel
             * 
             * @param x Coordenada x
             * @param y Coordenada y
             * @return Valor del pixel
             */
            public int getPixel(int x, int y) {
                if (x < 0 || x >= ancho || y < 0 || y >= alto) {
                    return 0;
                }
                return pixeles[y][x];
            }
            
            /**
             * Establece el valor de un pixel
             * 
             * @param x Coordenada x
             * @param y Coordenada y
             * @param valor Valor del pixel
             */
            public void setPixel(int x, int y, int valor) {
                if (x >= 0 && x < ancho && y >= 0 && y < alto) {
                    pixeles[y][x] = valor;
                }
            }
            
            /**
             * Obtiene el ancho de la imagen
             * 
             * @return Ancho
             */
            public int getAncho() {
                return ancho;
            }
            
            /**
             * Obtiene el alto de la imagen
             * 
             * @return Alto
             */
            public int getAlto() {
                return alto;
            }
            
            /**
             * Obtiene la matriz de pixeles
             * 
             * @return Matriz de pixeles
             */
            public int[][] getPixeles() {
                return pixeles;
            }
        }
        
        /**
         * Aplica un filtro de escala de grises a una imagen
         * 
         * @param imagen Imagen original (RGB)
         * @return Nueva imagen en escala de grises
         */
        public static Imagen escalaGrises(Imagen imagen) {
            int ancho = imagen.getAncho();
            int alto = imagen.getAlto();
            Imagen resultado = new Imagen(ancho, alto);
            
            for (int y = 0; y < alto; y++) {
                for (int x = 0; x < ancho; x++) {
                    int rgb = imagen.getPixel(x, y);
                    
                    int r = (rgb >> 16) & 0xFF;
                    int g = (rgb >> 8) & 0xFF;
                    int b = rgb & 0xFF;
                    
                    // Fórmula estándar para escala de grises
                    int gris = (int) (0.299 * r + 0.587 * g + 0.114 * b);
                    
                    // Crear nuevo valor RGB con todos los canales iguales
                    int nuevoRgb = (gris << 16) | (gris << 8) | gris;
                    
                    resultado.setPixel(x, y, nuevoRgb);
                }
            }
            
            return resultado;
        }
        
        /**
         * Aplica un filtro de blur (desenfoque) a una imagen
         * 
         * @param imagen Imagen original
         * @param radio Radio del blur
         * @return Nueva imagen con blur aplicado
         */
        public static Imagen aplicarBlur(Imagen imagen, int radio) {
            int ancho = imagen.getAncho();
            int alto = imagen.getAlto();
            Imagen resultado = new Imagen(ancho, alto);
            
            for (int y = 0; y < alto; y++) {
                for (int x = 0; x < ancho; x++) {
                    int sumaR = 0;
                    int sumaG = 0;
                    int sumaB = 0;
                    int contador = 0;
                    
                    for (int ky = -radio; ky <= radio; ky++) {
                        for (int kx = -radio; kx <= radio; kx++) {
                            int nx = x + kx;
                            int ny = y + ky;
                            
                            if (nx >= 0 && nx < ancho && ny >= 0 && ny < alto) {
                                int rgb = imagen.getPixel(nx, ny);
                                
                                int r = (rgb >> 16) & 0xFF;
                                int g = (rgb >> 8) & 0xFF;
                                int b = rgb & 0xFF;
                                
                                sumaR += r;
                                sumaG += g;
                                sumaB += b;
                                contador++;
                            }
                        }
                    }
                    
                    int r = sumaR / contador;
                    int g = sumaG / contador;
                    int b = sumaB / contador;
                    
                    int nuevoRgb = (r << 16) | (g << 8) | b;
                    resultado.setPixel(x, y, nuevoRgb);
                }
            }
            
            return resultado;
        }
        
        /**
         * Aplica un filtro de detección de bordes a una imagen
         * 
         * @param imagen Imagen original
         * @return Nueva imagen con bordes detectados
         */
        public static Imagen detectarBordes(Imagen imagen) {
            int ancho = imagen.getAncho();
            int alto = imagen.getAlto();
            
            // Primero convertir a escala de grises
            Imagen gris = escalaGrises(imagen);
            Imagen resultado = new Imagen(ancho, alto);
            
            // Kernel de Sobel para detección de bordes
            int[][] sobelX = {
                {-1, 0, 1},
                {-2, 0, 2},
                {-1, 0, 1}
            };
            
            int[][] sobelY = {
                {-1, -2, -1},
                {0, 0, 0},
                {1, 2, 1}
            };
            
            for (int y = 1; y < alto - 1; y++) {
                for (int x = 1; x < ancho - 1; x++) {
                    int gx = 0;
                    int gy = 0;
                    
                    // Aplicar kernels
                    for (int ky = -1; ky <= 1; ky++) {
                        for (int kx = -1; kx <= 1; kx++) {
                            int pixel = gris.getPixel(x + kx, y + ky) & 0xFF;
                            
                            gx += pixel * sobelX[ky + 1][kx + 1];
                            gy += pixel * sobelY[ky + 1][kx + 1];
                        }
                    }
                    
                    // Magnitud del gradiente
                    int magnitud = (int) Math.sqrt(gx * gx + gy * gy);
                    
                    // Limitar a 0-255
                    magnitud = Math.min(255, Math.max(0, magnitud));
                    
                    int valorBorde = (magnitud << 16) | (magnitud << 8) | magnitud;
                    resultado.setPixel(x, y, valorBorde);
                }
            }
            
            return resultado;
        }
    }
    
    /**
     * Clase para demostrar operaciones de criptografía básicas
     */
    public static class Criptografia {
        
        /**
         * Cifrado César básico
         * 
         * @param texto Texto a cifrar
         * @param desplazamiento Cantidad de posiciones a desplazar
         * @return Texto cifrado
         */
        public static String cifradoCesar(String texto, int desplazamiento) {
            if (texto == null || texto.isEmpty()) {
                return "";
            }
            
            StringBuilder resultado = new StringBuilder();
            
            for (char c : texto.toCharArray()) {
                if (Character.isLetter(c)) {
                    char base = Character.isUpperCase(c) ? 'A' : 'a';
                    // Aplicar el desplazamiento circular (módulo 26)
                    char cifrado = (char) (((c - base + desplazamiento) % 26) + base);
                    resultado.append(cifrado);
                } else {
                    resultado.append(c); // Mantener caracteres no alfabéticos
                }
            }
            
            return resultado.toString();
        }
        
        /**
         * Descifrado César
         * 
         * @param textoCifrado Texto cifrado
         * @param desplazamiento Cantidad de posiciones desplazadas
         * @return Texto descifrado
         */
        public static String descifradoCesar(String textoCifrado, int desplazamiento) {
            return cifradoCesar(textoCifrado, 26 - (desplazamiento % 26));
        }
        
        /**
         * Cifrado Vigenère
         * 
         * @param texto Texto a cifrar
         * @param clave Clave para el cifrado
         * @return Texto cifrado
         */
        public static String cifradoVigenere(String texto, String clave) {
            if (texto == null || texto.isEmpty() || clave == null || clave.isEmpty()) {
                return "";
            }
            
            StringBuilder resultado = new StringBuilder();
            clave = clave.toUpperCase();
            int claveLen = clave.length();
            int claveIndex = 0;
            
            for (char c : texto.toCharArray()) {
                if (Character.isLetter(c)) {
                    char base = Character.isUpperCase(c) ? 'A' : 'a';
                    // Obtener desplazamiento de la clave
                    int desplazamiento = clave.charAt(claveIndex % claveLen) - 'A';
                    // Aplicar cifrado César con este desplazamiento
                    char cifrado = (char) (((c - base + desplazamiento) % 26) + base);
                    resultado.append(cifrado);
                    claveIndex++;
                } else {
                    resultado.append(c);
                }
            }
            
            return resultado.toString();
        }
        
        /**
         * Descifrado Vigenère
         * 
         * @param textoCifrado Texto cifrado
         * @param clave Clave utilizada para cifrar
         * @return Texto descifrado
         */
        public static String descifradoVigenere(String textoCifrado, String clave) {
            if (textoCifrado == null || textoCifrado.isEmpty() || clave == null || clave.isEmpty()) {
                return "";
            }
            
            StringBuilder resultado = new StringBuilder();
            clave = clave.toUpperCase();
            int claveLen = clave.length();
            int claveIndex = 0;
            
            for (char c : textoCifrado.toCharArray()) {
                if (Character.isLetter(c)) {
                    char base = Character.isUpperCase(c) ? 'A' : 'a';
                    // Obtener desplazamiento de la clave
                    int desplazamiento = clave.charAt(claveIndex % claveLen) - 'A';
                    // Aplicar descifrado César con este desplazamiento
                    char descifrado = (char) (((c - base - desplazamiento + 26) % 26) + base);
                    resultado.append(descifrado);
                    claveIndex++;
                } else {
                    resultado.append(c);
                }
            }
            
            return resultado.toString();
        }
        
        /**
         * Genera un hash simple (no seguro, solo para demostración)
         * 
         * @param texto Texto a hashear
         * @return Valor hash como cadena hexadecimal
         */
        public static String hashSimple(String texto) {
            if (texto == null) {
                return "";
            }
            
            int hash = 0;
            
            for (int i = 0; i < texto.length(); i++) {
                hash = (hash * 31 + texto.charAt(i)) % 1000000007;
            }
            
            return Integer.toHexString(hash);
        }
    }
    
    /**
     * Clase para demostrar algoritmos de inteligencia artificial básicos
     */
    public static class AlgoritmosIA {
        
        /**
         * Implementación simple de un perceptrón para clasificación binaria
         */
        public static class Perceptron {
            private double[] pesos;
            private double bias;
            private double tasaAprendizaje;
            
            /**
             * Constructor para el perceptrón
             * 
             * @param numEntradas Número de características de entrada
             * @param tasaAprendizaje Tasa de aprendizaje para actualizar pesos
             */
            public Perceptron(int numEntradas, double tasaAprendizaje) {
                this.pesos = new double[numEntradas];
                this.bias = 0.0;
                this.tasaAprendizaje = tasaAprendizaje;
                
                // Inicializar pesos con valores aleatorios pequeños
                Random random = new Random(42);
                for (int i = 0; i < numEntradas; i++) {
                    pesos[i] = random.nextDouble() * 0.1 - 0.05;
                }
            }
            
            /**
             * Función de activación (escalón)
             * 
             * @param suma Suma ponderada
             * @return 1 si suma > 0, 0 en caso contrario
             */
            private int activacion(double suma) {
                return suma > 0 ? 1 : 0;
            }
            
            /**
             * Predice la clase de una muestra
             * 
             * @param entradas Vector de características
             * @return Clase predicha (0 o 1)
             */
            public int predecir(double[] entradas) {
                if (entradas.length != pesos.length) {
                    throw new IllegalArgumentException("Número de entradas incorrecto");
                }
                
                double suma = bias;
                for (int i = 0; i < entradas.length; i++) {
                    suma += entradas[i] * pesos[i];
                }
                
                return activacion(suma);
            }
            
            /**
             * Entrena el perceptrón con un conjunto de datos
             * 
             * @param X Matriz de características (cada fila es una muestra)
             * @param y Vector de etiquetas (0 o 1)
             * @param epocas Número de épocas de entrenamiento
             * @return Historia de errores por época
             */
            public double[] entrenar(double[][] X, int[] y, int epocas) {
                if (X.length != y.length) {
                    throw new IllegalArgumentException("Número de muestras y etiquetas debe ser igual");
                }
                
                double[] errores = new double[epocas];
                
                for (int epoca = 0; epoca < epocas; epoca++) {
                    int erroresEpoca = 0;
                    
                    for (int i = 0; i < X.length; i++) {
                        // Predecir
                        int prediccion = predecir(X[i]);
                        
                        // Calcular error
                        int error = y[i] - prediccion;
                        
                        if (error != 0) {
                            erroresEpoca++;
                            
                            // Actualizar bias
                            bias += tasaAprendizaje * error;
                            
                            // Actualizar pesos
                            for (int j = 0; j < pesos.length; j++) {
                                pesos[j] += tasaAprendizaje * error * X[i][j];
                            }
                        }
                    }
                    
                    // Guardar tasa de error para esta época
                    errores[epoca] = (double) erroresEpoca / X.length;
                }
                
                return errores;
            }
            
            /**
             * Obtiene los pesos del perceptrón
             * 
             * @return Vector de pesos
             */
            public double[] getPesos() {
                return pesos;
            }
            
            /**
             * Obtiene el bias del perceptrón
             * 
             * @return Bias
             */
            public double getBias() {
                return bias;
            }
        }
        
        /**
         * Implementación simple de un algoritmo genético
         */
        public static class AlgoritmoGenetico {
            private int tamPoblacion;
            private int longIndividuo;
            private double tasaMutacion;
            private double tasaCruce;
            private Random random;
            
            /**
             * Constructor para el algoritmo genético
             * 
             * @param tamPoblacion Tamaño de la población
             * @param longIndividuo Longitud de cada individuo (cromosoma)
             * @param tasaMutacion Probabilidad de mutación (0-1)
             * @param tasaCruce Probabilidad de cruce (0-1)
             */
            public AlgoritmoGenetico(int tamPoblacion, int longIndividuo, double tasaMutacion, double tasaCruce) {
                this.tamPoblacion = tamPoblacion;
                this.longIndividuo = longIndividuo;
                this.tasaMutacion = tasaMutacion;
                this.tasaCruce = tasaCruce;
                this.random = new Random(42);
            }
            
            /**
             * Genera una población inicial aleatoria
             * 
             * @return Matriz de individuos (cada fila es un individuo)
             */
            public int[][] inicializarPoblacion() {
                int[][] poblacion = new int[tamPoblacion][longIndividuo];
                
                for (int i = 0; i < tamPoblacion; i++) {
                    for (int j = 0; j < longIndividuo; j++) {
                        poblacion[i][j] = random.nextInt(2);  // Valores binarios (0 o 1)
                    }
                }
                
                return poblacion;
            }
            
            /**
             * Evalúa la aptitud de un individuo (fitness)
             * Este es un ejemplo simple que cuenta unos
             * 
             * @param individuo Vector binario
             * @return Valor de aptitud
             */
            public int evaluar(int[] individuo) {
                int suma = 0;
                for (int gen : individuo) {
                    suma += gen;
                }
                return suma;
            }
            
            /**
             * Selecciona individuos para reproducción mediante torneo
             * 
             * @param poblacion Población actual
             * @param tamTorneo Tamaño del torneo
             * @return Índice del individuo seleccionado
             */
            public int seleccionTorneo(int[][] poblacion, int tamTorneo) {
                int mejorIndice = random.nextInt(tamPoblacion);
                int mejorFitness = evaluar(poblacion[mejorIndice]);
                
                for (int i = 1; i < tamTorneo; i++) {
                    int indice = random.nextInt(tamPoblacion);
                    int fitness = evaluar(poblacion[indice]);
                    
                    if (fitness > mejorFitness) {
                        mejorFitness = fitness;
                        mejorIndice = indice;
                    }
                }
                
                return mejorIndice;
            }
            
            /**
             * Realiza cruce entre dos padres
             * 
             * @param padre1 Primer padre
             * @param padre2 Segundo padre
             * @return Dos hijos resultantes del cruce
             */
            public int[][] cruce(int[] padre1, int[] padre2) {
                int[][] hijos = new int[2][longIndividuo];
                
                if (random.nextDouble() < tasaCruce) {
                    // Punto de cruce aleatorio
                    int punto = random.nextInt(longIndividuo - 1) + 1;
                    
                    // Primer hijo
                    for (int i = 0; i < punto; i++) {
                        hijos[0][i] = padre1[i];
                    }
                    for (int i = punto; i < longIndividuo; i++) {
                        hijos[0][i] = padre2[i];
                    }
                    
                    // Segundo hijo
                    for (int i = 0; i < punto; i++) {
                        hijos[1][i] = padre2[i];
                    }
                    for (int i = punto; i < longIndividuo; i++) {
                        hijos[1][i] = padre1[i];
                    }
                } else {
                    // Sin cruce, copiar padres
                    hijos[0] = padre1.clone();
                    hijos[1] = padre2.clone();
                }
                
                return hijos;
            }
            
            /**
             * Aplica mutación a un individuo
             * 
             * @param individuo Individuo a mutar
             */
            public void mutar(int[] individuo) {
                for (int i = 0; i < longIndividuo; i++) {
                    if (random.nextDouble() < tasaMutacion) {
                        // Invertir bit
                        individuo[i] = 1 - individuo[i];
                    }
                }
            }
            
            /**
             * Ejecuta el algoritmo genético
             * 
             * @param generaciones Número de generaciones
             * @return Mejor individuo encontrado
             */
            public int[] ejecutar(int generaciones) {
                // Inicializar población
                int[][] poblacion = inicializarPoblacion();
                
                // Mejor individuo global
                int[] mejorIndividuo = null;
                int mejorFitness = -1;
                
                for (int gen = 0; gen < generaciones; gen++) {
                    // Nueva población
                    int[][] nuevaPoblacion = new int[tamPoblacion][longIndividuo];
                    
                    // Elitismo: conservar al mejor
                    int indiceMejor = 0;
                    int fitnessMejor = evaluar(poblacion[0]);
                    
                    for (int i = 1; i < tamPoblacion; i++) {
                        int fitness = evaluar(poblacion[i]);
                        if (fitness > fitnessMejor) {
                            fitnessMejor = fitness;
                            indiceMejor = i;
                        }
                    }
                    
                    // Actualizar mejor global
                    if (fitnessMejor > mejorFitness) {
                        mejorFitness = fitnessMejor;
                        mejorIndividuo = poblacion[indiceMejor].clone();
                    }
                    
                    // Conservar el mejor
                    nuevaPoblacion[0] = poblacion[indiceMejor].clone();
                    
                    // Crear el resto de la población
                    for (int i = 1; i < tamPoblacion; i += 2) {
                        // Seleccionar padres
                        int indicePadre1 = seleccionTorneo(poblacion, 3);
                        int indicePadre2 = seleccionTorneo(poblacion, 3);
                        
                        // Cruzar
                        int[][] hijos = cruce(poblacion[indicePadre1], poblacion[indicePadre2]);
                        
                        // Mutar
                        mutar(hijos[0]);
                        mutar(hijos[1]);
                        
                        // Añadir a nueva población
                        nuevaPoblacion[i] = hijos[0];
                        if (i + 1 < tamPoblacion) {
                            nuevaPoblacion[i + 1] = hijos[1];
                        }
                    }
                    
                    // Reemplazar población
                    poblacion = nuevaPoblacion;
                }
                
                return mejorIndividuo;
            }
        }
    }
}
