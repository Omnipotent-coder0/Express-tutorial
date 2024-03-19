import express from "express";
import { USERS } from "./utils/constants.mjs";
import routes from "./routes/index.mjs"

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.status(201).send(USERS[0]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
