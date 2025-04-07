const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
// Resolve the absolute path to the built frontend assets
// __dirname refers to the current file's directory, and we join it with the path to the dist folder from Vite
const filepath = path.join(__dirname, "../vite-project/dist");

const serveStatic = express.static(filepath);

// Best Practice: Middleware for logging
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

// Best Practice: Apply middleware in logical order
app.use(logRoutes);
app.use(serveStatic);

// API Routes
// Best Practice: Add proper HTTP status codes

// We're using an inline callback here for simplicity and readability,
// but it's also common to define the function separately and pass it in.
// This is the approach we taught because in larger projects, you'll often
// import these handlers from another file to keep things organized.
app.get("/api/picture", (req, res) => {
  res.status(200).json({
    src: "https://static-cdn.jtvnw.net/jtv_user_pictures/meowntain-profile_banner-71b7a6d0d943dc9e-480.jpeg",
  });
});

app.get("/api/joke", (req, res) => {
  res.status(200).json({
    setup: "what do you call a pile of kittens?",
    punchline: "a meowntain",
  });
});

app.get("/api/rollDie", (req, res) => {
  let quantity = Number(req.query.quantity);

  // Validate input
  if (isNaN(quantity) || quantity < 1) {
    quantity = 1;
  }

  if (quantity > 100) {
    quantity = 100;
  }

  const rolls = [];
  for (let i = 0; i < quantity; i++) {
    const roll = Math.floor(Math.random() * 6) + 1;
    rolls.push(roll);
  }
  // Best Practice: Use proper HTTP status codes
  // Always set the status code to reflect the result (e.g., 200 for success).
  // This helps the client handle responses correctly and improves clarity.
  res.status(200).json({ rolls });
});

// Best Practice: Add global error handling
// Placed at the end of middleware, this catches unhandled errors.
// Useful for logging issues and sending a clean 500 response.
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
