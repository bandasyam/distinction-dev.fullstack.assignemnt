import { NextFunction, Request, Response } from "express";
import { createResponse } from "../utils/helpers";

import { getProductsData, getProductsDataWithPagination, insertProduct, updateProduct, deleteProduct } from "../repositories/product.repositories";

import { ProductList, ProductStatus } from "../constants";

async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    // get the products
    let productsData: ProductList = await getProductsData();

    // check if id exists
    let idExists = productsData?.find((el) => el.id == req.body.id);
    if (idExists) {
      return next(createResponse(409, `Product already exists with the given id`));
    }

    // update the products data in memory
    await insertProduct(productsData, req.body);

    productsData = await getProductsData();
    res.status(201).send(productsData);
  } catch (e) {
    next(e);
  }
}

async function getProducts(req: Request, res: Response, next: NextFunction) {
  try {
    let pageNumber = Number(req.query.page);

    let result;
    if (!pageNumber) {
      result = await getProductsData();
    } else {
      result = await getProductsDataWithPagination(pageNumber);
    }

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
}

async function updateProducts(req: Request, res: Response, next: NextFunction) {
  try {
    // get the products
    let productsData: ProductList = await getProductsData();

    // check if id exists
    let idExists = productsData?.findIndex((el) => el.id == req.params.id);
    if (idExists == -1) {
      return next(createResponse(409, `Product doesn't exists with the given id`));
    }

    // update the productIndex
    await updateProduct(productsData, req.body, idExists);

    //
    /**
     * if it were from db using returnDocument : true. I would have send the updated doc as well
     */
    res.status(200).send({ message: "updated" });
  } catch (e) {
    next(e);
  }
}

async function deleteProducts(req: Request, res: Response, next: NextFunction) {
  try {
    // get the products
    let productsData: ProductList = await getProductsData();

    // check if id exists
    let idExists = productsData?.findIndex((el) => el.id == req.params.id);
    if (idExists == -1) {
      return next(createResponse(409, `Product doesn't exists with the given id`));
    }

    await deleteProduct(productsData, idExists);

    res.status(200).send({ message: "deleted" });
  } catch (e) {
    next(e);
  }
}

async function archiveProduct(req: Request, res: Response, next: NextFunction) {
  try {
    // get the products
    let productsData: ProductList = await getProductsData();

    // check if id exists
    let idExists = productsData?.findIndex((el) => el.id == req.params.id);
    if (idExists == -1) {
      return next(createResponse(409, `Product doesn't exists with the given id`));
    }

    // update the productIndex
    await updateProduct(productsData, { status: ProductStatus.Archived }, idExists);

    res.status(200).send({ message: "archived" });
  } catch (e) {
    next(e);
  }
}

export default {
  createProduct,
  getProducts,
  updateProducts,
  deleteProducts,
  archiveProduct,
};
