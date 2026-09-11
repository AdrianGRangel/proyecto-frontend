## Funcionalidad EC1 F3 A4
GIFinder consulta GIPHY API para mostrar tendencias,
realizar búsquedas y consultar el detalle de un GIF.
## Configuración de la API
1. Crear una clave individual en GIPHY Developers.
2. Crear `.env.local` en la raíz del proyecto.
3. Agregar la variable:
```text
VITE_GIPHY_API_KEY=TU_CLAVE
```
4. Reiniciar el servidor de Vite.
`.env.local` no debe publicarse. El repositorio incluye
`.env.example` únicamente como referencia.
## Verificación
```bash
pnpm install
pnpm dev
pnpm build

# Preguntas de cierre - EC1 F3 A4
## 1. ¿Qué diferencia existe entre una operación síncrona y una asíncrona?
Operación síncrona: Se ejecuta de forma secuencial y bloqueante. Cada instrucción espera a que termine la anterior para poder continuar, lo que puede congelar la interfaz o la ejecución si una tarea tarda en responder.

Operación asíncrona: Se ejecuta de forma no bloqueante. La tarea se inicia y el hilo principal continúa con otras operaciones; cuando el proceso asíncrono termina, se maneja el resultado mediante callbacks, promesas o async/await.

## 2. ¿Cuáles son los estados de una promesa y qué relación tienen con async/await?
Una promesa en JavaScript puede encontrarse en uno de los siguientes tres estados:

Pending (Pendiente): Estado inicial, la operación aún no ha concluido.
Fulfilled (Cumplida): La operación se completó con éxito y la promesa devuelve un valor.
Rejected (Rechazada): Ocurrió un error durante la operación y la promesa devuelve un motivo (razón del fallo).

Relación con async/await: async/await es simplemente una sintaxis más limpia (azúcar sintáctico) para trabajar con promesas. Una función marcada como async siempre devuelve una promesa, y la palabra await pausa la ejecución de la función asíncrona hasta que la promesa asociada se resuelva (fulfilled) o se rechace (rejected).

## 3. ¿Qué devuelve fetch y qué devuelve response.json()?
fetch: Devuelve una Promesa que se resuelve en un objeto Response que representa la respuesta a la petición HTTP (el cual incluye metadatos como el estado, las cabeceras, etc., pero todavía no el cuerpo procesado).

response.json(): Devuelve una Promesa que se resuelve en el cuerpo de la respuesta parseado como un objeto de JavaScript (generalmente un objeto o un arreglo).

## 4. ¿Por qué es necesario comprobar response.ok?
El método fetch no rechaza la promesa cuando recibe códigos de error HTTP como 404 (Not Found) o 500 (Internal Server Error). Solo se rechaza si hay un fallo de red o un problema que impidió completar la solicitud. Por lo tanto, comprobar response.ok (que es true si el código de estado HTTP está en el rango 200-299) es indispensable para detectar y manejar correctamente los errores del servidor.

## 5. ¿Cómo se utilizan try, catch y unknown para manejar errores en GIFinder?
try...catch: Se utiliza para envolver el código asíncrono que puede fallar. El bloque try ejecuta las peticiones y el bloque catch atrapa cualquier error lanzado durante la ejecución o el procesamiento.

unknown: En TypeScript, al capturar un error en un bloque catch, el tipo por defecto suele ser unknown (o any). Utilizar unknown obliga a realizar una verificación de tipo (por ejemplo, comprobando si el valor es una instancia de Error) antes de acceder a propiedades como error.message, garantizando la seguridad tipada.

## 6. ¿Qué diferencia existe entre GiphyGif y Gif, y qué responsabilidad tiene mapGiphyGif?
GiphyGif: Representa la estructura exacta y cruda de los datos tal como los devuelve la API externa de Giphy (con todas sus propiedades originales).

Gif: Representa el modelo de datos limpio o adaptado que la aplicación local (GIFinder) necesita para funcionar internamente de forma simplificada.

mapGiphyGif: Es una función de mapeo (transformación) cuya responsabilidad es tomar un objeto de tipo GiphyGif y extraer o transformar sus campos para devolver un objeto limpio con el tipo Gif.

## 7. ¿Por qué se utiliza URLSearchParams al construir la solicitud?
Se utiliza para construir y codificar de forma segura los parámetros de consulta (query parameters) en la URL. URLSearchParams se encarga automáticamente de escapar caracteres especiales (como espacios, símbolos y tildes) para que la URL generada sea válida y evite errores de sintaxis o problemas de seguridad en la petición HTTP.

## 8. ¿Qué significa Promise<Gif[]> en el tipo de retorno?
Indica que la función es asíncrona y que, al resolverse con éxito, devolverá una promesa cuyo valor resultante es un arreglo de objetos que cumplen con la interfaz Gif (Gif[]).

## 9. ¿Qué diferencia existe entre .env.local y .env.example, y por qué una variable VITE_ no debe considerarse secreta?
.env.local: Archivo local donde se almacenan las variables de entorno reales y credenciales privadas del proyecto. Este archivo nunca debe subirse al repositorio de control de versiones (Git).
.env.example: Archivo de plantilla que se sube al repositorio para mostrar al equipo qué variables de entorno son necesarias para ejecutar la aplicación, pero sin incluir los valores reales o secretos.
Por qué las variables con prefijo VITE_ no son secretas: En aplicaciones de Vite, cualquier variable que comience con VITE_ se inyecta y expone directamente en el código JavaScript del lado del cliente (navegador). Cualquier usuario puede inspeccionarla abriendo las herramientas de desarrollo, por lo que jamás debe contener claves privadas o secretos de backend.

## 10. ¿Cómo comprobaste que .env.local no está versionado?
Se comprobó ejecutando comandos de control de versiones como git status en la terminal, verificando que .env.local aparece explícitamente listado dentro del archivo .gitignore y que Git no lo incluye en la lista de archivos pendientes por rastrear o commitear (Untracked files).

## 11. ¿Por qué Loading puede observarse con mayor claridad al consultar una API?
Porque las operaciones de red hacia una API externa dependen de factores externos (latencia de la red, velocidad del servidor remoto, tamaño de los datos), lo que introduce un retraso perceptible entre el momento en que se lanza la petición y el momento en que llega la respuesta. Esto permite que el estado de carga (Loading) permanezca activo el tiempo suficiente para ser renderizado claramente en la interfaz de usuario.

## 12. ¿Qué dificultad se presentó durante la integración y cómo comprobaste que quedó resuelta?
Dificultad: Generalmente surge al lidiar con desajustes en los tipos de TypeScript entre la respuesta de la API y el modelo local, o al gestionar correctamente los estados de carga y error simultáneos en la interfaz.

Comprobación: Se verificó que quedó resuelta mediante pruebas funcionales en la interfaz (verificando que el indicador de carga aparece y desaparece correctamente, los errores se muestran en el catch si falla la red) y asegurando que TypeScript compila el código sin arrojar errores de tipado.