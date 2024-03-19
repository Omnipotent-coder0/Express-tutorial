import express from "express";
import { body, matchedData, query, validationResult } from "express-validator";

const USERS = [
  { id: 1, username: "nilesh", displayName: "Nilesh Gautam" },
  { id: 2, username: "aman", displayName: "Aman Kumar" },
  { id: 3, username: "ankur", displayName: "Ankur Gautam" },
  { id: 4, username: "manish", displayName: "Manish Kumar" },
  { id: 5, username: "sandeep", displayName: "Sandeep Bera" },
  { id: 6, username: "kunal", displayName: "Kunal Pasi" },
  { id: 7, username: "shubham", displayName: "Shubham Singh" },
];

const PORT = 3000;

const loggindMiddleware = (req, res, next) => {
  console.log(`Request Method : ${req.method}, Request URL : ${req.url}`);
  next();
};

const resolveUserById = (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const userIndex = USERS.findIndex((user) => user.id === parsedId);
  if (userIndex == -1) return res.sendStatus(404);
  req.userIndex = userIndex;
  next();
};

const app = express();

app.use(express.json());
app.use(loggindMiddleware);

app.get("/", (req, res) => {
  res.status(201).send(USERS[0]);
});

app.get(
  "/api/users",
  query("filter")
    .isString()
    .withMessage("Must be a String")
    .notEmpty()
    .withMessage("Must not be Empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be between 3-10 characters"),
  (req, res) => {
    const results = validationResult(req);
    console.log(results);
    const {
      query: { filter, value },
    } = req;
    if (!filter && !value) return res.status(200).send(USERS);
    if (filter && value)
      return res
        .status(200)
        .send(USERS.filter((user) => user[filter].includes(value)));
    res.status(400).send({ Error: "Bad Request!" });
  }
);

app.post(
  "/api/users",
  [
    body("username")
      .notEmpty()
      .withMessage("username cannot be empty!")
      .isString()
      .withMessage("username must be a string!")
      .isLength({ min: 3, max: 10 })
      .withMessage("username should be between 3 to 10 characters long!"),
    body("displayName")
      .notEmpty()
      .withMessage("displayName cannot be empty!")
      .isLength({ min: 3, max: 15 })
      .withMessage("displayName must be between 3 to 10 characters!"),
  ],
  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    if (!result.isEmpty())
      return res.status(400).send({ error: result.array() });
    const data = matchedData(req);
    console.log(data);
    const newUser = { id: USERS[USERS.length - 1].id + 1, ...data };
    USERS.push(newUser);
    res.status(201).send(newUser);
  }
);

app.get("/api/users/:id", resolveUserById, (req, res) => {
  const { userIndex } = req;
  return res.status(200).send(USERS[userIndex]);
});

app.put("/api/users/:id", resolveUserById, (req, res) => {
  const { body, userIndex } = req;
  USERS[userIndex] = { id: USERS[userIndex].id, ...body };
  res.sendStatus(200);
});

app.patch("/api/users/:id", resolveUserById, (req, res) => {
  const { body, userIndex } = req;
  USERS[userIndex] = { ...USERS[userIndex], ...body };
  res.sendStatus(200);
});

app.delete("/api/users/:id", resolveUserById, (req, res) => {
  const { userIndex } = req;
  USERS.splice(userIndex, 1);
  res.sendStatus(200);
});

app.get("/api/products", (req, res) => {
  res.status(200).send({ id: "1", name: "Chicken Breast", price: "10.99" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
