// server/index.js
// import express from "express";
// import bodyParser from "body-parser";
// import axios from "axios";
// import pg from "pg";
// import bcrypt from "bcrypt";
// import { Strategy as LocalStrategy } from "passport-local";
// import session from "express-session";
// import passport from "passport";
// import dotenv from "dotenv";
// import cors from "cors";

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;
// const saltRounds = 10;
// const API_URL = process.env.API_URL;

// // PostgreSQL Client Setup
// const db = new pg.Client({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
// });
// db.connect();

// // Middleware setup
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // CORS Configuration
// app.use(cors({
//   origin: "http://localhost:3000", // React app's URL
//   credentials: true, // Allow cookies to be sent
// }));

// // Session setup
// app.use(session({
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false, // Set to true if using HTTPS
//     httpOnly: true,
//     maxAge: 1000 * 60 * 60 * 24, // 1 day
//   },
// }));

// // Passport.js setup
// app.use(passport.initialize());
// app.use(passport.session());

// // Passport Local Strategy
// passport.use(new LocalStrategy(
//   { usernameField: "username", passwordField: "password" },
//   async (username, password, done) => {
//     try {
//       const result = await db.query("SELECT * FROM users WHERE email = $1", [username]);
//       if (result.rows.length === 0) {
//         return done(null, false, { message: "Incorrect username." });
//       }
//       const user = result.rows[0];
//       const valid = await bcrypt.compare(password, user.password);
//       if (!valid) {
//         return done(null, false, { message: "Incorrect password." });
//       }
//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   }
// ));

// passport.serializeUser((user, done) => {
//   done(null, user.id); // Assuming 'id' is the primary key
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
//     if (result.rows.length === 0) {
//       return done(new Error("User not found"));
//     }
//     done(null, result.rows[0]);
//   } catch (err) {
//     done(err);
//   }
// });

// // Routes

// // Health Check
// app.get("/api/health", (req, res) => {
//   res.json({ status: "OK" });
// });

// // Register Route
// app.post("/api/register", async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password are required." });
//   }

//   try {
//     const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [username]);

//     if (checkResult.rows.length > 0) {
//       return res.status(400).json({ message: "User already exists." });
//     }

//     const hash = await bcrypt.hash(password, saltRounds);
//     const insertResult = await db.query(
//       "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
//       [username, hash]
//     );

//     const user = insertResult.rows[0];
//     req.login(user, (err) => {
//       if (err) {
//         return res.status(500).json({ message: "Error logging in after registration." });
//       }
//       res.status(201).json({ message: "User registered successfully.", user: { id: user.id, email: user.email } });
//     });
//   } catch (err) {
//     console.error("Error during registration:", err);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

// // Login Route
// app.post("/api/login", passport.authenticate("local"), (req, res) => {
//   res.json({ message: "Logged in successfully.", user: { id: req.user.id, email: req.user.email } });
// });

// // Logout Route
// app.post("/api/logout", (req, res) => {
//   req.logout(err => {
//     if (err) {
//       return res.status(500).json({ message: "Error logging out." });
//     }
//     res.json({ message: "Logged out successfully." });
//   });
// });

// // Protected Route Example
// app.get("/api/index", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json({ message: "Welcome to the protected route!", user: { id: req.user.id, email: req.user.email } });
//   } else {
//     res.status(401).json({ message: "Unauthorized." });
//   }
// });

// // Book Search Route
// app.post("/api/submit", async (req, res) => {
//   const bookName = req.body.fName;
//   if (!bookName) {
//     return res.status(400).json({ message: "Book name is required." });
//   }

//   try {
//     const response = await axios.get(`${API_URL}?q=${encodeURIComponent(bookName)}`);
//     res.json({ data: response.data });
//   } catch (error) {
//     console.error("Error fetching book data:", error);
//     res.status(500).json({ data: null, error: "No book found. Please try again." });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
// server/index.js
// server/index.js
// server/index.js
// server/index.js
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const saltRounds = 10;
const API_URL = process.env.API_URL;

// PostgreSQL Client Setup
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS Configuration
app.use(cors({
  origin: "http://localhost:3000", // React app's URL
  credentials: true, // Allow cookies to be sent
}));

// Session setup
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}));

// Passport.js setup
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(new LocalStrategy(
  { usernameField: "username", passwordField: "password" },
  async (username, password, done) => {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [username]);
      if (result.rows.length === 0) {
        return done(null, false, { message: "Incorrect username." });
      }
      const user = result.rows[0];
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Google OAuth Strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/secrets", // Backend callback URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [profile.email]);
      if (result.rows.length === 0) {
        const newUser = await db.query(
          "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
          [profile.email, "google"] // Using a placeholder password
        );
        return done(null, newUser.rows[0]);
      } else {
        return done(null, result.rows[0]);
      }
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return done(new Error("User not found"));
    }
    done(null, result.rows[0]);
  } catch (err) {
    done(err);
  }
});

// Routes

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// Register Route
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [username]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    const insertResult = await db.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [username, hash]
    );

    const user = insertResult.rows[0];
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging in after registration." });
      }
      res.status(201).json({ message: "User registered successfully.", user: { id: user.id, email: user.email } });
    });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Login Route
app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Logged in successfully.", user: { id: req.user.id, email: req.user.email } });
});

// Logout Route
app.post("/api/logout", (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(500).json({ message: "Error logging out." });
    }
    res.json({ message: "Logged out successfully." });
  });
});

// Protected Route Example
app.get("/api/index", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: "Welcome to the protected route!", user: { id: req.user.id, email: req.user.email } });
  } else {
    res.status(401).json({ message: "Unauthorized." });
  }
});

// Google OAuth Routes
app.get("/auth/google", passport.authenticate("google", {
  scope: ["email", "profile"]
}));

app.get("/auth/google/secrets", 
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect to your frontend home page
    res.redirect("http://localhost:3000/dashBoard"); // Adjust this URL as necessary
  }
);

// Book Search Route
app.post("/api/submit", async (req, res) => {
  const bookName = req.body.fName;
  if (!bookName) {
    return res.status(400).json({ message: "Book name is required." });
  }

  try {
    const response = await axios.get(`${API_URL}?q=${encodeURIComponent(bookName)}`);
    res.json({ data: response.data });
  } catch (error) {
    console.error("Error fetching book data:", error);
    res.status(500).json({ data: null, error: "No book found. Please try again." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
