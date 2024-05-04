generate keys:

```
mkdir keys
ssh-keygen -t rsa -b 4096 -m PEM -f keys/private.key
```

TODO:

- [x] Rutas User
  - [x] POST /users
  - [x] POST /login
- [x] Rutas Poll
  - [x] POST /polls
  - [x] POST /polls/:id/vote
  - [x] GET /polls
  - [x] GET /polls/:id
- [ ] Base de Datos
- [ ] Validación de Params
- [ ] Corregir JWT -> Bearer jwt token en vez de Authorization header
- [ ] Swagger
