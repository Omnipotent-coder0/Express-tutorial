import { Router } from "express";
import {
  checkSchema,
  matchedData,
  query,
  validationResult,
} from "express-validator";
import { USERS } from "../utils/constants.mjs";
import { userValidationSchema } from "../utils/validationSchemas.mjs";
import { resolveUserById } from "../utils/middlewares.mjs";

const router = Router();

router.get(
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

router.post("/api/users", checkSchema(userValidationSchema), (req, res) => {
  const result = validationResult(req);
  console.log(result);
  if (!result.isEmpty()) return res.status(400).send({ error: result.array() });
  const data = matchedData(req);
  console.log(data);
  const newUser = { id: USERS[USERS.length - 1].id + 1, ...data };
  USERS.push(newUser);
  res.status(201).send(newUser);
});

router.get("/api/users/:id", resolveUserById, (req, res) => {
  const { userIndex } = req;
  return res.status(200).send(USERS[userIndex]);
});

router.put("/api/users/:id",checkSchema(userValidationSchema), resolveUserById, (req, res) => {
  const { body, userIndex } = req;
  USERS[userIndex] = { id: USERS[userIndex].id, ...body };
  res.sendStatus(200);
});

router.patch("/api/users/:id", resolveUserById, (req, res) => {
  const { body, userIndex } = req;
  USERS[userIndex] = { ...USERS[userIndex], ...body };
  res.sendStatus(200);
});

router.delete("/api/users/:id", resolveUserById, (req, res) => {
  const { userIndex } = req;
  USERS.splice(userIndex, 1);
  res.sendStatus(200);
});

export default router;
