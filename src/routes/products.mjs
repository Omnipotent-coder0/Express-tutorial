import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  console.log(req.signedCookies);
  console.log(req.signedCookies.hello);
  if (req.signedCookies.hello && req.signedCookies.hello === "world")
    return res
      .status(200)
      .send({ id: "1", name: "Chicken Breast", price: "10.99" });
  return res.status(401).send({ error : "You are not Authorized!"});
});

export default router;
