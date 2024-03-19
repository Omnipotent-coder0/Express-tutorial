import { USERS } from "./constants.mjs";

export const loggindMiddleware = (req, res, next) => {
  console.log(`Request Method : ${req.method}, Request URL : ${req.url}`);
  next();
};

export const resolveUserById = (req, res, next) => {
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
