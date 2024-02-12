# Hyte web dev example back-end server

**Node.js + Express** application.

(Check weekly branches too.)

## Usage

1. Clone/download code
2. Run `npm i` inside project folder
3. Install & start MySQL/MariaDB server
4. Import database script(s) in `db/` folder
5. Create `.env` file based on `.env.sample`
6. Start the dev server: `npm run dev` / `npm start`

## Resources and endpoints

### `/items` (works with hard-coded mock data only, no need for db)

```http
GET http://127.0.0.1:3000/items
GET http://127.0.0.1:3000/items/:id
DELETE http://127.0.0.1:3000/items/:id
POST http://127.0.0.1:3000/items
content-type: application/json
body: {"name": "New Item"}
```

### `/users`

Example queries:

```http
GET http://127.0.0.1:3000/users
GET http://127.0.0.1:3000/users/:id
DELETE http://127.0.0.1:3000/users/:id
POST http://127.0.0.1:3000/users
content-type: application/json
body: {
  "username": "test-update4",
  "password": "test-pw-update4",
  "email": "update4@example.com"
}
PUT http://127.0.0.1:3000/users/:id
content-type: application/json
body: {
  "username": "test-update4",
  "password": "test-pw-update4",
  "email": "update4@example.com"
}
```

### `/entries`
