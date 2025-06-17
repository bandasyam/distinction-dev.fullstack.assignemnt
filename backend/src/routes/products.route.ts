import express from "express";

import { bodyValidator, paramsValidator, queryValidator } from "../middlewares/joi.middleware";
import { createProductSchema, queryProductSchema, productParamsSchema, updateProductSchema } from "../bodyschemas/product.bodyschema";
import controller from "../controllers/product.controller";

const router = express.Router();

/** create a product */
router.post("/", bodyValidator(createProductSchema), controller.createProduct);

/** get products */
router.get("/", queryValidator(queryProductSchema), controller.getProducts);

/** update product */
router.put("/:id", bodyValidator(updateProductSchema), paramsValidator(productParamsSchema), controller.updateProducts);

/** delete product */
router.delete("/:id", paramsValidator(productParamsSchema), controller.deleteProducts);

/** archive product */
router.patch("/archive/:id", paramsValidator(productParamsSchema), controller.archiveProduct);

export default router;
