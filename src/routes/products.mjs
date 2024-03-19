import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  res.status(200).send({ id: "1", name: "Chicken Breast", price: "10.99" });
});

export default router;
