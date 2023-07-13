# Woowbe / Exercise VUE

## Description

### Prueba técnica FRONTEND DEVELOPER

Como ya debes saber, Woowbe es una empresa tecnológica que ofrece servicios de
fidelización tanto a comercios como personas. Nuestra intención con esta pequeña
prueba es comprobar los conocimientos que tienes y hasta dónde puedes llegar.

Deberás hacer una página en Vue JS que inicie sesión con el endpoint número 1,
introduciendo el usuario y contraseña enviado por email.

Una vez dentro, dale rienda suelta a tu imaginación. Con el endpoint 2 y 3
podrás pintar comercios y ofertas relacionadas a ellos.

-   ¿Crees que se podría implementar una tabla hash con los datos que te
    devuelve el JSON?
-   ¿Habría manera de utilizar las funciones de Map, Filter y/o Reduce para
    manejar los datos?

Recuerda que no queremos quitarte mucho tiempo, pero tampoco vamos a cortate las
alas a tu cabeza… Si consideras que puedes llegar más allá, estaremos encantados
de ver hasta dónde!

### Endpoints

[ ] 1º POST
[https://backend.dev.woowbe.com/api/v1/auth/jwt/token/](https://backend.dev.woowbe.com/api/v1/auth/jwt/token/)

PARAMS: email (prueba@woowbe.com), password (pruebatecnica2023!)

[ ] 2º GET
[https://backend.dev.woowbe.com/api/v1/business/public/](https://backend.dev.woowbe.com/api/v1/business/public/)

2.1º GET
[https://backend.dev.woowbe.com/api/v1/business/public/:business_id/](https://backend.dev.woowbe.com/api/v1/business/public/:business_id/)

[ ] 3º GET
[https://backend.dev.woowbe.com/api/v1/offers/public/](https://backend.dev.woowbe.com/api/v1/offers/public/)

3.1º GET
[https://backend.dev.woowbe.com/api/v1/offers/public/:offer_id/](https://backend.dev.woowbe.com/api/v1/offers/public/:offer_id/)

PARAMS: business, status, enabled

### BONUS

[ ] GET
[https://backend.dev.woowbe.com/api/v1/users/me/](https://backend.dev.woowbe.com/api/v1/users/me/)

GET
[https://backend.dev.woowbe.com/api/v1/points_of_sales/public/](https://backend.dev.woowbe.com/api/v1/points_of_sales/public/)
[https://backend.dev.woowbe.com/api/v1/points_of_sales/public/:pos_id/](https://backend.dev.woowbe.com/api/v1/points_of_sales/public/:pos_id/)

PARAMS: business, status, radius
