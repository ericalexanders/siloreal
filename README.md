## API REST - RESEÑAS DE PELICULAS
** Seed **

CAMVIAR ARCHIVO .env.example por .env
se pueden generar .env.local y .env.development, etc

1 - "npm install"
2 - "npx prisma db pull"
3 - ejecutar el seed.js --> ``` node seed.js ```
4 - ejecutar "npm run dev"
5 - con postam

```
    POST : http://localhost:8080/v1/auth/createAdmin
    body: {
        "name": "admin name",
        "email": "admin@gmail.com",
        "password": "password"
    }
```

### CRUD USERS

El crud de la entidad Users, esta implementado bajo el concepto **CLEAN ARQUETECTURE**, por una cuestion de tiempo no se pudo implementar completamente, solo en el CRUD de users.
 
 * Se define la entidad en entities
 * Se define la interface
 * Se define el repository
 * Se define el services


Para el resto de las entidadades se tomo un desarrollo mas agil, con menos capas. Por cuestion de tiempos.

Luego de poblar algunas tablas Basicas se genero una vista en postgres, para popular solo los permission Ids a la hora de traer datos del usuario.

Asi mismo se genera en el schema de Prisma la abstraccion a dicha vista (REVISAR SCHEMA DE PRIMSA):

```sql
CREATE VIEW public.user_permissions_view AS
SELECT
    u.id AS "userId",
    u.name AS username,
    u.email,
	u."roleId",
    ARRAY_AGG(rp."permissionId") AS permission_ids
FROM
    "User" u
JOIN
    "Role" r ON u."roleId" = r.id
JOIN
    "RolePermission" rp ON r.id = rp."roleId"
GROUP BY
    u.id;
```

Para el sistema de roles y usarios se optó por una relacion de 

muchos roles a muchos permisos, Creando una tabla intermedia RolePermisionns

Por lo tanto cuando se asigna un rol a un Usuario, tiene ya los permisos definidos.

Para la validaciones de rutas, se crea un middleware al cual se le pasa el permiso que debe validar y da acceso a la ruta en caso de cumplir la validacion

Primero valida el access_token y luego pasa al middleware de permisos.
