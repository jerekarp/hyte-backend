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

### `/api/auth`

# Login
```http
POST http://localhost:3000/api/auth/login
content-type: application/json

{
  "username": "user",
  "password": "secret"
}

```

### `/api/users`

Example queries:

```http
# Get all users (requires token)
GET http://127.0.0.1:3000/api/users

# Get user by id (requires token)
GET http://127.0.0.1:3000/api/users/:id

# Delete user (requires token)
DELETE http://127.0.0.1:3000/api/users/:id

# Create user
POST http://127.0.0.1:3000/api/users
content-type: application/json

{
  "username": "test-user",
  "password": "test-password",
  "email": "test@example.com"
}

# Update user's own data (requires token)
PUT http://127.0.0.1:3000/api/users/
content-type: application/json

{
  "username": "test-user",
  "password": "test-password",
  "email": "test@example.com"
}


```

### `/api/entries`

Example queries:

```http
# Get all entries for a logged in user (requires token)
GET http://localhost:3000/api/entries

# Get entries by id (requires token)
GET http://localhost:3000/api/entries/:id

# Post entry (requires token)
POST http://localhost:3000/api/entries
content-type: application/json

{
  "entry_date": "2024-02-12",
  "mood": "Happy",
  "weight": 69.6,
  "sleep_hours": 7,
  "notes": "This was a good day",
  "user_id": 3
}

# Update entry (requires token)
PUT http://localhost:3000/api/entries/:id
content-type: application/json

{
  "entry_date": "2024-02-12",
  "mood": "Even more happy now",
  "weight": 69.6,
  "sleep_hours": 7,
  "notes": "This was a good day"
}

# Delete entry (requires token)
DELETE http://localhost:3000/api/entries/:id
```

### `/api/activities`

Example queries:

```http
# Get all activities for a logged in user (requires token)
GET http://localhost:3000/api/activities

# Get activities by id (requires token)
GET http://localhost:3000/api/activities/:id

# Post activity (requires token)
POST http://localhost:3000/api/activities
content-type: application/json

{
    "activity_type": "Swimming",
    "intensity": 8,
    "duration": "01:15:00",
    "user_id": 16
}

# Update activity (requires token)
PUT http://localhost:3000/api/activities/:id
content-type: application/json

{
  "activity_type": "Swimming",
  "intensity": 8,
  "duration": "01:16:00"
}

# Delete activity (requires token)
DELETE http://localhost:3000/api/activities/:id
```

### `/api/measurements`

Example queries:

```http
# Get all measurements for a logged in user (requires token)
GET http://localhost:3000/api/measurements

# Get measurements by id (requires token)
GET http://localhost:3000/api/measurements/:id

# Post measurement (requires token)
POST http://localhost:3000/api/measurements
content-type: application/json

{
  "measurement_type": "Blood Pressure",
  "value": 130,
  "unit": "mmHg",
  "notes": "Normal"
}

# Update measurement (requires token)
PUT http://localhost:3000/api/measurements/:id
content-type: application/json

{
  "measurement_type": "Blood Pressure",
  "value": 136,
  "unit": "mmHg",
  "notes": "Fasting"
}

# Delete measurement (requires token)
DELETE http://localhost:3000/api/measurements/:id
```
