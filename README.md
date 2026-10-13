# App: Mis Libros
# Reflexión
# 1. ¿Por qué es conveniente separar la lógica de los libros de App.tsx?
Porque permite tener un código más ordenado, al dejar la lógica fuera de App.tsx, la
pantalla solo se encarga de mostrar la interfaz visual.
# 2. ¿Qué responsabilidad tiene LibroService?
Es responsable de la gestión y manipulación de los datos. Administra la colección de
libros y expone las operaciones de crear, leer y eliminar, que son necesarias para que
la interfaz interactúe con el estado del sistema.
# 3. ¿Qué responsabilidad tiene la clase Libro?
Es responsable de encapsular la estructura de datos individual de un libro como el id,
titulo, autor y anio, proteger sus atributos mediante modificadores de acceso y proveer
métodos específicos sobre el comportamiento de un libro.

# Cambios Anteriores: Repository y Singleton
1. LibroRepository: se creó para encargarse de almacenar y administrar la lista de libros 
(obtener, agregar y eliminar).
2. Patrón Singleton: se aplicó en LibroRepository usando un constructor privado y el método 
getInstance() para asegurar que exista una sola instancia en toda la app.
3. Capturas de Pantalla: La comprobación del singleton y la aplicación funcionando.

## Nuevos Cambios: Supabase y Autenticación
1. ¿Cómo la autenticación se relaciona con el acceso a los datos?
La autenticación verifica la identidad al iniciar sesión, mientras que la seguridad funciona 
como un candado en la base de datos: se asegura de que solo los usuarios que ya iniciaron 
sesión puedan ver, agregar o borrar libros, bloqueando automáticamente cualquier intento de 
acceso sin cuenta.
2. Evidencias de Funcionamiento:
Captura del registro funcionando.
Captura del login funcionando.
Captura de la aplicación mostrando los libros almacenados en Supabase.
Captura del cierre de sesión.