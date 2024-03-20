import express from "express";
import { USERS } from "./utils/constants.mjs";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./strategies/local-strategy.mjs";
import "dotenv/config";
import mongoose from "mongoose";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(
  session({
    secret: "session secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

app.get("/api/auth/status", (req, res) => {
  console.log("Inside /auth/status end point !!");
  console.log(req.user);
  return req.user
    ? res.status(200).send(req.user)
    : res.status(401).send({ message: "You are not authorized!!" });
});

app.post("/api/auth/logout", (req, res) => {
  console.log("Inside Logout endpoint !!");
  if (!req.user) return res.sendStatus(400);
  req.logout((error) => {
    if (error) return res.status(400).send({ error: error });
    return res.sendStatus(200);
  });
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log(`Server is succesfully connected to the database!`);
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error : ${error}`);
  });
