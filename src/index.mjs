import express from "express";
import { USERS } from "./utils/constants.mjs";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cookieParser("secret"));
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
app.use(routes);

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 60000 * 60, signed: true });
  res.status(201).send(USERS[0]);
});

app.post("/api/auth", (req, res) => {
  const {
    body: { username, password },
  } = req;
  const findUser = USERS.find((user) => user.username === username);
  if (!findUser || findUser.password != password)
    return res
      .status(401)
      .send({ message: "Invalid username or incorrect password" });
  console.log(req.session.id);
  req.session.user = findUser;
  return res.status(200).send(findUser);
});

app.use("/api/auth/status", (req, res) => {
  return req.session.user
    ? res
        .status(200)
        .send({ message: "user is authenticated", ...req.session.user })
    : res.status(400).send({ message: "You are not authenticated" });
});

app.get("/api/cart", (req, res) => {
  if(!req.session.user) return res.status(400).send({ message : "user is not authenticated" });
  if(req.session.cart)
    return res.status(200).send(req.session.cart);
  return res.status(200).send([]);
})

app.post("/api/cart", (req, res) => {
  if(!req.session.user) return res.status(400).send({ message : "user is not authenticated" });
  const { body : item, session :{cart} } = req;
  if(!cart) req.session.cart = [item];
  else  cart.push(item);
  return res.status(201).send(item);
})

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
