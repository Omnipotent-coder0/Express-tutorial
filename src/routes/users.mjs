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
import { User } from "../mongoose/schemas/user.mjs";

const router = Router();

router.get("/api/users", (req, res) => {
  try {
    res.status(200).send(USERS);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
});

router.post(
  "/api/users",
  checkSchema(userValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    console.log(result);
    if (!result.isEmpty())
      return res.status(400).send({ error: result.array() });
    const data = matchedData(req);
    try {
      // const newUser = new User(data);
      // const saveUser = await newUser.save();
      //  or  //
      const savedUser = await User.create(data);
      res.status(201).send(savedUser);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error });
    }
  }
);

router.get("/api/users/:id", resolveUserById, (req, res) => {
  const { userIndex } = req;
  return res.status(200).send(USERS[userIndex]);
});

router.put(
  "/api/users/:id",
  checkSchema(userValidationSchema),
  resolveUserById,
  (req, res) => {
    const { body, userIndex } = req;
    USERS[userIndex] = { id: USERS[userIndex].id, ...body };
    res.sendStatus(200);
  }
);

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
