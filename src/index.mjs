import express from "express";
import { USERS } from "./utils/constants.mjs";
import routes from "./routes/index.mjs"
import cookieParser from "cookie-parser";
import session from "express-session";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cookieParser("secret"))
app.use(session({
  secret : "session secret",
  saveUninitialized : false,
  resave : false,
  cookie : {
    maxAge : 60000 * 60,
  }
}))
app.use(routes);

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge : 60000 * 60, signed : true});
  res.status(201).send(USERS[0]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
