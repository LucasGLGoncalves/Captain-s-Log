# Captain's Log

Aplicação web simples (Node.js + Express + EJS + PostgreSQL) para registrar entradas de diário no estilo "Captain's Log".

## Como rodar

1) Entre na pasta `src`:

```bash
cd src
````

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente (opcional)

O projeto usa estes defaults se você não configurar nada:

* `DB_DATABASE` (default: `captainslog`)
* `DB_USERNAME` (default: `captainslog`)
* `DB_PASSWORD` (default: `Pg#123`)
* `DB_HOST` (default: `localhost`)
* `DB_PORT` (default: `5432`)
* `DB_SSL_REQUIRE` (default: `false`)

4. Suba um PostgreSQL e rode:

```bash
npm start
```

A aplicação sobe em `http://localhost:8080`.

## Rotas principais

* `GET /` lista as entradas
* `GET /post` cria nova entrada
* `POST /post` salva a entrada
* `GET /post/:id` visualiza a entrada

## Health checks

* `GET /health`
* `GET /ready`