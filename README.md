# React + Express + SQL Template

A starter web application template with:
- React frontend using Vite
- Express backend
- SQLite database via Sequelize (SQL compatible)
- Production rendering with EJS at `frontend/views/index.ejs`

## Setup

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the development environment
   ```bash
   npm run dev
   ```

3. Build for production
   ```bash
   npm run build
   npm start
   ```

## API endpoints

- `GET /api/users` - list users
- `POST /api/users` - create a user

## Notes

- The backend is in `server.js`
- The frontend lives in `frontend/`
- The production shell is rendered from `frontend/views/index.ejs`
- The development frontend still loads `frontend/index.html` through Vite
- To use a different SQL database, swap `sqlite3` and update `db.js`
