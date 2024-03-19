import express from "express";
import { USERS } from "./utils/constants.mjs";
import routes from "./routes/index.mjs"
import cookieParser from "cookie-parser";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cookieParser("secret"))
app.use(routes);

app.get("/", (req, res) => {
  res.cookie("hello", "world", { maxAge : 60000 * 60, signed : true});
  res.status(201).send(USERS[0]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
