# Tarea - API Diseño Digital 1500

**Nombre:** Wilmer Hernandez  
**Cuenta:** 20222001369  
---

## 📦 Instalación

Para instalar las dependencias necesarias del proyecto, simplemente ejecuta el siguiente comando en la raíz del proyecto en la carpeta Tarea2.1:

```console
npm install
```
Esto habrá instalado todas las dependencias necesarias para la compilación correcta del servidor.

Se debera tener instalado docker para la ejecucion de la bd 

link de descarga de docker desktop: 

- [Docker](https://www.docker.com/)

## ⚙️ Ejecución
Para levantar el contenedor que contiene la configuracion para mysql ejecutar el siguiente comando en la raiz de la carpeta tiendita-docker

```bash
docker compose up -d 
```

## 🔐 Datos de conexión

Para conectarse a la bd crear el .env en base al .env.example con los siguientes valores

| Parámetro      | Valor         |
|----------------|---------------|
| Host           | `localhost`   |
| Puerto         | `3308`        |
| Base de datos  | `tienda` |
| Usuario        | `unah`        |
| Contraseña     | `unah1234`    |

Para iniciar el servidor, se debe ejecutar el siguiente comando en la raíz del proyecto dentro de la carpeta Tarea2.1:

```console
npm run dev
```

## 🪧 Rutas Disponibles (Productos)

| Método | Endpoint           | Descripción                               |
|--------|--------------------|------------------------------------------|
| GET    | ` /productos   `         | Retorna un listado con todos los productos.       |
| GET    | ` /productos/:id  `     | Retorna la información del producto con el ID especificado. |
| GET    | ` /productos/disponibles`      | Retorna todos aquellos productos con estado Disponible |
| POST   | ` /productos`          | Permite agregar un nuevo producto.                |
| PUT    |`  /productos/:id  `    | Permite modificar los datos de un producto existente. |
| DELETE | ` /productos/:id`      | Elimina un producto en base a su ID            |


## 🪧 Rutas Disponibles (Categorias)

| Método | endpoint                   | Descripción                        |
|--------|------------------------|------------------------------------|
| GET    | `/categorias`          | Lista todas las categorías         |
| GET    | `/categorias/:id`      | Obtiene una categoría por ID       |
| POST   | `/categorias`          | Crea una nueva categoría           |
| PUT    | `/categorias/:id`      | Edita una categoría existente      |
| DELETE | `/categorias/:id`      | Elimina una categoría por ID       |

