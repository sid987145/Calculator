import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Handle ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from frontend dist folder
app.use(express.static(path.join(__dirname, "dist")));

// Your API route
app.post("/", (req, res) => {
  const { operation, num1, num2 } = req.body;
  const a = Number(num1);
  const b = Number(num2);
  let result = 0;

  switch (operation) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = b !== 0 ? a / b : "Cannot divide by zero";
      break;
    default:
      result = "Invalid operation";
  }

  res.json({ result });
});

// // Fallback route for SPA (serve index.html)
// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "dist", "index.html"));
//   });
  

// Start server
app.listen(port, () => {
  console.log(`🚀 App is running on http://localhost:${port}`);
});
