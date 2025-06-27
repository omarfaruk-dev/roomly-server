# ROOMLY Server

This is the backend server for the *Roomly* web application, providing RESTful API endpoints for managing roommate and room listings. Built with *Node.js, Express, and MongoDB*, it powers the Roomly client for secure, scalable, and efficient data operations.

## Live Client Website

[https://roomly-app.netlify.app](https://roomly-app.netlify.app)

## Related Repositories

- **Client-side:** [Roomly Client GitHub](https://github.com/omarfaruk-dev/roomly-client.git)
- **Server-side:** [Roomly Server GitHub](https://github.com/omarfaruk-dev/roomly-server.git)

## Features

- RESTful API for roommate and room listings
- Add, edit, delete, and fetch roommate posts
- Like listings (with like count increment and validation)
- Fetch featured/available roommates
- MongoDB integration with
- CORS and JSON middleware
- Environment variable support for secure credentials

## Tech Stack

- Node.js
- Express.js
- MongoDB (with MongoDB Atlas)
- dotenv
- CORS

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/omarfaruk-dev/roomly-server.git

   cd roomly-server
   ```

2. **Install dependencies:**
   ```bash
   npm install express cors dotenv mongodb
   npm install --save-dev nodemon
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your MongoDB credentials:
   ```
   DB_USER=your_mongodb_username
   DB_PASS=your_mongodb_password
   PORT=3000
   ```

4. **Start the server (development):**
   ```bash
   npx nodemon index.js
   ```
   The server will run on [http://localhost:3000](http://localhost:3000) by default.

## API Endpoints

- `GET /roommates` — Get all roommate listings
- `GET /roommates/:id` — Get a single roommate by ID
- `POST /roommates` — Create a new roommate listing
- `PUT /roommates/:id` — Update a roommate listing
- `DELETE /roommates/:id` — Delete a roommate listing
- `GET /featured-roommates` — Get up to 6 *available* roommates
- `PATCH /roommates/:id/like` — Increment like count for a roommate

## Project Structure

- `index.js` — Main server file with all routes and MongoDB connection
- `package.json` — Project dependencies and scripts
- `.env` — Environment variables (not committed - added to .gitignore)

## Deployment

You can deploy this server to platforms like Vercel, Render, or Heroku. Make sure to set environment variables in your deployment dashboard.

---

## Contact

For collaboration or suggestions:

- [GitHub](https://github.com/omarfaruk-dev)
- [LinkedIn](https://www.linkedin.com/in/pro-omarfaruk)
