generate keys:

```
mkdir keys
ssh-keygen -t rsa -b 4096 -m PEM -f keys/private.key -N ""
```

run in dev mode:

```
npm run dev
```

copy env:

```
cp .env.example .env
```

create db:

```
# cd src/db
# npx sequelize db:create
createdb js_polls
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
- [x] Validación de Params
- [x] Base de Datos
- [ ] Ajustes: field names, vote: invalid opt, TBD+
- [ ] README.md
