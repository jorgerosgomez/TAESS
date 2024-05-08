##Para inciar el proyecto:
> docker compose up --build

##Para ejecutar las migraciones(desde el contenedor del backend)
> npx sequelize-cli db:migrate
##Eliminar tablas
> npx sequelize-cli db:migrate:undo:all
##Ejecutar seeders
>  npx sequelize-cli db:seed:all
##eliminar seeders
>  npx sequelize-cli db:seed:undo:all